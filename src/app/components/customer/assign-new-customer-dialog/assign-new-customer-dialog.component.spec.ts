import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignNewCustomerDialogComponent } from './assign-new-customer-dialog.component';

describe('AssignNewCustomerDialogComponent', () => {
  let component: AssignNewCustomerDialogComponent;
  let fixture: ComponentFixture<AssignNewCustomerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignNewCustomerDialogComponent]
    });
    fixture = TestBed.createComponent(AssignNewCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
