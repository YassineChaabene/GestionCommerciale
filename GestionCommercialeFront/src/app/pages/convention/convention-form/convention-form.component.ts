import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConventionService } from '../../../services/convention.service';
import { ClientService } from '../../../services/client.service';
import { ApplicationService } from '../../../services/application.service';
import { Client } from '../../../models/client.model';
import { Application } from '../../../models/application.model';
import { Convention } from '../../../models/convention.model';

@Component({
  selector: 'app-convention-form',
  standalone: false,
  templateUrl: './convention-form.component.html',
  styleUrls: ['./convention-form.component.css']
})
export class ConventionFormComponent implements OnInit {
  conventionForm!: FormGroup;
  clients: Client[] = [];
  applications: Application[] = [];
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private conventionService: ConventionService,
    private clientService: ClientService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.conventionForm = this.fb.group({
      code: ['', Validators.required],
      status: ['ACTIVE', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      clientId: [null, Validators.required],  // Using only ID
      applicationId: [null, Validators.required]  // Using only ID
    });

    this.loadClients();
    this.loadApplications();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe((data: Client[]) => {
      console.log('Clients:', data); // Debugging
      this.clients = data;
    });
  }

  loadApplications(): void {
    this.applicationService.getAllApplications().subscribe((data: Application[]) => {
      console.log('Applications:', data); // Debugging
      this.applications = data;
    });
  }
  
  submitForm(): void {
    if (this.conventionForm.valid) {
      const formData = {
        code: this.conventionForm.value.code,
        status: this.conventionForm.value.status,
        startDate: new Date(this.conventionForm.value.startDate).toISOString().split('T')[0],
        endDate: this.conventionForm.value.endDate 
          ? new Date(this.conventionForm.value.endDate).toISOString().split('T')[0]
          : '',
        client: { id: this.conventionForm.value.clientId },  // Only store ID
        application: { id: this.conventionForm.value.applicationId }  // Only store ID
      };

      console.log('Submitting:', formData); // Debugging

      this.conventionService.addConvention(formData).subscribe({
        next: () => {
          this.successMessage = 'Convention added successfully!';
          this.conventionForm.reset();
        },
        error: (err) => console.error('Error adding convention:', err)
      });
    }
  }
}