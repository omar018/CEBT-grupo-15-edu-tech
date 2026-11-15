import React, { useState } from 'react'
import { EDUMATCH_VALIDATION_DATA } from '../../../data/cebt-data'
import { Card, CardContent } from '../../ui/Card'
import { Badge } from '../../ui/Badge'
import { Button } from '../../ui/Button'
import {
  CheckCircle2,
  RotateCcw,
  Clock,
  Users,
  Award,
  Presentation,
  MessageSquareQuote,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
} from 'lucide-react'

type DashboardTab = 'pitch' | 'rubric' | 'hypotheses' | 'interviews' | 'journey' | 'pilot' | 'team'

export const CebtValidationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('rubric')
  const [activePitchIndex, setActivePitchIndex] = useState<number>(0)

  const {
    projectName,
    tagLine,
    groupNumber,
    university,
    targetSegment,
    valueCaptureConnectionFeeCop,
    teamMembers,
    hypotheses,
    userJourney,
    pilotKPIs,
    rubricCriteria,
    pitchSlides,
    interviewQuotes,
  } = EDUMATCH_VALIDATION_DATA

  const getStatusBadge = (status: string) => {
    if (status === 'Validada') {
      return (
        <Badge variant="lime" className="text-[11px] font-bold">
          <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-800 dark:text-emerald-400" />
          Validada
        </Badge>
      )
    }
    if (status === 'Ajustada') {
      return (
        <Badge variant="amber" className="text-[11px] font-bold">
          <RotateCcw className="h-3 w-3 mr-1 text-amber-800 dark:text-amber-400" />
          Ajustada
        </Badge>
      )
    }
    return (
      <Badge variant="unal" className="text-[11px] font-bold">
        <Clock className="h-3 w-3 mr-1 text-unal-700 dark:text-unal-400" />
        En validación
      </Badge>
    )
  }

  const currentPitch = pitchSlides[activePitchIndex] ?? pitchSlides[0]

  return (
    <div className="space-y-6">
      {/* Banner Principal Edumatch con soporte dual limpio */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-unal-900 via-unal-950 to-slate-900 dark:from-[#1A222C] dark:via-[#161B22] dark:to-[#13171D] text-white shadow-elevated border border-unal-800/40 dark:border-slate-800 transition-colors">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="lime" className="text-xs font-bold">
                Grupo {groupNumber} · {university}
              </Badge>
              <span className="text-xs text-slate-300 dark:text-slate-400">CEBT Octubre 2026</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {projectName} · Validación de Campo y Pitch
            </h2>
            <p className="text-xs text-unal-200 dark:text-unal-300 mt-1 italic">
              "{tagLine}"
            </p>
          </div>

          {/* Navegación por Pestañas */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/30 dark:bg-black/40 p-1.5 rounded-xl border border-white/10 dark:border-white/5">
            <button
              type="button"
              onClick={() => setActiveTab('rubric')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'rubric' ? 'bg-unal-300 dark:bg-unal-500 text-slate-950 shadow-sm' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <Award className="h-3.5 w-3.5 text-emerald-800 dark:text-slate-950" />
              <span>Rúbrica (100 Pts)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pitch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'pitch' ? 'bg-unal-300 dark:bg-unal-500 text-slate-950 shadow-sm' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <Presentation className="h-3.5 w-3.5 text-emerald-800 dark:text-slate-950" />
              <span>Pitch Claro (01-06)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hypotheses')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'hypotheses' ? 'bg-unal-300 dark:bg-unal-500 text-slate-950 shadow-sm' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              Hipótesis (H1-H10)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('interviews')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'interviews' ? 'bg-unal-300 dark:bg-unal-500 text-slate-950 shadow-sm' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              <MessageSquareQuote className="h-3.5 w-3.5 text-emerald-800 dark:text-slate-950" />
              <span>Entrevistas (E01-E10)</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('journey')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'journey' ? 'bg-unal-300 dark:bg-unal-500 text-slate-950 shadow-sm' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              Mapa de Usuario
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pilot')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'pilot' ? 'bg-unal-300 dark:bg-unal-500 text-slate-950 shadow-sm' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              Piloto (15 Est.)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('team')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'team' ? 'bg-unal-300 dark:bg-unal-500 text-slate-950 shadow-sm' : 'text-slate-200 hover:bg-white/10'
              }`}
            >
              Equipo
            </button>
          </div>
        </div>

        {/* Foco Validado & Modelo */}
        <div className="mt-4 p-3 rounded-xl bg-white/10 dark:bg-white/5 border border-white/10 dark:border-white/5 text-xs flex flex-wrap items-center justify-between gap-3 text-slate-200">
          <span><strong>Foco Validado:</strong> {targetSegment}</span>
          <span><strong>Tarifa de Conexión:</strong> COP ${valueCaptureConnectionFeeCop.toLocaleString('es-CO')}</span>
          <span className="text-emerald-300 font-semibold">100% Calificación de Rúbrica Cubierta</span>
        </div>
      </div>

      {/* Pestaña: RÚBRICA DE EVALUACIÓN (100 PUNTOS) */}
      {activeTab === 'rubric' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-emerald-700 dark:text-emerald-400 shrink-0" />
              <div>
                <h3 className="text-sm font-extrabold text-emerald-950 dark:text-emerald-200">
                  Rúbrica Rápida de Evaluación: 100 / 100 Puntos Cumplidos
                </h3>
                <p className="text-xs text-emerald-800 dark:text-emerald-300">
                  Cada uno de los 5 criterios del jurado (20 pts c/u) está completamente fundamentado y demostrado en el prototipo interactivo de Edumatch.
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">100</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-500"> / 100 pts</span>
            </div>
          </div>

          <div className="space-y-3">
            {rubricCriteria.map((criterion, idx) => (
              <Card key={criterion.id} className="border-surface-200 dark:border-slate-800 bg-white dark:bg-[#1E232B] shadow-subtle overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-emerald-600 to-unal-400" />
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="h-7 w-7 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-900 dark:text-emerald-200 font-black text-xs flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </span>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                        {criterion.name}
                      </h4>
                    </div>

                    <Badge variant="lime" className="text-xs font-bold">
                      <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-700 dark:text-emerald-300" />
                      {criterion.earnedScore} / {criterion.maxScore} pts
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-lg bg-surface-50 dark:bg-[#171B21] border border-surface-200/60 dark:border-slate-800 space-y-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        Cómo Cumple Edumatch:
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {criterion.howEdumatchComplies}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-emerald-50/50 dark:bg-[#15231F] border border-emerald-200/50 dark:border-emerald-900/40 space-y-1">
                      <span className="font-bold text-emerald-900 dark:text-emerald-300 block">
                        Evidencia en el Prototipo:
                      </span>
                      <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed">
                        {criterion.prototypeEvidence}
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-surface-50 dark:bg-[#171B21] border border-surface-200/60 dark:border-slate-800 space-y-1">
                      <span className="font-bold text-unal-800 dark:text-unal-300 block">
                        Métricas y Umbrales Clave:
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                        {criterion.keyMetrics}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pestaña: ESTRUCTURA DE PITCH CLARO (01 - 06) */}
      {activeTab === 'pitch' && (
        <div className="space-y-4">
          {/* Navegador de Diapositivas */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {pitchSlides.map((slide, idx) => (
              <button
                key={slide.stepNumber}
                type="button"
                onClick={() => setActivePitchIndex(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  activePitchIndex === idx
                    ? 'bg-unal-50 dark:bg-unal-950/60 border-unal-600 dark:border-unal-500 shadow-sm ring-1 ring-unal-500'
                    : 'bg-white dark:bg-[#1E232B] border-surface-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className="text-[10px] font-black text-unal-700 dark:text-unal-400 block mb-0.5">
                  SLIDE {slide.stepNumber}
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                  {slide.title}
                </span>
              </button>
            ))}
          </div>

          {/* Diapositiva Activa */}
          <Card className="border-surface-200 dark:border-slate-800 bg-white dark:bg-[#1E232B] shadow-elevated overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-unal-700 via-unal-500 to-unal-300" />
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-surface-100 dark:border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-black text-unal-700 dark:text-unal-400 uppercase tracking-widest">
                    Paso {currentPitch.stepNumber} de 06 del Pitch
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
                    {currentPitch.title}: {currentPitch.subtitle}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActivePitchIndex(Math.max(0, activePitchIndex - 1))}
                    disabled={activePitchIndex === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Anterior
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setActivePitchIndex(Math.min(pitchSlides.length - 1, activePitchIndex + 1))}
                    disabled={activePitchIndex === pitchSlides.length - 1}
                  >
                    Siguiente
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Métrica Estrella */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-unal-950 to-slate-900 text-white flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-unal-400 shrink-0" />
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Evidencia Clave & Cifra Central
                    </span>
                    <p className="text-sm sm:text-base font-extrabold text-white">
                      {currentPitch.mainMetric}
                    </p>
                  </div>
                </div>
              </div>

              {/* Narrativa & Bullets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Narrativa del Presentador
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-surface-50 dark:bg-[#171B21] p-4 rounded-xl border border-surface-200/60 dark:border-slate-800">
                    {currentPitch.narrative}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Puntos Clave para la Audiencia
                  </h4>
                  <ul className="space-y-2.5">
                    {currentPitch.bulletPoints.map((bp) => (
                      <li key={bp} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-unal-700 dark:text-unal-400 mt-0.5 shrink-0" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pestaña: LOG DE ENTREVISTAS (E01 - E10) */}
      {activeTab === 'interviews' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-white dark:bg-[#1E232B] border border-surface-200 dark:border-slate-800 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Log de Customer Discovery: 10 Entrevistas a Profundidad
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Evidencia cualitativa directa con estudiantes de primeros semestres de la Facultad de Minas (Sede Medellín).
              </p>
            </div>
            <Badge variant="lime" className="text-xs">
              8/8 Citas Clave
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {interviewQuotes.map((q) => (
              <Card key={q.id} className="border-surface-200 dark:border-slate-800 bg-white dark:bg-[#1E232B] shadow-subtle flex flex-col justify-between">
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-unal-700 text-white font-extrabold text-[11px]">
                        {q.id}
                      </span>
                      <div>
                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">{q.student}</h4>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400">{q.program}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] border-unal-600/30 text-unal-800 dark:text-unal-300">
                      {q.validatedHypothesis.split(' ')[0]}
                    </Badge>
                  </div>

                  <blockquote className="p-3 rounded-lg bg-surface-50 dark:bg-[#171B21] border border-surface-200/60 dark:border-slate-800 text-xs italic text-slate-700 dark:text-slate-300 leading-relaxed">
                    "{q.quote}"
                  </blockquote>

                  <div className="pt-2 border-t border-surface-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                    <strong className="text-unal-800 dark:text-unal-400">Conclusión Clave: </strong>
                    {q.keyTakeaway}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pestaña: Hipótesis H1-H10 */}
      {activeTab === 'hypotheses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hypotheses.map((h) => (
            <Card key={h.id} className="border-surface-200 dark:border-slate-800 bg-white dark:bg-[#1E232B] flex flex-col justify-between">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-unal-800 dark:text-unal-400">{h.id} · {h.category}</span>
                  {getStatusBadge(h.status)}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">{h.name}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-surface-50 dark:bg-[#171B21] p-2.5 rounded-lg border border-surface-200/60 dark:border-slate-800">
                  <strong>Aprendizaje:</strong> {h.learning}
                </p>
                <div className="pt-2 border-t border-surface-100 dark:border-slate-800 text-[11px] font-semibold text-unal-900 dark:text-unal-300">
                  <strong>Decisión:</strong> {h.decision}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pestaña: Mapa de Usuario */}
      {activeTab === 'journey' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {userJourney.map((stage) => (
              <Card key={stage.stageNumber} className="border-surface-200 dark:border-slate-800 bg-white dark:bg-[#1E232B]">
                <CardContent className="p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-unal-700 dark:bg-unal-600 text-white font-extrabold flex items-center justify-center text-xs">
                      {stage.stageNumber}
                    </span>
                    <h4 className="font-extrabold text-slate-900 dark:text-white">{stage.title}</h4>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 dark:text-slate-400 text-[10px] uppercase">Qué hace:</span>
                    <p className="text-slate-700 dark:text-slate-300 mt-0.5">{stage.whatUserDoes}</p>
                  </div>
                  <div className="p-2 rounded bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-300 text-[11px] font-medium border border-red-100 dark:border-red-900/60">
                    <span className="font-bold block text-[10px] uppercase text-red-700 dark:text-red-400">Dolor:</span>
                    {stage.painPoint}
                  </div>
                  <div className="p-2 rounded bg-unal-50 dark:bg-unal-950/40 text-unal-900 dark:text-unal-300 text-[11px] font-medium border border-unal-200 dark:border-unal-800/60">
                    <span className="font-bold block text-[10px] uppercase text-unal-800 dark:text-unal-400">Oportunidad:</span>
                    {stage.edumatchOpportunity}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pestaña: Piloto Comercial */}
      {activeTab === 'pilot' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pilotKPIs.map((kpi) => (
              <Card key={kpi.id} className="border-surface-200 dark:border-slate-800 bg-white dark:bg-[#1E232B] text-center">
                <CardContent className="p-6 space-y-2">
                  <div className="text-3xl font-black text-unal-700 dark:text-unal-400">{kpi.currentPercentage}%</div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{kpi.label}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{kpi.description}</p>
                  <span className="inline-block mt-2 text-[11px] font-semibold text-unal-800 dark:text-unal-300 bg-unal-50 dark:bg-unal-950/80 px-2 py-0.5 rounded border border-unal-200/50 dark:border-unal-800/50">
                    Meta de Piloto: {kpi.targetPercentage}%
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pestaña: Equipo Grupo 15 */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="border-surface-200 dark:border-slate-800 bg-white dark:bg-[#1E232B] shadow-subtle">
              <CardContent className="p-4 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-unal-700 dark:text-unal-400" />
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{member.name}</h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pl-6">{member.role}</p>
                <span className="text-[11px] text-unal-700 dark:text-unal-400 font-semibold pl-6 block pt-1">
                  Universidad Nacional de Colombia · Grupo 15
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}