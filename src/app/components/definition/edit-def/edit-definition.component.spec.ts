import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDefinitionComponent } from './edit-definition.component';

describe('EditDefComponent', () => {
  let component: EditDefinitionComponent;
  let fixture: ComponentFixture<EditDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDefinitionComponent]
    });
    fixture = TestBed.createComponent(EditDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
