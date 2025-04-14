package gestionCommerciale.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConventionDto {
	 private String uuid;
	 private Long id;
	 private String code;
	 private String status;
	 private LocalDate startDate;
	 private LocalDate endDate;
	 private boolean archived;
	 private Integer clientId;
	 private Long applicationId;
}