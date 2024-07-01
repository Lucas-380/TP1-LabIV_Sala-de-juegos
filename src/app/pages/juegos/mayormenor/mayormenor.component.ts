import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartasService } from '../../../services/cartas.service';

interface Carta {
  valor: number;
  palo: string;
  img: string;
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
  public cartaActual: Carta = { valor: 0, palo: '', img: ''}; 
  public siguienteCarta: Carta = { valor: 0, palo: '', img: '' };
  public puntuacion:number = 0;

  visible: boolean = false;
  sinCartas: boolean = false;

  constructor(private router: Router, private cartasService: CartasService){

  }

  ngOnInit(): void {
    //this.generarMazo();
    this.cartasService.getCarta()
    .subscribe(car => {
      this.mazo = car;
      if(this.cartaActual.valor == 0){
        this.mezclarMazo();
        this.cartaActual = this.sacarCarta();
      }
    });
  }

  public analizarOpcion(opcion:string){
    this.siguienteCarta = this.sacarCarta();
    if(opcion == 'MAYOR' && this.siguienteCarta?.valor >= this.cartaActual?.valor){
      this.puntuacion += 1;
    }else{
      if(opcion == 'MENOR' && this.siguienteCarta?.valor <= this.cartaActual?.valor){
        this.puntuacion += 1;
      }else{
        if(this.puntuacion != 0){
          this.puntuacion -= 1;
        }
      }
    }
    this.cartaActual = this.siguienteCarta;
  }

  // private generarMazo(): void {
  //   for (let valor = 1; valor <= 12; valor++) {
  //     for (let palo of ['oros', 'bastos', 'espadas', 'copas']) {
  //       //this.mazo.push({ valor, palo });
  //       this.cartasService.addCarta(valor, palo);
  //     }
  //   }
  //   console.log(this.mazo);
  // }

  private mezclarMazo(): void {
    for (let i = this.mazo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.mazo[i], this.mazo[j]] = [this.mazo[j], this.mazo[i]];
    }
  }

  public sacarCarta(){
    if (this.indiceCartaActual < this.mazo.length) {
      const carta = this.mazo[this.indiceCartaActual];
      this.indiceCartaActual++;
      return carta;
    } else {
      this.visible = true;
      return { valor: 0, palo: '', img: ''};
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
