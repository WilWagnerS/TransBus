package com.example.transbus.application.DTOs;

import java.time.LocalDateTime;

public record ViagemRequest(String origem, String destino, LocalDateTime horarioInicio, LocalDateTime horarioFim, Long motoristaId, Long veiculoId) {

}