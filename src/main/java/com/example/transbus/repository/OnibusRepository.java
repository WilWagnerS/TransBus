package com.example.transbus.repository;

import com.example.transbus.entities.Onibus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OnibusRepository extends JpaRepository<Onibus, Long> {
}
