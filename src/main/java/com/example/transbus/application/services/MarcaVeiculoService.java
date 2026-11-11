package com.example.transbus.application.services;

import com.example.transbus.application.DTOs.CriarMarcaVeiculoRequest;
import com.example.transbus.application.DTOs.CriarMarcaVeiculoResponse;
import com.example.transbus.application.DTOs.MarcaVeiculoResponse;
import com.example.transbus.domain.entities.MarcaVeiculo;
import com.example.transbus.domain.repository.MarcaVeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaVeiculoService {

    @Value("${spring.secret}")
    private String secret;

    @Autowired
    private MarcaVeiculoRepository marcaVeiculoRepository;

    public List<MarcaVeiculoResponse> listarTodasMarcasVeiculoTable() {

        return marcaVeiculoRepository.findAll()
                .stream()
                .map(MarcaVeiculoResponse::new)
                .toList();
    }

    public CriarMarcaVeiculoResponse criarMarcaVeiculo(CriarMarcaVeiculoRequest marcaVeiculoRequest) {
        if (!marcaVeiculoRequest.secretKey().equals(secret)) {
            return new CriarMarcaVeiculoResponse(0L, "Marca de veículo salva com sucesso!");
        }
        MarcaVeiculo marcaVeiculoSalvar = new MarcaVeiculo(marcaVeiculoRequest);
        marcaVeiculoRepository.save(marcaVeiculoSalvar);

        return new CriarMarcaVeiculoResponse(marcaVeiculoSalvar.getId(), "Marca de veículo salva com sucesso!");
    }
}