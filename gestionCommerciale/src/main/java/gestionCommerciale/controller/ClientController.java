package gestionCommerciale.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gestionCommerciale.dto.ClientDto;
import gestionCommerciale.entity.Client;
import gestionCommerciale.service.ClientService;


@RestController
@RequestMapping("/clients")
public class ClientController {
	
	@Autowired
	private ClientService clientService;
	
	@GetMapping("/get-client")
	public ClientDto getClient(@RequestParam Integer id){
		return clientService.getClient(id);
	}
	
	 @PostMapping("/save-client")
	    public ClientDto save(@RequestBody ClientDto clientDto) {
	        return clientService.save(clientDto);
	    }
	
	@GetMapping("/delete-client")
	public void delete(@RequestParam Integer id) {
		clientService.delete(id);
	}
	
	@PostMapping("/update-client")
    public ClientDto update(@RequestBody ClientDto clientDto) {
        return clientService.updateClient(clientDto);
    }
	
	@GetMapping("/get-all-client")
	public List<Client> getAllClients(){
		return clientService.getAllClients();
	}
	@GetMapping("/get-client-by-uuid")
	public ClientDto getClientByUuid(@RequestParam String uuid) {
	    return clientService.getClientByUuid(uuid);
	}

	
}


