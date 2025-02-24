import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:9090/clients';

  constructor(private http: HttpClient) {}

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/get-all-client`);
  }

  getClient(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/get-client?id=${id}`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/save-client`, client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/update-client`, client);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.get<void>(`${this.apiUrl}/delete-client?id=${id}`);
  }
}
