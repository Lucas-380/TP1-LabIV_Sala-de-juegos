import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore: Firestore, private auth: AuthService) {

  }

  getUserConectado(){
    return this.auth.Cuenta();
  }

  addMensaje(mensaje: string){
    const ref = collection(this.firestore, 'mensajes');
    return addDoc(ref, {fecha: new Date(), 'user': this.auth.Cuenta(), 'mensaje': mensaje});
  }

  getMensajes(): Observable<any[]>{
    const msjRef = collection(this.firestore, 'mensajes');
    return collectionData(msjRef) as Observable<any[]>;
  }

}