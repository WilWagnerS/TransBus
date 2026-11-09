package com.example.transbus.presentation;

import com.example.transbus.application.DTOs.AtualizarStatusViagemRequest;
import com.example.transbus.application.DTOs.EnumStatusViagem;
import com.example.transbus.application.DTOs.ViagemRequest;
import com.example.transbus.application.DTOs.ViagemResponse;
import com.example.transbus.application.services.ViagemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/viagens")
@Tag(name = "Viagens",
        description = "Grupo de APIs responsavel por controlar a estrutura de criação e consulta de viagens do sistema!")
public class ViagemController {

    @Autowired
    private ViagemService viagemService;

    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de viagens!",
            description = "Metodo responsavel em efetuar a consulta de todas as viagens da empresa do usuario logado!")
    public ResponseEntity<List<ViagemResponse>> listarTodos() {

        return ResponseEntity.ok(viagemService.listarTodasViagensTable());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método responsável pela consulta de uma viagem pelo ID!")
    public ResponseEntity<ViagemResponse> buscarPorId(@PathVariable Long id) {
        ViagemResponse viagemBanco = viagemService.buscarPorId(id);
        if (viagemBanco != null) {
            return ResponseEntity.ok(viagemBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criação de viagem!",
            description = "Metodo responsavel em efetuar a criação de novas viagens! Motorista deve estar EM_EXPEDIENTE e veículo na GARAGEM.")
    public ResponseEntity<?> criar(@RequestBody ViagemRequest viagem) {
        try {
            ViagemResponse viagemBanco = viagemService.salvarViagem(viagem, 0L);
            return ResponseEntity.ok(viagemBanco);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método responsável pela alteração do status da viagem!")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusViagemRequest statusRequest) {

        var atualizarViagem = viagemService.atualizarStatus(statusRequest.statusViagem(), id);
        if (atualizarViagem) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método responsável pela atualização dos dados da viagem!")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody ViagemRequest viagem) {
        try {
            ViagemResponse viagemBanco = viagemService.salvarViagem(viagem, id);
            if (viagemBanco != null) {
                return ResponseEntity.ok(viagemBanco);
            }
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/cancelar")
    @Operation(summary = "Método responsável pelo cancelamento da viagem!")
    public ResponseEntity<Void> cancelar(@PathVariable Long id) {

        var cancelarViagem = viagemService.atualizarStatus(EnumStatusViagem.CANCELADA, id);
        if (cancelarViagem) {
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}