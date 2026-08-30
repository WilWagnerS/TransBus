package com.example.transbus.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Motorista {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String cnh;

    private String telefone;

    @Enumerated(EnumType.STRING)
    private EnumStatusMotorista status = EnumStatusMotorista.EM_EXPEDIENTE;

}
