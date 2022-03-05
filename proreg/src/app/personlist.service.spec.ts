import { TestBed } from '@angular/core/testing';

import { PersonlistService } from './personlist.service';

describe('PersonlistService', () => {
  let service: PersonlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
