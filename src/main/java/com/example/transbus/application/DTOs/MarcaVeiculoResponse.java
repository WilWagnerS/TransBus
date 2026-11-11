package com.example.transbus.application.DTOs;

import com.example.transbus.domain.entities.MarcaVeiculo;

public record MarcaVeiculoResponse(Long id, String nome, String tipo, String ano) {
    public MarcaVeiculoResponse(MarcaVeiculo marcaVeiculoEntidade) {
        this(
                marcaVeiculoEntidade.getId(),
                marcaVeiculoEntidade.getNome(),
                marcaVeiculoEntidade.getTipo(),
                marcaVeiculoEntidade.getAno()
        );
    }
}