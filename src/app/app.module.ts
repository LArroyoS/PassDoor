import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//Importar
import { FormsModule } from '@angular/forms';

//Ventanas
import { Inicio } from './inicio/inicio.page';
import { Registro } from './registro/registro.page';

//GPS
import { Geolocation } from '@ionic-native/geolocation/ngx';
//Dignosticar dispositivo
import { Diagnostic } from '@ionic-native/diagnostic/ngx';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth' ;
import { AngularFirestoreModule } from '@angular/fire/firestore';

//Servicios
import { ConexionFirebaseService } from './services/conexion/conexion-firebase.service';
import { AutenticacionFirebaseService } from './services/autenticacion/autenticacion-firebase.service';
import { UsuarioAutenticadoFirebaseService } from './services/usuarioAutenticado/usuario-autenticado-firebase.service';

@NgModule({
  declarations: [
    
    AppComponent,
    Inicio,
    Registro,


  ],
  entryComponents: [],
  imports: [
    
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule
  
  ],
  providers: [
    
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    Diagnostic,
    ConexionFirebaseService,
    AutenticacionFirebaseService,
    UsuarioAutenticadoFirebaseService

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
