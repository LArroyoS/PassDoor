import { Component, OnInit } from '@angular/core';
import { Usuario } from '../Entidades/usuario.class';
import { AutenticacionFirebaseService } from '../services/autenticacion/autenticacion-firebase.service';
import { Router } from '@angular/router';

@Component({
    
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.css'],

})
  
export class Registro implements OnInit {

  usuario: Usuario;

  titulo = 'REGISTRO';

  btnRegresar = 'REGRESAR';
  btnRegistrarse = 'REGISTRARSE';

  lblCorreo = 'CORREO';
  lblCodigoAcceso = 'CONTRASEÑA';
  
  constructor(
    private autenticacion:AutenticacionFirebaseService, 
    private router:Router){

      this.usuario = new Usuario();

  }

  ngOnInit(){



  }

  async enRegistro(){

    //console.log(this.usuario.email+" "+this.usuario.clave);
    const usuario = await this.autenticacion.enRegistro(this.usuario);

    if(usuario){

      console.log('Exito al crear usuario');
      this.router.navigateByUrl('/');

    }

  }

}