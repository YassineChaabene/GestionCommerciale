package gestionCommerciale.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import gestionCommerciale.convert.ClientConvert;
import gestionCommerciale.dto.ClientDto;
import gestionCommerciale.entity.Client;
import gestionCommerciale.repository.ClientRepo;



@Service
public class ClientService {
    
    private static final Logger logger = LoggerFactory.getLogger(ClientService.class);

    @Autowired
    private ClientRepo clientRepo;

    public ClientDto getClient(Integer id) {
        logger.info("Fetching client with ID: {}", id);
        Optional<Client> client = this.clientRepo.findById(id);
        
        if (client.isPresent()) {
            logger.info("Client found: {}", client.get());
            return ClientConvert.toDto(client.get());
        } else {
            logger.warn("Client not found with ID: {}", id);
            return null;
        }
    }

    public ClientDto getClientByUuid(String uuid) {
        logger.info("Fetching client with UUID: {}", uuid);
        Optional<Client> client = clientRepo.findByUuid(uuid);
        
        if (client.isPresent()) {
            logger.info("Client found: {}", client.get());
            return ClientConvert.toDto(client.get());
        } else {
            logger.warn("Client not found with UUID: {}", uuid);
            return null;
        }
    }

    public ClientDto save(ClientDto clientDto) {
        logger.info("Saving new client: {}", clientDto);
        Client client = ClientConvert.toEntity(clientDto);
        Client savedClient = clientRepo.save(client);
        logger.info("Client saved successfully with ID: {}", savedClient.getId());
        return ClientConvert.toDto(savedClient);
    }

    public void delete(Integer id) {
        logger.warn("Deleting client with ID: {}", id);
        clientRepo.deleteById(id);
        logger.info("Client with ID {} deleted successfully", id);
    }

    public ClientDto updateClient(ClientDto clientDto) {
        logger.info("Updating client: {}", clientDto);
        Optional<Client> clientOpt = clientRepo.findByUuid(clientDto.getUuid());

        if (clientOpt.isPresent()) {
            Client existingClient = clientOpt.get();
            Client updatedClient = ClientConvert.toEntity(clientDto);
            updatedClient.setId(existingClient.getId()); // Keep the same ID
            updatedClient.setUuid(existingClient.getUuid()); // Ensure UUID remains the same

            Client savedClient = clientRepo.save(updatedClient);
            logger.info("Client updated successfully: {}", savedClient);
            return ClientConvert.toDto(savedClient);
        } else {
            logger.error("Client not found with UUID: {}", clientDto.getUuid());
            throw new RuntimeException("Client not found with UUID: " + clientDto.getUuid());
        }
    }

    public List<Client> getAllClients() {
        logger.info("Fetching all clients");
        List<Client> clients = clientRepo.findAll();
        logger.info("Total clients found: {}", clients.size());
        return clients;
    }
}