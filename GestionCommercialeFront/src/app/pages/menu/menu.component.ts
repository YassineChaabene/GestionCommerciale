import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  constructor(private router:Router, private authservice:AuthService ){}
  userEmail: string | null = null;
  ngOnInit() {
    this.userEmail = localStorage.getItem('email'); // ✅ Retrieve stored email
  }
  logout() {
    this.authservice.logout()
    this.router.navigate(['/auth/login']); // Redirect to authentication page
  }
}
