package com.example.transbus.domain.entities;

import com.example.transbus.application.DTOs.CriarMarcaRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Marca{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String tipo;
    private String ano;

    public Marca(CriarMarcaRequest marcaRequest){
        this.setNome(marcaRequest.nome());
        this.setTipo(marcaRequest.tipo());
        this.setAno(marcaRequest.ano());
    }
}
