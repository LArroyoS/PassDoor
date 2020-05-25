import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

export interface coordenada {

  latitud: number;
  longitud: number;

}

@Injectable({

  providedIn: 'root'

})

export class ConexionFirebaseService {

  private coordenadasColeccion: AngularFirestoreCollection<coordenada>;
  coordenadas: Observable<coordenada[]>;

  private coordenadaDocumento: AngularFirestoreDocument<coordenada>;

  constructor(private afs: AngularFirestore) { 

    //referencia
    this.coordenadasColeccion = afs.collection<coordenada>('coordenadas');
    this.coordenadas = this.coordenadasColeccion.snapshotChanges().pipe(map(action =>{

      return action.map(a => {

        const datos = a.payload.doc.data() as coordenada;
        return {...datos};

      });

    }));

  }

  modificarCoordenada(id, coordenada){

    this.coordenadasColeccion.doc(''+id).set(coordenada);

  }

  ListarCoordenadas(){

    return this.coordenadasColeccion[0];

  }

}
