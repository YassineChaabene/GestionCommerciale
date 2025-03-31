import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = localStorage.getItem('role');
    const expectedRole = route.data['role'];

    if (!role || (expectedRole && role !== expectedRole)) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
