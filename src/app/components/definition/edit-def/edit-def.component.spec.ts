import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDefComponent } from './edit-def.component';

describe('EditDefComponent', () => {
  let component: EditDefComponent;
  let fixture: ComponentFixture<EditDefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDefComponent]
    });
    fixture = TestBed.createComponent(EditDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
