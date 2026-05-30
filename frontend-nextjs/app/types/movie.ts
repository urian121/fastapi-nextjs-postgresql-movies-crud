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
