package com.example.transbus.controllers;

import com.example.transbus.DTOs.AlterarSenhaRequest;
import com.example.transbus.DTOs.AtualizarStatusRequest;
import com.example.transbus.entities.EnumStatusUsuario;
import com.example.transbus.entities.Usuario;
import com.example.transbus.repository.UsuarioRepository;
import com.example.transbus.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios",
        description = "Grupo de APIs responsavel por controlar a estrutura de criação e consulta de usuarios do sistema!")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenService tokenService;

    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de usuarios!",
            description = "Metodo responsavel em efetuar a consulta de todos os usuarios sem filtro!")
    public ResponseEntity<?> listarTodos(){

        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método responsável pela consulta de um usuário pelo ID!")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id){

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if(usuarioBanco!= null){
            return ResponseEntity.ok(usuarioBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criação de usuarios!",
            description = "Metodo responsavel em efetuar a criação de novos usuarios!")
    public ResponseEntity<Usuario> criar(@RequestBody Usuario usuario){

        var usuarioBanco = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioBanco);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método responsável pela alteração do status do usuário!")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusRequest statusRequest){

        //usuarioBanco pra entender que é o usuario que veio do banco.
        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if(usuarioBanco!= null){
            usuarioBanco.setStatus(statusRequest.statusUsuario());
            usuarioRepository.save(usuarioBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método responsável pela atualização dos dados do usuário!")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario usuario){

        try{
            Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
            if(usuarioBanco!= null){
                usuarioBanco.setStatus(usuario.getStatus());
                usuarioBanco.setNome(usuario.getNome());
                usuarioBanco.setCpf(usuario.getCpf());
                usuarioBanco.setEmail(usuario.getEmail());
                usuarioBanco.setSenha(usuario.getSenha());
                usuarioRepository.save(usuarioBanco);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.notFound().build();
        }catch (RuntimeException e){
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método responsável pela exclusão do usuário!")
    public ResponseEntity<Void> excluir(@PathVariable Long id){

        Usuario usuarioBanco = usuarioRepository.findById(id).orElse(null);
        if(usuarioBanco!= null){
            usuarioBanco.setStatus(EnumStatusUsuario.EXCLUIDO);
            usuarioRepository.save(usuarioBanco);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/alterar/senha")
    @Operation(summary = "Método responsável por alterar a senha do usuário!")
    public ResponseEntity<Void> alterarSenha(@RequestHeader("Authorization") String authorization,
                                             @RequestBody AlterarSenhaRequest alterarSenhaRequest) {

        String token = authorization.replace("Bearer ", "");
        var jwtValidador = tokenService.verificarToken(token);

        String email = jwtValidador.getSubject();
        var usuarioOptional = usuarioRepository.findByEmail(email);

        if(usuarioOptional.isEmpty()){
            return ResponseEntity.notFound().build();
        }
        var usuario = usuarioOptional.get();

        if(!usuario.getSenha().equals(alterarSenhaRequest.senhaAtual())){
            return ResponseEntity.badRequest().build();
        }

        usuario.setSenha(alterarSenhaRequest.novaSenha());
        usuarioRepository.save(usuario);

        return ResponseEntity.ok().build();
    }
}
