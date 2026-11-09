package com.example.transbus.presentation;

import com.example.transbus.application.DTOs.AtualizarStatusMotoristaRequest;
import com.example.transbus.application.DTOs.EnumStatusMotorista;
import com.example.transbus.application.DTOs.MotoristaRequest;
import com.example.transbus.application.DTOs.MotoristaResponse;
import com.example.transbus.application.services.MotoristaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/motoristas")
@Tag(name = "Motoristas",
        description = "Grupo de APIs responsavel por controlar a estrutura de criação e consulta de motoristas do sistema!")
public class MotoristaController {

    @Autowired
    private MotoristaService motoristaService;

    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de motoristas!",
            description = "Metodo responsavel em efetuar a consulta de todos os motoristas da empresa do usuario logado!")
    public ResponseEntity<List<MotoristaResponse>> listarTodos() {

        return ResponseEntity.ok(motoristaService.listarTodosMotoristasTable());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método responsável pela consulta de um motorista pelo ID!")
    public ResponseEntity<MotoristaResponse> buscarPorId(@PathVariable Long id) {
        MotoristaResponse motoristaBanco = motoristaService.buscarPorId(id);
        if (motoristaBanco != null) {
            return ResponseEntity.ok(motoristaBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criação de motoristas!",
            description = "Metodo responsavel em efetuar a criação de novos motoristas! O endereço é preenchido automaticamente pelo CEP (ViaCEP).")
    public ResponseEntity<?> criar(@RequestBody MotoristaRequest motorista) {
        try {
            MotoristaResponse motoristaBanco = motoristaService.salvarMotorista(motorista, 0L);
            return ResponseEntity.ok(motoristaBanco);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método responsável pela alteração do status do motorista!")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusMotoristaRequest statusRequest) {

        var atualizarMotorista = motoristaService.atualizarStatus(statusRequest.statusMotorista(), id);
        if (atualizarMotorista) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método responsável pela atualização dos dados do motorista!")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody MotoristaRequest motorista) {
        try {
            MotoristaResponse motoristaBanco = motoristaService.salvarMotorista(motorista, id);
            if (motoristaBanco != null) {
                return ResponseEntity.ok(motoristaBanco);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método responsável pela exclusão do motorista!")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        var excluirMotorista = motoristaService.atualizarStatus(EnumStatusMotorista.EXCLUIDO, id);
        if (excluirMotorista) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}