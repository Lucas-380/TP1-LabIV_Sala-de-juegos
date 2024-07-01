import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaisesService } from '../../../services/paises.service';
@Component({
  selector: 'app-ahorcado',
  standalone: false,
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})

export class AhorcadoComponent implements OnInit{
  public palabraSecreta: string = '';
  public intentos: number = 1;

  public palabraSecretaArr: string[] = [];
  public letrasUsadas: string[] = [];
  public palabraEnPantalla: string[] = [];
  public letraIngresada: string = '';

  paises: any[] = [];
  selectedPais: any;
  selectedContinent: string = "";

  visible: boolean = false;
  partidaGanada: boolean = false;
  jugando: boolean = false;


  constructor(private router: Router, private paisesService: PaisesService) { }

    ngOnInit(): void {
        this.paisesService.getPaises()
        .subscribe(paises => {
          this.paises = paises;
          console.log(paises);
          
      });
    }

  public comenzar(){
    this.palabraSecreta = (this.paises[this.numeroAleatorio()].name.common).toUpperCase();
    this.palabraSecretaArr = this.stringToArray(this.palabraSecreta);
    this.palabraSecretaArr.forEach(l => {
      this.palabraEnPantalla.push('_');
    });
    console.log(this.palabraSecretaArr);
    this.jugando = true;
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
    //console.log(this.paises[0].name.common);
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

  private numeroAleatorio(): number {
    const numero = Math.random();
    const numeroAjustado = Math.floor(numero * 40) + 1;
    return numeroAjustado;
  }

}
