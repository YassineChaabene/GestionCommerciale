import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ uuid: string; email: string }> {
    return this.http.post<{ uuid: string; email: string }>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      map(response => response) 
    );
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('uuid');
    localStorage.removeItem('email'); // ✅ Clear email on logout
    
  }
}