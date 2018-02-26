import { TestBed, inject } from '@angular/core/testing';

import { ShortVisitsService } from './short-visits.service';

describe('ShortVisitsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShortVisitsService]
    });
  });

  it('should be created', inject([ShortVisitsService], (service: ShortVisitsService) => {
    expect(service).toBeTruthy();
  }));
});
