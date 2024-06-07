import { TestBed } from '@angular/core/testing';

import { UsesServiceService } from './uses-service.service';

describe('UsesServiceService', () => {
  let service: UsesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
