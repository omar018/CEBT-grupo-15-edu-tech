import React from 'react'
import { CheckCircle, MapPin, Sparkles, Calendar, MessageSquare, Star, ArrowUpRight } from 'lucide-react'
import type { MatchedProfessor } from '../../../types/professor'
import { Card, CardContent } from '../../ui/Card'
import { Badge } from '../../ui/Badge'
import { Button } from '../../ui/Button'

interface ProfessorCardProps {
  readonly match: MatchedProfessor
  readonly onOpenDetails: (profId: string) => void
  readonly onOpenChat: (match: MatchedProfessor) => void
  readonly onBookSession: (match: MatchedProfessor) => void
}

export const ProfessorCard: React.FC<ProfessorCardProps> = ({
  match,
  onOpenDetails,
  onOpenChat,
  onBookSession,
}) => {
  const { professor, breakdown } = match
  const score = breakdown.overallMatchScore
  const latestReview = professor.peerReviews[0]

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border-surface-200 dark:border-slate-800 hover:border-unal-600/50 dark:hover:border-unal-500/50 hover:shadow-elevated transition-all duration-200 bg-white dark:bg-[#1E232B]">
      <div className="absolute top-0 left-0 right-0 h-1 bg-surface-100 dark:bg-slate-800 group-hover:bg-gradient-to-r group-hover:from-unal-700 group-hover:to-unal-300 transition-colors" />

      <CardContent className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header del tutor: Avatar + Score */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={professor.avatarUrl}
                  alt={`Foto de ${professor.fullName}`}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-unal-700/20 dark:ring-unal-400/20 shadow-sm"
                  loading="lazy"
                />
                {professor.verifiedUnal && (
                  <span
                    className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-unal-700 text-white ring-2 ring-white dark:ring-slate-900"
                    title="Docente verificado Universidad Nacional de Colombia"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-unal-800 dark:group-hover:text-unal-300 transition-colors text-base leading-snug">
                  {professor.fullName}
                </h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="flex items-center text-amber-500 text-xs font-bold">
                    <Star className="h-3.5 w-3.5 fill-current mr-0.5" />
                    <span>{professor.rating}</span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    ({professor.completedSessions} tutorías)
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-unal-700 dark:text-unal-400 font-semibold mt-0.5">
                  <MapPin className="h-3 w-3" />
                  <span>{professor.faculty}</span>
                </div>
              </div>
            </div>

            {/* Badge de Match Edumatch */}
            <div className="text-right shrink-0">
              <Badge variant={score >= 85 ? 'lime' : 'unal'} className="text-sm px-2.5 py-1 font-extrabold shadow-sm">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                {score}%
              </Badge>
              <span className="block text-[10px] text-slate-400 font-medium mt-0.5">
                Química pedagógica
              </span>
            </div>
          </div>

          {/* Reseña de pares */}
          {latestReview && (
            <div className="mt-3 p-2.5 rounded-lg bg-surface-50 dark:bg-[#171B21] border border-surface-200/70 dark:border-slate-800 text-xs">
              <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed line-clamp-2">
                "{latestReview.comment}"
              </p>
              <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-semibold mt-1">
                — {latestReview.studentInitials} · {latestReview.dateFormatted}
              </span>
            </div>
          )}

          {/* Asignaturas */}
          <div className="mt-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Ciencias Básicas:
            </span>
            <div className="flex flex-wrap gap-1">
              {professor.subjects.map((subj) => (
                <span
                  key={subj}
                  className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-unal-50 dark:bg-unal-950/60 text-unal-900 dark:text-unal-300 border border-unal-200 dark:border-unal-800 font-medium"
                >
                  {subj}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Precios y Acciones */}
        <div className="mt-4 pt-3 border-t border-surface-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 dark:text-slate-400 font-medium">
              Hora: <strong className="text-slate-800 dark:text-slate-200">${professor.hourlyRateCop.toLocaleString('es-CO')} COP</strong>
            </span>
            <span className="text-[11px] font-bold text-unal-700 dark:text-unal-400 bg-unal-50 dark:bg-unal-950/80 px-2 py-0.5 rounded border border-unal-200/50 dark:border-unal-800/50">
              Conexión: $5.000 COP
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenDetails(professor.id)}
              className="text-xs h-8 px-2 text-slate-700 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
              title="Ver análisis de sintonía"
            >
              <span>Sintonía</span>
              <ArrowUpRight className="h-3 w-3 ml-0.5" />
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => onOpenChat(match)}
              className="text-xs h-8 px-2 font-semibold text-unal-800 dark:text-unal-300 bg-unal-50 dark:bg-unal-950/50 hover:bg-unal-100 dark:hover:bg-unal-900/50 border border-unal-200 dark:border-unal-800"
            >
              <MessageSquare className="h-3 w-3 mr-1 text-unal-700 dark:text-unal-400" />
              <span>Chat Gratis</span>
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => onBookSession(match)}
              className="text-xs h-8 px-2 font-semibold shadow-sm"
            >
              <Calendar className="h-3 w-3 mr-1" />
              <span>Agendar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
