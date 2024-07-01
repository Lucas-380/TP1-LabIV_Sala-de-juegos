import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private firestore: Firestore) {

  }

  a(valor:number, palo:string){
    const ref = collection(this.firestore, 'cartas');
    let img = "https://raw.githubusercontent.com/mcmd/playingcards.io-spanish.playing.cards/master/img/0"+valor+"-"+palo+".png";
    return addDoc(ref, {valor: valor, 'palo': palo, 'img': img});
  }

  getObjetoPregunta(): Observable<any[]>{
    const pregRef = collection(this.firestore, 'preguntas');
    console.log(pregRef);
    return collectionData(pregRef) as Observable<any[]>;
  }

  getCarta(): Observable<any[]>{
    const cartasRef = collection(this.firestore, 'cartas');
    return collectionData(cartasRef) as Observable<any[]>;
  }

}