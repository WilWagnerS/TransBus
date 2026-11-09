package com.example.transbus.application.DTOs;

import com.example.transbus.domain.entities.Veiculo;

public record VeiculoResponse(Long id, String placa, String modelo, String capacidade, EnumTipoVeiculo tipo, EnumStatusVeiculo status) {

    public VeiculoResponse(Veiculo veiculoEntidade) {
        this(
                veiculoEntidade.getId(),
                veiculoEntidade.getPlaca(),
                veiculoEntidade.getModelo(),
                veiculoEntidade.getCapacidade(),
                veiculoEntidade.getTipo(),
                veiculoEntidade.getStatus()
        );
    }
}