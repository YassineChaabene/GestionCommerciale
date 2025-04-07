import { Component, OnInit } from '@angular/core';
import { ConventionService } from '../../../services/convention.service';
import { Convention } from '../../../models/convention.model';

@Component({
  selector: 'app-convention-list',
  standalone: false,
  templateUrl: './convention-list.component.html',
  styleUrls: ['./convention-list.component.css']
})
export class ConventionListComponent implements OnInit {
  conventions: Convention[] = [];
  filteredConventions: Convention[] = [];

  searchValue: string = '';
  selectedFilter: string = 'code';

  sortColumn: string = '';
  sortDirection: boolean = true;

  pageSizeOptions: (number | string)[] = [5, 10, 20, 'All'];
  itemsPerPage: number = 5; // Default is 5
  currentPage: number = 1;

  constructor(private conventionService: ConventionService) {}

  ngOnInit(): void {
    this.conventionService.getAllConventions().subscribe(data => {
      this.conventions = data;
      this.filteredConventions = data;
    });
  }

  setFilter(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  applyFilter(): void {
    const value = this.searchValue.toLowerCase();
    this.filteredConventions = this.conventions.filter(convention => {
      switch (this.selectedFilter) {
        case 'code':
          return convention.code?.toLowerCase().includes(value);
        case 'status':
          return convention.status?.toLowerCase().includes(value);
        case 'application.name':
          return convention.application?.nom?.toLowerCase().includes(value);
        case 'client.intutile':
          return convention.client?.intutile?.toLowerCase().includes(value);
        default:
          return true;
      }
    });
    this.currentPage = 1;
  }

  clearFilter(): void {
    this.searchValue = '';
    this.filteredConventions = [...this.conventions];
    this.currentPage = 1;
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortColumn = column;
      this.sortDirection = true;
    }

    this.filteredConventions.sort((a, b) => {
      const valueA = this.getValueByPath(a, column);
      const valueB = this.getValueByPath(b, column);
      return (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) * (this.sortDirection ? 1 : -1);
    });
  }

  getValueByPath(obj: any, path: string): string {
    return path.split('.').reduce((o, key) => o?.[key], obj)?.toString().toLowerCase() || '';
  }

  
  paginatedConventions(): Convention[] {
    if (this.itemsPerPage === this.filteredConventions.length) {
            return this.filteredConventions;
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.filteredConventions.slice(startIndex, startIndex + this.itemsPerPage);
    
    
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  totalPages(): number {
    return Math.ceil(this.filteredConventions.length / +Number(this.itemsPerPage));
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  changePageSize(size: number | string): void {
    if (size === 'All') {
      // Show all clients by setting itemsPerPage = filteredClients.length
      this.itemsPerPage = this.filteredConventions.length;
    } else {
      this.itemsPerPage = Number(size);
    }
    this.currentPage = 1; // Reset to first page
  }
}
