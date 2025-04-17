import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AttendeeService } from '../attendee.service';
import { EventService } from '../event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-attendee',
  templateUrl: './register-attendee.component.html',
  styleUrls: ['./register-attendee.component.css']
})
export class RegisterAttendeeComponent implements OnInit {
  attendeeForm: FormGroup;
  events: any[] = [];
  selectedEventName: string = '';

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private attendeeService: AttendeeService,
    private toastr: ToastrService
  ) {
    this.attendeeForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      eventId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Fetch all events
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
    });

    // Listen for changes to the selected event ID
    this.attendeeForm.get('eventId')?.valueChanges.subscribe((selectedId: string) => {
      const selectedEvent = this.events.find(event => event.id === selectedId);
      this.selectedEventName = selectedEvent ? selectedEvent.name : '';
    });
  }

  onSubmit(): void {
    if (this.attendeeForm.valid) {
      const attendee = this.attendeeForm.value;
      const id = Number(attendee.eventId);

      console.log('Submitting attendee:', attendee, 'with eventId:', id);

  
      this.attendeeService.addAttendee(attendee, id).subscribe({
        next: (data) => {
          console.log('Attendee registered successfully:', data);
          this.toastr.success('Attendee registered successfully!');
          this.attendeeForm.reset();
          this.selectedEventName = '';
        },
        error: (err) => {
          console.error('Error registering attendee:', err);
          this.toastr.error('Error registering attendee, please try again.');
        }
      });
    } else {
      this.toastr.warning('Please fill out all required fields correctly.');
    }
  }
  
}
