package gestionCommerciale.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import gestionCommerciale.entity.Convention;

public interface ConventionRepository extends JpaRepository<Convention, Long> {
    List<Convention> findByArchivedFalse();
    List<Convention> findByEndDateBefore(LocalDate date); // For notifications
    Optional<Convention> findByUuid(String uuid);
}
