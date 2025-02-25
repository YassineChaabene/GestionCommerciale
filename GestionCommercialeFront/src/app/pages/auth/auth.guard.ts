import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const authToken = localStorage.getItem('authToken'); // Check if token exists

    if (authToken) {
      return true; // ✅ User is authenticated, allow access
    } else {
      this.router.navigate(['/auth/login']); // ❌ Redirect to login page
      return false;
    }
  }
}
