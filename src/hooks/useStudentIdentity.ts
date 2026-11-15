import { useState, useCallback, useEffect } from 'react'
import type { StudentIdentity } from '../types/student'
import { DEMO_STUDENTS } from '../data/demo-students'

const STORAGE_KEY = 'edumatch_student_session'

export function useStudentIdentity() {
  const [currentStudent, setCurrentStudent] = useState<StudentIdentity>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as StudentIdentity
        if (parsed?.name && parsed?.email) {
          return parsed
        }
      }
    } catch {
      // Ignore localStorage errors
    }
    return DEMO_STUDENTS[0]
  })

  const [isIdentityModalOpen, setIsIdentityModalOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentStudent))
    } catch {
      // Ignore storage errors
    }
  }, [currentStudent])

  const openIdentityModal = useCallback(() => {
    setIsIdentityModalOpen(true)
  }, [])

  const closeIdentityModal = useCallback(() => {
    setIsIdentityModalOpen(false)
  }, [])

  const selectDemoStudent = useCallback((demoId: string) => {
    const found = DEMO_STUDENTS.find((s) => s.id === demoId)
    if (found) {
      setCurrentStudent(found)
      setIsIdentityModalOpen(false)
    }
  }, [])

  const loginWithUnalEmail = useCallback(
    (name: string, email: string, program: string, semester: number) => {
      const cleanEmail = email.trim().toLowerCase()
      const cleanName = name.trim()

      if (!cleanName) {
        return { success: false, error: 'Por favor ingresa tu nombre completo.' }
      }

      if (!cleanEmail.endsWith('@unal.edu.co')) {
        return {
          success: false,
          error: 'Acceso exclusivo: el correo debe terminar en @unal.edu.co para validar tu pertenencia a la sede.',
        }
      }

      const newStudent: StudentIdentity = {
        id: `unal-${Date.now()}`,
        name: cleanName,
        email: cleanEmail,
        program,
        faculty: 'Facultad de Minas',
        semester,
        isDemo: false,
      }

      setCurrentStudent(newStudent)
      setIsIdentityModalOpen(false)
      return { success: true }
    },
    []
  )

  return {
    currentStudent,
    isIdentityModalOpen,
    openIdentityModal,
    closeIdentityModal,
    selectDemoStudent,
    loginWithUnalEmail,
  }
}
