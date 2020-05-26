import { Component } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ConexionFirebaseService } from '../services/conexion/conexion-firebase.service';
import { AutenticacionFirebaseService } from '../services/autenticacion/autenticacion-firebase.service';
import { Router } from '@angular/router';
import { Coordenada } from '../Entidades/Objetos/coordenada.class';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.css'],
})

export class Inicio {

  private lblNotificaciones = 'NOTIFICACIONES';

  private EstadoGPS = ['ACTIVO', 'DESACTIVO'] as const;
  private EstadosNotificacion = ['aceptable','advertencia', 'critico'] as const;

  private opciones = { maximumAge: 0, timeout: 10000, enableHighAccuracy: true } as const;

  private lblEstadoGPS: string;
  private lblEstadoNotificacion: string;

  private logs: String = '';

  private Distancia = 0.0000;
  private Puerta = 'Cerrada';

  PosicionFija = { 'latitud': 0, 'longitud': 0 };
  PosicionActual = { 'latitud': 1, 'longitud': 1 };

  private idUsuario:string;

  coordenada:Coordenada;


  constructor(
    private conexion: ConexionFirebaseService,
    private diagnostic: Diagnostic, 
    private geolocation: Geolocation,
    private autenticacion: AutenticacionFirebaseService,
    private router: Router,
  ) {

    this.lblEstadoGPS = this.EstadoGPS[1];
    this.lblEstadoNotificacion = this.EstadosNotificacion[2];

    this.coordenada = new Coordenada();

    this.idUsuario = autenticacion.inicioSesion.uid

  }

  FuncionaLocalizacion = (resultado) => {

    try {

      this.logs = "";

      this.PosicionActual['latitud'] = resultado.coords.latitude;
      this.PosicionActual['longitud'] = resultado.coords.longitude;

      this.coordenada.latitud = resultado.coords.latitud
      this.coordenada.longitud = resultado.coords.longitude

      this.guardar(this.PosicionActual);

      this.distanciaCoord();

      if (this.lblEstadoGPS != this.EstadoGPS[0]) {

        this.lblEstadoGPS = this.EstadoGPS[0];
        this.lblEstadoNotificacion = this.EstadosNotificacion[0];

      }

    }
    catch (error) {

      this.Puerta = 'Cerrada';
      this.lblEstadoNotificacion = this.EstadosNotificacion[2];
      this.lblEstadoGPS = this.EstadoGPS[1];
      this.logs = error;

    }

  }

  ErrorLocalizacion = (positionError) => {

    this.logs = 'Denegado ' + positionError.PERMISSION_DENIED +
      ' Desabilitado ' + positionError.POSITION_UNAVAILABLE +
      ' Fuera de tiempo ' + positionError.TIMEOUT;

    //if(positionError.PERMISSION_DENIED==0){

      this.Puerta = 'Cerrada';
      this.lblEstadoNotificacion = this.EstadosNotificacion[2];
      this.lblEstadoGPS = this.EstadoGPS[1];
      this.logs = positionError;

    //}

  }

  Localizacion() {

    //navigator.geolocation.getCurrentPosition(this.FuncionaGPS,this.ErrorGPS,this.opciones);
    this.geolocation.watchPosition(this.opciones).subscribe(this.FuncionaLocalizacion, this.ErrorLocalizacion);

  }

  FuncionaGPS = (habilitado) => {

    this.logs = "GPS location is " + (habilitado ? "enabled" : "disabled");

  }

  ErrorGPS = (error) => {

    this.logs = "The following error occurred: ";

  }

  VerificaGPS = () => {

    this.diagnostic.isGpsLocationEnabled().then(this.FuncionaGPS, this.ErrorGPS);

  }

  GPSHabilitado() {

    setTimeout(this.VerificaGPS, 5000);

  }

  //Evento de fijado de gps
  FijarPosicion() {

    this.PosicionFija['latitud'] = this.PosicionActual['latitud'];
    this.PosicionFija['longitud'] = this.PosicionActual['longitud'];
    this.distanciaCoord();

  }

  //Calcular distancia
  distanciaCoord() {

    //double radioTierra = 3958.75;//en millas  
    var radioTierra: number = 6371;//en kilómetros  
    var dLat: number = ((this.PosicionActual['latitud'] - this.PosicionFija['latitud']) * Math.PI) / 180;
    var dLng = ((this.PosicionActual['longitud'] - this.PosicionFija['longitud']) * Math.PI) / 180;
    var sindLat = Math.sin(dLat / 2);
    var sindLng = Math.sin(dLng / 2);
    var va1 = Math.pow(sindLat, 2) + Math.pow(sindLng, 2)
      * Math.cos(this.PosicionFija['latitud'] * Math.PI / 180) * Math.cos(this.PosicionActual['latitud'] * Math.PI / 180);
    var va2 = 2 * Math.atan2(Math.sqrt(va1), Math.sqrt(1 - va1));
    var distancia = radioTierra * va2;

    this.Distancia = parseFloat(distancia.toFixed(4));

    if(this.Distancia<2 && this.Distancia>-2){

      this.Puerta = 'Abierta';
      this.lblEstadoNotificacion = this.EstadosNotificacion[1];

    }
    else if(this.Puerta == 'Abierta'){

      this.Puerta = 'Cerrada';
      this.lblEstadoNotificacion = this.EstadosNotificacion[0];

    }

  }

  guardar(coordenada){

    this.conexion.modificarCoordenada(this.idUsuario,coordenada);

  }

  CerrarSesion(){
    
    this.autenticacion.enCerrarSesion();
    this.router.navigateByUrl('/');

  }

  ngOnInit() {

    //this.GPSHabilitado();
    this.Localizacion();

  }

}
