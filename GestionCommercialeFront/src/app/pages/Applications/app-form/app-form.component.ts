import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApplicationService } from '../../../services/application.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-app-form',
  standalone: false,
  templateUrl: './app-form.component.html',
  styleUrl: './app-form.component.css'
})
export class AppFormComponent  {
  applicationForm: FormGroup;
  successMessage: string = '';  
  constructor(private fb: FormBuilder, private appService: ApplicationService,private router: Router) 
  {
    this.applicationForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      prix: [null, [Validators.required, Validators.min(0)]],
      dateAjout: [new Date().toISOString().split('T')[0]]  // Default today
    });
  }
  addApplication(){
    console.log(this.applicationForm.value)
    if (this.applicationForm.valid){
      this.appService.addApplication(this.applicationForm.value).subscribe(
        () => {
          this.successMessage = 'New Application added successfully!';
          setTimeout(() => {
            this.successMessage = ''; // Hide message after 3 seconds
            this.router.navigate(['/Applications']); // Navigate to client list
          }, 3000);
        },
        (error) => {
          console.error('Error adding application', error);
        }

      )
    }
}
}