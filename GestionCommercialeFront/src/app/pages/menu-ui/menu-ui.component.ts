import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone:false,
  selector: 'app-menu-ui',
  templateUrl: './menu-ui.component.html',
  styleUrls: ['./menu-ui.component.css']
})
export class MenuUiComponent {
  role: string | null = localStorage.getItem('role');
  // ... any other logic ...
}
