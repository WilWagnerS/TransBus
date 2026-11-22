package com.example.transbus.domain.interfaces;

import com.example.transbus.domain.entities.Empresa;

// PORTA (domínio): o domínio só conhece esta interface e a entidade Empresa.
// Quem implementa (BrasilAPI) fica na infraestrutura -> Inversão de Dependência.
public interface IConsultaCnpjExternalRepository {
    Empresa buscarEmpresaPorCnpj(String cnpj);
}