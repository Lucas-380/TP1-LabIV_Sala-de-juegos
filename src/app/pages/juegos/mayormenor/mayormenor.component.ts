import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Carta {
  valor: number;
  palo: string;
}

@Component({
  selector: 'app-mayormenor',
  standalone: false,
  templateUrl: './mayormenor.component.html',
  styleUrl: './mayormenor.component.css'
})


export class MayormenorComponent implements OnInit{
  public mazo: Carta[] = [];
  public indiceCartaActual: number = 0;
  public cartaActual: Carta = { valor: 0, palo: '' }; 
  public siguienteCarta: Carta= { valor: 0, palo: '' };
  public puntuacion:number = 0;

  visible: boolean = false;
  sinCartas: boolean = false;

  constructor(private router: Router){

  }

  ngOnInit(): void {
    this.generarMazo();
    this.mezclarMazo();
    this.cartaActual = this.sacarCarta();
  }

  public analizarOpcion(opcion:string){
    this.siguienteCarta = this.sacarCarta();
    if(opcion == 'MAYOR' && this.siguienteCarta?.valor >= this.cartaActual?.valor){
      this.puntuacion += 1;
    }else{
      if(opcion == 'MENOR' && this.siguienteCarta?.valor <= this.cartaActual?.valor){
        this.puntuacion += 1;
      }else{
        this.puntuacion -= 1;
      }
    }
//    console.log("Puntuacion " + this.puntuacion);
    this.cartaActual = this.siguienteCarta;
  }

  private generarMazo(): void {
    for (let valor = 1; valor <= 12; valor++) {
      for (let palo of ['Oro', 'Basto', 'Espada', 'Copa']) {
        this.mazo.push({ valor, palo });
      }
    }
  }

  private mezclarMazo(): void {
    for (let i = this.mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.mazo[i], this.mazo[j]] = [this.mazo[j], this.mazo[i]];
    }
  }

  private sacarCarta(){
    if (this.indiceCartaActual < this.mazo.length) {
      const carta = this.mazo[this.indiceCartaActual];
      this.indiceCartaActual++;
      return carta;
    } else {
      this.visible = true;
      return { valor: 0, palo: '' };
    }
  }

  public reintentar() { 
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/juegos/mayormenor']);
    });
  }
  public volverHome(){
    this.router.navigate(['/home']);
  }
}
