'use client'

import { useState, useEffect } from 'react'
import type { Movie } from '@/app/types/movie'
import { getMovies } from '@/app/lib/api'
import MovieForm from './MovieForm'
import MovieList from './MovieList'

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .catch(() => setMovies([]))
      .finally(() => setLoading(false))
  }, [])

  async function fetchMovies() {
    setLoading(true)
    try {
      const data = await getMovies()
      setMovies(data)
    } catch {
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left — form */}
      <aside className="w-2/5 bg-gray-50 border-r border-gray-200 flex flex-col">
        <MovieForm onSuccess={fetchMovies} />
      </aside>

      {/* Right — list */}
      <main className="w-3/5 flex flex-col bg-gray-50">
        <MovieList movies={movies} loading={loading} />
      </main>
    </div>
  )
}
