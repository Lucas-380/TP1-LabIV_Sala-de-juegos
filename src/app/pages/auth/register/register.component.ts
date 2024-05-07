import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: false,
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
