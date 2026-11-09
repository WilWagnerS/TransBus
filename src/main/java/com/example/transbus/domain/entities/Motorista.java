package com.example.transbus.domain.entities;

import com.example.transbus.application.DTOs.EnumStatusMotorista;
import com.example.transbus.application.DTOs.MotoristaRequest;
import com.example.transbus.domain.valueobject.Endereco;
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

    @Embedded
    private Endereco endereco;

    @Enumerated(EnumType.STRING)
    private EnumStatusMotorista status = EnumStatusMotorista.EM_EXPEDIENTE;

    // Multi-empresa: todo motorista pertence à empresa de quem o cadastrou
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "empresa_id", referencedColumnName = "id")
    private Empresa empresa;

    public Motorista(MotoristaRequest motoristaRequest) {
        this.setNome(motoristaRequest.nome());
        this.setCnh(motoristaRequest.cnh());
        this.setTelefone(motoristaRequest.telefone());
    }
}