import { TestBed } from '@angular/core/testing';

import { AuthfireService } from './authfire.service';

describe('AuthfireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthfireService = TestBed.get(AuthfireService);
    expect(service).toBeTruthy();
  });
});
