import { useState, useMemo, useCallback } from 'react'
import { UNAL_PROFESSORS } from '../data/professors'
import type { StudentProfile } from '../types/learning-profile'
import type { MatchedProfessor, UnalFaculty, Modality } from '../types/professor'
import { rankProfessors } from '../utils/pedagogical-engine'

export type SortCriterion = 'matchScore' | 'rating' | 'sessions'

export function useProfessorMatcher(studentProfile: StudentProfile | null) {
  const [selectedFaculty, setSelectedFaculty] = useState<UnalFaculty | 'ALL'>('ALL')
  const [selectedModality, setSelectedModality] = useState<Modality | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [minMatchScore, setMinMatchScore] = useState<number>(60)
  const [sortCriterion, setSortCriterion] = useState<SortCriterion>('matchScore')
  const [selectedProfId, setSelectedProfId] = useState<string | null>(null)

  // 1. Ranking de profesores basado en el perfil del estudiante
  const allRankedMatches: readonly MatchedProfessor[] = useMemo(() => {
    if (!studentProfile) {
      // Si no ha hecho la entrevista, genera un baseline equilibrado
      const defaultDimensions = {
        visual: 60,
        auditory: 55,
        kinesthetic: 60,
        theoretical: 65,
        practical: 65,
        autonomy: 60,
      }
      const baselineProfile: StudentProfile = {
        id: 'baseline',
        name: 'Explorador',
        faculty: 'Facultad de Ingeniería',
        semester: 1,
        primarySensory: 'visual',
        kolbStyle: 'assimilator',
        interactionStyle: 'structured_directive',
        dimensions: defaultDimensions,
        keyTraits: ['Exploración inicial'],
        recommendedEnvironment: 'Sesiones equilibradas teórico-prácticas',
      }
      return rankProfessors(baselineProfile, UNAL_PROFESSORS)
    }

    return rankProfessors(studentProfile, UNAL_PROFESSORS)
  }, [studentProfile])

  // 2. Filtro y ordenamiento reactivo puro sin useEffect (Reglas de Arquitectura)
  const filteredMatches: readonly MatchedProfessor[] = useMemo(() => {
    let result = [...allRankedMatches]

    if (selectedFaculty !== 'ALL') {
      result = result.filter((m) => m.professor.faculty === selectedFaculty)
    }

    if (selectedModality !== 'ALL') {
      result = result.filter((m) => m.professor.modality === selectedModality)
    }

    if (minMatchScore > 0) {
      result = result.filter((m) => m.breakdown.overallMatchScore >= minMatchScore)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (m) =>
          m.professor.fullName.toLowerCase().includes(q) ||
          m.professor.subjects.some((s) => s.toLowerCase().includes(q)) ||
          m.professor.department.toLowerCase().includes(q)
      )
    }

    // Ordenamiento
    if (sortCriterion === 'matchScore') {
      result.sort((a, b) => b.breakdown.overallMatchScore - a.breakdown.overallMatchScore)
    } else if (sortCriterion === 'rating') {
      result.sort((a, b) => b.professor.rating - a.professor.rating)
    } else if (sortCriterion === 'sessions') {
      result.sort((a, b) => b.professor.completedSessions - a.professor.completedSessions)
    }

    return result
  }, [allRankedMatches, selectedFaculty, selectedModality, minMatchScore, searchQuery, sortCriterion])

  const selectedMatchedProfessor = useMemo(() => {
    if (!selectedProfId) return null
    return allRankedMatches.find((m) => m.professor.id === selectedProfId) ?? null
  }, [allRankedMatches, selectedProfId])

  const handleSelectProfessor = useCallback((id: string | null) => {
    setSelectedProfId(id)
  }, [])

  return {
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
  }
}
