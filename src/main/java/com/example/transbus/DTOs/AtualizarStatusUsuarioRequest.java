package com.example.transbus.DTOs;

import com.example.transbus.entities.EnumStatusUsuario;

public record AtualizarStatusUsuarioRequest(
        EnumStatusUsuario statusUsuario){

}