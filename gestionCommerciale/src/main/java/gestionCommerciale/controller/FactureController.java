package gestionCommerciale.controller;

import gestionCommerciale.dto.FactureDto;
import gestionCommerciale.service.FactureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/factures")
@CrossOrigin(origins = "http://localhost:4200")
public class FactureController {

    @Autowired
    private FactureService factureService;

    @GetMapping("/test")
    public String testEndpoint() {
        return "FactureController is working!";
    }

    @GetMapping("/get-facture")
    public ResponseEntity<FactureDto> getFacture(@RequestParam String uuid) {
        FactureDto factureDto = factureService.getFactureByUuid(uuid);
        if (factureDto != null) {
            return ResponseEntity.ok(factureDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/get-all-factures")
    public ResponseEntity<List<FactureDto>> getAllFactures() {
        List<FactureDto> factures = factureService.getAllFactures();
        if (!factures.isEmpty()) {
            return ResponseEntity.ok(factures);
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping("/save-facture")
    public ResponseEntity<FactureDto> saveFacture(@RequestBody FactureDto factureDto) {
        FactureDto savedFacture = factureService.saveFacture(factureDto);
        return ResponseEntity.ok(savedFacture);
    }

    @PostMapping("/update-facture")
    public ResponseEntity<FactureDto> updateFacture(@RequestBody FactureDto factureDto) {
        FactureDto updated = factureService.saveFacture(factureDto); // save handles both create & update
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/delete-facture")
    public ResponseEntity<Void> deleteFacture(@RequestParam String uuid) {
        factureService.deleteByUuid(uuid);
        return ResponseEntity.noContent().build();
    }
}
