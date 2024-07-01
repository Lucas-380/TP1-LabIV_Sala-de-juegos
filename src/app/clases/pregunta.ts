export class Pregunta {
    categoria:string = '';
    dificultad:string = '';
    opcion_correcta:string = '';
    opcion_uno:string = '';
    opcion_dos:string = '';
    opcion_tres:string = '';
    pregunta:string = '';
    
    constructor(response:any){
        this.categoria = response.categoria;
        this.dificultad = response.dificultad;
        this.opcion_correcta = response.opcion_correcta;
        this.opcion_uno = response.opcion_uno;
        this.opcion_dos = response.opcion_dos;
        this.opcion_tres = response.opcion_tres;
        this.pregunta = response.pregunta;
    }
}
