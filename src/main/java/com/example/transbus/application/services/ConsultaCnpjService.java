package com.example.transbus.application.services;

import com.example.transbus.application.DTOs.ConsultaCnpjResponse;
import com.example.transbus.domain.entities.Empresa;
import com.example.transbus.domain.interfaces.IConsultaCnpjExternalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsultaCnpjService {

    // Depende da INTERFACE (porta), não da implementação da BrasilAPI
    @Autowired
    private IConsultaCnpjExternalRepository consultaCnpjExternalRepository;

    public ConsultaCnpjResponse buscarEmpresa(String cnpj) {
        String somenteNumeros = cnpj.replaceAll("[^0-9]", "");
        if (somenteNumeros.length() != 14) {
            throw new IllegalArgumentException("CNPJ deve ter 14 dígitos!");
        }

        Empresa empresa = consultaCnpjExternalRepository.buscarEmpresaPorCnpj(somenteNumeros);

        // Empresa sem nome fantasia: usa a razão social no lugar
        String nomeFantasia = (empresa.getNomeFantasia() == null || empresa.getNomeFantasia().isBlank())
                ? empresa.getRazaoSocial()
                : empresa.getNomeFantasia();

        return new ConsultaCnpjResponse(somenteNumeros, empresa.getRazaoSocial(), nomeFantasia);
    }
}