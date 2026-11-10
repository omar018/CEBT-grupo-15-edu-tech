import { useState, useCallback } from 'react'
import confetti from 'canvas-confetti'
import type { Professor } from '../types/professor'
import type { StudentProfile } from '../types/learning-profile'
import { formatColombianDate } from '../utils/date-formatter'

export interface BookedSession {
  readonly id: string
  readonly professor: Professor
  readonly studentName: string
  readonly subject: string
  readonly dateFormatted: string
  readonly timeSlot: string
  readonly targetTopic: string
  readonly studentNotes: string
  readonly matchScore: number
  readonly status: 'CONFIRMADA' | 'COMPLETADA'
}

export function useBooking() {
  const [sessions, setSessions] = useState<readonly BookedSession[]>([])
  const [activeBookingProf, setActiveBookingProf] = useState<Professor | null>(null)
  const [bookingStatusMessage, setBookingStatusMessage] = useState<string>('')

  const handleOpenBooking = useCallback((prof: Professor) => {
    setActiveBookingProf(prof)
  }, [])

  const handleCloseBooking = useCallback(() => {
    setActiveBookingProf(null)
  }, [])

  const handleConfirmBooking = useCallback(
    (
      prof: Professor,
      profile: StudentProfile | null,
      subject: string,
      date: Date,
      timeSlot: string,
      targetTopic: string,
      studentNotes: string,
      matchScore: number
    ) => {
      // Validación fail-fast
      if (!subject.trim()) {
        throw new Error('Debe seleccionar la asignatura a reforzar.')
      }
      if (!targetTopic.trim()) {
        throw new Error('Debe especificar el tema o dificultad concreta a trabajar.')
      }

      const dateFormatted = formatColombianDate(date)

      const newSession: BookedSession = {
        id: `sess-${Date.now()}`,
        professor: prof,
        studentName: profile?.name ?? 'Estudiante UNAL',
        subject,
        dateFormatted,
        timeSlot,
        targetTopic,
        studentNotes,
        matchScore,
        status: 'CONFIRMADA',
      }

      setSessions((prev) => [newSession, ...prev])
      setActiveBookingProf(null)
      setBookingStatusMessage(`Tutoría confirmada con ${prof.fullName} para el ${dateFormatted}`)

      // Micro-interacción celebratoria
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#006837', '#94B43B', '#F59E0B'],
        })
      } catch {
        // En caso de entorno sin canvas
      }
    },
    []
  )

  return {
    sessions,
    activeBookingProf,
    bookingStatusMessage,
    handleOpenBooking,
    handleCloseBooking,
    handleConfirmBooking,
  }
}
