import React, { useState } from 'react'
import { AlertCircle, Sparkles } from 'lucide-react'
import type { Professor, MatchedProfessor } from '../../../types/professor'
import type { StudentProfile } from '../../../types/learning-profile'
import { Dialog } from '../../ui/Dialog'
import { Button } from '../../ui/Button'
import { Badge } from '../../ui/Badge'

interface BookingModalProps {
  readonly match: MatchedProfessor | null
  readonly studentProfile: StudentProfile | null
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onConfirm: (
    prof: Professor,
    profile: StudentProfile | null,
    subject: string,
    date: Date,
    timeSlot: string,
    targetTopic: string,
    studentNotes: string,
    matchScore: number
  ) => void
}

export const BookingModal: React.FC<BookingModalProps> = ({
  match,
  studentProfile,
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!match) return null

  const { professor, breakdown } = match

  // Estado del formulario (Single Source of Truth - PR-12)
  const [selectedSubject, setSelectedSubject] = useState<string>(professor.subjects[0] ?? '')
  const [sessionDate, setSessionDate] = useState<string>(() => {
    const nextDay = new Date()
    nextDay.setDate(nextDay.getDate() + 2)
    return nextDay.toISOString().split('T')[0]
  })
  const [timeSlot, setTimeSlot] = useState<string>('14:00 - 15:30 (Tarde)')
  const [targetTopic, setTargetTopic] = useState<string>('')
  const [studentNotes, setStudentNotes] = useState<string>(
    studentProfile
      ? `Estudiante con perfil ${studentProfile.primarySensory}. Recomiendo iniciar con un esquema visual y enfocar la sesión en ejercicios tipo parcial.`
      : ''
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación temprana Fail-Fast (PR-07)
    if (!selectedSubject.trim()) {
      setErrorMessage('Por favor selecciona una asignatura.')
      return
    }
    if (!targetTopic.trim()) {
      setErrorMessage('Por favor especifica el tema o ejercicio que deseas reforzar.')
      return
    }

    try {
      const parsedDate = new Date(`${sessionDate}T12:00:00`)
      onConfirm(
        professor,
        studentProfile,
        selectedSubject,
        parsedDate,
        timeSlot,
        targetTopic,
        studentNotes,
        breakdown.overallMatchScore
      )
      setErrorMessage(null)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message)
      } else {
        setErrorMessage('Ocurrió un error al agendar la sesión.')
      }
    }
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Agendar Tutoría: ${professor.fullName}`}
      description={`${professor.department} · ${professor.modality}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-50 text-red-800 text-xs font-semibold flex items-center gap-2 border border-red-200">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Resumen de match */}
        <div className="p-3 rounded-xl bg-unal-50 border border-unal-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-unal-900 font-bold">
            <Sparkles className="h-4 w-4 text-unal-700" />
            <span>Afinidad pedagógica: {breakdown.overallMatchScore}%</span>
          </div>
          <Badge variant="lime" className="text-[11px]">
            {professor.modality}
          </Badge>
        </div>

        {/* Asignatura */}
        <div>
          <label htmlFor="subject-select" className="block text-xs font-bold text-slate-700 mb-1">
            Asignatura a reforzar *
          </label>
          <select
            id="subject-select"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full h-10 px-3 text-xs bg-white border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30"
          >
            {professor.subjects.map((subj) => (
              <option key={subj} value={subj}>
                {subj}
              </option>
            ))}
          </select>
        </div>

        {/* Fecha y Franja Horaria */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="date-input" className="block text-xs font-bold text-slate-700 mb-1">
              Fecha propuesta *
            </label>
            <input
              id="date-input"
              type="date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-white border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30"
            />
          </div>

          <div>
            <label htmlFor="slot-select" className="block text-xs font-bold text-slate-700 mb-1">
              Franja horaria *
            </label>
            <select
              id="slot-select"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full h-10 px-3 text-xs bg-white border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30"
            >
              <option value="09:00 - 10:30 (Mañana)">09:00 - 10:30 (Mañana)</option>
              <option value="11:00 - 12:30 (Mediodía)">11:00 - 12:30 (Mediodía)</option>
              <option value="14:00 - 15:30 (Tarde)">14:00 - 15:30 (Tarde)</option>
              <option value="16:00 - 17:30 (Fin de tarde)">16:00 - 17:30 (Fin de tarde)</option>
            </select>
          </div>
        </div>

        {/* Tema específico */}
        <div>
          <label htmlFor="topic-input" className="block text-xs font-bold text-slate-700 mb-1">
            Tema o ejercicio específico a trabajar *
          </label>
          <input
            id="topic-input"
            type="text"
            value={targetTopic}
            onChange={(e) => setTargetTopic(e.target.value)}
            placeholder="Ej: Teorema de Convergencia Dominada o Balance de Entalpía"
            className="w-full h-10 px-3 text-xs bg-white border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30"
          />
        </div>

        {/* Notas y preferencias pedagógicas */}
        <div>
          <label htmlFor="notes-area" className="block text-xs font-bold text-slate-700 mb-1">
            Nota de estilo de aprendizaje para el docente
          </label>
          <textarea
            id="notes-area"
            rows={2}
            value={studentNotes}
            onChange={(e) => setStudentNotes(e.target.value)}
            className="w-full p-2.5 text-xs bg-white border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30"
          />
        </div>

        {/* Botones de acción */}
        <div className="pt-2 flex items-center justify-end gap-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="default" type="submit" className="font-semibold shadow-sm">
            Confirmar y Agendar Tutoría
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
