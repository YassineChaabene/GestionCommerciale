import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Facture } from '../models/facture.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  getAllFactures(): Observable<Facture[]> {
      return this.http.get<Facture[]>(`${this.apiUrl}/factures/get-all-facture`);
    }
}
