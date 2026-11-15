import { useState, useMemo, useCallback, useEffect } from 'react'
import { DIAGNOSTIC_QUESTIONS } from '../data/questions'
import type { DiagnosticOption, StudentProfile } from '../types/learning-profile'
import type { StudentIdentity } from '../types/student'
import { calculateStudentProfile } from '../utils/pedagogical-engine'

export function useDiagnostic(initialStudent?: StudentIdentity) {
  const [studentName, setStudentName] = useState(initialStudent?.name ?? 'Estudiante UNAL')
  const [faculty, setFaculty] = useState(initialStudent?.program ?? 'Facultad de Minas')
  const [semester, setSemester] = useState<number>(initialStudent?.semester ?? 2)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, DiagnosticOption>>({})
  const [statusAnnouncement, setStatusAnnouncement] = useState<string>('Iniciando entrevista diagnóstica.')

  const totalSteps = DIAGNOSTIC_QUESTIONS.length
  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentStepIndex]
  const currentAnswer = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined

  // Carga reactiva de identidad o perfil demo
  const loadStudentIdentity = useCallback((identity: StudentIdentity) => {
    setStudentName(identity.name)
    setFaculty(identity.program)
    setSemester(identity.semester)

    if (identity.presetAnswers) {
      const answers: Record<string, DiagnosticOption> = {}
      for (const q of DIAGNOSTIC_QUESTIONS) {
        const optionId = identity.presetAnswers[q.id]
        if (optionId) {
          const opt = q.options.find((o) => o.id === optionId)
          if (opt) {
            answers[q.id] = opt
          }
        }
      }
      setSelectedAnswers(answers)
      setCurrentStepIndex(totalSteps - 1)
      setStatusAnnouncement(`Perfil cargado: ${identity.name} (${identity.program}).`)
    } else {
      setSelectedAnswers({})
      setCurrentStepIndex(0)
      setStatusAnnouncement(`Nuevo estudiante: ${identity.name}.`)
    }
  }, [totalSteps])

  useEffect(() => {
    if (initialStudent) {
      loadStudentIdentity(initialStudent)
    }
  }, [initialStudent, loadStudentIdentity])

  const isCompleted = useMemo(() => {
    return totalSteps > 0 && Object.keys(selectedAnswers).length === totalSteps
  }, [totalSteps, selectedAnswers])

  // Cálculo derivado puro del perfil del estudiante (sin useEffect)
  const deducedProfile: StudentProfile | null = useMemo(() => {
    if (!isCompleted) return null
    const optionsList = Object.values(selectedAnswers)
    return calculateStudentProfile(studentName, faculty, semester, optionsList)
  }, [isCompleted, studentName, faculty, semester, selectedAnswers])

  const handleSelectOption = useCallback(
    (questionId: string, option: DiagnosticOption) => {
      setSelectedAnswers((prev) => ({
        ...prev,
        [questionId]: option,
      }))
      setStatusAnnouncement(`Opción seleccionada: ${option.label}`)
    },
    []
  )

  const handleNextStep = useCallback(() => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1)
      setStatusAnnouncement(`Paso ${currentStepIndex + 2} de ${totalSteps}`)
    } else {
      setStatusAnnouncement('Entrevista completada. Calculando perfil de aprendizaje y afinidad docente.')
    }
  }, [currentStepIndex, totalSteps])

  const handlePreviousStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1)
      setStatusAnnouncement(`Paso ${currentStepIndex} de ${totalSteps}`)
    }
  }, [currentStepIndex, totalSteps])

  const handleResetDiagnostic = useCallback(() => {
    setSelectedAnswers({})
    setCurrentStepIndex(0)
    setStatusAnnouncement('Entrevista reiniciada.')
  }, [])

  return {
    studentName,
    setStudentName,
    faculty,
    setFaculty,
    semester,
    setSemester,
    currentStepIndex,
    totalSteps,
    currentQuestion,
    currentAnswer,
    selectedAnswers,
    isCompleted,
    deducedProfile,
    statusAnnouncement,
    handleSelectOption,
    handleNextStep,
    handlePreviousStep,
    handleResetDiagnostic,
    loadStudentIdentity,
  }
}
