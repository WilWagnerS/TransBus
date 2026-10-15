package com.example.transbus.presentation;

import com.example.transbus.application.DTOs.CriarMarcaRequest;
import com.example.transbus.application.DTOs.CriarMarcaResponse;
import com.example.transbus.application.DTOs.MarcaResponse;
import com.example.transbus.application.services.MarcaService;
import com.example.transbus.domain.repository.MarcaRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/marca")
@Tag(name = "Marca", description = "Endpoints responsáveis pelo gerenciamento das marcas de onibus do sistema TransBus, permitindo consultar e cadastrar.")
public class MarcaController {

    @Autowired
    private MarcaRepository marcaRepository;

    @Autowired
    private MarcaService marcaService;

    @GetMapping
    @Operation(summary = "Método de consulta de listas de marcas!", description = "Método responsável em efetuar a consulta de todos as marcas!")
    public ResponseEntity<List<MarcaResponse>> ListaTodos(){

        return ResponseEntity.ok(marcaService.listarTodasMarcasTable());
    }

   @PostMapping("/criar")
    @Operation(summary = "Método de criação de marcas!", description ="Método responsável em efetuar a criação de novas marcas!")
    public ResponseEntity<CriarMarcaResponse> criarMarca(@RequestBody CriarMarcaRequest criarMarcaRequest){
        try{
            CriarMarcaResponse respostaSalvar = marcaService.criarMarca(criarMarcaRequest);
            return ResponseEntity.ok(respostaSalvar);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
