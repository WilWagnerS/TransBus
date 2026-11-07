package com.example.transbus.domain.interfaces;

import com.example.transbus.infra.dto.ViaCepResponse;

public interface IViaCepExternalRepository {
    ViaCepResponse buscarEnderecoViaCepPorCep(String cep);
}
