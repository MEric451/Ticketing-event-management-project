import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventListComponent } from './event-list/event-list.component';
import { EditEventComponent } from './edit-event/edit-event.component';
import { RegisterAttendeeComponent } from './register-attendee/register-attendee.component';
import { AttendeeListComponent } from './attendee-list/attendee-list.component';
import { TicketIssueComponent } from './ticket-issue/ticket-issue.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { LandingComponent } from './landing/landing.component';



const routes: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent},

   
      { path: 'landing', component: LandingComponent },
      { path: 'event-create', component: EventCreateComponent },
      { path: 'event-list', component: EventListComponent },
      { path: 'events/edit/:id', component: EditEventComponent },
      { path: 'register-attendee', component: RegisterAttendeeComponent },
      { path: 'attendee-list', component: AttendeeListComponent },
      { path: 'ticket-issue', component: TicketIssueComponent },
      { path: 'ticket-list', component: TicketListComponent },
      { path: '', component: LandingComponent },


    
  
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
