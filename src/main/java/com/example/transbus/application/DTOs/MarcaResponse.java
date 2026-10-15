package com.example.transbus.application.DTOs;

import com.example.transbus.domain.entities.Marca;

public record MarcaResponse(Long id, String nome, String tipo, String ano){
    public MarcaResponse(Marca marcaEntidade){
        this(
                marcaEntidade.getId(),
                marcaEntidade.getNome(),
                        marcaEntidade.getTipo(),
                        marcaEntidade.getAno()
        );
    }
}
