export interface NoticiaDetalles {
    id:number;
    documentId: number;
    slug: string;
    title: string;
    resumen: string;
    fecha:string;
    autor:string;
    imagen:string;
    contenido:any[];
    categoria: Categoria[];
}

export interface Categoria{
    id:number
    categoria:string
}