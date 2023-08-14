import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDefComponent } from './details-def.component';

describe('DetailsDefComponent', () => {
  let component: DetailsDefComponent;
  let fixture: ComponentFixture<DetailsDefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsDefComponent]
    });
    fixture = TestBed.createComponent(DetailsDefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
