package com.example.transbus.application.DTOs;

import com.example.transbus.domain.entities.Viagem;

import java.time.LocalDateTime;

public record ViagemResponse(Long id, String origem, String destino, LocalDateTime horarioInicio, LocalDateTime horarioFim,
                             EnumStatusViagem status, Long motoristaId, String motoristaNome, Long veiculoId, String veiculoPlaca) {

    public ViagemResponse(Viagem viagemEntidade) {
        this(
                viagemEntidade.getId(),
                viagemEntidade.getOrigem(),
                viagemEntidade.getDestino(),
                viagemEntidade.getHorarioInicio(),
                viagemEntidade.getHorarioFim(),
                viagemEntidade.getStatus(),
                viagemEntidade.getMotorista() != null ? viagemEntidade.getMotorista().getId() : null,
                viagemEntidade.getMotorista() != null ? viagemEntidade.getMotorista().getNome() : null,
                viagemEntidade.getVeiculo() != null ? viagemEntidade.getVeiculo().getId() : null,
                viagemEntidade.getVeiculo() != null ? viagemEntidade.getVeiculo().getPlaca() : null
        );
    }
}