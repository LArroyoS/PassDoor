import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, 
RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionFirebaseService } from '../autenticacion/autenticacion-firebase.service';
import { Router } from '@angular/router';

@Injectable({

  providedIn: 'root'

})

export class UsuarioAutenticadoFirebaseService implements CanActivate{

  constructor(
    private autenticacion:AutenticacionFirebaseService,
    private router:Router
    ){


  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> |
    Promise<boolean | UrlTree> | boolean | UrlTree{

      if(this.autenticacion.inicioSesion){

        return true;

      }

      console.log('acceso denegado');
      this.router.navigateByUrl('/');
      return false;

  }

}
