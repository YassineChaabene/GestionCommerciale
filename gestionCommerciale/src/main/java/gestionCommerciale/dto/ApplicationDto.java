package gestionCommerciale.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDto {
	
	
	
	private Long id;
	private String nom;
	private String description;
	private LocalDate dateAjout ;
	private Double prix;

}
