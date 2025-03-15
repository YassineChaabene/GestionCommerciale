import { Component } from '@angular/core';
import { Application } from '../../../models/application.model';

@Component({
  selector: 'app-app-cards',
  standalone: false,
  templateUrl: './app-cards.component.html',
  styleUrl: './app-cards.component.css'
})
export class AppCardsComponent {
  applications = [
    { id: 1, nom: 'App One', description: 'First App', dateAjout: new Date(), prix: 19.99 },
    { id: 2, nom: 'App Two', description: 'Second App', dateAjout: new Date(), prix: 29.99 },
    { id: 3, nom: 'App Three', description: 'Third App', dateAjout: new Date(), prix: 39.99 },
    { id: 4, nom: 'App Four', description: 'Fourth App', dateAjout: new Date(), prix: 49.99 },
    { id: 5, nom: 'App Five', description: 'Fifth App', dateAjout: new Date(), prix: 59.99 },
    { id: 6, nom: 'App Six', description: 'Sixth App', dateAjout: new Date(), prix: 69.99 }
  ];

}
