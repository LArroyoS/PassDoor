import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { Inicio } from './inicio/inicio.page';
import { Registro } from './registro/registro.page';
import { RestablecerClave } from './restablecerClave/restablecerClave.page';

//Guardia
import { AuthGuard } from './guardia/auth.guard';
import { SinauthGuard } from './guardia/sinauth.guard';

const routes: Routes = [
  
  {

    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [ SinauthGuard ]
    
  },
  {

    path: '',
    redirectTo: 'home',
    pathMatch: 'full'

  },
  {

    path: 'Inicio',
    component: Inicio,
    canActivate: [ AuthGuard ]

  },
  {

    path: 'Registro',
    component: Registro,
    canActivate: [ SinauthGuard ]

  },
  {

    path: 'RecuperarClave',
    component: RestablecerClave,
    canActivate: [ SinauthGuard ]

  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
