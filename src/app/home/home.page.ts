import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Entidades/Objetos/usuario.class';
import { AutenticacionFirebaseService } from '../services/autenticacion/autenticacion-firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  titulo = 'INICIAR SESIÓN';
  btnIngresar = 'INGRESAR';
  btnRegistrarse = 'REGISTRARSE';

  lblCorreo = 'CORREO';
  lblCodigoAcceso = 'CONTRASEÑA';

  refOlvideCodAcc = 'OLVIDÉ MI CONTRASEÑA';

  usuario: Usuario;

  constructor(
    private autenticacion:AutenticacionFirebaseService,
    private router:Router){

      this.usuario = new Usuario();

  }

  ngOnInit(){



  }

  async enIngresar(){

    //console.log(this.usuario.email+" "+this.usuario.clave);
    const usuario = await this.autenticacion.enInicioSesion(this.usuario);

    if(usuario){

      console.log('Exito al iniciar sesión');
      this.router.navigateByUrl('/Inicio');

    }

  }

}
