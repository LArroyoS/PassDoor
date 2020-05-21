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

  EstadoGPS = ['ACTIVO','DESACTIVO'] as const;

  options = {maximumAge: 0, timeout: 10000, enableHighAccuracy:true} as const;

  lblEstadoGPS: string;

  logs: String[] = [];

  constructor(private diagnostico: Diagnostic,private geolocation: Geolocation) {

    this.lblEstadoGPS = this.EstadoGPS[1];

  }

  FuncionaGPS = (resultado) => {

    try{
      
      this.logs.push("latitud : "+resultado.coords.latitude+" longitud : "+resultado.coords.longitude);
      
      if(this.lblEstadoGPS!=this.EstadoGPS[0]){

        this.lblEstadoGPS = this.EstadoGPS[0];

      }
      

    }
    catch(error){ 

      //var positionError = (resultado as PositionError);
      
      //this.logs.push('Permiso'+positionError.PERMISSION_DENIED);

      this.lblEstadoGPS = this.EstadoGPS[1];


    }

  }

  ErrorGPS = (positionError) => {

    this.logs.push('Permiso'+positionError.PERMISSION_DENIED);

    if(positionError.PERMISSION_DENIED==0){

      this.lblEstadoGPS = this.EstadoGPS[1];

    }

  }

  getGeolocation(){

    //this.geolocation.getCurrentPosition(this.options).then(this.FuncionaGPS).catch(this.ErrorGPS);

    let escuchador = this.geolocation.watchPosition(this.options);
    escuchador.subscribe(this.FuncionaGPS,this.ErrorGPS);

  }

  ngOnInit() {
    
    //this.getGeolocation();
    this.diagnostico.isLocationEnabled().then((activo) => {

      var estado = (activo ? 'ACTIVO' : 'DESACTIVO');
      console.log("GPS " + estado);
      this.lblEstadoGPS = estado;

    }).catch( (error) => {

      console.log("Ocurrio un error " + error);
      this.lblEstadoGPS = 'error';

    });
  
  }


}
