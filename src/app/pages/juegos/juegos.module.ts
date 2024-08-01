import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { PreguntadosComponent } from '../preguntados/preguntados.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { TecladoComponent } from '../../components/teclado/teclado.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SplitterModule } from 'primeng/splitter';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { panelPreguntado } from "../../components/panelPreguntado/panelPreguntado.component";

@NgModule({
  declarations: [
    AhorcadoComponent,
    MayormenorComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    TecladoComponent,
    DialogModule,
    ButtonModule,
    ProgressSpinnerModule,
    SplitterModule,
    MenuModule,
    PanelModule,
    panelPreguntado
]
})
export class JuegosModule { 

  
}
