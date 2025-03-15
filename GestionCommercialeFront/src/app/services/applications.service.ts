import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) {}
}
