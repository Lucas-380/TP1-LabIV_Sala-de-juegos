import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosRoutingModule } from './juegos-routing.module';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { TecladoComponent } from '../../components/teclado/teclado.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AhorcadoComponent,
    MayormenorComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    TecladoComponent,
    DialogModule,
    ButtonModule
  ]
})
export class JuegosModule { 

  
}
