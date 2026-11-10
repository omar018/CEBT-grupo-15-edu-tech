import React from 'react'
import { CheckCircle, MapPin, Sparkles, Calendar, ArrowUpRight } from 'lucide-react'
import type { MatchedProfessor } from '../../../types/professor'
import { Card, CardContent } from '../../ui/Card'
import { Badge } from '../../ui/Badge'
import { Button } from '../../ui/Button'

interface ProfessorCardProps {
  readonly match: MatchedProfessor
  readonly onOpenDetails: (profId: string) => void
  readonly onBookSession: (match: MatchedProfessor) => void
}

export const ProfessorCard: React.FC<ProfessorCardProps> = ({
  match,
  onOpenDetails,
  onBookSession,
}) => {
  const { professor, breakdown } = match
  const score = breakdown.overallMatchScore

  const getScoreVariant = (val: number) => {
    if (val >= 85) return 'lime'
    if (val >= 75) return 'unal'
    return 'amber'
  }

  return (
    <Card className="group relative flex flex-col justify-between overflow-hidden border-surface-200 hover:border-unal-600/50 hover:shadow-elevated transition-all duration-200 bg-white">
      {/* Barra de acento con el puntaje de match */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-surface-100 group-hover:bg-gradient-to-r group-hover:from-unal-700 group-hover:to-unal-300 transition-colors" />

      <CardContent className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header del profesor: Avatar + Match Badge */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={professor.avatarUrl}
                  alt={`Foto de ${professor.fullName}`}
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-unal-700/20 shadow-sm"
                  loading="lazy"
                />
                {professor.verifiedUnal && (
                  <span
                    className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-unal-700 text-white ring-2 ring-white"
                    title="Docente verificado Universidad Nacional de Colombia"
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-unal-800 transition-colors text-base leading-snug">
                  {professor.fullName}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {professor.academicTitle}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-unal-700 font-semibold mt-0.5">
                  <MapPin className="h-3 w-3" />
                  <span>{professor.faculty}</span>
                </div>
              </div>
            </div>

            {/* Match Score Badge */}
            <div className="text-right shrink-0">
              <Badge variant={getScoreVariant(score)} className="text-sm px-2.5 py-1 font-extrabold shadow-sm">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                {score}%
              </Badge>
              <span className="block text-[10px] text-slate-400 font-medium mt-0.5">
                Afinidad pedagógica
              </span>
            </div>
          </div>

          {/* Lema pedagógico */}
          <blockquote className="mt-3.5 p-2.5 rounded-lg bg-surface-50 border border-surface-200/60 text-xs text-slate-700 italic leading-relaxed line-clamp-2">
            "{professor.teachingProfile.pedagogicalMotto}"
          </blockquote>

          {/* Asignaturas */}
          <div className="mt-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Asignaturas de tutoría:
            </span>
            <div className="flex flex-wrap gap-1">
              {professor.subjects.map((subj) => (
                <span
                  key={subj}
                  className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                >
                  {subj}
                </span>
              ))}
            </div>
          </div>

          {/* Destacados del match */}
          {breakdown.matchingHighlights.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-surface-100">
              <p className="text-[11px] text-unal-800 font-medium flex items-center gap-1">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-unal-500 shrink-0" />
                <span className="truncate">{breakdown.matchingHighlights[0]}</span>
              </p>
            </div>
          )}
        </div>

        {/* Modalidad y botones de acción */}
        <div className="mt-5 pt-3 border-t border-surface-100 flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-slate-500 bg-surface-100 px-2 py-1 rounded">
            {professor.modality}
          </span>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenDetails(professor.id)}
              className="text-xs h-8 px-2.5"
            >
              <span>Ver Sintonía</span>
              <ArrowUpRight className="h-3.5 w-3.5 ml-1" />
            </Button>

            <Button
              variant="default"
              size="sm"
              onClick={() => onBookSession(match)}
              className="text-xs h-8 px-3 font-semibold"
            >
              <Calendar className="h-3.5 w-3.5 mr-1" />
              <span>Agendar</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
