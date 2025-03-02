package gestionCommerciale.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gestionCommerciale.entity.Client;



@Repository
public interface ClientRepo extends JpaRepository<Client , Integer> {
	Optional<Client> findByUuid(String uuid);

}
