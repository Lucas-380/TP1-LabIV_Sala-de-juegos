import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})

export class AhorcadoComponent implements OnInit{
  public palabraSecreta: string = 'ARGENTINA';
  public intentos: number = 1;

  public palabraSecretaArr: string[] = [];
  public letrasUsadas: string[] = [];
  public palabraEnPantalla: string[] = [];
  public letraIngresada: string = '';

  visible: boolean = false;
  partidaGanada: boolean = false;


  constructor(private router: Router) { }

  ngOnInit(): void {
    this.palabraSecretaArr = this.stringToArray(this.palabraSecreta);
    this.palabraSecretaArr.forEach(l => {
      this.palabraEnPantalla.push('_');
    });
  }

  leerLetra(letra: string){
    let letraCorrecta = false;
    this.letraIngresada = letra;
    
    if(!this.letrasUsadas.includes(letra)){
      this.letrasUsadas.push(letra);
      this.palabraSecretaArr.forEach(l => {
        if(l == letra){
          this.cargarPalabra(letra);
          letraCorrecta = true;
        }
      });
      if(!letraCorrecta){
        this.intentos++;
        if(this.intentos > 7){
            this.partidaGanada = false;
            this.visible = true;
        }
      }
    }
  }
  
  private stringToArray(str: string): string[] {
    return str.split('');
  }

  cargarPalabra(letra: string){
    for (let i = 0; i < this.palabraSecretaArr.length; i++) {
      if(this.palabraSecretaArr[i] == letra){
        this.palabraEnPantalla[i] = letra;
      }
    }
    if(this.verificarSiGano()){
      this.partidaGanada = true;
      this.visible = true;
    }
  }
  
  private verificarSiGano(){
    return !this.palabraEnPantalla.some(elemento => elemento === '_');
  }

  //Recarga solo el componente ahorcado
  public reintentar() { 
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/juegos/ahorcado']);
    });
  }
  public volverHome(){
    this.router.navigate(['/home']);
  }


}
