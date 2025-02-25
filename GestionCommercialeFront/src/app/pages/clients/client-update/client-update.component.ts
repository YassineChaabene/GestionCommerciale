import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';

@Component({
  standalone: false,
  selector: 'app-client-update',
  templateUrl: './client-update.component.html',
  styleUrls: ['./client-update.component.css']
})
export class ClientUpdateComponent implements OnInit {
  updateClientForm!: FormGroup;
  clientId!: number;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.updateClientForm = this.fb.group({
      code: ['', [Validators.required]],
      intutile: ['', [Validators.required]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
      email: ['', [Validators.required, Validators.email]],
      adresse: ['', [Validators.required]]
    });

    // Get client ID from the route
    this.clientId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.clientId) {
      this.clientService.getClient(this.clientId).subscribe(client => {
        if (client) {
          this.updateClientForm.patchValue(client); // Populate form with client data
        }
      });
    }
  }

  onUpdate() {
    if (this.updateClientForm.invalid) return;

    const updatedClient: Client = { id: this.clientId, ...this.updateClientForm.value };

    this.clientService.updateClient(updatedClient).subscribe(() => {
      this.router.navigate(['/clients']); // Redirect to client list after update
    });
  }
}
