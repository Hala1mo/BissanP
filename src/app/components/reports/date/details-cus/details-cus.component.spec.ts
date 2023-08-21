import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCusComponent } from './details-cus.component';

describe('DetailsCusComponent', () => {
  let component: DetailsCusComponent;
  let fixture: ComponentFixture<DetailsCusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsCusComponent]
    });
    fixture = TestBed.createComponent(DetailsCusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
