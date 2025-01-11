import { TestBed } from '@angular/core/testing';

import { EarthquakesServiceService } from './earthquakes-service.service';

describe('EarthquakesServiceService', () => {
  let service: EarthquakesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EarthquakesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
