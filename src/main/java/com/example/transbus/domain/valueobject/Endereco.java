package com.example.transbus.domain.valueobject;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Objeto de valor (DDD): o endereço não tem id próprio,
// as colunas ficam dentro da tabela de quem o usa (igual ao CPF).
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Endereco {

    private String cep;
    private String logradouro;
    private String numero;
    private String bairro;
    private String cidade;
    private String uf;
}