import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CusDetailsComponent } from './cus-details.component';

describe('CusDetailsComponent', () => {
  let component: CusDetailsComponent;
  let fixture: ComponentFixture<CusDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CusDetailsComponent]
    });
    fixture = TestBed.createComponent(CusDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
