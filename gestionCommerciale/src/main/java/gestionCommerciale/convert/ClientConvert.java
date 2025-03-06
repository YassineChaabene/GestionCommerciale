package gestionCommerciale.convert;

import gestionCommerciale.dto.ClientDto;
import gestionCommerciale.entity.Client;

public class ClientConvert {

    // Convert Client entity to ClientDto
    public static ClientDto toDto(Client entity) {
        if (entity == null) {
            return null;
        }
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

    // Convert ClientDto to Client entity
    public static Client toEntity(ClientDto clientDto) {
        if (clientDto == null) {
            return null;
        }
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
