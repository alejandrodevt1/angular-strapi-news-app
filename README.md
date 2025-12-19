
## 🛠️ Stack Tecnológico

| Capa | Tecnología |
| :--- | :--- |
| **Frontend** | Angular v18+ (Tipado estricto) |
| **Diseño** | Tailwind CSS & SCSS |
| **Componentes** | Angular Material |
| **Backend** | Strapi CMS |
| **Base de Datos** | PostgreSQL |
| **Reactividad** | RxJS (Observables & Pipeable Operators) |

---

## 🗄️ Arquitectura de Datos (PostgreSQL)

La base de datos relacional está diseñada para soportar una estructura de contenido compleja y escalable. La lógica principal reside en la relación entre artículos y sus clasificaciones:

### Relación Many-to-Many (M:M)
La entidad **Noticia** y la entidad **Categoria** están vinculadas mediante una relación de "muchos a muchos":
* **Flexibilidad:** Una noticia puede etiquetarse en múltiples categorías (ej. *Tecnología* y *Negocios*).
* **Organización:** Una categoría puede contener una lista infinita de noticias asociadas.

## ⚙️ Instalación y Configuración

Sigue estos pasos para replicar el entorno de desarrollo localmente.

### 1. Requisitos Previos
* **Node.js** (v18 o superior)
* **PostgreSQL** instalado y ejecutándose.
* **Angular CLI** (`npm install -g @angular/cli`)

### 2. Configuración del Backend (Strapi)
1. Navega a la carpeta del backend:
   ```bash
   cd backend
2. Instala las dependencias:
   ```bash
   npm install
3. Crea un archivo .env en la raíz de /backend con tus credenciales:
    ```bash
    DATABASE_CLIENT=postgres
    DATABASE_HOST=localhost
    DATABASE_PORT=5432
    DATABASE_NAME=nombre_de_tu_db
    DATABASE_USERNAME=tu_usuario
    DATABASE_PASSWORD=tu_contraseña
4. Inicia el servidor de Strapi:
   ```bash
   npm run develop
### 3. Configuración del Frontend (Angular)
1. Navega a la carpeta del frontend:
    ```bash
   npm install
2. Inicia la aplicación:
    ```bash
   ng serve
