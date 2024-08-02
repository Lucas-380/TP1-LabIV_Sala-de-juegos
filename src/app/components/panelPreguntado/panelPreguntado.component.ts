import { Component, Input, OnInit  } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { Pregunta } from '../../clases/pregunta';


@Component({
  selector: 'app-panelPreguntado',
  standalone: true,
  imports: [SplitterModule],
  templateUrl: './panelPreguntado.component.html',
  styleUrl: './panelPreguntado.component.css'
})

export class panelPreguntado {
  @Input() pregunta:any = [];
  @Input() iniciar:boolean = false;
  @Input() opciones: string[] = [];
  public preguntaRandom: Array<Pregunta> = [];
  public siguientePregunta: number = 0;

  allButtonsDisabled: boolean = false; // Variable para controlar el estado de los botones

  onButtonClick() {
    this.allButtonsDisabled = true; // Bloquear todos los botones cuando se hace clic en uno
  }

  activarOpciones(){
    this.allButtonsDisabled = false;
  }

  public comenzar(){
    // console.log(this.pregunta);
    // this.preguntaRandom = this.pregunta.pregunta;
    
  }
  
  public validarOpcion(opcion:string){
    if(opcion == this.pregunta.opcion_correcta){
      console.log('GANE');
    }else{
      console.log('PERDI');
    }
  } 
}