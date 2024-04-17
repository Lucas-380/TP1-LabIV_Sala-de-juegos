import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  usuario: string = '';
  clave: string = '';

  constructor(private router: Router) {

  }

  registrarUsuario() {
    //GUARDAR USER Y CLAVE EN LOCALSTORAGE. Return boolean
    const nuevoUsuario: Usuario = new Usuario(this.usuario, this.clave);
    let usuariosGuardados: Usuario[] = [];
    const usuariosGuardadosStr = localStorage.getItem('usuarios');
    if (usuariosGuardadosStr) {
      usuariosGuardados = JSON.parse(usuariosGuardadosStr);
    }
  
    usuariosGuardados.push(nuevoUsuario);
  
    const usuariosGuardadosStrActualizado = JSON.stringify(usuariosGuardados);
    localStorage.setItem('usuarios', usuariosGuardadosStrActualizado);
  }

  iniciarSesion() {
    const usuarioIngresante: Usuario = new Usuario(this.usuario, this.clave);

    let usuariosGuardados: Usuario[] = [];
    const usuariosGuardadosStr = localStorage.getItem('usuarios');
    if (usuariosGuardadosStr) {
      usuariosGuardados = JSON.parse(usuariosGuardadosStr);
    }

    const usuarioExistente:boolean = usuariosGuardados.some((usuario: Usuario) => {
      return usuario.user === usuarioIngresante.user && usuario.password === usuarioIngresante.password;
    });
  
    if (usuarioExistente) {
      this.router.navigate(['/bienvenido'], { state: usuarioIngresante });
    }else{
      this.router.navigate(['/error']);
    }

  }
}
