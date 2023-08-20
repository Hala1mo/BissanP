import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionDialogComponent } from './definition-dialog.component';

describe('DefinitionDialogComponent', () => {
  let component: DefinitionDialogComponent;
  let fixture: ComponentFixture<DefinitionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefinitionDialogComponent]
    });
    fixture = TestBed.createComponent(DefinitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
