import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  http = inject(HttpClient);

  constructor() { }

  // return this.http.get<any>('https://api.thecompaniesapi.com/v2/locations/countries')    
  // .pipe( 
  //   map(response => response.countries),
  //   map(countries => countries.sort((a:any, b:any) => a.name.localeCompare(b.name)))
  // );

  getPaises() {
    return this.http.get<any>('https://api.thecompaniesapi.com/v2/locations/countries')    
    .pipe(
      map(response => response.countries),
      map(countries => countries.sort((a:any,b:any) => {  
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      })));
  }
}
