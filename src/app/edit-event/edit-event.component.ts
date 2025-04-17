import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  eventForm!: FormGroup;
  eventId!: string;

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventId = this.route.snapshot.paramMap.get('id') as string;

    // Ensure that the form is initialized here
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]]
    });

    this.getEventData();
  }

  getEventData() {
    this.eventService.getEventById(this.eventId).subscribe(
      (data) => {
        console.log('Fetched event:', data); // 👈 Confirm you're getting valid data
        this.eventForm.patchValue({
          name: data.name,
          date: data.date,
          location: data.location,
          capacity: data.capacity
        });
      },
      (error) => {
        this.toastr.error('Failed to load event data');
      }
    );
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const updatedEvent = this.eventForm.value;
  
      console.log('Updated Event:', updatedEvent);
      this.eventService.updateEvent(this.eventId, updatedEvent).subscribe(
        (response) => {
          console.log('Event updated successfully:', response);
          this.toastr.success('Event updated successfully!');
          
          this.eventForm.reset(); 
          this.router.navigate(['event-list']); 
        },
        (error) => {
          console.error('Failed to update event', error);
          this.toastr.error('Failed to update event');
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }  
}