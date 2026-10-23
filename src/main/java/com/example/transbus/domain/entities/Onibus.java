package com.example.transbus.domain.entities;

import com.example.transbus.application.DTOs.EnumStatusOnibus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Onibus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String placa;
    private String modelo;
    private String capacidade;

    @Enumerated(EnumType.STRING)
    private EnumStatusOnibus status = EnumStatusOnibus.GARAGEM;
}

