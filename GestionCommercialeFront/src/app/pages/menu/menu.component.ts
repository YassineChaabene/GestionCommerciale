import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({

  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.6s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MenuComponent {
  constructor(private router:Router, private authservice:AuthService ){}
  userEmail: string | null = null;
  role: string | null = localStorage.getItem('role');
  ngOnInit() {
    this.userEmail = localStorage.getItem('email'); // ✅ Retrieve stored email
  }
  logout() {
    this.authservice.logout()
    this.router.navigate(['/auth/login']); // Redirect to authentication page
  }
}
