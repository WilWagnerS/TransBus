package com.example.transbus.controllers;

import com.example.transbus.DTOs.AtualizarStatusRequest;
import com.example.transbus.entities.EnumStatusMotorista;
import com.example.transbus.entities.Motorista;
import com.example.transbus.repository.MotoristaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/motoristas")
@Tag(name = "Motoristas",
        description = "Grupo de APIs responsavel por controlar a estrutura de criação e consulta de motoristas do sistema!")
public class MotoristaController {

    @Autowired
    private MotoristaRepository motoristaRepository;


    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de motoristas!",
            description = "Metodo responsavel em efetuar a consulta de todos os motoristas sem filtro!")
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(motoristaRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Motorista> buscarPorId(@PathVariable Long id){

        Motorista motoristaBanco = motoristaRepository.findById(id).orElse(null);
        if(motoristaBanco != null){
            return ResponseEntity.ok(motoristaBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criação de motoristas!",
            description = "Metodo responsavel em efetuar a criação de novos motoristas!")
    public ResponseEntity<Motorista> criar(@RequestBody Motorista motorista){

        var motoristaBanco = motoristaRepository.save(motorista);
        return ResponseEntity.ok(motoristaBanco);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest){

        //motoristaBanco pra entender que é o motorista que veio do banco.
        Motorista motoristaBanco = motoristaRepository.findById(id).orElse(null);
        if(motoristaBanco!= null){
            motoristaBanco.setStatus(statusRequest.statusMotorista());
            motoristaRepository.save(motoristaBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Motorista> atualizar(@PathVariable Long id, @RequestBody Motorista motorista){

        try{
            Motorista motoristaBanco = motoristaRepository.findById(id).orElse(null);
            if(motoristaBanco!= null){
                motoristaBanco.setStatus(motorista.getStatus());
                motoristaBanco.setNome(motorista.getNome());
                motoristaBanco.setCnh(motorista.getCnh());
                motoristaBanco.setTelefone(motorista.getTelefone());
                motoristaRepository.save(motoristaBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        }catch (RuntimeException e){
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Motorista motoristaBanco = motoristaRepository.findById(id).orElse(null);
        if(motoristaBanco!= null){
            motoristaBanco.setStatus(EnumStatusMotorista.EXCLUIDO);
            motoristaRepository.save(motoristaBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}

