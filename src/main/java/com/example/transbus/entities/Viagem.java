package com.example.transbus.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Viagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String origem;

    private String destino;

    private LocalDateTime horarioInicio;

    private LocalDateTime horarioFim;

    @Enumerated(EnumType.STRING)
    private EnumStatusViagem status = EnumStatusViagem.AGENDADA;

    @ManyToOne
    @JoinColumn(name = "motorista_id")
    private Motorista motorista;

    @ManyToOne
    @JoinColumn(name = "onibus_id")
    private Onibus onibus;

}
