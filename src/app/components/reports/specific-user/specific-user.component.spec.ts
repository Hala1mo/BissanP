import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificUserComponent } from './specific-user.component';

describe('SpecificUserComponent', () => {
  let component: SpecificUserComponent;
  let fixture: ComponentFixture<SpecificUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpecificUserComponent]
    });
    fixture = TestBed.createComponent(SpecificUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
