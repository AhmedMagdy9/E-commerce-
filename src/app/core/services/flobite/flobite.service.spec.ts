import { TestBed } from '@angular/core/testing';

import { FlobiteService } from './flobite.service';

describe('FlobiteService', () => {
  let service: FlobiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlobiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
