import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { Inicio } from './inicio/inicio.page';
import { Registro } from './registro/registro.page';

import { UsuarioAutenticadoFirebaseService } from './services/usuarioAutenticado/usuario-autenticado-firebase.service';

const routes: Routes = [
  
  {

    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {

    path: 'Inicio',
    component: Inicio,
    canActivate: [ UsuarioAutenticadoFirebaseService ]

  },
  {

    path: 'Registro',
    component: Registro

  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
