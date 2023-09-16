import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationCustomersComponent } from './location-customers.component';

describe('LocationCustomersComponent', () => {
  let component: LocationCustomersComponent;
  let fixture: ComponentFixture<LocationCustomersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocationCustomersComponent]
    });
    fixture = TestBed.createComponent(LocationCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
