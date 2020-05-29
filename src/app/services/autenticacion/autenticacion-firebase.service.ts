import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Usuario } from '../../Entidades/Objetos/usuario.class';

@Injectable({

  providedIn: 'root'

})

export class AutenticacionFirebaseService {

  constructor(public afa: AngularFireAuth) { 

  }

  //Iniciar Sesion
  async enInicioSesion( usuario: Usuario ){

    try{

      return await this.afa.signInWithEmailAndPassword(

        usuario.email,
        usuario.clave

      );

    }
    catch(error){

      console.log('Error en iniciar sesion ', error);

    }

  }

  //Registro
  async enRegistro( usuario: Usuario ){

    try{

      return await this.afa.createUserWithEmailAndPassword(

        usuario.email,
        usuario.clave

      );

    }
    catch(error){

      console.log('Error en registrar usuario ', error);

    }

  }

  async enCerrarSesion(){

    console.log('Sesion cerrada!');
    return this.afa.signOut();

  }

  //Restablecer Clave
  async enRestablecerClave(email:string){

    return await this.afa.sendPasswordResetEmail(email).then(()=>{

      console.log('Enviado');
      return true;

    }).catch(()=>{

      console.log('Error');
      return false;

    });

  }

}
