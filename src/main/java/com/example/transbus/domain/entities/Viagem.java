package com.example.transbus.domain.entities;

import com.example.transbus.application.DTOs.EnumStatusViagem;
import com.example.transbus.application.DTOs.ViagemRequest;
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

    // Muitas viagens -> um motorista
    @ManyToOne
    @JoinColumn(name = "motorista_id")
    private Motorista motorista;

    // Muitas viagens -> um veículo
    @ManyToOne
    @JoinColumn(name = "veiculo_id")
    private Veiculo veiculo;

    // Multi-empresa: toda viagem pertence à empresa de quem a cadastrou
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id")
    private Empresa empresa;

    public Viagem(ViagemRequest viagemRequest) {
        this.setOrigem(viagemRequest.origem());
        this.setDestino(viagemRequest.destino());
        this.setHorarioInicio(viagemRequest.horarioInicio());
        this.setHorarioFim(viagemRequest.horarioFim());
    }
}