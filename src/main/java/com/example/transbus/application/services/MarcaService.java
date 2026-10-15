package com.example.transbus.application.services;

import com.example.transbus.application.DTOs.CriarMarcaRequest;
import com.example.transbus.application.DTOs.CriarMarcaResponse;
import com.example.transbus.application.DTOs.MarcaResponse;
import com.example.transbus.domain.entities.Marca;
import com.example.transbus.domain.repository.MarcaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarcaService {

    @Value("${spring.secret}")
    private String secret;

    @Autowired
    private MarcaRepository marcaRepository;

    public List<MarcaResponse> listarTodasMarcasTable(){

        return marcaRepository.findAll()
                .stream()
                .map(MarcaResponse::new)
                .toList();
    }

    public CriarMarcaResponse criarMarca(CriarMarcaRequest marcaRequest){
        if (!marcaRequest.secretKey().equals(secret)){
            return new CriarMarcaResponse(0L, "Marca salva com sucesso!");
        }
        Marca marcaSalvar = new Marca(marcaRequest);
        marcaRepository.save(marcaSalvar);

        return new CriarMarcaResponse(marcaSalvar.getId(), "Marca salva com sucesso!");
    }
}
