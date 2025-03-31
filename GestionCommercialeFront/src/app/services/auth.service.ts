import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ uuid: string; email: string; role: string }> {
    return this.http.post<{ uuid: string; email: string; role: string }>(
      `${this.apiUrl}/users/login`, 
      { email, password }
    ).pipe(
      map(response => {
        if (!response.uuid || !response.role) {
          throw new Error('Invalid response format');
        }
        localStorage.setItem('uuid', response.uuid);
        localStorage.setItem('email', response.email);
        localStorage.setItem('role', response.role);
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw error; // Re-throw for component handling
      })
    );
  }

  logout(): void {
    localStorage.removeItem('role');
    localStorage.removeItem('uuid');
    localStorage.removeItem('email'); // ✅ Clear email on logout
    
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }
}