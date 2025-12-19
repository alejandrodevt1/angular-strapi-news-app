import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Strapi } from '../../core/services/strapi';
import { Categoria } from '../../interfaces/categoria';

@Component({
  selector: 'app-header',
  imports: [RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  strapiService = inject(Strapi);
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.cargarCategoria();
  }

  cargarCategoria(){
    this.strapiService.obtenerCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (error) => {
        console.error('Error al obtener las categorías:', error);
      },
    });
  }

  @ViewChild('menuBtn') menuButton!: ElementRef<HTMLButtonElement>;

  @ViewChild('mobileNav') mobileMenu!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    this.setupMobileMenu();
  }

  setupMobileMenu(): void {
    if (this.menuButton && this.mobileMenu) {
      this.menuButton.nativeElement.addEventListener('click', () => {
        this.mobileMenu.nativeElement.classList.toggle('hidden');
      });
    }
  }
}
