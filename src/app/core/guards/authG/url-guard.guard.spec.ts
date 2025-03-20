import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { urlGuardGuard } from './url-guard.guard';

describe('urlGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => urlGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
