import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SinauthGuard implements CanActivate {
  
  constructor(
    private authenticacion:AngularFireAuth,
    private router:Router){



  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.authenticacion.authState.pipe(map( usuario => {
      
        if(isNullOrUndefined(usuario)){

          return true;

        }
        else{ 
          
          this.router.navigate(['/Inicio']);
          return true;
        
        } 
      
      }));

  }
  
}
