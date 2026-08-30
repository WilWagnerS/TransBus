package com.example.transbus.controllers;

import com.example.transbus.DTOs.AtualizarStatusRequest;
import com.example.transbus.entities.EnumStatusViagem;
import com.example.transbus.entities.Usuario;
import com.example.transbus.entities.Viagem;
import com.example.transbus.repository.ViagemRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/viagem")
@Tag(name = "Viagem",
        description = "Grupo de APIs responsavel por controlar a estrutura de criação e consulta de viagem do sistema!")
public class ViagemController {

    @Autowired
    private ViagemRepository viagemRepository;

    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de viagem!",
            description = "Metodo responsavel em efetuar a consulta de todos os viagem sem filtro!")
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(viagemRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Viagem> buscarPorId(@PathVariable Long id){

        Viagem viagemBanco = viagemRepository.findById(id).orElse(null);
        if(viagemBanco!= null){
            return ResponseEntity.ok(viagemBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criação de viagem!",
            description = "Metodo responsavel em efetuar a criação de novas viagens!")
    public ResponseEntity<Viagem> criar(@RequestBody Viagem viagem){

        var viagemBanco = viagemRepository.save(viagem);
        return ResponseEntity.ok(viagemBanco);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest){

        //viagemBanco pra entender que é a viagem que veio do banco.
        Viagem viagemBanco =  viagemRepository.findById(id).orElse(null);
        if(viagemBanco!= null){
            viagemBanco.setStatus(statusRequest.statusViagem());
            viagemRepository.save(viagemBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Viagem viagem){

        try{
            Viagem viagemBanco = viagemRepository.findById(id).orElse(null);
            if(viagemBanco!= null){
                viagemBanco.setStatus(viagem.getStatus());
                viagemBanco.setOrigem(viagem.getOrigem());
                viagemBanco.setDestino(viagem.getDestino());
                viagemBanco.setHorarioInicio(viagem.getHorarioInicio());
                viagemBanco.setHorarioFim(viagem.getHorarioFim());
                viagemRepository.save(viagemBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        }catch (RuntimeException e){
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/cancelar")
    public ResponseEntity<Void> cancelar(@PathVariable Long id){

        Viagem viagemBanco = viagemRepository.findById(id).orElse(null);
        if(viagemBanco!= null){
            viagemBanco.setStatus(EnumStatusViagem.CANCELADA);
            viagemRepository.save(viagemBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
