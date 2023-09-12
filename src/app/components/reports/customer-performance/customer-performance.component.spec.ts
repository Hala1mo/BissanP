import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPerformanceComponent } from './customer-performance.component';

describe('CustomerPerformanceComponent', () => {
  let component: CustomerPerformanceComponent;
  let fixture: ComponentFixture<CustomerPerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerPerformanceComponent]
    });
    fixture = TestBed.createComponent(CustomerPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
