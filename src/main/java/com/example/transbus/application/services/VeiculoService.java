package com.example.transbus.application.services;

import com.example.transbus.application.DTOs.EnumStatusVeiculo;
import com.example.transbus.application.DTOs.VeiculoRequest;
import com.example.transbus.application.DTOs.VeiculoResponse;
import com.example.transbus.domain.entities.Veiculo;
import com.example.transbus.domain.repository.EmpresaRepository;
import com.example.transbus.domain.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VeiculoService {

    @Autowired
    private VeiculoRepository veiculoRepository;
    @Autowired
    private EmpresaRepository empresaRepository;
    @Autowired
    private UsuarioService usuarioService;

    public List<VeiculoResponse> listarTodosVeiculosTable() {

        var usuarioLogado = usuarioService.getUsuarioLogado();
        if (usuarioLogado == null || usuarioLogado.empresa_id() == 0L) {
            return veiculoRepository.findAll()
                    .stream()
                    .map(VeiculoResponse::new)
                    .toList();
        }
        return veiculoRepository.getVeiculosByEmpresa_Id(usuarioLogado.empresa_id())
                .stream()
                .map(VeiculoResponse::new)
                .toList();
    }

    public VeiculoResponse salvarVeiculo(VeiculoRequest veiculo, Long id) {

        var usuarioLogado = usuarioService.getUsuarioLogado();
        //Novo Veiculo
        if (id == 0L) {
            Veiculo veiculoBanco = new Veiculo(veiculo);
            if (usuarioLogado != null) {
                veiculoBanco.setEmpresa(empresaRepository.findById(usuarioLogado.empresa_id()).orElse(null));
            }
            veiculoRepository.save(veiculoBanco);

            return new VeiculoResponse(veiculoBanco);
        } else {
            //Veiculo existente (só altera se for da empresa do usuário logado)
            Veiculo veiculoBanco = buscarVeiculoDaEmpresa(id);
            if (veiculoBanco != null) {
                veiculoBanco.setPlaca(veiculo.placa());
                veiculoBanco.setModelo(veiculo.modelo());
                veiculoBanco.setCapacidade(veiculo.capacidade());
                veiculoBanco.setTipo(veiculo.tipo());
                veiculoRepository.save(veiculoBanco);

                return new VeiculoResponse(veiculoBanco);
            }
        }
        return null;
    }

    public VeiculoResponse buscarPorId(Long id) {
        var veiculo = buscarVeiculoDaEmpresa(id);
        if (veiculo == null) {
            return null;
        }
        return new VeiculoResponse(veiculo);
    }

    public boolean atualizarStatus(EnumStatusVeiculo status, Long id) {
        Veiculo veiculoBanco = buscarVeiculoDaEmpresa(id);
        if (veiculoBanco != null) {
            veiculoBanco.setStatus(status);
            veiculoRepository.save(veiculoBanco);

            return true;
        }
        return false;
    }

    // Busca o veículo pelo id, mas só devolve se ele for da empresa do usuário logado.
    // Se for de outra empresa, devolve null -> o controller responde 404 (Teste 3).
    private Veiculo buscarVeiculoDaEmpresa(Long id) {
        var usuarioLogado = usuarioService.getUsuarioLogado();

        if (usuarioLogado == null || usuarioLogado.empresa_id() == 0L) {
            return veiculoRepository.findById(id).orElse(null);
        }
        return veiculoRepository.findByIdAndEmpresa_Id(id, usuarioLogado.empresa_id()).orElse(null);
    }
}