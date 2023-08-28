import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDialogComponent } from './type-dialog.component';

describe('TypeDialogComponent', () => {
  let component: TypeDialogComponent;
  let fixture: ComponentFixture<TypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TypeDialogComponent]
    });
    fixture = TestBed.createComponent(TypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
