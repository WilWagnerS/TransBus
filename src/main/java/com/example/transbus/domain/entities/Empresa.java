package com.example.transbus.domain.entities;

import com.example.transbus.application.DTOs.CriarAdminRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Empresa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razaoSocial;

    private String nomeFantasia;

    private String cnpj;

    //O private sempre será uma Lista.
    @OneToMany(mappedBy = "empresa")
    private List<Usuario> usuarios;

    public Empresa(CriarAdminRequest criarAdminRequest) {
        this.setRazaoSocial(criarAdminRequest.razaoSocial());
        this.setNomeFantasia(criarAdminRequest.nomeFantasia());
        this.setCnpj(criarAdminRequest.cnpj());
    }
}