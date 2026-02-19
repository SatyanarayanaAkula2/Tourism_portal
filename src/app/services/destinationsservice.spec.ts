import { TestBed } from '@angular/core/testing';

import { Destinationsservice } from './destinationsservice';

describe('Destinationsservice', () => {
  let service: Destinationsservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Destinationsservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
