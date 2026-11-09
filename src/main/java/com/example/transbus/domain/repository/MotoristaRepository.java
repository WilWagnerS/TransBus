package com.example.transbus.domain.repository;

import com.example.transbus.domain.entities.Motorista;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MotoristaRepository extends JpaRepository<Motorista, Long> {
    // Lista só os motoristas da empresa (mesmo padrão do getUsuariosByEmpresa_Id)
    List<Motorista> getMotoristasByEmpresa_Id(Long empresaId);
    // Busca pelo id, mas só se o motorista for da empresa informada
    Optional<Motorista> findByIdAndEmpresa_Id(Long id, Long empresaId);
}