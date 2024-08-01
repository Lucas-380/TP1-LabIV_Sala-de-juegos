import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {

  constructor(private firestore: Firestore) { }

  // a(valor:number, palo:string){
  //   const ref = collection(this.firestore, 'cartas');
  //   let img = "https://raw.githubusercontent.com/mcmd/playingcards.io-spanish.playing.cards/master/img/0"+valor+"-"+palo+".png";
  //   return addDoc(ref, {valor: valor, 'palo': palo, 'img': img});
  // }

  getObjetoPregunta(): Observable<any[]>{
    const pregRef = collection(this.firestore, 'preguntas');
    console.log(pregRef);
    return collectionData(pregRef) as Observable<any[]>;
  }

  private objetoSource = new BehaviorSubject<any>({});
  objeto$ = this.objetoSource.asObservable();

  enviarObj(objeto: any) {
    this.objetoSource.next(objeto);
  }


  // addPregunta(){
  //   const ref = collection(this.firestore, 'preguntas'); 
  //   const preguntas = [
  //     {
  //       categoria: "Deportes",
  //       dificultad: "Fácil",
  //       opcion_correcta: "Michael Jordan",
  //       opcion_dos: "LeBron James",
  //       opcion_tres: "Kobe Bryant",
  //       opcion_uno: "Shaquille O'Neal",
  //       pregunta: "¿Quién es conocido como uno de los mejores jugadores de baloncesto de todos los tiempos y ganó seis campeonatos de la NBA con los Chicago Bulls?"
  //     },
  //     {
  //       categoria: "Deportes",
  //       dificultad: "Media",
  //       opcion_correcta: "Brasil",
  //       opcion_dos: "Alemania",
  //       opcion_tres: "Argentina",
  //       opcion_uno: "Italia",
  //       pregunta: "¿Qué país ha ganado la Copa Mundial de la FIFA cinco veces, más que cualquier otro país?"
  //     },
  //     {
  //       categoria: "Deportes",
  //       dificultad: "Difícil",
  //       opcion_correcta: "Roger Federer",
  //       opcion_dos: "Rafael Nadal",
  //       opcion_tres: "Novak Djokovic",
  //       opcion_uno: "Andy Murray",
  //       pregunta: "¿Qué tenista ha ganado el mayor número de títulos de Grand Slam en la era abierta hasta 2021?"
  //     },
  //     {
  //       categoria: "Deportes",
  //       dificultad: "Fácil",
  //       opcion_correcta: "Usain Bolt",
  //       opcion_dos: "Carl Lewis",
  //       opcion_tres: "Jesse Owens",
  //       opcion_uno: "Tyson Gay",
  //       pregunta: "¿Quién es el velocista jamaicano conocido como el hombre más rápido del mundo?"
  //     },
  //     {
  //       categoria: "Deportes",
  //       dificultad: "Media",
  //       opcion_correcta: "Los Angeles Lakers",
  //       opcion_dos: "Boston Celtics",
  //       opcion_tres: "Chicago Bulls",
  //       opcion_uno: "Miami Heat",
  //       pregunta: "¿Qué equipo de la NBA ganó el campeonato en 2020 en la burbuja de Orlando?"
  //     }
  //   ];    
  //   let retorno;
  //   for (const pregunta of preguntas) {
  //     retorno = addDoc(ref, pregunta);
  //   }
  //   return retorno;
  // }
  
}