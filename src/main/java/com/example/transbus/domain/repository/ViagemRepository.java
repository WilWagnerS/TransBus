package com.example.transbus.domain.repository;

import com.example.transbus.application.DTOs.EnumStatusViagem;
import com.example.transbus.domain.entities.Viagem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ViagemRepository extends JpaRepository<Viagem, Long> {
    // Lista só as viagens da empresa (mesmo padrão do getUsuariosByEmpresa_Id)
    List<Viagem> getViagensByEmpresa_Id(Long empresaId);
    // Busca pelo id, mas só se a viagem for da empresa informada
    Optional<Viagem> findByIdAndEmpresa_Id(Long id, Long empresaId);
    // REGRA CENTRAL: existe outra viagem ATIVA do MOTORISTA que se sobrepõe ao período?
    // (inicioExistente < fimNovo  E  fimExistente > inicioNovo), ignorando a própria viagem (IdNot)
    boolean existsByMotorista_IdAndStatusInAndIdNotAndHorarioInicioLessThanAndHorarioFimGreaterThan(
            Long motoristaId, List<EnumStatusViagem> status, Long viagemIdIgnorar,
            LocalDateTime fimNovo, LocalDateTime inicioNovo);
    // Mesma checagem para o VEÍCULO
    boolean existsByVeiculo_IdAndStatusInAndIdNotAndHorarioInicioLessThanAndHorarioFimGreaterThan(
            Long veiculoId, List<EnumStatusViagem> status, Long viagemIdIgnorar,
            LocalDateTime fimNovo, LocalDateTime inicioNovo);
    // DIFERENCIAL: viagens de um veículo com determinado status
    List<Viagem> getViagensByVeiculo_IdAndStatus(Long veiculoId, EnumStatusViagem status);
}