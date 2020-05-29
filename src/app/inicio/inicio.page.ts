import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ConexionFirebaseService } from '../services/conexion/conexion-firebase.service';
import { AutenticacionFirebaseService } from '../services/autenticacion/autenticacion-firebase.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { isNullOrUndefined } from 'util';

@Component({

  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.css'],

})

export class Inicio implements OnInit {

  private lblNotificaciones = 'NOTIFICACIONES';

  private EstadoGPS = ['ACTIVO', 'DESACTIVO'] as const;
  private EstadosNotificacion = ['aceptable','advertencia', 'critico'] as const;

  private opciones = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true} as const;

  private lblEstadoGPS: string;
  private lblEstadoNotificacion: string;

  private logs: String = '';

  private Distancia = 0.0000;
  private Puerta = 'Cerrada';

  PosicionFija = { 'latitud': 0, 'longitud': 0 };
  PosicionActual = { 'latitud': 1, 'longitud': 1 };

  private idUsuario:string = '';

  constructor(
    private conexion: ConexionFirebaseService,
    private geolocation: Geolocation,
    private autenticacion: AutenticacionFirebaseService,
    private router: Router,
    private auth:AngularFireAuth,
  ) {

    this.lblEstadoGPS = this.EstadoGPS[1];
    this.lblEstadoNotificacion = this.EstadosNotificacion[2];

    this.auth.authState.subscribe((usuario) => {
      
      if(isNullOrUndefined(usuario)){

        this.CerrarSesion();

      }
      else{

        this.idUsuario = usuario.uid;

      }
      
    });

  }

  ErrorLocalizacion(){

      this.Puerta = 'Cerrada';
      this.lblEstadoNotificacion = this.EstadosNotificacion[2];
      this.lblEstadoGPS = this.EstadoGPS[1];
      this.logs = 'Permiso GPS Denegado';

  }

  Localizacion(){

    let _me = this;
    this.geolocation.getCurrentPosition().then((resultado) => {

        _me.logs = "";
  
        _me.PosicionActual['latitud'] = resultado.coords.latitude;
        _me.PosicionActual['longitud'] = resultado.coords.longitude;
  
        _me.guardar(_me.PosicionActual);
  
        _me.distanciaCoord();
  
        if (_me.lblEstadoGPS != _me.EstadoGPS[0]) {
  
          _me.lblEstadoGPS = _me.EstadoGPS[0];
          _me.lblEstadoNotificacion = _me.EstadosNotificacion[0];
  
        }
  
      }).catch((error) => {
  
        _me.Puerta = 'Cerrada';
        _me.lblEstadoNotificacion = _me.EstadosNotificacion[2];
        _me.lblEstadoGPS = _me.EstadoGPS[1];
        _me.logs = 'WP '+error;
  
      });
    
    this.geolocation.watchPosition(this.opciones).subscribe( (resultado) => {

      try {
  
        _me.logs = "";
  
        _me.PosicionActual['latitud'] = resultado.coords.latitude;
        _me.PosicionActual['longitud'] = resultado.coords.longitude;
  
        _me.guardar(_me.PosicionActual);
  
        _me.distanciaCoord();
  
        if (_me.lblEstadoGPS != _me.EstadoGPS[0]) {
  
          _me.lblEstadoGPS = _me.EstadoGPS[0];
          _me.lblEstadoNotificacion = _me.EstadosNotificacion[0];
  
        }
  
      }
      catch (error) {
  
        _me.Puerta = 'Cerrada';
        _me.lblEstadoNotificacion = _me.EstadosNotificacion[2];
        _me.lblEstadoGPS = _me.EstadoGPS[1];
        _me.logs = 'WP '+error;
  
      }

    });

  }

  //Evento de fijado de gps
  FijarPosicion() {

    this.PosicionFija['latitud'] = this.PosicionActual['latitud'];
    this.PosicionFija['longitud'] = this.PosicionActual['longitud'];
    this.distanciaCoord();

  }

  rad = function(x) {return x*Math.PI/180;}

  //Calcular distancia
  distanciaCoord(){

    let lon1 = this.PosicionActual['longitud'];
    let lon2 = this.PosicionFija['longitud'];
    let lat1 = this.PosicionActual['latitud'];
    let lat2 = this.PosicionFija['latitud'];

    var R = 6378.137; //Radio de la tierra en km
    var dLat = this.rad( lat2 - lat1 );
    var dLong = this.rad( lon2 - lon1 );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    this.Distancia = parseFloat(d.toFixed(4));

    if(this.Distancia<0.002){

      this.Puerta = 'Abierta';
      this.lblEstadoNotificacion = this.EstadosNotificacion[1];

    }
    else if(this.Puerta == 'Abierta'){

      this.Puerta = 'Cerrada';
      this.lblEstadoNotificacion = this.EstadosNotificacion[0];

    }

  }

  guardar(coordenada){

    if(this.idUsuario!=''){
    
      this.conexion.modificarCoordenada(this.idUsuario,coordenada);
    
    }

  }

  async CerrarSesion(){

    await this.autenticacion.enCerrarSesion();
    this.router.navigate(['/']);

  }


  ngOnInit(){

    this.Localizacion();

  }

}
