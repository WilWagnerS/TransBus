package com.example.transbus.domain.interfaces;

import com.example.transbus.domain.valueobject.Endereco;

// PORTA (domínio): o domínio só conhece esta interface e o objeto de valor Endereco.
// Quem implementa (ViaCEP) fica na infraestrutura -> Inversão de Dependência.
public interface IViaCepExternalRepository {
    Endereco buscarEnderecoViaCepPorCep(String cep);
}