package com.example.transbus.application.services;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.example.transbus.domain.entities.Token;
import com.example.transbus.application.DTOs.LoginRequest;
import com.example.transbus.application.DTOs.UsuarioLogado;
import com.example.transbus.domain.repository.TokenRepository;
import com.example.transbus.domain.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${spring.secret}")
    private String secret;

    @Value("${spring.expiracao}")
    private Long expiracao;

    @Value("${spring.emissor}")
    private String emissor;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TokenRepository tokenRepository;

    public String gerarToken(LoginRequest loginResquestDto){

        Algorithm algorithm = Algorithm.HMAC256(secret);

        var usuario = usuarioRepository.findAll()
                .stream().filter( u-> u.getEmail().equals(loginResquestDto.email()))
                .findFirst().orElse(null);

        String token = JWT.create()
                .withIssuer(emissor)
                .withSubject(loginResquestDto.email())
                .withExpiresAt(getDataExpiracao())
                .sign(algorithm);

        tokenRepository.save(new Token(token, usuario));

        return token;
    }

    public UsuarioLogado verificarToken(String token) throws JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(secret);

        JWTVerifier verificador = JWT.require(algorithm).withIssuer(emissor).build();

        verificador.verify(token);

        var tokenBanco = tokenRepository.findTokenByToken(token).orElse(null);
        if(tokenBanco==null){
            throw  new IllegalArgumentException("Token Invalido!");
        }
        return new UsuarioLogado(tokenBanco.getUsuario());

    }

    private Instant getDataExpiracao(){
        var dataAtual = LocalDateTime.now();
        var dataFutura = dataAtual.plusMinutes(expiracao);

        return dataFutura.toInstant(ZoneOffset.of("-03:00"));
    }

}