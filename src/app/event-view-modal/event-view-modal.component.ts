import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-event-view-modal',
  templateUrl: './event-view-modal.component.html',
  styleUrls: ['./event-view-modal.component.css']
})
export class EventViewModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}


  
}