import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KenComponent } from './ken.component';

describe('KenComponent', () => {
  let component: KenComponent;
  let fixture: ComponentFixture<KenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KenComponent]
    });
    fixture = TestBed.createComponent(KenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
