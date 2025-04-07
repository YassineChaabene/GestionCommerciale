package gestionCommerciale.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gestionCommerciale.convert.ApplicationConvert;
import gestionCommerciale.dto.ApplicationDto;
import gestionCommerciale.entity.Application;
import gestionCommerciale.repository.ApplicationRepository;

@Service
public class ApplicationService {

    private static final Logger logger = LoggerFactory.getLogger(ClientService.class);
    
    @Autowired
    private ApplicationRepository  appRepo;
    
    public List<Application> getAllApplications() {
        logger.info("Fetching all applications");
        List<Application> applications = appRepo.findAll();
        logger.info("Total Application found: {}", applications.size());
        return applications;
    }
    
    public ApplicationDto getApplication(Long id) {
        logger.info("Fetching application with ID: {}", id);
        Optional<Application> application = this.appRepo.findById(id);
        
        if (application.isPresent()) {
            logger.info("application found: {}", application.get());
            return ApplicationConvert.toDto(application.get());
        } else {
            logger.warn("application not found with ID: {}", id);
            return null;
        }
    }
    
    public ApplicationDto save(ApplicationDto appDto) {
    	logger.info("Saving new client: {}", appDto);
    	Application app = ApplicationConvert.toEntity(appDto);
    	Application savedApp = appRepo.save(app);
    	logger.info("Application saved successfully with ID: {}", savedApp.getId());
    	return ApplicationConvert.toDto(savedApp);
    }
    
    public void delete(Long id) {
        logger.warn("Deleting application with ID: {}", id);
        appRepo.deleteById(id);
        logger.info("Application with ID {} deleted successfully", id);
    }
    
    public ApplicationDto updateApplication(ApplicationDto appDto) {
        logger.info("Updating application: {}", appDto);
        Optional<Application> appOpt = appRepo.findById(appDto.getId());

        if (appOpt.isPresent()) {
        	Application existingApp = appOpt.get();
        	Application updatedApp = ApplicationConvert.toEntity(appDto);
        	updatedApp.setId(existingApp.getId()); // Keep the same ID

        	Application savedApp = appRepo.save(updatedApp);
            logger.info("Application updated successfully: {}", savedApp);
            return ApplicationConvert.toDto(savedApp);
        } else {
            logger.error("Application not found with ID: {}", appDto.getId());
            throw new RuntimeException("Application not found with Id: " + appDto.getId());
        }
    }

}
