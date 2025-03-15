import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { Application } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
    getAllApplications(): Observable<Application[]> {
        return this.http.get<Application[]>(`${this.apiUrl}/applications/get-all-applications`);
      }
}
