import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../clases/usuario';

@Component({
  selector: 'app-bienvenido',
  standalone: true,
  imports: [],
  templateUrl: './bienvenido.component.html',
  styleUrl: './bienvenido.component.css'
})
export class BienvenidoComponent {
  usuario:any;

  constructor(private router: Router) {
    this.recibirParametros();
  }

  recibirParametros() {
    
    // Obtener el objeto 'usuarioIngresante' del estado de la ruta
    const params = this.router.getCurrentNavigation()?.extras.state;
    this.usuario = params;
  }
}

