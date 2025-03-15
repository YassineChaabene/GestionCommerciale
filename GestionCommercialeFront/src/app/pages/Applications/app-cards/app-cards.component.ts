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
  ngOnInit(): void {
    this.getApplications();
  }
  constructor(private applicationService: ApplicationService) {}
  getApplications():void{
    this.applicationService.getAllApplications().subscribe(
      (data)=>{
        this.applications=data;
      },
      (error) => {
        console.error('Error fetching Applications', error);
      }
    )
  }
}
