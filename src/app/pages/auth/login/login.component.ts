import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  public visible: boolean = false;
  public userMail: string ="";
  public userPWD: string ="";
  public loggedUser: string ="";
  public loginsCollection:any[] = [];
  public errorLogin: boolean = false;


  constructor(private router: Router, private auth: AuthService) {
    
  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  Login() {
    if(this.auth.LoginAuth(this.userMail, this.userPWD)){
      this.router.navigate(['/home']);
    }
  }

  AccesoRapido(){
    this.userMail = 'cuentaInvitado@gmail.com';
    this.userPWD = 'cuentainvitado123'
  }
}
