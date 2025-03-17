package gestionCommerciale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import gestionCommerciale.dto.ApplicationDto;
import gestionCommerciale.entity.Application;
import gestionCommerciale.service.ApplicationService;

@RestController
@RequestMapping("/applications")
public class ApplicationController {
	
	@Autowired
	private ApplicationService appService;
	
	@GetMapping("/get-application")
	public ResponseEntity<ApplicationDto> getApplication(@RequestParam Long id){
		ApplicationDto appDto= appService.getApplication(id);
		if(appDto != null) {
			 return ResponseEntity.ok(appDto);
        } else {
            return ResponseEntity.notFound().build();
        }
	}
	
	@GetMapping("/get-all-applications")
    public ResponseEntity<List<Application>> getAllApplications() {
        List<Application> applications = appService.getAllApplications();
        if (!applications.isEmpty()) {
            return ResponseEntity.ok(applications);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
	
	@PostMapping("/save-application")
    public ResponseEntity<ApplicationDto> save(@RequestBody ApplicationDto appDto) {
		ApplicationDto savedApp = appService.save(appDto);
        return ResponseEntity.ok(savedApp);
    }

    @GetMapping("/delete-application")
    public ResponseEntity<Void> delete(@RequestParam Long id) {
        appService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/update-application")
    public ResponseEntity<ApplicationDto> updateApplication(@RequestBody ApplicationDto appDto) {
    	ApplicationDto updatedApp = appService.updateApplication(appDto);
        if (updatedApp != null) {
            return ResponseEntity.ok(updatedApp);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
}
