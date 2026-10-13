package com.example.transbus.application.DTOs;

public record AlterarSenhaRequest(

        String senhaAtual,

        String novaSenha
) {
}
