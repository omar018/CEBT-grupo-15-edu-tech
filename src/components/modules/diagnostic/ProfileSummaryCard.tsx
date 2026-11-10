import React from 'react'
import { Eye, Headphones, Wrench, Brain, Check, ArrowRight } from 'lucide-react'
import type { StudentProfile } from '../../../types/learning-profile'
import { Card, CardContent } from '../../ui/Card'
import { Badge } from '../../ui/Badge'
import { Button } from '../../ui/Button'
import { Progress } from '../../ui/Progress'

interface ProfileSummaryCardProps {
  readonly profile: StudentProfile
  readonly onExploreMatches: () => void
  readonly onRetakeDiagnostic: () => void
}

export const ProfileSummaryCard: React.FC<ProfileSummaryCardProps> = ({
  profile,
  onExploreMatches,
  onRetakeDiagnostic,
}) => {
  const sensoryIcons = {
    visual: Eye,
    auditory: Headphones,
    kinesthetic: Wrench,
  }

  const sensoryTitles = {
    visual: 'Visual y Espacial',
    auditory: 'Auditivo y Dialéctico',
    kinesthetic: 'Kinestésico y Práctico',
  }

  const kolbLabels = {
    assimilator: 'Asimilador (Rigor Teórico & Modelos Conceptuales)',
    converger: 'Convergente (Solución Práctica & Aplicación Técnica)',
    diverger: 'Divergente (Imaginación, Perspectivas Múltiples & Síntesis)',
    accommodator: 'Acomodador (Experimentación Activa & Aprendizaje en Terreno)',
  }

  const PrimaryIcon = sensoryIcons[profile.primarySensory]

  return (
    <Card className="border-unal-700/20 bg-gradient-to-b from-white to-unal-50/30 overflow-hidden shadow-elevated">
      {/* Banner superior de perfil */}
      <div className="bg-gradient-to-r from-unal-800 via-unal-700 to-unal-600 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
            <PrimaryIcon className="h-5 w-5 text-unal-300" />
          </div>
          <div>
            <span className="text-xs font-semibold text-unal-200 tracking-wider uppercase">
              Diagnóstico Pedagógico UNAL
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Perfil: {sensoryTitles[profile.primarySensory]}
            </h3>
          </div>
        </div>

        <Badge variant="lime" className="text-xs px-3 py-1 font-bold">
          {profile.name} · {profile.faculty}
        </Badge>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Arquetipo Kolb e interacción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-surface-100/80 border border-surface-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Estilo Cognitivo (Ciclo de Kolb)
            </span>
            <p className="text-sm font-bold text-slate-900">
              {kolbLabels[profile.kolbStyle]}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-100/80 border border-surface-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Dinámica de Tutoría Recomendada
            </span>
            <p className="text-sm font-bold text-slate-900">
              {profile.interactionStyle === 'socratic'
                ? 'Mayéutica Socrática (Pregunta guiada y descubrimiento reflexivo)'
                : profile.interactionStyle === 'project_based'
                ? 'Aprendizaje Basado en Proyectos / Problemas (ABP aplicado)'
                : 'Instrucción Estructurada Directiva (Paso a paso sistemático)'}
            </p>
          </div>
        </div>

        {/* Desglose de 6 dimensiones */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Brain className="h-4 w-4 text-unal-700" />
            <span>Distribución de Canales de Asimilación (% afinidad cognitiva)</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600">Canal Visual / Diagramático</span>
                <span className="font-bold text-slate-900">{profile.dimensions.visual}%</span>
              </div>
              <Progress value={profile.dimensions.visual} indicatorClassName="bg-unal-600" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600">Canal Auditivo / Dialéctico</span>
                <span className="font-bold text-slate-900">{profile.dimensions.auditory}%</span>
              </div>
              <Progress value={profile.dimensions.auditory} indicatorClassName="bg-unal-500" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600">Canal Kinestésico / Experimental</span>
                <span className="font-bold text-slate-900">{profile.dimensions.kinesthetic}%</span>
              </div>
              <Progress value={profile.dimensions.kinesthetic} indicatorClassName="bg-unal-400" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600">Abstracción Teórica</span>
                <span className="font-bold text-slate-900">{profile.dimensions.theoretical}%</span>
              </div>
              <Progress value={profile.dimensions.theoretical} indicatorClassName="bg-emerald-700" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600">Resolución Práctica de Problemas</span>
                <span className="font-bold text-slate-900">{profile.dimensions.practical}%</span>
              </div>
              <Progress value={profile.dimensions.practical} indicatorClassName="bg-lime-600" />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium mb-1">
                <span className="text-slate-600">Autonomía y Autogestión</span>
                <span className="font-bold text-slate-900">{profile.dimensions.autonomy}%</span>
              </div>
              <Progress value={profile.dimensions.autonomy} indicatorClassName="bg-amber-600" />
            </div>
          </div>
        </div>

        {/* Rasgos y recomendación */}
        <div className="p-4 rounded-xl bg-white border border-surface-200">
          <p className="text-xs font-semibold text-slate-700 mb-2">Rasgos pedagógicos clave:</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {profile.keyTraits.map((trait) => (
              <Badge key={trait} variant="unal" className="text-xs">
                <Check className="h-3 w-3 mr-1 text-unal-700" />
                {trait}
              </Badge>
            ))}
          </div>
          <p className="text-xs text-slate-600 italic">
            "{profile.recommendedEnvironment}"
          </p>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <Button variant="ghost" size="sm" onClick={onRetakeDiagnostic}>
            Repetir entrevista diagnóstica
          </Button>

          <Button variant="default" size="lg" onClick={onExploreMatches} className="w-full sm:w-auto">
            <span>Ver Profesores UNAL Compatibles</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
