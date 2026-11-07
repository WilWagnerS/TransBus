package com.example.transbus.domain.entities;

import com.example.transbus.application.DTOs.EnumStatusVeiculo;
import com.example.transbus.application.DTOs.EnumTipoVeiculo;
import com.example.transbus.application.DTOs.VeiculoRequest;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Veiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String placa;
    private String modelo;
    private String capacidade; // Ex.: "44 passageiros" ou "12 toneladas"

    @Enumerated(EnumType.STRING)
    private EnumTipoVeiculo tipo;

    @Enumerated(EnumType.STRING)
    private EnumStatusVeiculo status = EnumStatusVeiculo.GARAGEM;

    // Multi-empresa: todo veículo pertence à empresa de quem o cadastrou
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id")
    private Empresa empresa;

    public Veiculo(VeiculoRequest veiculoRequest) {
        this.setPlaca(veiculoRequest.placa());
        this.setModelo(veiculoRequest.modelo());
        this.setCapacidade(veiculoRequest.capacidade());
        this.setTipo(veiculoRequest.tipo());
    }
}