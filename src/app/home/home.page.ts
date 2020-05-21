import { Component } from '@angular/core';

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

  constructor() {}

}
