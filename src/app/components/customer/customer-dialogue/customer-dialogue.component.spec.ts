import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDialogueComponent } from './customer-dialogue.component';

describe('CustomerDialogueComponent', () => {
  let component: CustomerDialogueComponent;
  let fixture: ComponentFixture<CustomerDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerDialogueComponent]
    });
    fixture = TestBed.createComponent(CustomerDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
