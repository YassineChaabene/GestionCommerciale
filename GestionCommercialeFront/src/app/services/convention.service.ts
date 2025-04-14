import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Convention } from '../models/convention.model';
import { environment } from '../../environments/environments';
import { ConventionRequest } from '../models/convention-request.model';
@Injectable({
  providedIn: 'root'
})
export class ConventionService {

  constructor(private http: HttpClient) {}
  private apiUrl = environment.apiUrl;
  getAllConventions(): Observable<Convention[]> {
      return this.http.get<Convention[]>(`${this.apiUrl}/conventions/get-all-conventions`);
    }
    deleteConvention(uuid: string): Observable<void> {
      return this.http.get<void>(`${this.apiUrl}/conventions/delete-convention?uuid=${uuid}`);
    }
     updateConvention(convention:ConventionRequest): Observable<Convention> {
        return this.http.post<Convention>(`${this.apiUrl}/conventions/update-convention`, convention );
      }
      addConvention(data: ConventionRequest): Observable<Convention> {
        return this.http.post<Convention>(`${this.apiUrl}/conventions/save-convention`, data);
      }
    getConventionByUuid(uuid: string): Observable<Convention> {
        return this.http.get<Convention>(`${this.apiUrl}/conventions/get-convention?uuid=${uuid}`);
      }
      
}
