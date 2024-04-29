import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { Router, RouterModule } from '@angular/router';
//imports PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
//firebase
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule, InputTextModule, PasswordModule, CheckboxModule, ButtonModule, DialogModule, CommonModule],
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


  constructor(private router: Router, public auth: Auth, private firestore: Firestore) {

  }

  showDialog() {
    this.visible = true;
  }

  closeDialog() {
    this.visible = false;
  }

  Login() {
    signInWithEmailAndPassword(this.auth, this.userMail, this.userPWD).then((res) => 
      {
        let col = collection(this.firestore, 'logins');
        addDoc(col, { fecha: new Date(), "email": this.userMail})
        this.router.navigate(['/home']);
        
      }).catch((e)=> 
        {
          console.log(e)
          this.errorLogin = true;
      })
    }

  AccesoRapido(){
    this.userMail = 'cuentaInvitado@gmail.com';
    this.userPWD = 'cuentainvitado123'
  }


}
