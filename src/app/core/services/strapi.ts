import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Categoria } from '../../interfaces/categoria';
import { HomePage } from '../../interfaces/homePage';
import { Noticia, Paginacion } from '../../interfaces/noticia';
import { NoticiaDetalles } from '../../interfaces/noticiaDetalle';

@Injectable({
  providedIn: 'root',
})
export class Strapi {
  api: string = 'http://localhost:1337/api/';
 
  private readonly http = inject(HttpClient);

  public obtenerCategorias(): Observable<Categoria[]> {
    return this.http.get<any>(this.api + 'categorias').pipe(
      map((res) =>
        res.data.map((item: any) => ({
          documentId: item.id,
          categoria: item.categoria,
        }))
      )
    );
  }

  public getTop5Noticias(): Observable<Noticia[]> {
    return this.http
      .get<any>(
        this.api + 'noticias?sort[0]=id:desc&pagination[limit]=3&populate=*'
      )
      .pipe(
        map((res) =>
          res.data.map((item: any) => ({
            id:item.id,
            documentId: item.documentId,
            slug: item.slug,
            title: item.titulo,
            resumen: item.Resumen,
            fecha: item.fecha,
            autor: item.Autor,
            imagen: 'http://localhost:1337' + item.Imagen.formats.small.url,
          }))
        )
      );
  }


  public getNoticiasPorCategoria(categoria: string, page:number): Observable<{ noticias: Noticia[], paginacion: Paginacion }> {
  return this.http
    .get<any>(
      this.api + `noticias?filters[categorias][categoria][$eq]=${categoria}&populate=*&pagination[pageSize]=6&pagination[page]=${page}`
    )
    .pipe(
      map((res) => {
        const noticias = res.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId,
          slug: item.slug,
          title: item.titulo,
          resumen: item.Resumen,
          fecha: item.fecha,
          autor: item.Autor,
          imagen: 'http://localhost:1337' + item.Imagen.formats.small.url,
        }));
        return {
          noticias: noticias,
          paginacion: res.meta.pagination 
        };
      })
    );
}


  public getNoticiaDetailById(id: string): Observable<NoticiaDetalles> {
    return this.http.get<any>(this.api + `noticias/${id}?populate=*`).pipe(
      map((res) => {
        const item = res.data;
        return {
          id:item.id,
          documentId: item.documentId,
          slug: item.slug,
          title: item.titulo,
          resumen: item.Resumen,
          fecha: item.fecha,
          autor: item.Autor,
          imagen: 'http://localhost:1337' + item.Imagen.formats.medium.url,
          contenido: item.Contenido,
          categoria: item.categorias
        };
      })
    );
  }

  public getPageHome(): Observable<HomePage> {
    return this.http.get<any>(this.api + 'home?populate=*').pipe(
      map((res) => {
        const item = res.data;
        return {
          title: item.title,
          url: 'http://localhost:1337' + item.portada.url,
        };
      })
    );
  }
}
