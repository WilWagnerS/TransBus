package com.example.transbus.application.DTOs;

import com.example.transbus.domain.entities.EnumStatusViagem;

public record AtualizarStatusViagemRequest(

        EnumStatusViagem statusViagem) {

}
