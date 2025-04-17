import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://172.16.8.72:8080/ticket';  // URL for ticket-related operations


private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })
  };

  constructor(private http: HttpClient) {}

  addTicket(ticket: any, id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${id}`, ticket, this.httpOptions); 
 
  }

  getTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl); // Fetch all tickets
  }

  getTicketsByAttendee(attendeeId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?attendeeId=${attendeeId}`); // Fetch tickets by attendee
  }

  deleteTicket(ticketId: string): Observable<string> {
    return this.http.delete(`${this.baseUrl}/${ticketId}`, { responseType: 'text' });
  }
  
  

}