package com.example.transbus.application.services;

import com.example.transbus.application.DTOs.EnderecoResponse;
import com.example.transbus.domain.interfaces.IViaCepExternalRepository;
import com.example.transbus.domain.valueobject.Endereco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService {

    // Depende da INTERFACE (porta), não da implementação do ViaCEP
    @Autowired
    private IViaCepExternalRepository viaCepExternalRepository;

    public EnderecoResponse BuscarEndereco(String cep) {
        Endereco endereco = viaCepExternalRepository.buscarEnderecoViaCepPorCep(cep);
        return new EnderecoResponse(
                endereco.getCep(),
                endereco.getLogradouro(),
                endereco.getBairro(),
                endereco.getCidade(),
                endereco.getUf());
    }
}