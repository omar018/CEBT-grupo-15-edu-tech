import React, { useState } from 'react'
import { Calendar, Clock, MapPin, CheckCircle2, BookOpen, AlertTriangle, ShieldCheck, RefreshCw } from 'lucide-react'
import type { BookedSession } from '../../../hooks/useBooking'
import { UNAL_PROFESSORS } from '../../../data/professors'
import { Card, CardContent } from '../../ui/Card'
import { Badge } from '../../ui/Badge'
import { Button } from '../../ui/Button'

interface BookedSessionsListProps {
  readonly sessions: readonly BookedSession[]
  readonly onExploreMore: () => void
}

export const BookedSessionsList: React.FC<BookedSessionsListProps> = ({
  sessions,
  onExploreMore,
}) => {
  const [simulatedCancellation, setSimulatedCancellation] = useState<boolean>(false)
  const [refundRequested, setRefundRequested] = useState<boolean>(false)

  // Sesión de demostración con profesor real si el usuario aún no ha agendado ninguna
  const fallbackProf = UNAL_PROFESSORS[0]
  const effectiveSessions: readonly BookedSession[] = sessions.length > 0 ? sessions : [
    {
      id: 'demo-session-h9',
      professor: fallbackProf,
      subject: 'Fundamentos de Programación',
      targetTopic: 'Punteros, estructuras y memoria dinámica en C++',
      studentName: 'Estudiante UNAL Minas',
      status: 'CONFIRMADA',
      dateFormatted: '18 nov 2026',
      timeSlot: '14:00 - 15:30 (Tarde)',
      studentNotes: 'Tengo parcial el viernes y necesito validar el ejercicio tipo examen.',
      matchScore: 85,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#1E232B] border border-surface-200 dark:border-slate-800 shadow-subtle transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              Tutorías Agendadas y Plan de Estudio
            </h2>
            <Badge variant="lime" className="text-[10px]">
              Garantía H9 Activa
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {effectiveSessions.length} {effectiveSessions.length === 1 ? 'sesión programada' : 'sesiones programadas'} con docentes UNAL Minas
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={simulatedCancellation ? 'secondary' : 'outline'}
            size="sm"
            onClick={() => {
              setSimulatedCancellation(!simulatedCancellation)
              setRefundRequested(false)
            }}
            className="text-xs border-amber-500/50 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30"
          >
            <AlertTriangle className="h-3.5 w-3.5 mr-1 text-amber-600 dark:text-amber-400" />
            {simulatedCancellation ? 'Restaurar Sesión Original' : 'Simular Cancelación (H9)'}
          </Button>

          <Button variant="default" size="sm" onClick={onExploreMore}>
            <BookOpen className="h-3.5 w-3.5 mr-1.5" />
            <span>Buscar Otra Tutoría</span>
          </Button>
        </div>
      </div>

      {/* Banner de Garantía H9 si se activa la simulación de cancelación */}
      {simulatedCancellation && (
        <div
          role="status"
          className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 space-y-3 animate-fade-in"
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 text-amber-700 dark:text-amber-400 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-amber-900 dark:text-amber-200">
                Garantía Edumatch Activada (Resolviendo la Fricción H9)
              </h4>
              <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                El docente titular canceló por fuerza mayor. En WhatsApp esto significaba perder el parcial; en Edumatch, nuestro algoritmo ya reasignó automáticamente tu cupo a la <strong>Dra. Sofía Mantilla Gómez (83% de química pedagógica)</strong> en el mismo horario sin cobrarte un solo peso más.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-amber-200/60 dark:border-amber-900/60">
            <span className="text-[11px] font-bold text-amber-900 dark:text-amber-200">
              ¿Qué prefieres hacer?
            </span>
            <Button
              variant="default"
              size="sm"
              onClick={() => alert('¡Reasignación confirmada con la Dra. Sofía Mantilla en Bloque M1!')}
              className="text-xs h-7 bg-emerald-700 hover:bg-emerald-800 text-white"
            >
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
              Aceptar Tutor de Respaldo #2
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setRefundRequested(true)}
              disabled={refundRequested}
              className="text-xs h-7 border-amber-400 dark:border-amber-700 text-amber-900 dark:text-amber-300"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              {refundRequested ? 'Reembolso COP $5.000 Procesado' : 'Reembolso Inmediato ($5.000 COP)'}
            </Button>
          </div>

          {refundRequested && (
            <p className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 p-2 rounded border border-emerald-200 dark:border-emerald-800">
              ✓ Tu tarifa de conexión de $5.000 COP fue devuelta instantáneamente a tu cuenta. ¡Cero riesgo para el estudiante!
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {effectiveSessions.map((sess) => (
          <Card key={sess.id} className="border-surface-200 dark:border-slate-800 bg-white dark:bg-[#1E232B] shadow-subtle overflow-hidden">
            <div className={`h-1 ${simulatedCancellation ? 'bg-amber-500' : 'bg-gradient-to-r from-unal-700 to-unal-300'}`} />
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={simulatedCancellation ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80' : sess.professor.avatarUrl}
                    alt={sess.professor.fullName}
                    className="h-11 w-11 rounded-full object-cover ring-2 ring-unal-700/20"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-tight">
                      {simulatedCancellation ? 'Dra. Sofía Mantilla Gómez (Reasignada)' : sess.professor.fullName}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {simulatedCancellation ? 'Escuela de Matemáticas · UNAL Medellín' : sess.professor.faculty}
                    </p>
                  </div>
                </div>

                <Badge variant={simulatedCancellation ? 'amber' : 'lime'} className="text-xs">
                  {simulatedCancellation ? (
                    <>
                      <ShieldCheck className="h-3 w-3 mr-1 text-amber-700 dark:text-amber-400" />
                      Garantía Activa
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-3 w-3 mr-1 text-unal-800 dark:text-unal-950" />
                      Confirmada
                    </>
                  )}
                </Badge>
              </div>

              <div className="p-3 rounded-lg bg-surface-50 dark:bg-[#171B21] border border-surface-200/60 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                  <span>{sess.subject}</span>
                  <span className="text-unal-700 dark:text-unal-400">
                    {simulatedCancellation ? '83% match (Tutor #2)' : `${sess.matchScore}% match`}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 font-medium">
                  Tema: <strong className="text-slate-800 dark:text-slate-200">{sess.targetTopic}</strong>
                </p>
                {sess.studentNotes && (
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] italic">
                    Acuerdo: "{sess.studentNotes}"
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-surface-100 dark:border-slate-800 gap-2">
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="h-3.5 w-3.5 text-unal-700 dark:text-unal-400" />
                  <span>{sess.dateFormatted}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                  <span>{sess.timeSlot}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  <span>{simulatedCancellation ? 'Bloque M1 (Minas)' : sess.professor.officeHours.split(',')[0]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
