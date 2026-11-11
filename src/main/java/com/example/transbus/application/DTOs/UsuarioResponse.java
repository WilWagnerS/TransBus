package com.example.transbus.application.DTOs;

import com.example.transbus.domain.entities.Usuario;

public record UsuarioResponse(Long id, String nome, String cpf, String email, EnumStatusUsuario status,
                              String role, String empresa) {

    public UsuarioResponse(Usuario usuarioEntidade) {

        this(
                usuarioEntidade.getId(),
                usuarioEntidade.getNome(),
                usuarioEntidade.getCpf().toString(),
                usuarioEntidade.getEmail(),
                usuarioEntidade.getStatus(),
                usuarioEntidade.getRole(),
                usuarioEntidade.getEmpresa() != null
                        ? usuarioEntidade.getEmpresa().getNomeFantasia()
                        : "Global (dono do sistema)"
        );
    }
}