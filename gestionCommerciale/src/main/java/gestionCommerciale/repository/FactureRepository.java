package gestionCommerciale.repository;

import gestionCommerciale.entity.Facture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FactureRepository extends JpaRepository<Facture, Long> {
    Optional<Facture> findByUuid(String uuid);
}
