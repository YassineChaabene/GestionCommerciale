import { Component, OnInit } from '@angular/core';
import { ConventionService } from '../../../services/convention.service';
import { Convention } from '../../../models/convention.model';
import { Client } from '../../../models/client.model';
import { Application } from '../../../models/application.model';

function isApplication(application: Application | { id: number } | undefined): application is Application {
  return !!application && 'nom' in application;
}

function isClient(client: Client | { id: number } | undefined): client is Client {
  return !!client && 'intutile' in client;
}


@Component({
  selector: 'app-convention-list',
  standalone: false,
  templateUrl: './convention-list.component.html',
  styleUrls: ['./convention-list.component.css']
})
export class ConventionListComponent implements OnInit {
  isApplication(application: Application | { id: number } | undefined): application is Application {
    return !!application && 'nom' in application;
  }

  /** Type guard for Client */
  isClient(client: Client | { id: number } | undefined): client is Client {
    return !!client && 'intutile' in client;
  }
  conventions: Convention[] = [];
  filteredConventions: Convention[] = [];
  searchValue: string = '';
  selectedFilter: string = 'code';
  itemsPerPage: number = 5;
  currentPage: number = 1;
  sortColumn: keyof Convention | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';

  pageSizeOptions: number[] = [5, 10, 20];

  constructor(private conventionService: ConventionService) {}

  ngOnInit(): void {
    this.conventionService.getAllConventions().subscribe(data => {
      this.conventions = data;
      this.filteredConventions = [...data];
    });
  }

  /** Sets the selected filter for searching */
  setFilter(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  /** Clears the search input and resets filters */
  clearFilter(): void {
    this.searchValue = '';
    this.applyFilter();
  }

  /** Filters the conventions list based on user input */
  applyFilter(): void {
    const value = this.searchValue.toLowerCase();
    this.filteredConventions = this.conventions.filter(convention => {
      switch (this.selectedFilter) {
        case 'code':
          return convention.code?.toLowerCase().includes(value);
        case 'status':
          return convention.status?.toLowerCase().includes(value);
        case 'application':
          return isApplication(convention.application) 
            ? convention.application.nom?.toLowerCase().includes(value) 
            : false;
        case 'client':
          return isClient(convention.client) 
            ? convention.client.intutile?.toLowerCase().includes(value) 
            : false;
        default:
          return true;
      }
    });
    this.currentPage = 1;
  }

  /** Sorts the table dynamically */
  sortTable(column: keyof Convention): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredConventions.sort((a, b) => {
      const valueA = (a[column] || '').toString().toLowerCase();
      const valueB = (b[column] || '').toString().toLowerCase();
      
      if (valueA < valueB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valueA > valueB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  /** Returns the paginated list of conventions */
  paginatedConventions(): Convention[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredConventions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  /** Changes the number of items per page */
  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1;
  }

  /** Changes the current page */
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  /** Returns total number of pages */
  totalPages(): number {
    return Math.ceil(this.filteredConventions.length / this.itemsPerPage);
  }

  /** Returns an array of page numbers for pagination */
  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  /** Deletes a convention and updates the list */
  deleteConvention(id: number): void {
    if (confirm('Are you sure you want to delete this Convention?')) {
      this.conventionService.deleteConvention(id).subscribe(() => {
        this.conventions = this.conventions.filter(convention => convention.id !== id);
        this.filteredConventions = this.filteredConventions.filter(convention => convention.id !== id);
      });
    }
  }
}
