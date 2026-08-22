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
    public Long id;

    public String origem;

    public String destino;

    public LocalDateTime horarioInicio;

    public LocalDateTime horarioFim;

    @Enumerated(EnumType.STRING)
    public EnumStatusViagem status;

    @ManyToOne
    @JoinColumn(name = "motorista_id")
    public Motorista motorista;

    @ManyToOne
    @JoinColumn(name = "onibus_id")
    public Onibus onibus;

}
