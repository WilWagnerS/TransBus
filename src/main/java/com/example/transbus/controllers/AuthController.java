package com.example.transbus.controllers;

import com.example.transbus.DTOs.LoginRequestDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
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

    @PostMapping("/login")
    @Operation(description = "Metodo de login", summary = "Autenticação de usuarios")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO loginRequestDTO){

        if(loginRequestDTO.email().equals("string")&& loginRequestDTO.senha().equals("string")){
            //Gerar o token
            return ResponseEntity.ok("");
        }
        return ResponseEntity.status(HttpURLConnection.HTTP_UNAUTHORIZED).build();
    }
}
