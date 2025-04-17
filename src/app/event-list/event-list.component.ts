import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { MatDialog } from '@angular/material/dialog';
import { EventViewModalComponent } from '../event-view-modal/event-view-modal.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService, private router: Router, public dialog: MatDialog, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => {
        console.error('Error fetching events:', err);
      }
    });
  }

  updateEvent(id: string, updatedEvent: any) {
    this.eventService.updateEvent(id, updatedEvent).subscribe({
      next: () => {
        this.toastr.success('Event updated successfully!'); // Show success toastr notification
        this.fetchEvents(); // Refresh the event list after update

        // Navigate back to the event list page
        this.router.navigate(['/event-list']); // Navigate to the event list route
      },
      error: (err) => {
        console.error('Error updating event:', err);
        this.toastr.error('Failed to update event'); // Show error toastr notification
      }
    });
  }

  viewEvent(id: string) {
    this.eventService.getEventById(id).subscribe(event => {
      const dialogRef = this.dialog.open(EventViewModalComponent, {
        width: '400px',
        data: event // passing event data to the modal

      });

      dialogRef.afterClosed().subscribe(result => {
        // Handle modal close if needed
      });
    });
  }

  editEvent(id: string) {
    this.router.navigate(['/events/edit', id]);
  }


  // deleteEvent(id: number): void{
  //   console.log('Delete button for location:', id)
  //   if (confirm('Are you sure you want to delete this event?')) {
  //     this.eventService.deleteEvent(id).subscribe({
  //       next: () => {
  //         this.fetchEvents(); // Refresh the event list after deletion
  //       },
  //       error: (err) => {
  //         console.error('Error deleting event:', err);
  //       }
  //     });
  //   }
  // }

  deleteEvent(id: number): void {
    console.log('Delete button for location:', id);
    if (confirm('Are you sure you want to delete this event?')) {
      this.eventService.deleteEvent(id).subscribe({
        next: (res) => {
          console.log('Delete response:', res); // should be a JSON object like { message: "..." }
          this.fetchEvents(); // Refresh the event list after deletion

          // Show the message returned from backend
          const successMessage =
            res && typeof res.message === 'string' && res.message.trim() !== ''
              ? res.message
              : 'Event deleted successfully!';

          this.toastr.success(successMessage);
        },
        error: (err) => {
          console.error('Error deleting event:', err);

          // Cleanly extract message from backend JSON response
          const errorMessage =
            err.error && typeof err.error.error === 'string' && err.error.error.trim() !== ''
              ? err.error.error
              : 'Failed to delete event. The event is already assigned an attendee! Delete the attendee first!';
          this.toastr.error(errorMessage);
        }

      });
    }
  }




}