import { TestBed } from '@angular/core/testing';

import { AuthenticacionService } from './authenticacion.service';

describe('AutenticacionService', () => {
  let service: AuthenticacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
