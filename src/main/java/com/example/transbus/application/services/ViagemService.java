package com.example.transbus.application.services;

import com.example.transbus.application.DTOs.*;
import com.example.transbus.domain.entities.Motorista;
import com.example.transbus.domain.entities.Veiculo;
import com.example.transbus.domain.entities.Viagem;
import com.example.transbus.domain.repository.EmpresaRepository;
import com.example.transbus.domain.repository.MotoristaRepository;
import com.example.transbus.domain.repository.VeiculoRepository;
import com.example.transbus.domain.repository.ViagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ViagemService {

    // Viagens que "ocupam" motorista/veículo no período (concluídas e canceladas não contam)
    private static final List<EnumStatusViagem> STATUS_ATIVOS = List.of(
            EnumStatusViagem.AGENDADA,
            EnumStatusViagem.EM_ANDAMENTO,
            EnumStatusViagem.COM_PROBLEMA
    );

    @Autowired
    private ViagemRepository viagemRepository;
    @Autowired
    private MotoristaRepository motoristaRepository;
    @Autowired
    private VeiculoRepository veiculoRepository;
    @Autowired
    private EmpresaRepository empresaRepository;
    @Autowired
    private UsuarioService usuarioService;

    public List<ViagemResponse> listarTodasViagensTable() {

        Long empresaId = getEmpresaIdLogada();

        if (empresaId == 0L) {
            return viagemRepository.findAll()
                    .stream()
                    .map(ViagemResponse::new)
                    .toList();
        }
        return viagemRepository.getViagensByEmpresa_Id(empresaId)
                .stream()
                .map(ViagemResponse::new)
                .toList();
    }

    @Transactional
    public ViagemResponse salvarViagem(ViagemRequest viagem, Long id) {

        if (id == 0L) {
            usuarioService.validarPodeCadastrar();
        }
        // Viagem existente: precisa ser da empresa do usuário logado (senão -> 404)
        Viagem viagemBanco = null;
        if (id != 0L) {
            viagemBanco = buscarViagemDaEmpresa(id);
            if (viagemBanco == null) {
                return null;
            }
        }

        // 1) Horários válidos
        if (viagem.horarioInicio() == null || viagem.horarioFim() == null) {
            throw new IllegalArgumentException("Informe o horário de início e de fim da viagem!");
        }
        if (!viagem.horarioFim().isAfter(viagem.horarioInicio())) {
            throw new IllegalArgumentException("O horário de fim deve ser depois do horário de início!");
        }

        // 2) Motorista e veículo existem e são da mesma empresa do usuário logado
        Motorista motoristaBanco = buscarMotoristaDaEmpresa(viagem.motoristaId());
        if (motoristaBanco == null) {
            throw new IllegalArgumentException("Motorista não encontrado!");
        }
        Veiculo veiculoBanco = buscarVeiculoDaEmpresa(viagem.veiculoId());
        if (veiculoBanco == null) {
            throw new IllegalArgumentException("Veículo não encontrado!");
        }

        // 3) Motorista e veículo não podem estar indisponíveis
        validarMotoristaDisponivel(motoristaBanco);
        validarVeiculoDisponivel(veiculoBanco);

        // 4) REGRA CENTRAL: sem sobreposição de horário (para motorista E veículo)
        if (viagemRepository.existsByMotorista_IdAndStatusInAndIdNotAndHorarioInicioLessThanAndHorarioFimGreaterThan(
                motoristaBanco.getId(), STATUS_ATIVOS, id, viagem.horarioFim(), viagem.horarioInicio())) {
            throw new IllegalArgumentException("Motorista já possui uma viagem nesse período!");
        }
        if (viagemRepository.existsByVeiculo_IdAndStatusInAndIdNotAndHorarioInicioLessThanAndHorarioFimGreaterThan(
                veiculoBanco.getId(), STATUS_ATIVOS, id, viagem.horarioFim(), viagem.horarioInicio())) {
            throw new IllegalArgumentException("Veículo já possui uma viagem nesse período!");
        }

        //Nova Viagem
        if (id == 0L) {
            viagemBanco = new Viagem(viagem);
            Long empresaId = getEmpresaIdLogada();
            if (empresaId != 0L) {
                viagemBanco.setEmpresa(empresaRepository.findById(empresaId).orElse(null));
            }
        } else {
            //Viagem existente
            viagemBanco.setOrigem(viagem.origem());
            viagemBanco.setDestino(viagem.destino());
            viagemBanco.setHorarioInicio(viagem.horarioInicio());
            viagemBanco.setHorarioFim(viagem.horarioFim());
        }
        viagemBanco.setMotorista(motoristaBanco);
        viagemBanco.setVeiculo(veiculoBanco);
        viagemRepository.save(viagemBanco);

        return new ViagemResponse(viagemBanco);
    }

    public ViagemResponse buscarPorId(Long id) {
        var viagem = buscarViagemDaEmpresa(id);
        if (viagem == null) {
            return null;
        }

        return new ViagemResponse(viagem);
    }

    @Transactional
    public boolean atualizarStatus(EnumStatusViagem novoStatus, Long id) {
        Viagem viagemBanco = buscarViagemDaEmpresa(id);
        if (viagemBanco == null) {
            return false;
        }

        var statusAnterior = viagemBanco.getStatus();
        boolean estavaEmRota = statusAnterior == EnumStatusViagem.EM_ANDAMENTO
                || statusAnterior == EnumStatusViagem.COM_PROBLEMA;

        if (novoStatus == EnumStatusViagem.EM_ANDAMENTO) {
            // Não dá para iniciar uma viagem sem veículo (ex.: desvinculada por avaria)
            if (viagemBanco.getVeiculo() == null) {
                throw new IllegalArgumentException("Viagem sem veículo! Vincule um veículo antes de iniciar.");
            }
            validarMotoristaDisponivel(viagemBanco.getMotorista());
            validarVeiculoDisponivel(viagemBanco.getVeiculo());

            ocuparMotoristaEVeiculo(viagemBanco);

        } else if ((novoStatus == EnumStatusViagem.CONCLUIDA || novoStatus == EnumStatusViagem.CANCELADA) && estavaEmRota) {
            liberarMotoristaEVeiculo(viagemBanco);
        }

        viagemBanco.setStatus(novoStatus);
        viagemRepository.save(viagemBanco);

        return true;
    }

    // DIFERENCIAL: chamado pelo VeiculoService quando um veículo é marcado como AVARIADO
    @Transactional
    public void tratarVeiculoAvariado(Long veiculoId) {

        // 1) Próximas viagens programadas (AGENDADA): desvincula o veículo
        //    -> a viagem continua AGENDADA, "aguardando veículo"
        for (Viagem viagem : viagemRepository.getViagensByVeiculo_IdAndStatus(veiculoId, EnumStatusViagem.AGENDADA)) {
            viagem.setVeiculo(null);
            viagemRepository.save(viagem);
        }

        // 2) Viagem em andamento com esse veículo: passa para COM_PROBLEMA
        for (Viagem viagem : viagemRepository.getViagensByVeiculo_IdAndStatus(veiculoId, EnumStatusViagem.EM_ANDAMENTO)) {
            viagem.setStatus(EnumStatusViagem.COM_PROBLEMA);
            viagemRepository.save(viagem);
        }
    }

    // ---------- Regras de disponibilidade ----------

    private void validarMotoristaDisponivel(Motorista motorista) {
        if (motorista.getStatus() == EnumStatusMotorista.INDISPONIVEL
                || motorista.getStatus() == EnumStatusMotorista.EXCLUIDO) {
            throw new IllegalArgumentException("Motorista indisponível (" + motorista.getStatus() + ")!");
        }
    }

    private void validarVeiculoDisponivel(Veiculo veiculo) {
        if (veiculo.getStatus() == EnumStatusVeiculo.AVARIADO
                || veiculo.getStatus() == EnumStatusVeiculo.EM_MANUTENCAO
                || veiculo.getStatus() == EnumStatusVeiculo.EXCLUIDO) {
            throw new IllegalArgumentException("Veículo indisponível (" + veiculo.getStatus() + ")!");
        }
    }

    // Viagem começou: motorista dirigindo e veículo em serviço
    private void ocuparMotoristaEVeiculo(Viagem viagem) {
        Motorista motorista = viagem.getMotorista();
        motorista.setStatus(EnumStatusMotorista.DIRIGINDO);
        motoristaRepository.save(motorista);

        Veiculo veiculo = viagem.getVeiculo();
        veiculo.setStatus(EnumStatusVeiculo.EM_SERVICO);
        veiculoRepository.save(veiculo);
    }

    // Viagem terminou/cancelada durante a rota: libera motorista e veículo.
    // Só libera se ainda estiverem "na viagem" (ex.: um veículo AVARIADO NÃO volta para a GARAGEM).
    private void liberarMotoristaEVeiculo(Viagem viagem) {
        Motorista motorista = viagem.getMotorista();
        if (motorista != null && motorista.getStatus() == EnumStatusMotorista.DIRIGINDO) {
            motorista.setStatus(EnumStatusMotorista.EM_EXPEDIENTE);
            motoristaRepository.save(motorista);
        }
        Veiculo veiculo = viagem.getVeiculo();
        if (veiculo != null && veiculo.getStatus() == EnumStatusVeiculo.EM_SERVICO) {
            veiculo.setStatus(EnumStatusVeiculo.GARAGEM);
            veiculoRepository.save(veiculo);
        }
    }

    // ---------- Multi-empresa: buscas sempre filtradas pela empresa do usuário logado ----------

    // 0L = sem filtro (usuário sem empresa ou segurança desligada no Teste 2)
    private Long getEmpresaIdLogada() {
        var usuarioLogado = usuarioService.getUsuarioLogado();
        if (usuarioLogado == null) {
            return 0L;
        }
        return usuarioLogado.empresa_id();
    }

    private Viagem buscarViagemDaEmpresa(Long id) {
        Long empresaId = getEmpresaIdLogada();
        if (empresaId == 0L) {
            return viagemRepository.findById(id).orElse(null);
        }
        return viagemRepository.findByIdAndEmpresa_Id(id, empresaId).orElse(null);
    }

    private Motorista buscarMotoristaDaEmpresa(Long id) {
        if (id == null) {
            return null;
        }
        Long empresaId = getEmpresaIdLogada();
        if (empresaId == 0L) {
            return motoristaRepository.findById(id).orElse(null);
        }
        return motoristaRepository.findByIdAndEmpresa_Id(id, empresaId).orElse(null);
    }

    private Veiculo buscarVeiculoDaEmpresa(Long id) {
        if (id == null) {
            return null;
        }
        Long empresaId = getEmpresaIdLogada();
        if (empresaId == 0L) {
            return veiculoRepository.findById(id).orElse(null);
        }
        return veiculoRepository.findByIdAndEmpresa_Id(id, empresaId).orElse(null);
    }
}