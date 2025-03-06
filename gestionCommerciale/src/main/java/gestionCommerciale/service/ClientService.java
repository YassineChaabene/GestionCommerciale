package gestionCommerciale.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import gestionCommerciale.convert.ClientConvert;
import gestionCommerciale.dto.ClientDto;
import gestionCommerciale.entity.Client;
import gestionCommerciale.repository.ClientRepo;



@Service
public class ClientService {
	
	  
	@Autowired
	private ClientRepo clientRepo;
	
	public ClientDto getClient(Integer id) {
		Optional<Client> client=this.clientRepo.findById(id);
		if (client.isPresent()) {
			return ClientConvert.toDto(client.get());
        }
		else {
            return null;
		}
	}
	
	public ClientDto getClientByUuid(String uuid) {
	    Optional<Client> client = clientRepo.findByUuid(uuid);
		if (client.isPresent()) {
			return ClientConvert.toDto(client.get());
        }
		else {
            return null;
		}
	}

	
	 public ClientDto save(ClientDto clientDto) {
	        Client client = ClientConvert.toEntity(clientDto);
	        Client savedClient = clientRepo.save(client);
	        return ClientConvert.toDto(savedClient);
	    }
	
	public void delete(Integer id) {
		this.clientRepo.deleteById(id);
	}
	
	public ClientDto updateClient(ClientDto clientDto) {
	    Optional<Client> clientOpt = clientRepo.findByUuid(clientDto.getUuid());

	    if (clientOpt.isPresent()) {
	        Client existingClient = clientOpt.get();
	        Client updatedClient = ClientConvert.toEntity(clientDto);
	        updatedClient.setId(existingClient.getId()); // Keep the same ID
	        updatedClient.setUuid(existingClient.getUuid()); // Ensure UUID remains the same

	        // Save updated client
	        Client savedClient = clientRepo.save(updatedClient);

	        return ClientConvert.toDto(savedClient);
	    } else {
	        throw new RuntimeException("Client not found with UUID: " + clientDto.getUuid());
	    }
	}

	
	public List<Client> getAllClients(){
		return this.clientRepo.findAll();
	}

}
