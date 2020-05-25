import { TestBed } from '@angular/core/testing';

import { ConexionFirebaseService } from './conexion-firebase.service';

describe('ConexionFirebaseService', () => {
  let service: ConexionFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConexionFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
