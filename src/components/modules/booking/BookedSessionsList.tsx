import React from 'react'
import { Calendar, Clock, MapPin, CheckCircle2, BookOpen } from 'lucide-react'
import type { BookedSession } from '../../../hooks/useBooking'
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
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl bg-white dark:bg-[#1E232B] border border-surface-200 dark:border-slate-800 shadow-subtle transition-colors">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Tutorías Agendadas y Plan de Estudio
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {sessions.length} {sessions.length === 1 ? 'sesión programada' : 'sesiones programadas'} con docentes UNAL
          </p>
        </div>

        <Button variant="default" size="sm" onClick={onExploreMore}>
          <BookOpen className="h-3.5 w-3.5 mr-1.5" />
          <span>Buscar Otra Tutoría</span>
        </Button>
      </div>

      {sessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sessions.map((sess) => (
            <Card key={sess.id} className="border-surface-200 dark:border-slate-800 bg-white dark:bg-[#1E232B] shadow-subtle overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-unal-700 to-unal-300" />
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={sess.professor.avatarUrl}
                      alt={sess.professor.fullName}
                      className="h-11 w-11 rounded-full object-cover ring-2 ring-unal-700/20"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-tight">
                        {sess.professor.fullName}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{sess.professor.faculty}</p>
                    </div>
                  </div>

                  <Badge variant="lime" className="text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1 text-unal-800 dark:text-unal-950" />
                    Confirmada
                  </Badge>
                </div>

                <div className="p-3 rounded-lg bg-surface-50 dark:bg-[#171B21] border border-surface-200/60 dark:border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                    <span>{sess.subject}</span>
                    <span className="text-unal-700 dark:text-unal-400">{sess.matchScore}% match</span>
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
                    <span>{sess.professor.officeHours.split(',')[0]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed border-2 border-surface-300 dark:border-slate-800 bg-surface-50/50 dark:bg-[#171B21]/50 p-10 text-center">
          <Calendar className="h-10 w-10 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">No tienes tutorías agendadas todavía</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
            Completa la entrevista de diagnóstico express para conocer tu método de aprendizaje y conectar con los tutores recomendados en ciencias básicas.
          </p>
          <Button variant="default" size="sm" onClick={onExploreMore}>
            Explorar La Criba de Tutores
          </Button>
        </Card>
      )}
    </div>
  )
}
