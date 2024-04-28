import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Auth, signOut } from '@angular/fire/auth';
import { LoginComponent } from './components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, ButtonModule, MenubarModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'Sala de Juegos';
  sidebarVisible: boolean = false;
  visible: boolean = false;
  sesion: boolean = false;

  constructor(private router: Router, public auth: Auth){

  }
  
  goTo(path: string) {
    this.router.navigate([path]);
  }

  //navbar
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.sesion = true;
      }
    });
    console.log(this.sesion);
    
  }
  
  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  CloseSession(){
    signOut(this.auth).then(() => {
      //seguro que quiere cerrar la sesion ? 
      console.log(this.auth.currentUser?.email);
    })
  }
  
}
