import { Component, Input, OnInit  } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { PreguntaService } from '../../services/pregunta.service';

@Component({
  selector: 'app-panelPreguntado',
  standalone: true,
  imports: [SplitterModule],
  templateUrl: './panelPreguntado.component.html',
  styleUrl: './panelPreguntado.component.css'
})

export class panelPreguntado implements OnInit {
  @Input() preg: any;
  
  constructor(private preguntaService: PreguntaService) {}
  
  ngOnInit() {
    this.preguntaService.objeto$.subscribe(objeto => {
      this.preguntaService = objeto;
    });
  }

}