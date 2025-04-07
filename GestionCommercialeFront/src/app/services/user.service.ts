import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/get-all-users`);
  }

  // Get user by id
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/get-user?id=${id}`);
  }

  // Add a new user
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/save-user`, user);
  }
  updateUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users/update-user`, user);
  }
  

  // Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/users/delete-user?id=${id}`);
  }
}
