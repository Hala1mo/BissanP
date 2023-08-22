import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDialogueComponent } from './contact-dialogue.component';

describe('ContactDialogueComponent', () => {
  let component: ContactDialogueComponent;
  let fixture: ComponentFixture<ContactDialogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactDialogueComponent]
    });
    fixture = TestBed.createComponent(ContactDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
