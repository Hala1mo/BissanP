import { TestBed } from '@angular/core/testing';

import { DefinitionService } from './definition.service';

describe('DefinationService', () => {
  let service: DefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
