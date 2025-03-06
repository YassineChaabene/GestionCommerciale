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
  searchValue: string = ''; // User input in search bar
  selectedFilter: string = 'id'; // Default filter type
  

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

  // Set the selected filter type
  setFilter(filterType: string): void {
    this.selectedFilter = filterType;
    this.applyFilter();
  }
    // Apply filter based on selected option and input value
    applyFilter(): void {
      if (!this.searchValue) {
        this.filteredClients = this.clients; // If search is empty, show all
        return;
      }
      this.filteredClients = this.clients.filter(client => {
        const value = this.searchValue.toLowerCase();
        if (this.selectedFilter === 'id') {
          return client.id?.toString().includes(value);
        } else if (this.selectedFilter === 'email') {
          return client.email.toLowerCase().includes(value);
        } else if (this.selectedFilter === 'intitule') {
          return client.intutile.toLowerCase().includes(value);
        }
        else if (this.selectedFilter === 'code') {
          return client.code.toString().includes(value);
        }
        return false;
      });
    }
    // Clear filter and reset the list
  clearFilter(): void {
    this.searchValue = '';
    this.filteredClients = this.clients;
  }
  

  deleteClient(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.clients = this.clients.filter(client => client.id !== id);
        this.applyFilter(); // Reapply filter after deletion
      });
    }
  }
  
}