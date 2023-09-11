import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificCustomerComponent } from './specific-customer.component';

describe('SpecificCustomerComponent', () => {
  let component: SpecificCustomerComponent;
  let fixture: ComponentFixture<SpecificCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificCustomerComponent]
    });
    fixture = TestBed.createComponent(SpecificCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
