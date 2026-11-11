package com.example.transbus.presentation;

import com.example.transbus.application.DTOs.EnderecoResponse;
import com.example.transbus.application.services.EnderecoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/endereco")
@Tag(name = "Endereco",
        description = "Grupo de APIs responsavel pela consulta de endereços pelo CEP, através da integração externa com a API ViaCEP!")
public class EnderecoController {


    @Autowired
    private EnderecoService enderecoService;

    @GetMapping("/{cep}")
    @Operation(summary = "Método de consulta de endereço pelo CEP!",
            description = "Método responsável em consultar o endereço completo (logradouro, bairro, cidade e UF) na API externa ViaCEP!")
    public ResponseEntity<EnderecoResponse> buscarEndereco(@PathVariable String cep){
        return ResponseEntity.ok(enderecoService.BuscarEndereco(cep));
    }
}