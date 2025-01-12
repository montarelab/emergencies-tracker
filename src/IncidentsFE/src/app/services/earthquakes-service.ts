import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface EarthquakeListResponse {
  items: any[];
  itemsPerPage: number;
  page: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class EarthquakesService {
  private apiUrl = 'http://localhost:5000/earthquakes'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  /**
   * Get a list of earthquakes
   * @returns Observable<any[]>
   */
  getEarthquakeList(): Observable<EarthquakeListResponse> {
    return this.http.get<EarthquakeListResponse>(`${this.apiUrl}/list`);
  }

  /**
   * Get details of a specific earthquake by ID
   * @param id - Earthquake ID
   * @returns Observable<any>
   */
  getEarthquakeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
