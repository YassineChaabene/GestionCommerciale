package gestionCommerciale.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gestionCommerciale.convert.ConventionConvert;
import gestionCommerciale.dto.ConventionDto;
import gestionCommerciale.entity.Application;
import gestionCommerciale.entity.Client;
import gestionCommerciale.entity.Convention;
import gestionCommerciale.repository.ApplicationRepository;
import gestionCommerciale.repository.ClientRepo;
import gestionCommerciale.repository.ConventionRepository;

@Service
public class ConventionService {

    private static final Logger logger = LoggerFactory.getLogger(ConventionService.class);
    
    private final ConventionRepository conventionRepository;
    private final ClientRepo clientRepo;
    private final ApplicationRepository applicationRepo;
    
    @Autowired
    public ConventionService(ConventionRepository conventionRepository,ClientRepo clientRepo,ApplicationRepository applicationRepo) 
    {
        this.conventionRepository = conventionRepository;
        this.clientRepo = clientRepo;
        this.applicationRepo = applicationRepo;
    }
    
    public List<Convention> getAllConventions() {
        logger.info("Fetching all conventions");
        List<Convention> conventions = conventionRepository.findAll();
        logger.info("Total conventions found: {}", conventions.size());
        return conventions;
    }
    
    public ConventionDto getConvention(Long id) {
        logger.info("Fetching convention with ID: {}", id);
        Optional<Convention> convention = conventionRepository.findById(id);
        
        if (convention.isPresent()) {
            logger.info("Convention found: {}", convention.get());
            return ConventionConvert.toDto(convention.get());
        } else {
            logger.warn("Convention not found with ID: {}", id);
            return null;
        }
    }
    
    public ConventionDto getConventionByUuid(String uuid) {
        logger.info("Fetching convention with UUID: {}", uuid);
        Optional<Convention> convention = conventionRepository.findByUuid(uuid);
        
        if (convention.isPresent()) {
            logger.info("Convention found: {}", convention.get());
            return ConventionConvert.toDto(convention.get());
        } else {
            logger.warn("Convention not found with UUID: {}", uuid);
            return null;
        }
    }
    
    public ConventionDto save(ConventionDto conventionDto) {
        logger.info("Saving new convention: {}", conventionDto);

        Client client = clientRepo.findById(conventionDto.getClientId())
            .orElseThrow(() -> new RuntimeException("Client not found with ID: " + conventionDto.getClientId()));

        Application application = applicationRepo.findById(conventionDto.getApplicationId())
            .orElseThrow(() -> new RuntimeException("Application not found with ID: " + conventionDto.getApplicationId()));

        Convention convention = Convention.builder()
            .code(conventionDto.getCode())
            .status(conventionDto.getStatus())
            .startDate(conventionDto.getStartDate())
            .endDate(conventionDto.getEndDate())
            .archived(conventionDto.isArchived())
            .client(client)
            .application(application)
            .build();

        Convention savedConvention = conventionRepository.save(convention);
        logger.info("Convention saved successfully with ID: {}", savedConvention.getId());

        return ConventionConvert.toDto(savedConvention);
    }
    public void delete(String uuid) {
        logger.warn("Deleting convention with UUID: {}", uuid);

        conventionRepository.findByUuid(uuid).ifPresentOrElse(convention -> {
            conventionRepository.deleteById(convention.getId());
            logger.info("Convention with UUID {} deleted successfully", uuid);
        }, () -> {
            logger.error("Convention not found with UUID: {}", uuid);
            throw new RuntimeException("Convention not found with UUID: " + uuid);
        });
    }
    
    public ConventionDto updateConvention(ConventionDto conventionDto) {
        logger.info("Updating convention: {}", conventionDto);
        Optional<Convention> conventionOpt = conventionRepository.findByUuid(conventionDto.getUuid());

        if (conventionOpt.isPresent()) {
            Convention existingConvention = conventionOpt.get();
            Convention updatedConvention = ConventionConvert.toEntity(conventionDto);
            updatedConvention.setUuid(existingConvention.getUuid());
            updatedConvention.setId(existingConvention.getId());

            Convention savedConvention = conventionRepository.save(updatedConvention);
            logger.info("Convention updated successfully: {}", savedConvention);
            return ConventionConvert.toDto(savedConvention);
        } else {
            logger.error("Convention not found with UUID: {}", conventionDto.getUuid());
            throw new RuntimeException("Convention not found with UUID: " + conventionDto.getUuid());
        }
    }

    public List<Convention> getActiveConventions() {
        logger.info("Fetching active conventions");
        List<Convention> conventions = conventionRepository.findByArchivedFalse();
        logger.info("Active conventions found: {}", conventions.size());
        return conventions;
    }

    public void archiveConvention(Long id) {
        logger.info("Archiving convention with ID: {}", id);
        Convention convention = conventionRepository.findById(id).orElseThrow(() -> {
            logger.error("Convention not found with ID: {}", id);
            return new RuntimeException("Convention not found with Id: " + id);
        });
        convention.setArchived(true);
        conventionRepository.save(convention);
        logger.info("Convention with ID {} archived successfully", id);
    }

    public List<Convention> getConventionsExpiringSoon() {
        logger.info("Fetching conventions expiring soon");
        List<Convention> conventions = conventionRepository.findByEndDateBefore(LocalDate.now().plusDays(30));
        logger.info("Conventions expiring soon found: {}", conventions.size());
        return conventions;
    }
}