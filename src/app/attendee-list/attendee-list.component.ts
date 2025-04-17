import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // ⬅️ Added ActivatedRoute
import { ToastrService } from 'ngx-toastr';
import { AttendeeService } from '../attendee.service';
import { EventService } from '../event.service';
import { MatDialog } from '@angular/material/dialog';
import { AttendeeDetailsModalComponent } from '../attendee-details-modal/attendee-details-modal.component';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.css']
})
export class AttendeeListComponent implements OnInit {
  attendees: any[] = [];
  eventNames: { [key: number]: string } = {};
  attendee: any; // ⬅️ For single attendee fetch if needed

  constructor(
    private attendeeService: AttendeeService,
    private eventService: EventService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute // ⬅️ Injected ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Your original logic
    this.fetchAttendees();

    // Additional: Fetch specific attendee if route param exists
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = Number(id); 
      this.attendeeService.getAttendeeById(numericId).subscribe({
        next: (attendee) => this.attendee = attendee,
        error: (err) => console.error('Error fetching attendee', err)
      });
    }
  }

  fetchAttendees(): void {
    this.attendeeService.getAttendees().subscribe({
      next: (data) => {
        this.attendees = data;

        const eventIds = [...new Set(data.map(a => a.eventId))];

        eventIds.forEach(eventId => {
          this.eventService.getEventById(eventId).subscribe({
            next: (event) => {
              this.eventNames[eventId] = event?.name || 'Unknown Event';
            },
            error: (err) => {
              console.error(`Error fetching event name for ${eventId}`, err);
              this.eventNames[eventId] = 'Unknown Event';
            }
          });
        });
      },
      error: (err) => {
        console.error('Error fetching attendees:', err);
      }
    });
  }

  getEventName(eventId: number): string {
    return this.eventNames[eventId] || 'Loading...';
  }

  viewAttendee(attendeeId: number): void {
    this.attendeeService.getAttendeeById(attendeeId).subscribe({
      next: (attendee) => {
        this.dialog.open(AttendeeDetailsModalComponent, {
          width: '400px',
          data: attendee // this will be injected as `data` in your modal component
        });
      },
      error: (err) => {
        console.error('Failed to load attendee:', err);
      }
    });
  }
  
  // deleteAttendee(attendeeId: number): void {
  //   if (confirm('Are you sure you want to delete this attendee?')) {
  //     this.attendeeService.deleteAttendee(attendeeId).subscribe({
  //       next: (res) => {
  //         console.log('Delete response:', res); // now should be a JSON object like { message: "..." }
  //         this.fetchAttendees();
  
  //         // Show the message returned from backend
  //         const successMessage =
  //           res && typeof res.message === 'string' && res.message.trim() !== ''
  //             ? res.message
  //             : 'Deleted successfully!';
          
  //         this.toastr.success(successMessage);
  //       },
  //       error: (err) => {
  //         console.error('Error deleting attendee:', err);
  //         const errorMessage =
  //           err.error && typeof err.error.message === 'string' && err.error.message.trim() !== ''
  //             ? err.error.message
  //             : 'Failed to delete attendee.';
  //         this.toastr.error(errorMessage);
  //       }
  //     });
  //   }
  // }
  

  deleteAttendee(attendeeId: number): void {
    if (confirm('Are you sure you want to delete this attendee?')) {
      this.attendeeService.deleteAttendee(attendeeId).subscribe({
        next: (res) => {
          console.log('Delete response:', res); // should be a JSON object like { message: "..." }
          this.fetchAttendees(); // Refresh the list
  
          const successMessage =
            res && typeof res.message === 'string' && res.message.trim() !== ''
              ? res.message
              : 'Attendee deleted successfully!';
  
          this.toastr.success(successMessage);
        },
        error: (err) => {
          console.error('Error deleting attendee:', err);
  
          const errorMessage =
            err.error && typeof err.error.message === 'string' && err.error.message.trim() !== ''
              ? err.error.message
              : 'Failed to delete attendee. The attendee might already have a ticket!';
  
          this.toastr.error(errorMessage);
        }
      });
    }
  }
  
  
  
}
  

