import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketIssueComponent } from './ticket-issue.component';

describe('TicketIssueComponent', () => {
  let component: TicketIssueComponent;
  let fixture: ComponentFixture<TicketIssueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketIssueComponent]
    });
    fixture = TestBed.createComponent(TicketIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
