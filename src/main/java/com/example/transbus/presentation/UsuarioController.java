package com.example.transbus.presentation;

import com.example.transbus.application.DTOs.*;
import com.example.transbus.application.services.UsuarioService;
import com.example.transbus.application.DTOs.EnumStatusUsuario;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
@Tag(name = "Usuarios",
        description = "Grupo de APIs responsavel por controlar a estrutura de criação e consulta de usuarios do sistema!")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    @Operation(summary = "Metodo de consulta de lista de usuarios!",
            description = "Metodo responsavel em efetuar a consulta de todos os usuarios da empresa do usuario logado!")
    public ResponseEntity<List<UsuarioResponse>> listarTodos() {

        return ResponseEntity.ok(usuarioService.listarTodosUsuariosTable());
    }

    @PostMapping("/admin")
    @Operation(summary = "Metodo de criação de administrador!",
            description = "Metodo responsavel pela criação da empresa e do administrador (ou do usuario global). Utilizado pela aplicação JavaFX e protegido pela secretKey.")
    public ResponseEntity<CriarAdminResponse> criarAdmin(@RequestBody CriarAdminRequest criarAdminRequest) {
        try {
            CriarAdminResponse respostaSalvar = usuarioService.criarAdmin(criarAdminRequest);

            return ResponseEntity.ok(respostaSalvar);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "Método responsável pela consulta de um usuário pelo ID!")
    public ResponseEntity<UsuarioResponse> buscarPorId(@PathVariable Long id) {
        UsuarioResponse usuarioBanco = usuarioService.buscarPorId(id);
        if (usuarioBanco != null) {

            return ResponseEntity.ok(usuarioBanco);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Metodo de criação de usuarios!",
            description = "Metodo responsavel em efetuar a criação de novos usuarios (funcionarios) na empresa do usuario logado!")
    public ResponseEntity<?> criar(@RequestBody UsuarioRequest usuario) {

        try {
            UsuarioResponse usuarioBanco = usuarioService.salvarUsuario(usuario, 0L);

            return ResponseEntity.ok(usuarioBanco);
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Método responsável pela alteração do status do usuário!")
    public ResponseEntity<Void> atualizarStatus(@PathVariable Long id, @RequestBody AtualizarStatusUsuarioRequest statusRequest) {

        var atualizarUsuario = usuarioService.atualizarStatus(statusRequest.statusUsuario(), id);

        if (atualizarUsuario) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    @Operation(summary = "Método responsável pela atualização dos dados do usuário!")
    public ResponseEntity<?> atualizar(@PathVariable Long id, @RequestBody UsuarioRequest usuario) {
        try {
            UsuarioResponse usuarioBanco = usuarioService.salvarUsuario(usuario, id);
            return ResponseEntity.ok(usuarioBanco);
        } catch (Exception e) {

            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/excluir")
    @Operation(summary = "Método responsável pela exclusão do usuário!")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {

        var atualizarUsuario = usuarioService.atualizarStatus(EnumStatusUsuario.EXCLUIDO, id);

        if (atualizarUsuario) {
            return ResponseEntity.ok().build();
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/buscarusuariologado")
    @Operation(summary = "Método de consulta do usuário logado!",
            description = "Método responsável em retornar os dados do usuário dono do token (usado pelo front logo após o login)!")
    public ResponseEntity<UsuarioResponse> buscarUsuarioLogado(){
        return ResponseEntity.ok(usuarioService.BuscarUsuarioLogado());
    }
}
