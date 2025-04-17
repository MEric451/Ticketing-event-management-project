import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-attendee-details-modal',
  templateUrl: './attendee-details-modal.component.html',
  styleUrls: ['./attendee-details-modal.component.css']
})
export class AttendeeDetailsModalComponent {
  // Making dialogRef optional
  public dialogRef?: MatDialogRef<AttendeeDetailsModalComponent>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    dialogRef: MatDialogRef<AttendeeDetailsModalComponent>  // Inject dialogRef into the constructor
  ) {
    this.dialogRef = dialogRef;  // Assign the injected value to dialogRef
  }

  closeDialog(): void {
    this.dialogRef?.close(); // Close the dialog, using optional chaining
  }
}
