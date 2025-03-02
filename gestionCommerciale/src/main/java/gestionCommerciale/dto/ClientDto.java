package gestionCommerciale.dto;



import gestionCommerciale.entity.Client;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientDto {
	private String uuid;
	private Integer id;
	private Integer code;
	private String intutile;
	private String telephone;
	private String email;
	private String adresse;
	
	
	public static ClientDto toDto(Client entity) {
		return ClientDto.builder()
				.id(entity.getId())
				.code(entity.getCode())
				.intutile(entity.getIntutile())
				.telephone(entity.getTelephone())
				.email(entity.getEmail())
				.adresse(entity.getAdresse())
				.uuid(entity.getUuid())
				.build();
	}
	
	public static Client toEntity(ClientDto clientDto) {
	    return Client.builder()
	            .id(clientDto.getId())
	            .code(clientDto.getCode())
	            .intutile(clientDto.getIntutile())
	            .telephone(clientDto.getTelephone())
	            .email(clientDto.getEmail())
	            .adresse(clientDto.getAdresse())
	            .uuid(clientDto.getUuid())
	            .build();
	}	

}
