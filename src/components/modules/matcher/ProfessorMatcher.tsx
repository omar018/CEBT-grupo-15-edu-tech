import React, { useState } from 'react'
import { Sparkles, Users, BookCheck } from 'lucide-react'
import type { useProfessorMatcher } from '../../../hooks/useProfessorMatcher'
import type { StudentProfile } from '../../../types/learning-profile'
import type { MatchedProfessor } from '../../../types/professor'
import { ProfessorCard } from './ProfessorCard'
import { ProfessorFilters } from './ProfessorFilters'
import { ProfessorDetailModal } from './ProfessorDetailModal'
import { Badge } from '../../ui/Badge'
import { Button } from '../../ui/Button'

interface ProfessorMatcherProps {
  readonly matcherState: ReturnType<typeof useProfessorMatcher>
  readonly studentProfile: StudentProfile | null
  readonly onBookSession: (match: MatchedProfessor) => void
  readonly onGoToDiagnostic: () => void
}

export const ProfessorMatcher: React.FC<ProfessorMatcherProps> = ({
  matcherState,
  studentProfile,
  onBookSession,
  onGoToDiagnostic,
}) => {
  const {
    selectedFaculty,
    setSelectedFaculty,
    selectedModality,
    setSelectedModality,
    searchQuery,
    setSearchQuery,
    minMatchScore,
    setMinMatchScore,
    sortCriterion,
    setSortCriterion,
    filteredMatches,
    allRankedMatches,
    selectedMatchedProfessor,
    handleSelectProfessor,
  } = matcherState

  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleOpenDetailModal = (profId: string) => {
    handleSelectProfessor(profId)
    setIsDetailOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailOpen(false)
    handleSelectProfessor(null)
  }

  const averageMatch =
    allRankedMatches.length > 0
      ? Math.round(
          allRankedMatches.reduce((acc, curr) => acc + curr.breakdown.overallMatchScore, 0) /
            allRankedMatches.length
        )
      : 0

  return (
    <div className="space-y-6">
      {/* Banner de estado del matching */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-surface-200 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-unal-50 border border-unal-200 flex items-center justify-center text-unal-700">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                Directorio Docente UNAL
              </h2>
              {studentProfile ? (
                <Badge variant="lime" className="text-[11px]">
                  Calibrado con tu perfil ({studentProfile.name})
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-[11px]">
                  Calibración estándar
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">
              {filteredMatches.length} docentes disponibles · Compatibilidad promedio: {averageMatch}%
            </p>
          </div>
        </div>

        {!studentProfile && (
          <Button
            variant="default"
            size="sm"
            onClick={onGoToDiagnostic}
            className="text-xs shrink-0 shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1 text-unal-300" />
            Hacer Entrevista para Mejor Match
          </Button>
        )}
      </div>

      {/* Controles de Filtros */}
      <ProfessorFilters
        selectedFaculty={selectedFaculty}
        onFacultyChange={setSelectedFaculty}
        selectedModality={selectedModality}
        onModalityChange={setSelectedModality}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        minMatchScore={minMatchScore}
        onMinMatchScoreChange={setMinMatchScore}
        sortCriterion={sortCriterion}
        onSortCriterionChange={setSortCriterion}
        onResetFilters={() => {
          setSelectedFaculty('ALL')
          setSelectedModality('ALL')
          setSearchQuery('')
          setMinMatchScore(50)
          setSortCriterion('matchScore')
        }}
      />

      {/* Grid de Profesores Emparejados */}
      {filteredMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMatches.map((m) => (
            <ProfessorCard
              key={m.professor.id}
              match={m}
              onOpenDetails={handleOpenDetailModal}
              onBookSession={onBookSession}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-xl bg-white border border-dashed border-surface-300 space-y-3">
          <BookCheck className="h-10 w-10 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800">
            No se encontraron docentes con esos criterios
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Prueba reduciendo el umbral de afinidad o seleccionando "Todas las facultades" para ver más opciones en el campus.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedFaculty('ALL')
              setSelectedModality('ALL')
              setSearchQuery('')
              setMinMatchScore(50)
            }}
          >
            Restablecer Filtros
          </Button>
        </div>
      )}

      {/* Modal de Detalle */}
      <ProfessorDetailModal
        match={selectedMatchedProfessor}
        studentProfile={studentProfile}
        isOpen={isDetailOpen}
        onClose={handleCloseDetailModal}
        onBookSession={onBookSession}
      />
    </div>
  )
}
