import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-teclado',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './teclado.component.html',
  styleUrl: './teclado.component.css'
})
export class TecladoComponent implements OnInit{

  @Output() letraSeleccionada: EventEmitter<string> = new EventEmitter<string>();

  public letrasTeclado:any[] = [];

  ngOnInit(): void {
    this.cargarLetras();
  }

  private cargarLetras(){
    for (let i = 65; i <= 90; i++) {
      this.letrasTeclado.push(String.fromCharCode(i));
    } 
  }

  public enviarLetra(letra: string){
    this.letraSeleccionada.emit(letra);
  }


}
