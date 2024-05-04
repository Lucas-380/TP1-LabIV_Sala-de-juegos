import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public visible: boolean = false;
  public loggedUser: string ="";
  public loginsCollection:any[] = [];
  public errorLogin: boolean = false;
  public sesion: boolean = false;

  constructor(public auth: Auth, private firestore: Firestore) { 
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.sesion = true;
      }
    });
  }

  LoginAuth(userMail:any, userPWD:any) {
    signInWithEmailAndPassword(this.auth, userMail, userPWD).then((res) => 
      {
        let col = collection(this.firestore, 'logins');
        addDoc(col, { fecha: new Date(), "email": userMail})
        return true;
      }).catch((e)=> 
        {
          console.log(e)
      })
      return false;
    }

  CloseSession(){
    this.sesion = false;
    signOut(this.auth).then(() => { })
  }

  Cuenta(){
    return this.auth.currentUser?.email
  }


}
