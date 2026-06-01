export interface Movie {
  id: number
  title: string
  description: string
  year: number
  image_url: string
  genre: string
  stars: number
}

export interface MovieFormData {
  title: string
  description: string
  year: number
  image_url: string
  genre: string
  stars: number
}

export interface MovieCardProps {
  movie: Movie
  isNew?: boolean
  onEdit?: (movie: Movie) => void
  onDelete?: (id: number) => void
}

export interface MovieEditModalProps {
  movie: Movie
  onSave: (updated: Movie) => void
  onClose: () => void
}

export interface MovieFormProps {
  onSuccess: (movie: Movie) => void
}

export interface MovieListProps {
  movies: Movie[]
  loading: boolean
  newMovieId?: number | null
  onEdit: (movie: Movie) => void
  onDelete: (id: number) => void
}
