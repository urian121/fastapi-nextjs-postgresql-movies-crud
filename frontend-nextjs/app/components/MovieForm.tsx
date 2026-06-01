'use client'

import { useForm } from 'react-hook-form'
import { Save, Loader2, Clapperboard } from 'lucide-react'
import type { MovieFormData } from '@/app/types/movie'
import { createMovie } from '@/app/lib/api'
import { showToast } from "nextjs-toast-notify";

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
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<MovieFormData>()

  async function onSubmit(data: MovieFormData) {
    try {
      await createMovie({ ...data, year: Number(data.year), stars: Number(data.stars) })
      reset()
      onSuccess()

      showToast.success("¡La Película fue registrada con éxito!", {
        position: "top-right",
        transition: "topBounce",
        sound: true,
      });
    } catch {
      alert('Error al crear la película')
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="px-6 py-5 bg-white">
        <div className="flex items-center gap-2">
          <Clapperboard size={18} className="text-zinc-700" />
          <h2 className="text-lg font-semibold text-gray-900">Nueva película</h2>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">Completa los datos del formulario</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-5 flex flex-col gap-4">
        <Field label="Título">
          <input
            {...register('title', { required: true })}
            placeholder="El título de la Película"
            className={input}
          />
        </Field>

        <Field label="Descripción">
          <textarea
            {...register('description', { required: true })}
            rows={3}
            placeholder="Breve sinopsis de la película..."
            className={input}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Año">
            <input
              type="number"
              {...register('year', { required: true, min: 1888, max: CURRENT_YEAR })}
              placeholder="1994"
              className={input}
            />
          </Field>

          <Field label="Estrellas">
            <select {...register('stars', { required: true })} className={selectCls}>
              <option value="">Seleccionar</option>
              {STARS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {'★'.repeat(Math.round(s))}{'☆'.repeat(5 - Math.round(s))} {s.toFixed(1)}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Género">
          <select {...register('genre', { required: true })} className={selectCls}>
            <option value="">Seleccionar</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </Field>

        <Field label="URL de la imagen">
          <input
            {...register('image_url', { required: true })}
            placeholder="https://example.com/poster.jpg"
            className={input}
          />
        </Field>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-fit self-end py-2.5 px-5 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-medium transition-colors text-sm hover:cursor-pointer outline-none"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader2 size={15} className="animate-spin" />
              Guardando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Save size={15} />
              Guardar película
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

const input = 'w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 transition-colors'

const selectCls = 'w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-zinc-900 appearance-none cursor-pointer transition-colors'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  )
}
