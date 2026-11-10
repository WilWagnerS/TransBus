package com.example.transbus.infra.external;

import com.example.transbus.domain.interfaces.IViaCepExternalRepository;
import com.example.transbus.domain.valueobject.Endereco;
import com.example.transbus.infra.dto.ViaCepResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

// ADAPTADOR (infraestrutura): implementa a porta do domínio usando a API ViaCEP
@Component
public class ViaCepExternalRepository implements IViaCepExternalRepository {

    private final HttpClient httpClient = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10)).build();

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public Endereco buscarEnderecoViaCepPorCep(String cep) {
        var url = "https://viacep.com.br/ws/" + cep.replaceAll("[^0-9]", "") + "/json/";

        try {
            HttpRequest request = HttpRequest.newBuilder().uri(URI.create(url)).GET().build();
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() == 200) {
                ViaCepResponse viaCepResponse = objectMapper.readValue(response.body(), ViaCepResponse.class);
                if (viaCepResponse.getErro() != null && viaCepResponse.getErro()) {
                    throw new IllegalArgumentException("CEP invalido!");
                }

                // Converte o DTO da API externa (infra) para o objeto de valor do domínio
                return new Endereco(
                        viaCepResponse.getCep(),
                        viaCepResponse.getLogradouro(),
                        null, // número não vem do ViaCEP
                        viaCepResponse.getBairro(),
                        viaCepResponse.getLocalidade(),
                        viaCepResponse.getUf()
                );
            }

            throw new IllegalArgumentException("CEP invalido!");

        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao consultar o ViaCEP!", e);
        }
    }
}