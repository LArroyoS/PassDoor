import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

//ionic generate guard ruta

@Injectable({

  providedIn: 'root'

})

export class AuthGuard implements CanActivate {
  
  constructor(
    private authenticacion:AngularFireAuth,
    private router:Router){



  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      //true deja entrar
      //false no deja entrar

      return this.authenticacion.authState.pipe(map( usuario => {
      
        if(isNullOrUndefined(usuario)){

          this.router.navigate(['/']);
          return false;

        }
        else{ 
          
          return true;
        
        } 
      
      }));

  }
  
}
