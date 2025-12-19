import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription, switchMap, take } from 'rxjs';
import { Strapi } from '../../core/services/strapi';
import { NoticiaDetalles } from '../../interfaces/noticiaDetalle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-noticia-detalle',
  imports: [MatIconModule, RouterLink],
  templateUrl: './noticia-detalle.html',
  styleUrl: './noticia-detalle.scss',
})
export class NoticiaDetalle implements OnInit{
  
  route = inject(ActivatedRoute);
  strapiService = inject(Strapi);
  private noticiaSub?: Subscription;
  noticiaDetalle!: NoticiaDetalles;

  ngOnInit(): void {
    this.noticiaSub = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id')!;
         return this.strapiService.getNoticiaDetailById(id);
      }),
    ).subscribe({
      next: (data)=>{
        this.noticiaDetalle = data;
        console.log(data)
      },
      error: (err)=> {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    if(this.noticiaSub){
      this.noticiaSub.unsubscribe();
    }
  
  }


}
