package gestionCommerciale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import gestionCommerciale.dto.ConventionDto;
import gestionCommerciale.entity.Convention;
import gestionCommerciale.service.ConventionService;

@RestController
@RequestMapping("/conventions")
public class ConventionController {

    @Autowired
    private ConventionService conventionService;

    @GetMapping("/get-convention")
    public ResponseEntity<ConventionDto> getConvention(@RequestParam Long id) {
        ConventionDto conventionDto = conventionService.getConvention(id);
        if (conventionDto != null) {
            return ResponseEntity.ok(conventionDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get-all-conventions")
    public ResponseEntity<List<Convention>> getAllConventions() {
        List<Convention> conventions = conventionService.getAllConventions();
        if (!conventions.isEmpty()) {
            return ResponseEntity.ok(conventions);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/get-active-conventions")
    public ResponseEntity<List<Convention>> getActiveConventions() {
        List<Convention> conventions = conventionService.getActiveConventions();
        if (!conventions.isEmpty()) {
            return ResponseEntity.ok(conventions);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping("/save-convention")
    public ResponseEntity<ConventionDto> save(@RequestBody ConventionDto conventionDto) {
        ConventionDto savedConvention = conventionService.save(conventionDto);
        return ResponseEntity.ok(savedConvention);
    }

    @GetMapping("/delete-convention")
    public ResponseEntity<Void> delete(@RequestParam Long id) {
        conventionService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/update-convention")
    public ResponseEntity<ConventionDto> updateConvention(@RequestBody ConventionDto conventionDto) {
        ConventionDto updatedConvention = conventionService.updateConvention(conventionDto);
        if (updatedConvention != null) {
            return ResponseEntity.ok(updatedConvention);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/archive-convention")
    public ResponseEntity<Void> archive(@RequestParam Long id) {
        conventionService.archiveConvention(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/get-expiring-conventions")
    public ResponseEntity<List<Convention>> getExpiringConventions() {
        List<Convention> conventions = conventionService.getConventionsExpiringSoon();
        if (!conventions.isEmpty()) {
            return ResponseEntity.ok(conventions);
        } else {
            return ResponseEntity.noContent().build();
        }
    }
}