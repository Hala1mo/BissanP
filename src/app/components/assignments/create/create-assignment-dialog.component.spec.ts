import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssignmentDialogComponent } from './create-assignment-dialog.component';

describe('CreateComponent', () => {
  let component: CreateAssignmentDialogComponent;
  let fixture: ComponentFixture<CreateAssignmentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAssignmentDialogComponent]
    });
    fixture = TestBed.createComponent(CreateAssignmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
