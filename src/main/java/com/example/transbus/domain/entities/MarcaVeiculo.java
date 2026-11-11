package com.example.transbus.domain.entities;

import com.example.transbus.application.DTOs.CriarMarcaVeiculoRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "marca_veiculo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarcaVeiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String tipo;
    private String ano;

    public MarcaVeiculo(CriarMarcaVeiculoRequest marcaVeiculoRequest) {
        this.setNome(marcaVeiculoRequest.nome());
        this.setTipo(marcaVeiculoRequest.tipo());
        this.setAno(marcaVeiculoRequest.ano());
    }
}