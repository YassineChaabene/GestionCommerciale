import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];

  searchValue: string = '';
  selectedFilter: string = 'code';

  sortColumn: string = '';
  sortDirection: boolean = true; // true = ascending, false = descending

  // Pagination
  pageSizeOptions: (number | string)[] = [5, 10, 20, 'All'];
  itemsPerPage: number = 5; // Default is 5
  currentPage: number = 1;

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
    const value = this.searchValue.toLowerCase();

    this.filteredClients = this.clients.filter(client => {
      switch (this.selectedFilter) {
        case 'email':
          return client.email.toLowerCase().includes(value);
        case 'intutile':
          // Make sure your model has a field called "intitule" instead of "intutile"
          return client.intutile?.toLowerCase().includes(value);
          case 'code':
            return client.code?.toString().includes(value);
            case 'adresse':
              return client.adresse?.toString().includes(value);
              case 'telephone':
                return client.telephone?.toString().includes(value);
          default:
            return false;
        }
      });
      // Reset to first page after filtering
      this.currentPage = 1;
    }
  
    clearFilter(): void {
      this.searchValue = '';
      this.filteredClients = [...this.clients];
      this.currentPage = 1;
    }
  
    deleteClient(id: number): void {
      if (confirm('Are you sure you want to delete this client?')) {
        this.clientService.deleteClient(id).subscribe(() => {
          this.clients = this.clients.filter(client => client.id !== id);
          this.filteredClients = this.filteredClients.filter(client => client.id !== id);
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
        const valueA = String(a[column] ?? '').toLowerCase();
        const valueB = String(b[column] ?? '').toLowerCase();
    
        if (valueA < valueB) return this.sortDirection ? -1 : 1;
        if (valueA > valueB) return this.sortDirection ? 1 : -1;
        return 0;
      });
    }
  
    // **Pagination Methods**
    paginatedClients(): Client[] {
      // If itemsPerPage matches the total filtered clients, show all
      // (This happens if the user selects "All")
      if (this.itemsPerPage === this.filteredClients.length) {
        return this.filteredClients;
      }
  
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
  
    changePageSize(size: number | string): void {
      if (size === 'All') {
        // Show all clients by setting itemsPerPage = filteredClients.length
        this.itemsPerPage = this.filteredClients.length;
      } else {
        this.itemsPerPage = Number(size);
      }
      this.currentPage = 1; // Reset to first page
    }
  }
  