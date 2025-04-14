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
				.uuid(entity.getUuid())
				.id(entity.getId())
				.intitule(entity.getIntitule())
				.description(entity.getDescription())
				.dateExploitation(entity.getDateExploitation())
				.abreviation(entity.getAbreviation())
				.responsable(entity.getResponsable())
				.build();
	}
	
	// convert client dto to entity
		public static Application toEntity( ApplicationDto appDto) {
			if (appDto==null) {
				return null;
			}
			return Application.builder()
					.uuid(appDto.getUuid())
					.id(appDto.getId())
					.intitule(appDto.getIntitule())
					.description(appDto.getDescription())
					.dateExploitation(appDto.getDateExploitation())
					.abreviation(appDto.getAbreviation())
					.responsable(appDto.getResponsable())
					.build();
				
		}
	
}
