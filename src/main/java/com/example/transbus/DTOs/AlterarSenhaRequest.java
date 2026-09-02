package com.example.transbus.DTOs;

//Especifico para quando o usuario querer modificar a sua senha.
public record AlterarSenhaRequest(
        String senhaAtual,
        String novaSenha
) {
}
