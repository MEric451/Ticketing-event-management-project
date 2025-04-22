import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatDividerModule } from '@angular/material/divider';

import { MatGridListModule } from '@angular/material/grid-list';

import { RouterModule } from '@angular/router';
import { EventCreateComponent } from './event-create/event-create.component';
import { HttpClientModule } from '@angular/common/http';
import { EventListComponent } from './event-list/event-list.component';
import { EventViewModalComponent } from './event-view-modal/event-view-modal.component';
import { RegisterAttendeeComponent } from './register-attendee/register-attendee.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { AttendeeListComponent } from './attendee-list/attendee-list.component';
import { AttendeeDetailsModalComponent } from './attendee-details-modal/attendee-details-modal.component';
import { TicketIssueComponent } from './ticket-issue/ticket-issue.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LandingComponent } from './landing/landing.component';
import { KenComponent } from './ken/ken.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EventCreateComponent,
    EventListComponent,
    EventViewModalComponent,
    RegisterAttendeeComponent,
    EditEventComponent,
    AttendeeListComponent,
    AttendeeDetailsModalComponent,
    TicketIssueComponent,
    TicketListComponent,
    ConfirmDialogComponent,
    LandingComponent,
    KenComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    HttpClientModule,

    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 3000
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
