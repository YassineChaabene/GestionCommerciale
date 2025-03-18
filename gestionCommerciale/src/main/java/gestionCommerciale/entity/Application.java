package gestionCommerciale.entity;

import java.time.LocalDate;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;


@Entity
@Table(name ="applications")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Application {
	
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String nom;
	
	@Column(nullable = false)
	private String description;
	
	@Column(nullable = false)
	private LocalDate dateAjout = LocalDate.now();
	
	@Column(nullable = false)
	private Double prix;
	
	@PrePersist
	@PreUpdate
	private void setDefaultDateAjout() {
	    if (this.dateAjout == null) {
	        this.dateAjout = LocalDate.now();
	    }
	}
	
	 @ManyToMany(mappedBy = "applications")
	    private Set<Client> clients;
	

}
