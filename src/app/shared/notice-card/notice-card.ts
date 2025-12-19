import { Component, inject, Input, OnInit } from '@angular/core';
import { Noticia, Paginacion } from '../../interfaces/noticia';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Strapi } from '../../core/services/strapi';
import { NgxPaginationModule } from 'ngx-pagination';
import { Subscription, switchMap, tap } from 'rxjs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-notice-card',
  imports: [RouterLink, MatIconModule, NgxPaginationModule, MatProgressSpinnerModule],
  templateUrl: './notice-card.html',
  styleUrl: './notice-card.scss',
})
export class NoticeCard implements OnInit {

  @Input() titulo!: string;
  route = inject(ActivatedRoute);
  router = inject(Router);
  loading:boolean = true;
  private queryParamsSub?: Subscription ;

  noticias: Noticia[] = [];
  strapiService = inject(Strapi)
  config = {
    id: this.titulo,
    currentPage: 1,
    itemsPerPage: 6,
    totalItems: 0
  };


  ngOnInit(): void {
      this.queryParamsSub = this.route.queryParams
      .pipe(
        tap(() => this.loading = true),
        switchMap(params => {
          const page = Number(params['page']) || 1;
          this.config.currentPage = page;
          return this.strapiService.getNoticiasPorCategoria(this.titulo, page);
        })
      )
      .subscribe({
        next: (data) => {
          this.noticias = data.noticias;
          this.config.totalItems = data.paginacion.total;
          this.config.itemsPerPage = data.paginacion.pageSize;
          this.loading = false;
        },
        error: (err) => {
          console.error(err)
        this.loading = false;
        }
      });

  }

  onPageChange(page: number): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge',
    })
  }

  ngOnDestroy(): void {
    if (this.queryParamsSub) {
      this.queryParamsSub.unsubscribe();
    }
  }

}
