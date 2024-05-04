import { CommonModule } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [SidebarModule, ButtonModule, FormsModule, InputTextModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit{
  chatVisible: boolean = false;
  msjInput: string = '';
  mensajes: any = [];
  mensajesOrdenados: any = [];
  usuarioConectado: any = '';

  constructor(private chatService: ChatService){

  }

  ngOnInit(): void {
    this.chatService.getMensajes().subscribe(mensaje =>{
      this.mensajes = mensaje;
      this.usuarioConectado = this.chatService.getUserConectado();
      this.ordenarMensajes();
    }) 
  }

  enviarMensaje(){
    this.chatService.addMensaje(this.msjInput);
    this.msjInput = '';
  }

  
  private ordenarMensajes(){
    this.mensajesOrdenados = [];
    this.mensajes.forEach((msj: any) => {
      msj.fecha = new Date(msj.fecha * 1000);
      this.mensajesOrdenados.push(msj);
    });

    this.mensajesOrdenados.sort((a:any, b:any) => {
      return a.fecha.getTime() - b.fecha.getTime();
    });
  }

  public darFormatoFecha(fecha: Date){
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  }


}
