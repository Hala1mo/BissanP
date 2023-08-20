import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCusComponent } from './filter-cus.component';

describe('FilterCusComponent', () => {
  let component: FilterCusComponent;
  let fixture: ComponentFixture<FilterCusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCusComponent]
    });
    fixture = TestBed.createComponent(FilterCusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
