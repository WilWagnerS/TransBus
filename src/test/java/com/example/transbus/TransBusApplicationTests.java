package com.example.transbus;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

// Indica que este teste deve iniciar o contexto completo
// da aplicação Spring Boot antes de executar os testes.
// Assim, o Spring verifica se a aplicação consegue ser carregada
// corretamente.
@SpringBootTest
class TransBusApplicationTests {

    // Indica que este método é um teste automatizado.
    @Test
    void contextLoads() {

        // O método está vazio de propósito.
        //
        // O objetivo deste teste é simplesmente verificar se o
        // contexto do Spring Boot consegue ser inicializado sem erros.
        //
        // Se a aplicação não conseguir carregar alguma configuração,
        // Bean, Repository, Controller ou outro componente necessário,
        // o teste irá falhar.
    }

}
