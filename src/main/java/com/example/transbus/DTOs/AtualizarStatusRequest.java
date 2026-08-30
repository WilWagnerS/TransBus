package com.example.transbus.DTOs;

import com.example.transbus.entities.EnumStatusMotorista;
import com.example.transbus.entities.EnumStatusOnibus;
import com.example.transbus.entities.EnumStatusUsuario;
import com.example.transbus.entities.EnumStatusViagem;

public record AtualizarStatusRequest(
        EnumStatusUsuario statusUsuario,
        EnumStatusMotorista statusMotorista,
        EnumStatusViagem statusViagem,
        EnumStatusOnibus statusOnibus) {
}
