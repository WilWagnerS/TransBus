package com.example.transbus.entities;

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
    public Long id;

    public String placa;

    public String modelo;

    public String capacidade;

    @Enumerated(EnumType.STRING)
    public EnumStatusOnibus status;

}

