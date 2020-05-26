import { Component, OnInit } from '@angular/core';
import { AutenticacionFirebaseService } from '../services/autenticacion/autenticacion-firebase.service';

@Component({

  selector: 'app-restablecer',
  templateUrl: './restablecerClave.page.html',
  styleUrls: ['./restablecerClave.page.css'],

})

export class RestablecerClave implements OnInit{

  titulo = 'RESTABLECER CLAVE';

  lblCorreo = 'CORREO';
  lblInstrucciones = 'Escribe tu nombre para enviarte las isntrucciones para recuperar tu contraseña'

  email:string;

  btnRegresar = 'REGRESAR';
  btnEnviar = 'ENVIAR';

  constructor(
    private autenticacion:AutenticacionFirebaseService){

      this.email = "";

  }

  ngOnInit() {

        
    
  }

  async enRestablecer(){

    await this.autenticacion.enRestablecerClave(this.email);

  }

}