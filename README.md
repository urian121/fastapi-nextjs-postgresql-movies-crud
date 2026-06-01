# Fullstack Movies App — FastAPI + Next.js + PostgreSQL

CRUD fullstack para gestionar un catálogo de películas. Backend con **FastAPI** y **SQLAlchemy async**, base de datos **PostgreSQL**, frontend con **Next.js 16** y **Tailwind CSS v4**.

![Demo](./demo.gif)

## Stack

| Capa | Tecnología |
|------|-----------|
| Backend | FastAPI + Uvicorn |
| ORM | SQLAlchemy (async) |
| Driver DB | asyncpg |
| Base de datos | PostgreSQL |
| Validación | Pydantic v2 |
| Frontend | Next.js 16 + Tailwind CSS v4 |
| Formularios | react-hook-form |
| Íconos | lucide-react |
| Notificaciones | nextjs-toast-notify |

## Estructura del proyecto

```
fastapi-nextjs-postgresql-movies-crud/
├── backend-fastapi/
│   ├── app/
│   │   ├── database/connection.py     # Engine async, sesión, Base
│   │   ├── models/movie_model.py      # Modelo SQLAlchemy — tabla movies
│   │   ├── schemas/movie_schema.py    # MovieCreate / MovieUpdate / MovieResponse
│   │   ├── services/movie_service.py  # Lógica CRUD
│   │   ├── routes/movie_routes.py     # Endpoints /movies
│   │   └── main.py                    # App FastAPI, CORS, lifespan
│   ├── run.py
│   ├── requirements.txt
│   ├── .env                           # Variables de entorno (no commitear)
│   └── .env-example
└── frontend-nextjs/
    └── app/
        ├── components/
        │   ├── MoviesPage.tsx          # Layout principal + estado global
        │   ├── MovieForm.tsx           # Formulario crear película
        │   ├── MovieList.tsx           # Lista con scroll vertical
        │   ├── MovieCard.tsx           # Tarjeta individual + acciones
        │   └── MovieEditModal.tsx      # Modal editar con animaciones
        ├── lib/api.ts                  # Llamadas al backend (fetch)
        ├── types/movie.ts              # Interfaces TypeScript centralizadas
        └── page.tsx
```

## Requisitos previos

- Python 3.11+
- Node.js 18+
- PostgreSQL corriendo localmente (o en Docker)

---

## Backend

### Instalación

```bash
cd backend-fastapi

python -m venv env
env\Scripts\activate        # Windows
source env/bin/activate     # Linux/Mac

pip install -r requirements.txt
```

### Configuración

Edita `backend-fastapi/.env`:

```env
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/movies_db
```

Crea la base de datos:

```sql
CREATE DATABASE movies_db;
```

Las tablas se crean automáticamente al arrancar.

### Ejecutar

```bash
python run.py
```

Servidor: `http://127.0.0.1:8000` · Docs: `http://127.0.0.1:8000/docs`

---

## Frontend

### Instalación

```bash
cd frontend-nextjs
npm install
```

### Configuración (opcional)

Si el backend corre en un host diferente, crea `frontend-nextjs/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Ejecutar

```bash
npm run dev
```

App: `http://localhost:3000`

---

## Funcionalidades

- **Registrar** película con formulario (título, descripción, año, género, estrellas, URL de imagen)
- **Listar** películas en tiempo real con scroll vertical
- **Editar** película desde modal con animaciones suaves (estilo Google Material)
- **Eliminar** película con actualización instantánea del listado
- La película recién creada aparece **al inicio** de la lista con animación de entrada
- Notificaciones **toast** en acciones de crear y editar

---

## Endpoints

Base URL: `http://127.0.0.1:8000`

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/` | Health check |
| GET | `/movies/` | Listar todas las películas |
| GET | `/movies/{id}` | Obtener película por ID |
| POST | `/movies/` | Crear película |
| PUT | `/movies/{id}` | Actualizar película (campos opcionales) |
| DELETE | `/movies/{id}` | Eliminar película |

## Modelo de película

| Campo | Tipo | Notas |
|-------|------|-------|
| id | int | Auto — solo en respuesta |
| title | string | |
| description | string | |
| year | int | |
| image_url | string | |
| genre | string | |
| stars | float | Rango 0.0 – 5.0 |

## Ejemplos con cURL

```bash
# Listar todas
curl http://127.0.0.1:8000/movies/

# Crear
curl -X POST http://127.0.0.1:8000/movies/ \
  -H "Content-Type: application/json" \
  -d '{"title":"Inception","description":"A thief enters dreams.","year":2010,"image_url":"https://example.com/inception.jpg","genre":"Ciencia Ficción","stars":4.8}'

# Actualizar parcialmente
curl -X PUT http://127.0.0.1:8000/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"stars":4.5}'

# Eliminar
curl -X DELETE http://127.0.0.1:8000/movies/1
```
