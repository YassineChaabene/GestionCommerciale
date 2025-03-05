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
  clients: Client[] = [];
  filteredClients: Client[] = []; // Stores the filtered list
  emailFilter: string = ''; // Holds the input value

  

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClients();
    
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data;
        this.filteredClients = data; // Initialize with full list
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
        this.filterClients(); // Reapply filter after deletion
      });
    }
  }
  filterClients(): void {
    console.log("Filter input:", this.emailFilter); // Debugging log
    if (this.emailFilter.trim()) {
      this.filteredClients = this.clients.filter(client =>
        client.email.toLowerCase().includes(this.emailFilter.toLowerCase())
      );
    } else {
      this.filteredClients = [...this.clients]; // Reset when input is empty
    }
    console.log("Filtered Clients:", this.filteredClients); // Debugging lo
  }
}