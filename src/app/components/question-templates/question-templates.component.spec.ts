import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTemplatesComponent } from './question-templates.component';

describe('QuestionTemplatesComponent', () => {
  let component: QuestionTemplatesComponent;
  let fixture: ComponentFixture<QuestionTemplatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionTemplatesComponent]
    });
    fixture = TestBed.createComponent(QuestionTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
