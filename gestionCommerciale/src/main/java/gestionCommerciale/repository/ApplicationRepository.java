package gestionCommerciale.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import gestionCommerciale.entity.Application;

@Repository
public interface ApplicationRepository extends JpaRepository<Application , Long> {
	Optional<Application> findByNom(String nom);
	Optional<Application> findByUuid(String uuid);

}
