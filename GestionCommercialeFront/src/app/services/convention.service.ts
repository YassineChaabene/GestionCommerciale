import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Convention } from '../models/convention.model';
import { environment } from '../../environments/environments';
@Injectable({
  providedIn: 'root'
})
export class ConventionService {

  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;
  getAllConventions(): Observable<Convention[]> {
      return this.http.get<Convention[]>(`${this.apiUrl}/conventions/get-all-conventions`);
    }
}
