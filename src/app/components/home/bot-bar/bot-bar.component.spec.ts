import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotBarComponent } from './bot-bar.component';

describe('TableComponent', () => {
  let component: BotBarComponent;
  let fixture: ComponentFixture<BotBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BotBarComponent]
    });
    fixture = TestBed.createComponent(BotBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
