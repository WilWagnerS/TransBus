package com.example.transbus.DTOs;

import com.example.transbus.entities.EnumStatusViagem;

public record AtualizarStatusViagemRequest(
        EnumStatusViagem statusViagem) {

}
