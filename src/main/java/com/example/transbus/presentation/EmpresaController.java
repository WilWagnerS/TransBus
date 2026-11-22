package com.example.transbus.presentation;

import com.example.transbus.application.services.ConsultaCnpjService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/empresas")
@Tag(name = "Empresas",
        description = "Endpoints de apoio ao cadastro de empresas, com consulta externa de CNPJ pela BrasilAPI!")
public class EmpresaController {

    @Autowired
    private ConsultaCnpjService consultaCnpjService;

    @GetMapping("/consulta-cnpj/{cnpj}")
    @Operation(summary = "Método de consulta de empresa pelo CNPJ!",
            description = "Método responsável em buscar a razão social e o nome fantasia na BrasilAPI a partir do CNPJ. Utilizado pela aplicação JavaFX no cadastro da empresa.")
    public ResponseEntity<?> consultarCnpj(@PathVariable String cnpj) {
        try {
            return ResponseEntity.ok(consultaCnpjService.buscarEmpresa(cnpj));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}