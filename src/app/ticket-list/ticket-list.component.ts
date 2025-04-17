import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  tickets: any[] = [];

  constructor(
    private ticketService: TicketService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchTickets();
  }

  fetchTickets(): void {
    this.ticketService.getTickets().subscribe({
      next: (data) => {
        this.tickets = data; // Data includes amount, attendeeId, etc.
      },
      error: (err) => {
        console.error('Error fetching tickets:', err);
        this.toastr.error('Failed to load tickets.');
      }
    });
  }

  cancelTicket(ticketId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to cancel this ticket?'
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteTicket(ticketId);
      }
    });
  }

  deleteTicket(ticketId: string): void {
    this.ticketService.deleteTicket(ticketId).subscribe({
      next: () => {
        this.toastr.success('Ticket cancelled successfully!');
        this.fetchTickets();
      },
      error: (err) => {
        console.error('Error deleting ticket:', err);
        this.toastr.error('Failed to cancel ticket.');
      }
    });
  }
}
