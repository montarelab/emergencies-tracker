import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Volcano } from './models';

interface VolcanoListResponse {
  items: Volcano[];
  itemsPerPage: number;
  page: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class VolcanoesService {
  private apiUrl = 'http://localhost:5000/volcanoes'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  /**
   * Get a list of earthquakes
   * @returns Observable<any[]>
   */
  getVolcanoList(): Observable<VolcanoListResponse> {
    return this.http.get<VolcanoListResponse>(`${this.apiUrl}/list`);
  }

  /**
   * Get details of a specific earthquake by ID
   * @param id - Earthquake ID
   * @returns Observable<any>
   */
  getVolcanoById(id: string): Observable<Volcano> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
