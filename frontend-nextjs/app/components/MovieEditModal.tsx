'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { X, Save, Loader2 } from 'lucide-react'
import type { MovieEditModalProps, MovieFormData } from '@/app/types/movie'
import { updateMovie } from '@/app/lib/api'
import { showToast } from "nextjs-toast-notify";

const CURRENT_YEAR = new Date().getFullYear()

const GENRES = [
  'Acción', 'Aventura', 'Animación', 'Comedia', 'Drama',
  'Terror', 'Ciencia Ficción', 'Thriller', 'Romance', 'Documental', 'Otro',
]

const STARS_OPTIONS = [5.0, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 0.5, 0.0]

export default function MovieEditModal({ movie, onSave, onClose }: MovieEditModalProps) {
  const [closing, setClosing] = useState(false)

  function handleClose() {
    setClosing(true)
  }

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<MovieFormData>({
    defaultValues: {
      title: movie.title,
      description: movie.description,
      year: movie.year,
      image_url: movie.image_url,
      genre: movie.genre,
      stars: movie.stars,
    },
  })

  async function onSubmit(data: MovieFormData) {
    try {
      const updated = await updateMovie(movie.id, {
        ...data,
        year: Number(data.year),
        stars: Number(data.stars),
      })
      onSave(updated)

      showToast.success("¡La Película fue actualizada correctamente!", {
        position: "bottom-right",
        transition: "swingInverted",
        sound: true,
      });
    } catch {
      alert('Error al actualizar la película')
    }
  }

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${closing ? 'animate-backdrop-out' : 'animate-backdrop-in'}`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-xl w-full max-w-md mx-4 shadow-xl ${closing ? 'animate-modal-out' : 'animate-modal-in'}`}
        onClick={e => e.stopPropagation()}
        onAnimationEnd={() => { if (closing) onClose() }}
      >

        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200">
          <h2 className="text-base font-semibold text-gray-900">Editar película</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 outline-none cursor-pointer">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-4 flex flex-col gap-3 max-h-[75vh] overflow-y-auto">
          <Field label="Título">
            <input {...register('title', { required: true })} className={input} />
          </Field>

          <Field label="Descripción">
            <textarea {...register('description', { required: true })} rows={2} className={input} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Año">
              <input type="number" {...register('year', { required: true, min: 1888, max: CURRENT_YEAR })} className={input} />
            </Field>
            <Field label="Estrellas">
              <select {...register('stars', { required: true })} className={selectCls}>
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
              {GENRES.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>
          </Field>

          <Field label="URL de la imagen">
            <input {...register('image_url', { required: true })} className={input} />
          </Field>

          <div className="flex justify-end gap-2 pt-1">
            <button type="button" onClick={handleClose} className="px-4 py-1.5 text-sm rounded-lg border border-zinc-200 text-gray-600 hover:bg-gray-50 transition-colors outline-none cursor-pointer">
              Cancelar
            </button>
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-1.5 px-4 py-1.5 text-sm rounded-lg bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-400 text-white transition-colors outline-none cursor-pointer">
              {isSubmitting ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
              Guardar
            </button>
          </div>
        </form>

      </div>
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
