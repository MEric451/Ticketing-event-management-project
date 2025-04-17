import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AttendeeService } from '../attendee.service';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-issue',
  templateUrl: './ticket-issue.component.html',
  styleUrls: ['./ticket-issue.component.css']
})
export class TicketIssueComponent implements OnInit {
  attendees: any[] = [];
  ticketTypes = ['VIP', 'Regular'];
  selectedAttendee: string = '';
  selectedTicketType: string = 'Regular';
  priceToPay: number | null = null;

  constructor(
    private attendeeService: AttendeeService,
    private ticketService: TicketService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchAttendees();  // Load attendees on component init
  }

  fetchAttendees(): void {
    this.attendeeService.getAttendees().subscribe({
      next: (data) => {
        this.attendees = data;
      },
      error: (err) => {
        console.error('Error fetching attendees:', err);
        this.toastr.error('Failed to load attendees');
      }
    });
  }

  issueTicket(): void {
    if (!this.selectedAttendee || !this.selectedTicketType || !this.priceToPay || this.priceToPay <= 0) {
      this.toastr.error('Please fill in all fields correctly!');
      return;
    }

    const ticket = {
      ticketType: this.selectedTicketType,
      price: this.priceToPay,
      issuedAt: new Date().toISOString()
    };

    const attendeeId = Number(this.selectedAttendee);

    this.ticketService.addTicket(ticket, attendeeId).subscribe({
      next: (data) => {
        console.log('Ticket issued successfully:', data);
        this.toastr.success('Ticket issued successfully!');
        this.router.navigate(['/tickets']);

        // Clear form
        this.selectedAttendee = '';
        this.selectedTicketType = 'Regular';
        this.priceToPay = null;
      },
      error: (err) => {
        console.error('Error issuing ticket:', err);
        this.toastr.error('Failed to issue ticket.');
      }
    });
  }
}
