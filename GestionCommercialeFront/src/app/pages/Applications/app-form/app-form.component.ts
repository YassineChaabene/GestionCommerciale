import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApplicationService } from '../../../services/application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-form',
  standalone: false,
  templateUrl: './app-form.component.html',
  styleUrl: './app-form.component.css'
})
export class AppFormComponent {
  applicationForm: FormGroup;
  successMessage: string = '';

  constructor(private fb: FormBuilder, private appService: ApplicationService, private router: Router) {
    this.applicationForm = this.fb.group({
      intitule: ['', Validators.required],
      description: ['', Validators.required],
      dateExploitation: [new Date().toISOString().split('T')[0], Validators.required],
      abreviation: ['', Validators.required],
      responsable: ['', Validators.required]
    });
  }

  addApplication(): void {
    if (this.applicationForm.valid) {
      const formValue = {
        ...this.applicationForm.value,
        dateExploitation: new Date(this.applicationForm.value.dateExploitation)
      };

      this.appService.addApplication(formValue).subscribe({
        next: () => {
          this.successMessage = '✅ New Application added successfully!';
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(['/app/applications']);
          }, 2000);
        },
        error: (error) => {
          console.error('❌ Error adding application:', error);
        }
      });
    }
  }
}
