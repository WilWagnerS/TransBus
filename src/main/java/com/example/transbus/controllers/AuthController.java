package com.example.transbus.controllers;

import com.example.transbus.DTOs.LoginRequest;
import com.example.transbus.DTOs.LoginResponse;
import com.example.transbus.repository.UsuarioRepository;
import com.example.transbus.services.TokenService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.HttpURLConnection;

@RestController
@RequestMapping("/auth")
@Tag(description = "Controller de autenticação!", name = "Autenticação")
public class AuthController {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UsuarioRepository usuarioRepository;


    @PostMapping("/login")
    @Operation(description = "Metodo de login", summary = "Autenticação de usuarios")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequestDTO){


        if(usuarioRepository.existsUsuarioByEmailAndSenha(
                loginRequestDTO.email(),
                loginRequestDTO.senha())){

            var token = tokenService.gerarToken(loginRequestDTO.email());
            //Gerar o token
            return ResponseEntity.ok(new LoginResponse(token));
        }
        return ResponseEntity.status(HttpURLConnection.HTTP_UNAUTHORIZED).build();
    }
}
