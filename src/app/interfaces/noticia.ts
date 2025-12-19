export interface Noticia {
    id: number;
    documentId: string;
    slug: string;
    title: string;
    resumen: string;
    fecha: string;
    autor: string;
    imagen: string;
}

export interface Paginacion {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}