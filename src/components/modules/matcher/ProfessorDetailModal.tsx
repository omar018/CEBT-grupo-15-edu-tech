import React from 'react'
import { Calendar, AlertTriangle, Check } from 'lucide-react'
import type { MatchedProfessor } from '../../../types/professor'
import type { StudentProfile } from '../../../types/learning-profile'
import { Dialog } from '../../ui/Dialog'
import { Button } from '../../ui/Button'
import { Progress } from '../../ui/Progress'

interface ProfessorDetailModalProps {
  readonly match: MatchedProfessor | null
  readonly studentProfile: StudentProfile | null
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onBookSession: (match: MatchedProfessor) => void
}

export const ProfessorDetailModal: React.FC<ProfessorDetailModalProps> = ({
  match,
  studentProfile,
  isOpen,
  onClose,
  onBookSession,
}) => {
  if (!match) return null

  const { professor, breakdown } = match
  const profDims = professor.teachingProfile.dimensions
  const studDims = studentProfile?.dimensions ?? {
    visual: 60,
    auditory: 55,
    kinesthetic: 60,
    theoretical: 65,
    practical: 65,
    autonomy: 60,
  }

  const dimensionAxes = [
    { key: 'visual' as const, label: 'Canal Visual (Mapas, Diagramas, Pizarra)' },
    { key: 'auditory' as const, label: 'Canal Auditivo (Explicación Dialéctica, Debate)' },
    { key: 'kinesthetic' as const, label: 'Canal Kinestésico (Resolución Activa, Simuladores)' },
    { key: 'theoretical' as const, label: 'Abstracción y Rigor Teórico' },
    { key: 'practical' as const, label: 'Aplicación Práctica a Problemas Reales' },
    { key: 'autonomy' as const, label: 'Autonomía y Descubrimiento Guiado' },
  ]

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Análisis de Sintonía Pedagógica: ${professor.fullName}`}
      description={`${professor.academicTitle} · ${professor.faculty}`}
      maxWidth="xl"
    >
      <div className="space-y-6">
        {/* Banner de Afinidad */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-r from-unal-900 via-unal-800 to-unal-700 text-white">
          <div>
            <span className="text-xs font-semibold text-unal-300 uppercase tracking-wider">
              Índice de Compatibilidad
            </span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-extrabold text-white">
                {breakdown.overallMatchScore}%
              </span>
              <span className="text-xs text-unal-200">
                {breakdown.overallMatchScore >= 80 ? 'Sinergia excepcional' : 'Buena complementariedad'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs">
            <div className="p-2 rounded-lg bg-white/10">
              <span className="block text-slate-300">Sensorial</span>
              <span className="font-bold text-white">{breakdown.sensorySynergy}%</span>
            </div>
            <div className="p-2 rounded-lg bg-white/10">
              <span className="block text-slate-300">Conceptual</span>
              <span className="font-bold text-white">{breakdown.conceptualAlignment}%</span>
            </div>
            <div className="p-2 rounded-lg bg-white/10 col-span-2 sm:col-span-1">
              <span className="block text-slate-300">Interacción</span>
              <span className="font-bold text-white">{breakdown.interactionFit}%</span>
            </div>
          </div>
        </div>

        {/* Comparativa dimensión por dimensión */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-700 pb-1 border-b border-surface-200">
            <span>Dimensión Pedagógica</span>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-unal-700">
                <span className="h-2 w-2 rounded-full bg-unal-600 inline-block" />
                Docente
              </span>
              <span className="flex items-center gap-1.5 text-slate-600">
                <span className="h-2 w-2 rounded-full bg-slate-400 inline-block" />
                Tu Perfil
              </span>
            </div>
          </div>

          <div className="space-y-3.5">
            {dimensionAxes.map((axis) => {
              const profVal = profDims[axis.key]
              const studVal = studDims[axis.key]

              return (
                <div key={axis.key} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold text-slate-800">
                    <span>{axis.label}</span>
                    <span className="text-slate-500 text-[11px]">
                      Doc: <strong className="text-unal-800">{profVal}%</strong> | Tú:{' '}
                      <strong>{studVal}%</strong>
                    </span>
                  </div>
                  <div className="space-y-1">
                    <Progress value={profVal} indicatorClassName="bg-unal-700 h-2" />
                    <Progress value={studVal} indicatorClassName="bg-slate-400 h-1.5" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Puntos destacados y advertencias */}
        <div className="space-y-2">
          {breakdown.matchingHighlights.map((hl) => (
            <div
              key={hl}
              className="flex items-start gap-2 p-2.5 rounded-lg bg-unal-50 text-xs font-medium text-unal-900 border border-unal-200"
            >
              <Check className="h-4 w-4 text-unal-700 shrink-0 mt-0.5" />
              <span>{hl}</span>
            </div>
          ))}

          {breakdown.potentialFrictionWarning && (
            <div className="flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 text-xs font-medium text-amber-900 border border-amber-200">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{breakdown.potentialFrictionWarning}</span>
            </div>
          )}
        </div>

        {/* Recursos preferidos y oficina UNAL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-surface-50 p-4 rounded-xl border border-surface-200">
          <div>
            <span className="font-bold text-slate-700 block mb-1">
              Recursos de apoyo del docente:
            </span>
            <ul className="list-disc list-inside text-slate-600 space-y-0.5">
              {professor.teachingProfile.preferredMaterials.map((mat) => (
                <li key={mat}>{mat}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-bold text-slate-700 block mb-1">
              Atención presencial / campus:
            </span>
            <p className="text-slate-600">{professor.officeHours}</p>
          </div>
        </div>

        {/* Botón de agendamiento */}
        <div className="pt-2 flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cerrar
          </Button>
          <Button
            variant="default"
            onClick={() => {
              onClose()
              onBookSession(match)
            }}
            className="shadow-sm font-semibold"
          >
            <Calendar className="h-4 w-4 mr-1.5" />
            <span>Agendar Tutoría con este Docente</span>
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
