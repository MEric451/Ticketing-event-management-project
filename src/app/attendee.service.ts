import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendeeService {
  private baseUrl = 'http://172.16.8.72:8080/attendee';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // POST: Create a new attendee
  addAttendee(attendee: any, id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}`, attendee, this.httpOptions);
  }

  // GET: Fetch all attendees
  getAttendees(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // GET: Fetch a specific attendee by ID
  getAttendeeById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // GET: Fetch attendees by event ID
  getAttendeesByEvent(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?eventId=${eventId}`);
  }

  // PUT: Update an attendee
  updateAttendee(id: number, attendee: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, attendee, this.httpOptions);
  }

  // DELETE: Delete an attendee by ID
  deleteAttendee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`, this.httpOptions);
  }
}
