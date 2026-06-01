import { Pencil, Trash2 } from 'lucide-react'
import type { Movie } from '@/app/types/movie'
import Image from 'next/image'

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= Math.round(stars) ? 'text-yellow-400' : 'text-gray-300'}
        >
          ★
        </span>
      ))}
      <span className="text-sm text-gray-500 ml-1">{stars.toFixed(1)}</span>
    </div>
  )
}

interface Props {
  movie: Movie
  onEdit?: (movie: Movie) => void
  onDelete?: (id: number) => void
}

export default function MovieCard({ movie, onEdit, onDelete }: Props) {
  return (
    <div className="flex gap-3 bg-white p-3 hover:shadow-md transition-shadow">
      <Image
        src={movie.image_url}
        alt={movie.title}
          width={64}
          height={96}
          className="w-16 h-24 object-cover rounded flex-shrink-0"
      />
      <div className="flex flex-col justify-between min-w-0 flex-1">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight truncate">
            {movie.title}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {movie.genre} · {movie.year}
          </p>
          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{movie.description}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <StarRating stars={movie.stars} />
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit?.(movie)}
              className="p-1.5 rounded-md text-gray-400 hover:text-zinc-700 hover:bg-gray-100 transition-colors outline-none hover:cursor-pointer"
              title="Editar película"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete?.(movie.id)}
              className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors outline-none hover:cursor-pointer"
              title="Eliminar película"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
