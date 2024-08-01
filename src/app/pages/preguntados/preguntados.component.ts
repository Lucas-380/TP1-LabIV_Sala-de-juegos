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

  public comenzar(){
    console.log(this.preguntas);
    this.preg(this.preguntas[1]);
  }



  private mostrarPregunta(pregunta: Pregunta){
    console.log(pregunta.pregunta);
  }


}
