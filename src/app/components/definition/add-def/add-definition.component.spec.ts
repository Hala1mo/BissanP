import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDefinitionComponent } from './add-definition.component';

describe('AddDefComponent', () => {
  let component: AddDefinitionComponent;
  let fixture: ComponentFixture<AddDefinitionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDefinitionComponent]
    });
    fixture = TestBed.createComponent(AddDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
