import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './pages/auth/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home',
    loadComponent: () => import("./pages/home/home.component").then(m => m.HomeComponent)
  },
  { 
    path: 'registro', 
    component: RegisterComponent 
  },
  { 
    path: 'quienSoy', 
    loadComponent: () => import("./pages/quien-soy/quien-soy.component").then(m => m.QuienSoyComponent)
  },
  { 
    path: 'juegos',
    loadChildren: () => import('./pages/juegos/juegos.module').then(m => m.JuegosModule)
  },
  { 
    path: '**', 
    component: PageNotFoundComponent 
  }
];
