package com.example.transbus.application.services;

import com.example.transbus.application.DTOs.EnumStatusMotorista;
import com.example.transbus.application.DTOs.MotoristaRequest;
import com.example.transbus.application.DTOs.MotoristaResponse;
import com.example.transbus.domain.entities.Motorista;
import com.example.transbus.domain.repository.EmpresaRepository;
import com.example.transbus.domain.repository.MotoristaRepository;
import com.example.transbus.domain.valueobject.Endereco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MotoristaService {

    @Autowired
    private MotoristaRepository motoristaRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private EnderecoService enderecoService;

    public List<MotoristaResponse> listarTodosMotoristasTable() {

        var usuarioLogado = usuarioService.getUsuarioLogado();

        if (usuarioLogado == null || usuarioLogado.empresa_id() == 0L) {
            return motoristaRepository.findAll()
                    .stream()
                    .map(MotoristaResponse::new)
                    .toList();
        }
        return motoristaRepository.getMotoristasByEmpresa_Id(usuarioLogado.empresa_id())
                .stream()
                .map(MotoristaResponse::new)
                .toList();
    }

    public MotoristaResponse salvarMotorista(MotoristaRequest motorista, Long id) {
        var usuarioLogado = usuarioService.getUsuarioLogado();
        //Novo Motorista
        if (id == 0L) {
            Motorista motoristaBanco = new Motorista(motorista);
            motoristaBanco.setEndereco(montarEndereco(motorista));
            if (usuarioLogado != null) {
                motoristaBanco.setEmpresa(empresaRepository.findById(usuarioLogado.empresa_id()).orElse(null));
            }
            motoristaRepository.save(motoristaBanco);

            return new MotoristaResponse(motoristaBanco);
        } else {
            //Motorista existente (só altera se for da empresa do usuário logado)
            Motorista motoristaBanco = buscarMotoristaDaEmpresa(id);
            if (motoristaBanco != null) {
                motoristaBanco.setNome(motorista.nome());
                motoristaBanco.setCnh(motorista.cnh());
                motoristaBanco.setTelefone(motorista.telefone());
                motoristaBanco.setEndereco(montarEndereco(motorista));
                motoristaRepository.save(motoristaBanco);

                return new MotoristaResponse(motoristaBanco);
            }
        }
        return null;
    }

    public MotoristaResponse buscarPorId(Long id) {
        var motorista = buscarMotoristaDaEmpresa(id);
        if (motorista == null) {
            return null;
        }

        return new MotoristaResponse(motorista);
    }

    public boolean atualizarStatus(EnumStatusMotorista status, Long id) {
        Motorista motoristaBanco = buscarMotoristaDaEmpresa(id);
        if (motoristaBanco != null) {
            motoristaBanco.setStatus(status);
            motoristaRepository.save(motoristaBanco);

            return true;
        }
        return false;
    }

    // Integração externa (Teste 5): com o CEP, busca o endereço no ViaCEP
    // e monta o objeto de valor Endereco. O número vem do próprio request.
    private Endereco montarEndereco(MotoristaRequest motorista) {
        if (motorista.cep() == null || motorista.cep().isBlank()) {
            return null;
        }
        var enderecoViaCep = enderecoService.BuscarEndereco(motorista.cep());

        return new Endereco(
                enderecoViaCep.cep(),
                enderecoViaCep.logradouro(),
                motorista.numero(),
                enderecoViaCep.bairro(),
                enderecoViaCep.cidade(),
                enderecoViaCep.uf()
        );
    }

    // Busca o motorista pelo id, mas só devolve se ele for da empresa do usuário logado.
    // Se for de outra empresa, devolve null -> o controller responde 404 (Teste 3).
    private Motorista buscarMotoristaDaEmpresa(Long id) {
        var usuarioLogado = usuarioService.getUsuarioLogado();

        if (usuarioLogado == null || usuarioLogado.empresa_id() == 0L) {
            return motoristaRepository.findById(id).orElse(null);
        }
        return motoristaRepository.findByIdAndEmpresa_Id(id, usuarioLogado.empresa_id()).orElse(null);
    }
}