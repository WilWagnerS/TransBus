package com.example.transbus.presentation;

import com.example.transbus.application.DTOs.*;
import com.example.transbus.application.services.UsuarioService;
import com.example.transbus.application.DTOs.EnumStatusUsuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public ResponseEntity<List<UsuarioResponse>> listarTodos(){

        return  ResponseEntity.ok(usuarioService.listarTodosUsuariosTable());
    }


    //POSTMAPPING CRIAÇÃO DE ADMIN
    @PostMapping("/admin")
    public ResponseEntity<CriarAdminResponse> criarAdmin(@RequestBody CriarAdminRequest criarAdminRequest){
        try{
            CriarAdminResponse respostaSalvar = usuarioService.criarAdmin(criarAdminRequest);

            return ResponseEntity.ok(respostaSalvar);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }


    //GETMAPPING POR ID
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable Long id){
        UsuarioResponse usuarioBanco = usuarioService.buscarPorId(id);
        if(usuarioBanco!= null ){

            return  ResponseEntity.ok(usuarioBanco);
        }
        return  ResponseEntity.notFound().build();
    }


    //POSTMAPPING CRIAÇÃO DE USUARIO
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<?> criar(@RequestBody UsuarioRequest usuario){

        try {
            UsuarioResponse usuarioBanco = usuarioService.salvarUsuario(usuario,0L);

            return ResponseEntity.ok(usuarioBanco);
        }catch (Exception e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //PATCHMAPPING ATUALIZAR STATUS - ATUALIZAÇÃO UNITARIA
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusUsuarioRequest statusRequest){

        var atualizarUsuario = usuarioService.atualizarStatus(statusRequest.statusUsuario(),id);

        if(atualizarUsuario){
            return ResponseEntity.ok().build();
        }

        return  ResponseEntity.notFound().build();
    }


    //PUTMAPPING ATUALIZAÇÃO DE USUARIO
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody UsuarioRequest usuario){
        try {
            UsuarioResponse usuarioBanco = usuarioService.salvarUsuario(usuario,id);
            return ResponseEntity.ok(usuarioBanco);
        }catch (Exception e){

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    //DELETEMAPPING - EXCLUSÃO DE USUARIO
    @DeleteMapping("/{id}/excluir")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        var atualizarUsuario = usuarioService.atualizarStatus(EnumStatusUsuario.EXCLUIDO,id);

        if(atualizarUsuario){
            return ResponseEntity.ok().build();
        }

        return  ResponseEntity.notFound().build();
    }
}