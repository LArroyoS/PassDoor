import { Component } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.css'],
})

export class Inicio {

  lblNotificaciones = 'NOTIFICACIONES';

  EstadoGPS = ['ACTIVO', 'DESACTIVO'] as const;

  opciones = { maximumAge: 0, timeout: 10000, enableHighAccuracy: true } as const;

  lblEstadoGPS: string;

  logs: String[] = [];

  Distancia = 0.0000;
  Puerta = 'Cerrada';

  PosicionFija = { 'latitud': 0, 'longitud': 0 };
  PosicionActual = { 'latitud': 1, 'longitud': 1 };

  constructor(private diagnostic: Diagnostic, private geolocation: Geolocation) {

    this.lblEstadoGPS = this.EstadoGPS[1];

  }

  FuncionaLocalizacion = (resultado) => {

    try {

      this.PosicionActual['latitud'] = resultado.coords.latitude;
      this.PosicionActual['longitud'] = resultado.coords.longitude;

      this.distanciaCoord();

      if (this.lblEstadoGPS != this.EstadoGPS[0]) {

        this.lblEstadoGPS = this.EstadoGPS[0];

      }


    }
    catch (error) {

      //var positionError = (resultado as PositionError);

      //this.logs.push('Permiso'+positionError.PERMISSION_DENIED);

      this.lblEstadoGPS = this.EstadoGPS[1];


    }

  }

  ErrorLocalizacion = (positionError) => {

    this.logs.push('Denegado ' + positionError.PERMISSION_DENIED +
      ' Desabilitado ' + positionError.POSITION_UNAVAILABLE +
      ' Fuera de tiempo ' + positionError.TIMEOUT);

    //if(positionError.PERMISSION_DENIED==0){

    this.lblEstadoGPS = this.EstadoGPS[1];

    //}

  }

  Localizacion() {

    //navigator.geolocation.getCurrentPosition(this.FuncionaGPS,this.ErrorGPS,this.opciones);
    navigator.geolocation.watchPosition(this.FuncionaLocalizacion, this.ErrorLocalizacion, this.opciones);

  }

  FuncionaGPS = (habilitado) => {

    this.logs.push("GPS location is " + (habilitado ? "enabled" : "disabled"));

  }

  ErrorGPS = (error) => {

    this.logs.push("The following error occurred: ");

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

    this.Distancia = distancia.toFixed(4);

    if(this.Distancia<2 && this.Distancia>-2){

      this.Puerta = 'Abierta';

    }
    else if(this.Puerta == 'Abierta'){

      this.Puerta = 'Cerrada';

    }

  }


  ngOnInit() {

    //this.GPSHabilitado();
    this.Localizacion();

  }


}
