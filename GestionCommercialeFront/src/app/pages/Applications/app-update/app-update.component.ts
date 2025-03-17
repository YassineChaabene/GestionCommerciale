import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../models/application.model';

@Component({
  selector: 'app-update-application',
  standalone:false,
  templateUrl: './app-update.component.html',
  styleUrls: ['./app-update.component.css']
})
export class AppUpdateComponent implements OnInit {
  updateApplicationForm!: FormGroup;
  successMessage: string = '';
  appId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.appId = +this.route.snapshot.paramMap.get('id')!;
    
    this.updateApplicationForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: ['', [Validators.required, Validators.min(0)]],

    });

    this.loadApplication();
  }

  loadApplication(): void {
    this.applicationService.getApplicationById(this.appId).subscribe((app) => {
      this.updateApplicationForm.patchValue({
        nom: app.nom,
        description: app.description,
        prix: app.prix

      });
    });
  }

  onUpdate() {
    if (this.updateApplicationForm.invalid) return;
  
    const updatedApplication: Application = { 
      id: this.appId,  // Assuming you're tracking the application ID
      ...this.updateApplicationForm.value,
    };
  
    this.applicationService.updateApplication(updatedApplication).subscribe({
      next: () => {
        this.successMessage = "Application updated successfully!";
        setTimeout(() => {
          this.successMessage = ''; // Hide message after 3 seconds
          this.router.navigate(['/applications']); 
        }, 3000);
      },
      error: (err) => console.error('Error updating application:', err)
    });
  }
  
}
