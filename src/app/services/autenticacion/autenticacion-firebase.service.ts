import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

//Entidad
import { Usuario } from '../../Entidades/usuario.class';

@Injectable({

  providedIn: 'root'

})

export class AutenticacionFirebaseService {

  public inicioSesion: any = false;

  constructor(public afa: AngularFireAuth) { 

    afa.authState.subscribe(usuario => (this.inicioSesion = usuario));

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

}
