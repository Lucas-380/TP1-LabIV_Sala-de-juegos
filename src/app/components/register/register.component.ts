import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../clases/usuario';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, InputTextModule, PasswordModule, CheckboxModule, ButtonModule, ToastModule, ConfirmDialogModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [ConfirmationService, MessageService]
})
export class RegisterComponent {
  newUserMail: string = "";
  newUserPWD: string = "";
  loggedUser: string = "";
  visible: boolean = false;

  constructor(private router: Router, public auth: Auth, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  Register() {
    createUserWithEmailAndPassword(this.auth, this.newUserMail, this.newUserPWD).then((res) => {
      if (res.user.email !== null) this.loggedUser = res.user.email;
      this.confirm();
    }).catch((e) => {
      switch (e.code) {
        case "auth/invalid-email":
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email invalido' });
          break;
        case "auth/email-already-in-use":
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Email ya en uso' });
          break;
        default:
          console.log(e.code);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error' });
          break;
      }
    });
  }

  private confirm() {
    this.confirmationService.confirm({
        header: 'Bienvenido!',
        message: 'Su cuenta se creo correctamente',
        accept: () => {
          this.router.navigate(['/home']);
        }
    });
}


}
