# Fullstack Movies App — FastAPI + Next.js + PostgreSQL

API REST para gestionar un catálogo de películas. Backend construido con **FastAPI** y **SQLAlchemy async**, base de datos **PostgreSQL**, y frontend con **Next.js**. Arquitectura por capas: routes → services → schemas → models.

## Stack

| Capa | Tecnología |
|------|-----------|
| Backend | FastAPI + Uvicorn |
| ORM | SQLAlchemy (async) |
| Driver DB | asyncpg |
| Base de datos | PostgreSQL |
| Validación | Pydantic v2 |
| Frontend | Next.js |

## Estructura del proyecto

```
fastapi-nextjs-postgresql-movies-crud/
├── backend-fastapi/
│   ├── app/
│   │   ├── database/
│   │   │   └── connection.py     # Engine async, sesión, Base
│   │   ├── models/
│   │   │   └── movie_model.py    # Modelo SQLAlchemy — tabla movies
│   │   ├── schemas/
│   │   │   └── movie_schema.py   # MovieCreate / MovieUpdate / MovieResponse
│   │   ├── services/
│   │   │   └── movie_service.py  # Lógica CRUD
│   │   ├── routes/
│   │   │   └── movie_routes.py   # Endpoints /movies
│   │   └── main.py               # App FastAPI, CORS, lifespan
│   ├── run.py                    # Punto de entrada
│   ├── requirements.txt
│   ├── .env                      # Variables de entorno (no commitear)
│   └── .env-example
└── frontend-nextjs/              # (próximamente)
```

## Requisitos previos

- Python 3.11+
- PostgreSQL corriendo localmente (o en Docker)

## Instalación — Backend

```bash
cd backend-fastapi

# Crear y activar entorno virtual
python -m venv env
env\Scripts\activate        # Windows
source env/bin/activate     # Linux/Mac

# Instalar dependencias
pip install -r requirements.txt
```

## Configuración

Edita `backend-fastapi/.env` con tus credenciales:

```env
DATABASE_URL=postgresql+asyncpg://postgres:password@localhost:5432/movies_db
```

Crea la base de datos en PostgreSQL:

```sql
CREATE DATABASE movies_db;
```

Las tablas se crean automáticamente al arrancar la app.

## Ejecutar

```bash
cd backend-fastapi
python run.py
```

Servidor: `http://127.0.0.1:8000`

## Documentación interactiva

- Swagger UI → `http://127.0.0.1:8000/docs`
- ReDoc → `http://127.0.0.1:8000/redoc`

## Endpoints

Base URL: `http://127.0.0.1:8000`

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/` | Health check |
| GET | `/movies/` | Listar todas las películas |
| GET | `/movies/{id}` | Obtener película por ID |
| POST | `/movies/` | Crear película |
| PUT | `/movies/{id}` | Actualizar película (parcial) |
| DELETE | `/movies/{id}` | Eliminar película |

## Modelo de película

| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| id | int | auto | Solo en respuesta |
| title | string | sí | |
| description | string | sí | |
| year | int | sí | |
| image_url | string | sí | |
| genre | string | sí | |
| stars | float | sí | Rango 0.0 – 5.0 |

## Cuerpos de petición

**POST `/movies/`**

```json
{
  "title": "The Shawshank Redemption",
  "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  "year": 1994,
  "image_url": "https://devsapihub.com/img-movies/1.jpg",
  "genre": "Drama",
  "stars": 5.0
}
```

**PUT `/movies/{id}`** — todos los campos son opcionales:

```json
{
  "stars": 4.5,
  "genre": "Drama / Prison"
}
```

## Respuestas

**GET `/movies/{id}`** — `200 OK`

```json
{
  "id": 1,
  "title": "The Shawshank Redemption",
  "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
  "year": 1994,
  "image_url": "https://devsapihub.com/img-movies/1.jpg",
  "genre": "Drama",
  "stars": 5.0
}
```

**DELETE `/movies/{id}`** — `204 No Content`

**404 — Película no encontrada**

```json
{ "detail": "Movie not found" }
```

## Ejemplos con cURL

```bash
# Listar todas
curl http://127.0.0.1:8000/movies/

# Obtener por ID
curl http://127.0.0.1:8000/movies/1

# Crear
curl -X POST http://127.0.0.1:8000/movies/ \
  -H "Content-Type: application/json" \
  -d '{"title":"Inception","description":"A thief enters dreams.","year":2010,"image_url":"https://example.com/inception.jpg","genre":"Sci-Fi","stars":4.8}'

# Actualizar parcialmente
curl -X PUT http://127.0.0.1:8000/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"stars":4.5}'

# Eliminar
curl -X DELETE http://127.0.0.1:8000/movies/1
```
