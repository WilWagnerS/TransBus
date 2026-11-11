package com.example.transbus.domain.repository;

import com.example.transbus.domain.entities.MarcaVeiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MarcaVeiculoRepository extends JpaRepository<MarcaVeiculo, Long> {
}