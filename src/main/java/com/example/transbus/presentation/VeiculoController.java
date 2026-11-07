package com.example.transbus.presentation;


import com.example.transbus.application.DTOs.AtualizarStatusVeiculoRequest;
import com.example.transbus.application.DTOs.EnumStatusVeiculo;
import com.example.transbus.application.DTOs.VeiculoRequest;
import com.example.transbus.application.DTOs.VeiculoResponse;
import com.example.transbus.application.services.VeiculoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/veiculos")
@Tag(name = "Veiculos",
        description = "Grupo de APIs responsavel por controlar a estrutura de criação e consulta de veiculos (onibus e caminhoes) do sistema!")
public class VeiculoController {

    @Autowired
    private VeiculoService veiculoService;

    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de veiculos!",
            description = "Metodo responsavel em efetuar a consulta de todos os veiculos da empresa do usuario logado!")
    public ResponseEntity<List<VeiculoResponse>> listarTodos() {

        return ResponseEntity.ok(veiculoService.listarTodosVeiculosTable());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método responsável pela consulta de um veículo pelo ID!")
    public ResponseEntity<VeiculoResponse> buscarPorId(@PathVariable Long id) {
        VeiculoResponse veiculoBanco = veiculoService.buscarPorId(id);
        if (veiculoBanco != null) {
            return ResponseEntity.ok(veiculoBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criação de veiculos!",
            description = "Metodo responsavel em efetuar a criação de novos veiculos!")
    public ResponseEntity<?> criar(@RequestBody VeiculoRequest veiculo) {
        try {
            VeiculoResponse veiculoBanco = veiculoService.salvarVeiculo(veiculo, 0L);
            return ResponseEntity.ok(veiculoBanco);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método responsável pela alteração do status do veículo!")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusVeiculoRequest statusRequest) {

        var atualizarVeiculo = veiculoService.atualizarStatus(statusRequest.statusVeiculo(), id);
        if (atualizarVeiculo) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método responsável pela atualização dos dados do veículo!")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody VeiculoRequest veiculo) {
        try {
            VeiculoResponse veiculoBanco = veiculoService.salvarVeiculo(veiculo, id);
            if (veiculoBanco != null) {
                return ResponseEntity.ok(veiculoBanco);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método responsável pela exclusão do veículo!")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        var excluirVeiculo = veiculoService.atualizarStatus(EnumStatusVeiculo.EXCLUIDO, id);
        if (excluirVeiculo) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}