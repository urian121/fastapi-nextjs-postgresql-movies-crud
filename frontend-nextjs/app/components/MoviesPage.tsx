'use client'

import { useState, useEffect } from 'react'
import type { Movie } from '@/app/types/movie'
import { getMovies, deleteMovie } from '@/app/lib/api'
import MovieForm from './MovieForm'
import MovieList from './MovieList'
import MovieEditModal from './MovieEditModal'
import { showToast } from "nextjs-toast-notify";

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [newMovieId, setNewMovieId] = useState<number | null>(null)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [])

  function onMovieCreated(movie: Movie) {
    setMovies(prev => [movie, ...prev])
    setNewMovieId(movie.id)
  }

  function onMovieUpdated(updated: Movie) {
    setMovies(prev => prev.map(m => m.id === updated.id ? updated : m))
    setEditingMovie(null)
  }

  async function handleDelete(id: number) {
    try {
      await deleteMovie(id)
      setMovies(prev => prev.filter(m => m.id !== id))

      showToast.success("¡La Película fue eliminada correctamente!", {
        position: "bottom-right",
        transition: "popUp",
        sound: true,
      });
    } catch {
      alert('Error al eliminar la película')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left — form */}
      <aside className="w-2/5 bg-gray-50 border-r border-gray-200 flex flex-col">
        <MovieForm onSuccess={onMovieCreated} />
      </aside>

      {/* Right — list */}
      <main className="w-3/5 flex flex-col bg-gray-50">
        <MovieList
          movies={movies}
          loading={loading}
          newMovieId={newMovieId}
          onEdit={setEditingMovie}
          onDelete={handleDelete}
        />
      </main>

      {editingMovie && (
        <MovieEditModal
          movie={editingMovie}
          onSave={onMovieUpdated}
          onClose={() => setEditingMovie(null)}
        />
      )}
    </div>
  )
}
