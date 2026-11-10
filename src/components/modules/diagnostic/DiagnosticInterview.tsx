import React from 'react'
import { ArrowLeft, ArrowRight, CheckCircle, RefreshCw } from 'lucide-react'
import { StudentMetadataForm } from './StudentMetadataForm'
import { DiagnosticStepCard } from './DiagnosticStepCard'
import { ProfileSummaryCard } from './ProfileSummaryCard'
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/Card'
import { Button } from '../../ui/Button'
import { Progress } from '../../ui/Progress'
import { Badge } from '../../ui/Badge'
import type { useDiagnostic } from '../../../hooks/useDiagnostic'

interface DiagnosticInterviewProps {
  readonly diagnosticState: ReturnType<typeof useDiagnostic>
  readonly onNavigateToMatches: () => void
}

export const DiagnosticInterview: React.FC<DiagnosticInterviewProps> = ({
  diagnosticState,
  onNavigateToMatches,
}) => {
  const {
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
    isCompleted,
    deducedProfile,
    handleSelectOption,
    handleNextStep,
    handlePreviousStep,
    handleResetDiagnostic,
  } = diagnosticState

  const progressPercent = Math.round(((currentStepIndex + (currentAnswer ? 1 : 0)) / totalSteps) * 100)

  if (isCompleted && deducedProfile) {
    return (
      <div className="space-y-6 animate-fade-in">
        <ProfileSummaryCard
          profile={deducedProfile}
          onExploreMatches={onNavigateToMatches}
          onRetakeDiagnostic={handleResetDiagnostic}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-surface-200 shadow-subtle overflow-hidden">
        <CardHeader className="bg-surface-50 border-b border-surface-200 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="unal" className="text-xs">
                  Entrevista de Diagnóstico Cognitivo
                </Badge>
                <span className="text-xs font-semibold text-slate-500">
                  Paso {currentStepIndex + 1} de {totalSteps}
                </span>
              </div>
              <CardTitle className="text-xl font-extrabold text-slate-900">
                {currentQuestion.title}
              </CardTitle>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetDiagnostic}
              className="text-slate-500 hover:text-slate-800 self-start sm:self-auto"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" />
              Reiniciar
            </Button>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>Progreso de deducción</span>
              <span>{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} indicatorClassName="bg-unal-700" />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Formulario de estudiante */}
          {currentStepIndex === 0 && (
            <StudentMetadataForm
              studentName={studentName}
              onNameChange={setStudentName}
              faculty={faculty}
              onFacultyChange={setFaculty}
              semester={semester}
              onSemesterChange={setSemester}
            />
          )}

          {/* Pregunta activa */}
          <DiagnosticStepCard
            question={currentQuestion}
            selectedOption={currentAnswer}
            onSelectOption={handleSelectOption}
          />

          {/* Barra de navegación de pasos */}
          <div className="mt-8 pt-4 border-t border-surface-100 flex items-center justify-between gap-3">
            <Button
              variant="secondary"
              onClick={handlePreviousStep}
              disabled={currentStepIndex === 0}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Anterior</span>
            </Button>

            <Button
              variant="default"
              onClick={handleNextStep}
              disabled={!currentAnswer}
              className="shadow-sm"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Finalizar y Deducir Perfil' : 'Siguiente Paso'}</span>
              {currentStepIndex === totalSteps - 1 ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
