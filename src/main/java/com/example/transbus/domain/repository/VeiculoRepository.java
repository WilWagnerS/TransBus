package com.example.transbus.domain.repository;

import com.example.transbus.domain.entities.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Long> {

    // Lista só os veículos da empresa (mesmo padrão do getUsuariosByEmpresa_Id)
    List<Veiculo> getVeiculosByEmpresa_Id(Long empresaId);

    // Busca pelo id, mas só se o veículo for da empresa informada
    Optional<Veiculo> findByIdAndEmpresa_Id(Long id, Long empresaId);
}