package gestionCommerciale.convert;

import gestionCommerciale.dto.ApplicationDto;
import gestionCommerciale.entity.Application;

public class ApplicationConvert {
	
	// convert client entity to dto
	public static ApplicationDto toDto( Application entity) {
		if (entity==null) {
			return null;
		}
		return ApplicationDto.builder()
				.id(entity.getId())
				.nom(entity.getNom())
				.description(entity.getDescription())
				.dateAjout(entity.getDateAjout())
				.prix(entity.getPrix())
				.build();
	}
	
	// convert client dto to entity
		public static Application toEntity( ApplicationDto appDto) {
			if (appDto==null) {
				return null;
			}
			return Application.builder()
					.id(appDto.getId())
					.nom(appDto.getNom())
					.description(appDto.getDescription())
					.dateAjout(appDto.getDateAjout())
					.prix(appDto.getPrix())
					.build();
				
		}
	
}
