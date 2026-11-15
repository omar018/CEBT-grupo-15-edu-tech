import React from 'react'
import { CheckCircle2, HelpCircle } from 'lucide-react'
import type { DiagnosticQuestion, DiagnosticOption } from '../../../types/learning-profile'
import { cn } from '../../../lib/utils'

interface DiagnosticStepCardProps {
  readonly question: DiagnosticQuestion
  readonly selectedOption?: DiagnosticOption
  readonly onSelectOption: (questionId: string, option: DiagnosticOption) => void
}

export const DiagnosticStepCard: React.FC<DiagnosticStepCardProps> = ({
  question,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <div className="space-y-4">
      {/* Contexto del escenario pedagógico */}
      <div className="p-4 rounded-xl bg-unal-50/60 dark:bg-unal-950/40 border border-unal-200/70 dark:border-unal-800/60">
        <div className="flex items-start gap-2.5">
          <HelpCircle className="h-5 w-5 text-unal-700 dark:text-unal-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-unal-800 dark:text-unal-300">
              Escenario: {question.scenario}
            </p>
            <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              {question.context}
            </p>
          </div>
        </div>
      </div>

      {/* Opciones interactivas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3" role="radiogroup" aria-label={question.title}>
        {question.options.map((option) => {
          const isSelected = selectedOption?.id === option.id

          return (
            <div
              key={option.id}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => onSelectOption(question.id, option)}
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                  e.preventDefault()
                  onSelectOption(question.id, option)
                }
              }}
              className={cn(
                'group relative flex flex-col justify-between p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none text-left',
                isSelected
                  ? 'border-unal-700 dark:border-unal-500 bg-unal-50/40 dark:bg-unal-950/40 shadow-sm ring-1 ring-unal-700/20'
                  : 'border-surface-200 dark:border-slate-800 bg-white dark:bg-[#1E232B] hover:border-unal-300 dark:hover:border-slate-700 hover:bg-surface-50 dark:hover:bg-[#252B35]'
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-unal-800 dark:group-hover:text-unal-300 leading-snug">
                  {option.label}
                </span>
                <div
                  className={cn(
                    'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                    isSelected
                      ? 'border-unal-700 dark:border-unal-500 bg-unal-700 dark:bg-unal-500 text-white'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-[#1E232B] group-hover:border-unal-400'
                  )}
                >
                  {isSelected && <CheckCircle2 className="h-4 w-4" />}
                </div>
              </div>

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {option.description}
              </p>

              {option.sensoryHint && (
                <div className="mt-3 pt-2 border-t border-surface-100 dark:border-slate-800 flex items-center gap-1.5 text-[11px] font-medium text-unal-700 dark:text-unal-400">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-unal-500" />
                  <span>Enfoque {option.sensoryHint === 'visual' ? 'Visual / Diagramático' : option.sensoryHint === 'auditory' ? 'Auditivo / Dialéctico' : 'Kinestésico / Práctico'}</span>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
