import { Film } from 'lucide-react'
import type { Movie } from '@/app/types/movie'
import MovieCard from './MovieCard'

interface Props {
  movies: Movie[]
  loading: boolean
}

export default function MovieList({ movies, loading }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-6 py-5 bg-white">
        <div className="flex items-center gap-2">
          <Film size={18} className="text-zinc-700" />
          <h2 className="text-lg font-semibold text-gray-900">Películas</h2>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">{movies.length} registradas</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4">
        {loading && (
          <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
            Cargando...
          </div>
        )}

        {!loading && movies.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <span className="text-3xl mb-2">🎬</span>
            <p className="text-sm">No hay películas aún</p>
          </div>
        )}

        {!loading && movies.length > 0 && (
          <div className="flex flex-col gap-3">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
