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
  filteredClients: Client[] = [];
  searchValue: string = '';
  selectedFilter: string = 'id';

  sortColumn: string = ''; 
  sortDirection: boolean = true; // true = ascending, false = descending

  // Pagination
  itemsPerPage: number = 5; // Default to 5 clients per page
  currentPage: number = 1;
  pageSizeOptions: number[] = [5, 10, 30];

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data;
        this.filteredClients = data;
      },
      (error) => {
        console.error('Error fetching clients', error);
      }
    );
  }

  setFilter(filterType: string): void {
    this.selectedFilter = filterType;
    this.applyFilter();
  }

  applyFilter(): void {
    if (!this.searchValue) {
      this.filteredClients = [...this.clients]; 
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
      } else if (this.selectedFilter === 'code') {
        return client.code.toString().includes(value);
      }
      return false;
    });
  }

  clearFilter(): void {
    this.searchValue = '';
    this.filteredClients = [...this.clients];
  }

  deleteClient(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe(() => {
        this.clients = this.clients.filter(client => client.id !== id);
        this.applyFilter();
      });
    }
  }

  // **Sorting Function**
  sortTable(column: keyof Client): void {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection; 
    } else {
      this.sortColumn = column;
      this.sortDirection = true;
    }
  
    this.filteredClients.sort((a, b) => {
      let valueA = String(a[column] ?? '').toLowerCase();
      let valueB = String(b[column] ?? '').toLowerCase();
  
      if (valueA < valueB) return this.sortDirection ? -1 : 1;
      if (valueA > valueB) return this.sortDirection ? 1 : -1;
      return 0;
    });
  }

  // **Pagination Methods**
  paginatedClients(): Client[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredClients.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  totalPages(): number {
    return Math.ceil(this.filteredClients.length / this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }
}
