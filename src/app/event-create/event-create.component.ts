import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  eventForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', Validators.required],
      capacity: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit() {
    if (this.eventForm.valid) {
      this.eventService.addEvent(this.eventForm.value).subscribe({
        next: () => {
          this.toastr.success('Event created successfully!');
          this.eventForm.reset(); 
          this.router.navigate(['/events']); 
        },
        error: (err) => {
          console.error('Error creating event:', err);
          this.toastr.error('Failed to create event. Please try again.');
        }
      });
    }
  }
}