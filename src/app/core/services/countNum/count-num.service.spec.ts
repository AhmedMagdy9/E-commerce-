import { TestBed } from '@angular/core/testing';

import { CountNumService } from './count-num.service';

describe('CountNumService', () => {
  let service: CountNumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountNumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
