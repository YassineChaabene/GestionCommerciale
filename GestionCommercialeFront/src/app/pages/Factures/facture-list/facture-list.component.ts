import { Component ,OnInit } from '@angular/core';
import { FactureService } from '../../../services/facture.service';
import { Facture } from '../../../models/facture.model';


@Component({
  selector: 'app-facture-list',
  standalone: false,
  templateUrl: './facture-list.component.html',
  styleUrl: './facture-list.component.css'
})
export class FactureListComponent implements OnInit {
  factures: Facture[] = [];
  filteredFactures: Facture[] = [];
  searchValue: string = '';
  selectedFilter: string = 'numeroFacture';
  itemsPerPage: number = 5;
  currentPage: number = 1;
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  pageSizeOptions: number[] = [5, 10, 20];

  constructor(private factureService: FactureService) {}

  ngOnInit(): void {
    this.factureService.getAllFactures().subscribe(data => {
      this.factures = data;
      this.filteredFactures = [...this.factures];
    });
  }

  setFilter(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilter();
  }

  clearFilter(): void {
    this.searchValue = '';
    this.applyFilter();
  }

  applyFilter(): void {
    const value = this.searchValue.toLowerCase();
    this.filteredFactures = this.factures.filter(f => {
      const field = f[this.selectedFilter as keyof Facture];
      return field?.toString().toLowerCase().includes(value);
    });
  }

  sortTable(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.filteredFactures.sort((a, b) => {
      const valA = a[column as keyof Facture]?.toString().toLowerCase() || '';
      const valB = b[column as keyof Facture]?.toString().toLowerCase() || '';
      return this.sortDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }

  paginatedFactures(): Facture[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredFactures.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }

  changePageSize(size: number): void {
    this.itemsPerPage = size;
    this.currentPage = 1;
  }

  totalPages(): number {
    return Math.ceil(this.filteredFactures.length / this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }
/*
  deleteFacture(id: number): void {
    if (confirm('Are you sure you want to delete this Facture?')) {
      this.factureService.deleteFacture(id).subscribe(() => {
        this.factures = this.factures.filter(f => f.id !== id);
        this.applyFilter(); // update filtered list
      });
    }
  }*/
}
