'use client'

import { useForm } from 'react-hook-form'
import { Save, Loader2, Clapperboard } from 'lucide-react'
import type { MovieFormData } from '@/app/types/movie'
import { createMovie } from '@/app/lib/api'

interface Props {
  onSuccess: () => void
}

const CURRENT_YEAR = new Date().getFullYear()

const GENRES = [
  'Acción',
  'Aventura',
  'Animación',
  'Comedia',
  'Drama',
  'Terror',
  'Ciencia Ficción',
  'Thriller',
  'Romance',
  'Documental',
  'Otro',
]

const STARS_OPTIONS = [5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5, 0.0]

export default function MovieForm({ onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MovieFormData>()

  async function onSubmit(data: MovieFormData) {
    await createMovie({ ...data, year: Number(data.year), stars: Number(data.stars) })
    reset()
    onSuccess()
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 py-5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-2">
          <Clapperboard size={18} className="text-zinc-700" />
          <h2 className="text-lg font-semibold text-gray-900">Nueva película</h2>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">Completa los datos del formulario</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 flex flex-col gap-4">
        <Field label="Título" error={errors.title?.message}>
          <input
            {...register('title', { required: 'El título es obligatorio' })}
            placeholder="The Shawshank Redemption"
            className={input(!!errors.title)}
          />
        </Field>

        <Field label="Descripción" error={errors.description?.message}>
          <textarea
            {...register('description', { required: 'La descripción es obligatoria' })}
            rows={3}
            placeholder="Breve sinopsis de la película..."
            className={input(!!errors.description)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Año" error={errors.year?.message}>
            <input
              type="number"
              {...register('year', {
                required: 'El año es obligatorio',
                min: { value: 1888, message: 'Año mínimo 1888' },
                max: { value: CURRENT_YEAR, message: `Máximo ${CURRENT_YEAR}` },
              })}
              placeholder="1994"
              className={input(!!errors.year)}
            />
          </Field>

          <Field label="Estrellas" error={errors.stars?.message}>
            <select
              {...register('stars', { required: 'Las estrellas son obligatorias' })}
              className={select(!!errors.stars)}
            >
              <option value="">Seleccionar</option>
              {STARS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {'★'.repeat(Math.round(s))}{'☆'.repeat(5 - Math.round(s))} {s.toFixed(1)}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Género" error={errors.genre?.message}>
          <select
            {...register('genre', { required: 'El género es obligatorio' })}
            className={select(!!errors.genre)}
          >
            <option value="">Seleccionar</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </Field>

        <Field label="URL de la imagen" error={errors.image_url?.message}>
          <input
            {...register('image_url', { required: 'La URL es obligatoria' })}
            placeholder="https://example.com/poster.jpg"
            className={input(!!errors.image_url)}
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-medium rounded-lg transition-colors text-sm hover:cursor-pointer outline-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={15} className="animate-spin" />
              Guardando...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Save size={15} />
              Guardar película
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

function input(hasError: boolean) {
  return `w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-zinc-900 ${
    hasError ? 'border-red-400 bg-red-50' : 'border-zinc-200 bg-white focus:border-zinc-900'
  }`
}

function select(hasError: boolean) {
  return `w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-zinc-900 bg-white appearance-none cursor-pointer ${
    hasError ? 'border-red-400 bg-red-50' : 'border-zinc-200 focus:border-zinc-900'
  }`
}

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
