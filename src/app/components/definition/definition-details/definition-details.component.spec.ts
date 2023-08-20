import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinitionDetailsComponent } from './definition-details.component';

describe('DetailsDefComponent', () => {
  let component: DefinitionDetailsComponent;
  let fixture: ComponentFixture<DefinitionDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefinitionDetailsComponent]
    });
    fixture = TestBed.createComponent(DefinitionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
