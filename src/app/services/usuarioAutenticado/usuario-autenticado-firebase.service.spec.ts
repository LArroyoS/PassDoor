import { TestBed } from '@angular/core/testing';

import { UsuarioAutenticadoFirebaseService } from './usuario-autenticado-firebase.service';

describe('UsuarioAutenticadoFirebaseService', () => {
  let service: UsuarioAutenticadoFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioAutenticadoFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
