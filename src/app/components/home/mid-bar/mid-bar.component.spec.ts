import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MidBarComponent } from './mid-bar.component';

describe('MidBarComponent', () => {
  let component: MidBarComponent;
  let fixture: ComponentFixture<MidBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MidBarComponent]
    });
    fixture = TestBed.createComponent(MidBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
