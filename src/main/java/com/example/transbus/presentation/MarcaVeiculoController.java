package com.example.transbus.presentation;

import com.example.transbus.application.DTOs.CriarMarcaVeiculoRequest;
import com.example.transbus.application.DTOs.CriarMarcaVeiculoResponse;
import com.example.transbus.application.DTOs.MarcaVeiculoResponse;
import com.example.transbus.application.services.MarcaVeiculoService;
import com.example.transbus.domain.repository.MarcaVeiculoRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/marca")
@Tag(name = "Marca Veiculo", description = "Endpoints responsáveis pelo gerenciamento das marcas de onibus do sistema TransBus, permitindo consultar e cadastrar.")
public class MarcaVeiculoController {

    @Autowired
    private MarcaVeiculoRepository marcaVeiculoRepository;

    @Autowired
    private MarcaVeiculoService marcaVeiculoService;

    @GetMapping
    @Operation(summary = "Método de consulta de listas de marcas!", description = "Método responsável em efetuar a consulta de todos as marcas!")
    public ResponseEntity<List<MarcaVeiculoResponse>> ListaTodos(){

        return ResponseEntity.ok(marcaVeiculoService.listarTodasMarcasVeiculoTable());
    }

   @PostMapping("/criar")
    @Operation(summary = "Método de criação de marcas!", description ="Método responsável em efetuar a criação de novas marcas!")
    public ResponseEntity<CriarMarcaVeiculoResponse> criarMarca(@RequestBody CriarMarcaVeiculoRequest criarMarcaVeiculoRequest){
        try{
            CriarMarcaVeiculoResponse respostaSalvar = marcaVeiculoService.criarMarcaVeiculo(criarMarcaVeiculoRequest);
            return ResponseEntity.ok(respostaSalvar);
        }catch (RuntimeException e){
            return ResponseEntity.badRequest().build();
        }
    }
}
