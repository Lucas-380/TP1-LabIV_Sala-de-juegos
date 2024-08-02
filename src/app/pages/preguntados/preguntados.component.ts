import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreguntaService } from '../../services/pregunta.service';
import { Pregunta } from '../../clases/pregunta';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-preguntados',
  standalone: false,
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})

export class PreguntadosComponent implements OnInit{

  public preguntas:Pregunta[] = [];
  public dificultad:string = '';
  public categoria:string = '';
  selectedItems: MenuItem[] = [];
  public preg:any = '';
  public iniciar:boolean = false;
  public pregunta:any = [];
  public numAleatorio:number = 0;
  public siguientePregunta: number = 0;

  constructor(private router:Router, private preguntadoService: PreguntaService){

  }


  ngOnInit(): void {
    this.preguntadoService.getObjetoPregunta().subscribe(response =>{
      let pregunta;
      response.forEach(p => {
        pregunta = new Pregunta(p);
        this.preguntas.push(pregunta);
      });
    })
    //this.preguntadoService.addPregunta();
  }

  private obtenerNumeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public comenzar(){
    this.numAleatorio = this.obtenerNumeroAleatorio(0, 15);
    // console.log(this.preguntas[0]);
    this.preg = this.preguntas[this.numAleatorio];
    this.cargarOpciones();
    this.mezclarOpciones();
    this.iniciar = true;
    this.siguientePregunta += 1;
  }

  cargarOpciones(){
    this.pregunta = {
      opcion_correcta: this.preguntas[this.numAleatorio].opcion_correcta,
      opcion_uno: this.preguntas[this.numAleatorio].opcion_uno,
      opcion_dos: this.preguntas[this.numAleatorio].opcion_dos,
      opcion_tres: this.preguntas[this.numAleatorio].opcion_tres
    };
  }

  opciones: string[] = [];


  mezclarOpciones() {
    this.opciones = [
      this.pregunta.opcion_correcta,
      this.pregunta.opcion_uno,
      this.pregunta.opcion_dos,
      this.pregunta.opcion_tres
    ];

    // Mezclar las opciones
    for (let i = this.opciones.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.opciones[i], this.opciones[j]] = [this.opciones[j], this.opciones[i]];
    }
  }


}
