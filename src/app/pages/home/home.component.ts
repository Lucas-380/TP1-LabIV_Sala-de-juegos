import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Auth } from '@angular/fire/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, TableModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  constructor(public auth: Auth, private firestore: Firestore){

  }
  ngOnInit(): void {
    this.GetData();
  }

  private loginsCollection:any = [];
  public logsUser:any = [];

  GetData(){
    let col = collection(this.firestore, 'logins');
    const observable = collectionData(col);
    observable.subscribe((res) =>{
      this.loginsCollection = res;
    })
  }
}
