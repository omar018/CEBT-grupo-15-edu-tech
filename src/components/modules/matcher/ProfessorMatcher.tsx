import React, { useState } from 'react'
import { Zap, BookCheck } from 'lucide-react'
import type { useProfessorMatcher } from '../../../hooks/useProfessorMatcher'
import type { StudentProfile } from '../../../types/learning-profile'
import type { MatchedProfessor } from '../../../types/professor'
import { ProfessorCard } from './ProfessorCard'
import { ProfessorFilters } from './ProfessorFilters'
import { ProfessorDetailModal } from './ProfessorDetailModal'
import { PreChatModal } from '../chat/PreChatModal'
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
    selectedMatchedProfessor,
    handleSelectProfessor,
  } = matcherState

  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [selectedMatchForChat, setSelectedMatchForChat] = useState<MatchedProfessor | null>(null)
  const [topRecommendedOnly, setTopRecommendedOnly] = useState<boolean>(true)

  const handleOpenDetailModal = (profId: string) => {
    handleSelectProfessor(profId)
    setIsDetailOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailOpen(false)
    handleSelectProfessor(null)
  }

  const handleOpenChat = (match: MatchedProfessor) => {
    setSelectedMatchForChat(match)
    setIsChatOpen(true)
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
    setSelectedMatchForChat(null)
  }

  const displayedMatches = topRecommendedOnly ? filteredMatches.slice(0, 3) : filteredMatches

  return (
    <div className="space-y-6">
      {/* Banner de Tutores Recomendados */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#1E232B] border border-surface-200 dark:border-slate-800 shadow-subtle transition-colors">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-unal-50 dark:bg-unal-950/60 border border-unal-200 dark:border-unal-800 flex items-center justify-center text-unal-700 dark:text-unal-400">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                {topRecommendedOnly ? 'Tutores Recomendados (Mayor Afinidad)' : 'Directorio Docente Completo'}
              </h2>
              <Badge variant="lime" className="text-[11px] font-bold">
                ≤ 5 min de decisión
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Emparejamiento personalizado según tu método de aprendizaje en ciencias básicas
            </p>
          </div>
        </div>

        {/* Toggle Recomendados vs Catálogo */}
        <div className="flex items-center gap-2">
          <Button
            variant={topRecommendedOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTopRecommendedOnly(true)}
            className="text-xs h-8"
          >
            Top 3 Recomendados
          </Button>
          <Button
            variant={!topRecommendedOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTopRecommendedOnly(false)}
            className="text-xs h-8"
          >
            Ver Todos ({filteredMatches.length})
          </Button>
        </div>
      </div>

      {/* Filtros */}
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

      {/* Grid de Profesores */}
      {displayedMatches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedMatches.map((m) => (
            <ProfessorCard
              key={m.professor.id}
              match={m}
              onOpenDetails={handleOpenDetailModal}
              onOpenChat={handleOpenChat}
              onBookSession={onBookSession}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 px-4 rounded-xl bg-white dark:bg-[#1E232B] border border-dashed border-surface-300 dark:border-slate-800 space-y-3">
          <BookCheck className="h-10 w-10 text-slate-400 mx-auto" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
            No se encontraron docentes con esos filtros
          </h3>
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

      {/* Modales */}
      <ProfessorDetailModal
        match={selectedMatchedProfessor}
        studentProfile={studentProfile}
        isOpen={isDetailOpen}
        onClose={handleCloseDetailModal}
        onBookSession={onBookSession}
      />

      <PreChatModal
        match={selectedMatchForChat}
        studentProfile={studentProfile}
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        onProceedToBooking={onBookSession}
      />
    </div>
  )
}
