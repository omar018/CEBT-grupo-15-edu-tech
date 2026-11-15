import React from 'react'
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react'
import type { UnalFaculty, Modality } from '../../../types/professor'
import type { SortCriterion } from '../../../hooks/useProfessorMatcher'
import { Button } from '../../ui/Button'

interface ProfessorFiltersProps {
  readonly selectedFaculty: UnalFaculty | 'ALL'
  readonly onFacultyChange: (fac: UnalFaculty | 'ALL') => void
  readonly selectedModality: Modality | 'ALL'
  readonly onModalityChange: (mod: Modality | 'ALL') => void
  readonly searchQuery: string
  readonly onSearchChange: (q: string) => void
  readonly minMatchScore: number
  readonly onMinMatchScoreChange: (score: number) => void
  readonly sortCriterion: SortCriterion
  readonly onSortCriterionChange: (crit: SortCriterion) => void
  readonly onResetFilters: () => void
}

const FACULTIES: readonly (UnalFaculty | 'ALL')[] = [
  'ALL',
  'Facultad de Ingeniería',
  'Facultad de Ciencias',
  'Facultad de Medicina',
  'Facultad de Ciencias Económicas',
]

const MODALITIES: readonly (Modality | 'ALL')[] = [
  'ALL',
  'Presencial (Campus UNAL)',
  'Híbrido',
  'Virtual sincrónico',
]

export const ProfessorFilters: React.FC<ProfessorFiltersProps> = ({
  selectedFaculty,
  onFacultyChange,
  selectedModality,
  onModalityChange,
  searchQuery,
  onSearchChange,
  minMatchScore,
  onMinMatchScoreChange,
  sortCriterion,
  onSortCriterionChange,
  onResetFilters,
}) => {
  return (
    <div className="bg-white dark:bg-[#1E232B] p-4 rounded-xl border border-surface-200 dark:border-slate-800 shadow-subtle space-y-3 transition-colors">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Barra de búsqueda */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por materia (Cálculo, Álgebra, Física, Programación)..."
            className="w-full h-10 pl-9 pr-3 text-sm bg-surface-50 dark:bg-[#171B21] text-slate-900 dark:text-slate-100 border border-surface-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30 dark:focus:ring-unal-400/30 focus:border-unal-700"
          />
        </div>

        {/* Ordenamiento */}
        <div className="flex items-center gap-2 shrink-0">
          <SlidersHorizontal className="h-4 w-4 text-slate-500 dark:text-slate-400" />
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 hidden sm:inline">Ordenar:</span>
          <select
            value={sortCriterion}
            onChange={(e) => onSortCriterionChange(e.target.value as SortCriterion)}
            className="h-10 px-3 text-xs font-medium bg-surface-50 dark:bg-[#171B21] text-slate-900 dark:text-slate-100 border border-surface-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30"
          >
            <option value="matchScore">Mayor Afinidad (%)</option>
            <option value="rating">Mejor Calificación</option>
            <option value="sessions">Más Tutorías Realizadas</option>
          </select>

          <Button
            variant="ghost"
            size="sm"
            onClick={onResetFilters}
            className="h-10 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            title="Restablecer filtros"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Filtros secundarios: Facultad, Modalidad y Score mínimo */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-surface-100 dark:border-slate-800">
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Facultad UNAL
          </label>
          <select
            value={selectedFaculty}
            onChange={(e) => onFacultyChange(e.target.value as UnalFaculty | 'ALL')}
            className="w-full h-9 px-2.5 text-xs bg-surface-50 dark:bg-[#171B21] text-slate-900 dark:text-slate-100 border border-surface-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30"
          >
            <option value="ALL">Todas las facultades</option>
            {FACULTIES.filter((f) => f !== 'ALL').map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
            Modalidad
          </label>
          <select
            value={selectedModality}
            onChange={(e) => onModalityChange(e.target.value as Modality | 'ALL')}
            className="w-full h-9 px-2.5 text-xs bg-surface-50 dark:bg-[#171B21] text-slate-900 dark:text-slate-100 border border-surface-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30"
          >
            <option value="ALL">Cualquier modalidad</option>
            {MODALITIES.filter((m) => m !== 'ALL').map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Afinidad mínima
            </label>
            <span className="text-xs font-bold text-unal-700 dark:text-unal-400">{minMatchScore}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="95"
            step="5"
            value={minMatchScore}
            onChange={(e) => onMinMatchScoreChange(Number(e.target.value))}
            className="w-full h-2 bg-surface-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-unal-700 dark:accent-unal-400"
          />
        </div>
      </div>
    </div>
  )
}
