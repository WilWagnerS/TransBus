package com.example.transbus.application.DTOs;

import com.example.transbus.domain.entities.EnumStatusOnibus;

public record AtualizarStatusOnibusRequest(

        EnumStatusOnibus statusOnibus) {

}