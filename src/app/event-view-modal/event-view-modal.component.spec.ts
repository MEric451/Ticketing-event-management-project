import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewModalComponent } from './event-view-modal.component';

describe('EventViewModalComponent', () => {
  let component: EventViewModalComponent;
  let fixture: ComponentFixture<EventViewModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventViewModalComponent]
    });
    fixture = TestBed.createComponent(EventViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
