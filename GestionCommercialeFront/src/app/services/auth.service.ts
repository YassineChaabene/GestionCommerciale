import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:9090/auth/login'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ uuid: string; email: string }> {
    return this.http.post<{ uuid: string; email: string }>(this.apiUrl, { email, password }).pipe(
      map(response => response) 
    );
  }
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('uuid');
    localStorage.removeItem('email'); // ✅ Clear email on logout
    
  }
}