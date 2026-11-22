package com.example.transbus.infra.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

// Formato da resposta da BrasilAPI (só os campos que usamos)
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class BrasilApiCnpjResponse {

    private String cnpj;

    @JsonProperty("razao_social")
    private String razaoSocial;

    @JsonProperty("nome_fantasia")
    private String nomeFantasia;
}