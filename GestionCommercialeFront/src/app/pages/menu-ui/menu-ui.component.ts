import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu-ui',
  standalone:false,
  templateUrl: './menu-ui.component.html',
  styleUrls: ['./menu-ui.component.css']
})
export class MenuUiComponent {
  
constructor( private authservice:AuthService ){}
  userEmail: string | null = null;
  role: string | null = localStorage.getItem('role');
  
  
}