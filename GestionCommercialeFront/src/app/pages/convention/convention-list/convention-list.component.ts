import { Component, OnInit } from '@angular/core';
import { ConventionService } from '../../../services/convention.service';
import { ClientService } from '../../../services/client.service';
import { ApplicationService } from '../../../services/application.service';
import { Convention } from '../../../models/convention.model';
import { Client } from '../../../models/client.model';
import { Application } from '../../../models/application.model';

@Component({
  selector: 'app-convention-list',
  standalone: false,
  templateUrl: './convention-list.component.html',
  styleUrls: ['./convention-list.component.css']
})
export class ConventionListComponent implements OnInit {
  conventions: (Convention & { clientName: string, applicationName: string })[] = []; // Add extra properties to Convention type
  filteredConventions: any[] = [];
  clients: Client[] = [];
  applications: Application[] = [];
  searchValue: string = '';
  selectedFilter: string = 'code';
  itemsPerPage: number = 5;
  currentPage: number = 1;
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(
    private conventionService: ConventionService,
    private clientService: ClientService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.conventionService.getAllConventions().subscribe(conventions => {
      this.clientService.getAllClients().subscribe(clients => {
        this.applicationService.getAllApplications().subscribe(applications => {
          this.clients = clients;
          this.applications = applications;

          // Dynamically map clientName and applicationName to the conventions
          this.conventions = conventions.map(convention => ({
            ...convention,
            clientName: this.clients.find(c => c.id === convention.client.id)?.intutile || 'Unknown',
            applicationName: this.applications.find(a => a.id === convention.application.id)?.intitule || 'Unknown'
          }) as Convention & { clientName: string, applicationName: string }); // Use type assertion here

          // Filter conventions when data is fetched
          this.filteredConventions = this.filterConventions(); // Initialize the filtered conventions
        });
      });
    });
  }

  setFilter(filter: string): void {
    this.selectedFilter = filter;
    this.currentPage = 1; // Reset to the first page when applying filter
    this.filteredConventions = this.filterConventions(); // Apply the filter immediately
  }

  clearFilter(): void {
    this.searchValue = '';
    this.filteredConventions = this.filterConventions(); // Reset the filter
  }
  applyFilter(): void {
    this.filteredConventions = this.filterConventions();  // Reapply filter whenever the search value changes
  }
  

  filterConventions(): any[] {
    const value = this.searchValue.toLowerCase();

    return this.conventions.filter(convention => {
      let fieldValue = '';

      // Handle specific fields for clientName and applicationName
      if (this.selectedFilter === 'clientId') {
        fieldValue = convention.clientName?.toLowerCase() || '';
      } else if (this.selectedFilter === 'applicationId') {
        fieldValue = convention.applicationName?.toLowerCase() || '';
      } else {
        // For other filters like code, status, etc.
      }

      // Return true if the field value contains the search input (case-insensitive)
      return fieldValue.includes(value);
    });
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredConventions.sort((a, b) => {
      const valueA = (a[column] || '').toString().toLowerCase();
      const valueB = (b[column] || '').toString().toLowerCase();
      return this.sortDirection === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
  }

  paginatedConventions(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredConventions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1;
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  totalPages(): number {
    return Math.ceil(this.filteredConventions.length / this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  deleteConvention(uuid: string): void {
    if (confirm('Are you sure you want to delete this Convention?')) {
      this.conventionService.deleteConvention(uuid).subscribe(() => {
        this.conventions = this.conventions.filter(convention => convention.uuid !== uuid);
        this.filteredConventions = [...this.conventions]; // Update filtered conventions
      });
    }
  }
}
