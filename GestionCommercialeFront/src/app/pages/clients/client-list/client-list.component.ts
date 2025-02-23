import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';

@Component({
  standalone: false,
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = []; // Now using the Client model

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data;
      },
      (error) => {
        console.error('Error fetching clients', error);
      }
    );
  }

  deleteClient(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.clients = this.clients.filter(client => client.id !== id);
      });
    }
  }
}