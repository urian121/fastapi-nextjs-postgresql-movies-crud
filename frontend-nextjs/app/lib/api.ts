import type { Movie, MovieFormData } from '@/app/types/movie'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export async function getMovies(): Promise<Movie[]> {
  const res = await fetch(`${API_URL}/movies/`)
  if (!res.ok) throw new Error('Error al obtener películas')
  return res.json()
}

export async function createMovie(data: MovieFormData): Promise<Movie> {
  const res = await fetch(`${API_URL}/movies/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al crear la película')
  return res.json()
}

export async function updateMovie(id: number, data: Partial<MovieFormData>): Promise<Movie> {
  const res = await fetch(`${API_URL}/movies/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Error al actualizar la película')
  return res.json()
}

export async function deleteMovie(id: number): Promise<void> {
  const res = await fetch(`${API_URL}/movies/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Error al eliminar la película')
}
