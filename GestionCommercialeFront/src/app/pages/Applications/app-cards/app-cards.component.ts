import { Component } from '@angular/core';
import { Application } from '../../../models/application.model';
import { ApplicationService } from '../../../services/application.service';
@Component({
  selector: 'app-app-cards',
  standalone: false,
  templateUrl: './app-cards.component.html',
  styleUrl: './app-cards.component.css'
})
export class AppCardsComponent {
  applications :Application[]=[]
  selectedFilter: string = 'nom';
  filteredApplications: Application[] = [];
  priceFilter: number = 0; // Valeur initiale du slider
  maxPrice: number = 0; 
  constructor(private applicationService: ApplicationService) {}
   // Pagination
   pageSizeOptions: (number | string)[] = [5, 10, 20, 'All'];
   itemsPerPage: number = 5; // Default is 5
   currentPage: number = 1;
 
  
  searchValue: string = '';
  ngOnInit(): void {
    this.getApplications();
    
  }
  
  getApplications(): void {
    this.applicationService.getAllApplications().subscribe(
      (data) => {
        this.applications = data;
        this.filteredApplications = [...data];
  
        // Vérifie s'il y a des applications avant d'utiliser Math.max()
        this.maxPrice = Math.ceil(Math.max(...data.map(app => app.prix)));

        this.priceFilter = this.maxPrice; // Initialise le filtre au prix max
      },
      (error) => {
        console.error('Error fetching Applications', error);
      }
    );
  }
  
  setFilter(filterType: string): void {
    this.selectedFilter = filterType;
    this.applyFilter();
  }
  applyFilter(): void {
    const value = this.searchValue.toLowerCase();
  
    this.filteredApplications = this.applications.filter(application => {
      const matchText =
        !this.searchValue ||
        (this.selectedFilter === 'id' && application.id?.toString().includes(value)) ||
        (this.selectedFilter === 'nom' && application.nom.toLowerCase().includes(value)) ||
        (this.selectedFilter === 'prix' && application.prix.toString().includes(value));
  
        const matchPrice = application.prix <= this.priceFilter + 0.01;

  
      return matchText && matchPrice;
    });
  }
  
      clearFilter(): void {
        this.searchValue = '';
        this.filteredApplications = [...this.applications];
        this.priceFilter = this.maxPrice;
        
      }
      deleteApplication(id: number): void {
        if (confirm('Are you sure you want to delete this Application?')) {
          this.applicationService.deleteApplication(id).subscribe(() => {
            this.applications = this.applications.filter(application => application.id !== id);
            this.filteredApplications = this.filteredApplications.filter(application => application.id !== id);
          });
        }
      }
      paginatedApplication(): Application[] {
            // If itemsPerPage matches the total filtered clients, show all
            // (This happens if the user selects "All")
            if (this.itemsPerPage === this.filteredApplications.length) {
              return this.filteredApplications;
            }
        
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            return this.filteredApplications.slice(startIndex, startIndex + this.itemsPerPage);
          }
        
          changePage(page: number): void {
            if (page >= 1 && page <= this.totalPages()) {
              this.currentPage = page;
            }
          }
        
          totalPages(): number {
            return Math.ceil(this.filteredApplications.length / this.itemsPerPage);
          }
        
          totalPagesArray(): number[] {
            return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
          }
        
          changePageSize(size: number | string): void {
            if (size === 'All') {
              // Show all clients by setting itemsPerPage = filteredClients.length
              this.itemsPerPage = this.filteredApplications.length;
            } else {
              this.itemsPerPage = Number(size);
            }
            this.currentPage = 1; // Reset to first page
          }

  
}
