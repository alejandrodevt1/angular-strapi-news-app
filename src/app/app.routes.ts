import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Deportes } from './features/deportes/deportes';
import { Nacional } from './features/nacional/nacional';
import { Internacional } from './features/internacional/internacional';
import { Cultural } from './features/cultural/cultural';
import { NoticiaDetalle } from './features/noticia-detalle/noticia-detalle';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'noticia-detalle/:id/:slug',
    component: NoticiaDetalle
  },
 {
    path: 'Deportes',
    component: Deportes,
  },
   {
    path: 'Nacional',
    component: Nacional,
  },
   {
    path: 'Internacional',
    component: Internacional,
  },
   {
    path: 'Cultural',
    component: Cultural,
  },
 
];
