import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private baseUrl = 'http://172.16.8.72:8080/event';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })
  };

  constructor(private http: HttpClient) {}

  // Get all events
  getEvents(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }
  

  // Get a single event by ID (e.g., EVT-01)
  getEventById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Create a new event
  addEvent(event: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, event, this.httpOptions);
  }

  // Update an existing event
  updateEvent(id: string, event: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, event, this.httpOptions);
  }

  // Delete an event by ID
  deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, this.httpOptions);
  }
}
