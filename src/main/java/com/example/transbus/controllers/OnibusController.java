package com.example.transbus.controllers;

import com.example.transbus.DTOs.AtualizarStatusRequest;
import com.example.transbus.entities.EnumStatusOnibus;
import com.example.transbus.entities.Onibus;
import com.example.transbus.repository.OnibusRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/onibus")
@Tag(name = "Onibus",
        description = "Grupo de APIs responsavel por controlar a estrutura de criação e consulta de onibus do sistema!")
public class OnibusController {

    @Autowired
    private OnibusRepository onibusRepository;


    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de onibus!",
            description = "Metodo responsavel em efetuar a consulta de todos os onibus sem filtro!")
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(onibusRepository.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método responsável pela consulta de um ônibus pelo ID!")
    public ResponseEntity<Onibus> buscarPorId(@PathVariable Long id){

        Onibus onibusBanco = onibusRepository.findById(id).orElse(null);
        if(onibusBanco != null){
            return ResponseEntity.ok(onibusBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criação de onibus!",
            description = "Metodo responsavel em efetuar a criação de novos onibus!")
    public ResponseEntity<Onibus> criar(@RequestBody Onibus onibus){

        var onibusBanco = onibusRepository.save(onibus);
        return ResponseEntity.ok(onibusBanco);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método responsável pela alteração do status do ônibus!")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest){

        //onibusBanco pra entender que é o onibus que veio do banco.
        Onibus onibusBanco = onibusRepository.findById(id).orElse(null);
        if(onibusBanco!= null){
            onibusBanco.setStatus(statusRequest.statusOnibus());
            onibusRepository.save(onibusBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método responsável pela atualização dos dados do ônibus!")
    public ResponseEntity<Onibus> atualizar(@PathVariable Long id, @RequestBody Onibus onibus){

        try{
            Onibus onibusBanco = onibusRepository.findById(id).orElse(null);
            if(onibusBanco!= null){
                onibusBanco.setStatus(onibus.getStatus());
                onibusBanco.setPlaca(onibus.getPlaca());
                onibusBanco.setModelo(onibus.getModelo());
                onibusBanco.setCapacidade(onibus.getCapacidade());
                onibusRepository.save(onibusBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        }catch (RuntimeException e){
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método responsável pela exclusão do ônibus!")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Onibus onibusBanco = onibusRepository.findById(id).orElse(null);
        if(onibusBanco!= null){
            onibusBanco.setStatus(EnumStatusOnibus.EXCLUIDO);
            onibusRepository.save(onibusBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
