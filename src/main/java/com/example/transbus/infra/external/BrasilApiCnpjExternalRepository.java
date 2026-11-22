package com.example.transbus.infra.external;

import com.example.transbus.domain.entities.Empresa;
import com.example.transbus.domain.interfaces.IConsultaCnpjExternalRepository;
import com.example.transbus.infra.dto.BrasilApiCnpjResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

// ADAPTADOR (infraestrutura): implementa a porta do domínio usando a BrasilAPI
@Component
public class BrasilApiCnpjExternalRepository implements IConsultaCnpjExternalRepository {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10)).build();

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Empresa buscarEmpresaPorCnpj(String cnpj) {
        var url = "https://brasilapi.com.br/api/cnpj/v1/" + cnpj;

        try {
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                BrasilApiCnpjResponse dados = objectMapper.readValue(response.body(), BrasilApiCnpjResponse.class);

                // Converte o DTO da API externa (infra) para a entidade do domínio
                Empresa empresa = new Empresa();
                empresa.setCnpj(dados.getCnpj());
                empresa.setRazaoSocial(dados.getRazaoSocial());
                empresa.setNomeFantasia(dados.getNomeFantasia());
                return empresa;
            }

            if (response.statusCode() == 400 || response.statusCode() == 404) {
                throw new IllegalArgumentException("CNPJ inválido ou não encontrado!");
            }

            throw new IllegalArgumentException("Erro ao consultar o CNPJ!");

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao consultar a BrasilAPI!", e);
        }
    }
}