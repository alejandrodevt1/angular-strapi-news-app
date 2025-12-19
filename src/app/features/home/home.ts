import { Component, HostListener, inject, OnInit } from '@angular/core';
import { Strapi } from '../../core/services/strapi';
import { HomePage } from '../../interfaces/homePage';
import { NgClass } from '@angular/common';
import { Noticia } from '../../interfaces/noticia';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [NgClass, MatIconModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  noticias: Noticia[] = [];
  indiceActual = 0;
  visible = true;
  intervalo: any;

  strappiService = inject(Strapi);
  AtributosPageHome: HomePage = {
    title: '',
    url: '',
  };

  ngOnInit(): void {
    this.cargarPageHomeAtributos();
    this.cargarTop5Noticias();
    this.iniciarBucle();
  }

  private cargarTop5Noticias() {
    this.strappiService.getTop5Noticias().subscribe({
      next: (data) => {
        this.noticias = data;
        console.log(data)
      },
      error: (error) => {
        console.error('Error al obtener las noticias:', error);
      },
    });
  }

  private iniciarBucle() {
    this.detenerBucle();

    this.intervalo = setInterval(() => {
      this.visible = false;
      setTimeout(() => {
        this.indiceActual = (this.indiceActual + 1) % this.noticias.length;
        this.visible = true;
      }, 500);
    }, 3000);
  }

  private cargarPageHomeAtributos() {
    this.strappiService.getPageHome().subscribe({
      next: (data) => {
        this.AtributosPageHome = data;
      },
      error: (error) => {
        console.error(
          'Error al obtener los datos de la página de inicio:',
          error
        );
      },
    });
  }

  detenerBucle() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  @HostListener('document:visibilitychange', [])
  onVisibilityChange() {
    if (document.hidden) {
      console.log('Pestaña oculta: Pausando bucle');
      this.detenerBucle();
    } else {
      console.log('Pestaña activa: Reanudando bucle');
      this.iniciarBucle();
    }
  }

  ngOnDestroy() {
    this.detenerBucle();
  }
}
