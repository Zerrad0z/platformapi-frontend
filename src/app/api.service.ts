import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ApiDTO {
  id: number;
  name: string;
  description: string;
  documentationUrl?: string;
}

export interface DemandeAuthorisationDTO {
  startDate: string;
  endDate: string;
  description: string;
  apiId: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8092/api';  // Update URL if necessary

  constructor(private http: HttpClient) { }

  getAllAPIs(): Observable<ApiDTO[]> {
    return this.http.get<ApiDTO[]>(`${this.baseUrl}/list`);
  }

  getAPIById(id: number): Observable<ApiDTO> {
    return this.http.get<ApiDTO>(`${this.baseUrl}/${id}`);
  }

  createDemandeAuthorisation(demande: DemandeAuthorisationDTO): Observable<DemandeAuthorisationDTO> {
    return this.http.post<DemandeAuthorisationDTO>(`${this.baseUrl}/demande-authorisations`, demande);
  }
}
