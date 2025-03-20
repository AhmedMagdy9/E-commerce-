import { TestBed } from '@angular/core/testing';

import { AuthenSerService } from './authen-ser.service';

describe('AuthenSerService', () => {
  let service: AuthenSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
