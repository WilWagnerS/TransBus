package com.example.transbus.application.DTOs;

import com.example.transbus.domain.entities.Motorista;
import com.example.transbus.domain.valueobject.Endereco;

public record MotoristaResponse(Long id, String nome, String cnh, String telefone, EnumStatusMotorista status, Endereco endereco) {

    public MotoristaResponse(Motorista motoristaEntidade) {
        this(
                motoristaEntidade.getId(),
                motoristaEntidade.getNome(),
                motoristaEntidade.getCnh(),
                motoristaEntidade.getTelefone(),
                motoristaEntidade.getStatus(),
                motoristaEntidade.getEndereco()
        );
    }
}