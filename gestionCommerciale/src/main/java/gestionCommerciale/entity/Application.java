package gestionCommerciale.entity;

import java.time.LocalDate;
import java.util.Set;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "applications")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String intitule;

    @Column(nullable = false)
    private String description;
    
    @Column(nullable = false)
    private String responsable;

    @Column(nullable = false)
    private LocalDate dateExploitation ;
    
    @Column(nullable = false)
    private String abreviation;

    @Column(unique = true, nullable = false, updatable = false)
    private String uuid;

    @PrePersist
    @PreUpdate
    private void initializeFields() {
        if (this.uuid == null) {
            this.uuid = UUID.randomUUID().toString();
        }
    }

    @ManyToMany(mappedBy = "applications")
    @JsonIgnore
    private Set<Client> clients;
}
