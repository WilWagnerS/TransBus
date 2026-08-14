package com.example.transbus.controllers;
import com.example.transbus.entities.Usuario;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @GetMapping
    public ResponseEntity<?> listarTodos(){

        List<Usuario> usuarios =
                List.of(new Usuario(1L,
                        "Wagner",
                        "09305884954",
                        "123456",
                        "wilianwagnerdossantos@gmail.com"));

        return ResponseEntity.ok(usuarios);
    }

}
