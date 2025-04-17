import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AttendeeService } from '../attendee.service';
import { EventService } from '../event.service';
import { TicketService } from '../ticket.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  animations: [
    trigger('pageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('cardFadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('500ms 200ms ease-in', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class LandingComponent implements OnInit {
  stats = [
    { title: 'Events', value: 0, icon: 'event' },
    { title: 'Attendees', value: 0, icon: 'people' },
    { title: 'Tickets', value: 0, icon: 'confirmation_number' }
  ];

  constructor(
    private eventService: EventService,
    private attendeeService: AttendeeService,
    private ticketService: TicketService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.eventService.getEvents().subscribe(events => this.stats[0].value = events.length);
    this.attendeeService.getAttendees().subscribe(attendees => this.stats[1].value = attendees.length);
    this.ticketService.getTickets().subscribe(tickets => this.stats[2].value = tickets.length);
  }
}