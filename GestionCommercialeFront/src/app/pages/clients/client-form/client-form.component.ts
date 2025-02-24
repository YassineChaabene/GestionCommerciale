import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-client-form',
  standalone: false,
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router
  ) {
    this.clientForm = this.fb.group({
      code: ['', Validators.required],
      intitule: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', Validators.required]
    });
  }

  addClient() {
    console.log(this.clientForm.value); // Debugging line
    console.log('Form Valid:', this.clientForm.valid); // Check form validity in console
  
    if (this.clientForm.valid) {
      this.clientService.addClient(this.clientForm.value).subscribe(() => {
        this.router.navigate(['/clients']);
      });
    }
  }
  
}