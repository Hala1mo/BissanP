import { TestBed } from '@angular/core/testing';

import { DefinationService } from './defination.service';

describe('DefinationService', () => {
  let service: DefinationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
