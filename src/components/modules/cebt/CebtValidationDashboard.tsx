import React, { useState } from 'react'
import { EDUMATCH_VALIDATION_DATA } from '../../../data/cebt-data'
import { Card, CardContent } from '../../ui/Card'
import { Badge } from '../../ui/Badge'
import { CheckCircle2, RotateCcw, Clock, Users } from 'lucide-react'

export const CebtValidationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hypotheses' | 'journey' | 'pilot' | 'team'>('hypotheses')
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
  } = EDUMATCH_VALIDATION_DATA

  const getStatusBadge = (status: string) => {
    if (status === 'Validada') {
      return (
        <Badge variant="lime" className="text-[11px] font-bold">
          <CheckCircle2 className="h-3 w-3 mr-1 text-emerald-800" />
          Validada
        </Badge>
      )
    }
    if (status === 'Ajustada') {
      return (
        <Badge variant="amber" className="text-[11px] font-bold">
          <RotateCcw className="h-3 w-3 mr-1 text-amber-800" />
          Ajustada
        </Badge>
      )
    }
    return (
      <Badge variant="unal" className="text-[11px] font-bold">
        <Clock className="h-3 w-3 mr-1 text-unal-700" />
        En validación
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Banner Principal Edumatch Grupo 15 */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-unal-950 via-unal-900 to-unal-800 text-white shadow-elevated">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="lime" className="text-xs font-bold">
                Grupo {groupNumber} · {university}
              </Badge>
              <span className="text-xs text-unal-200">CEBT Octubre 2026</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              {projectName} · Validación de Campo y Modelo
            </h2>
            <p className="text-xs text-unal-200 mt-1 italic">
              "{tagLine}"
            </p>
          </div>

          {/* Navegación por Pestañas */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white/10 p-1.5 rounded-xl border border-white/20">
            <button
              type="button"
              onClick={() => setActiveTab('hypotheses')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'hypotheses' ? 'bg-unal-300 text-unal-950 shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              Hipótesis (H1-H10)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('journey')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'journey' ? 'bg-unal-300 text-unal-950 shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              Mapa de Usuario
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pilot')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'pilot' ? 'bg-unal-300 text-unal-950 shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              Piloto (15 Est.)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('team')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'team' ? 'bg-unal-300 text-unal-950 shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              Equipo
            </button>
          </div>
        </div>

        {/* Segmento & Modelo Pay-Per-Match */}
        <div className="mt-4 p-3 rounded-xl bg-white/10 border border-white/15 text-xs flex flex-wrap items-center justify-between gap-3">
          <span><strong>Foco Validado:</strong> {targetSegment}</span>
          <span><strong>Tarifa de Conexión:</strong> COP ${valueCaptureConnectionFeeCop.toLocaleString('es-CO')}</span>
        </div>
      </div>

      {/* Pestaña 1: Hipótesis H1-H10 */}
      {activeTab === 'hypotheses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hypotheses.map((h) => (
            <Card key={h.id} className="border-surface-200 bg-white flex flex-col justify-between">
              <CardContent className="p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-unal-800">{h.id} · {h.category}</span>
                  {getStatusBadge(h.status)}
                </div>
                <h4 className="text-sm font-bold text-slate-900">{h.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-surface-50 p-2.5 rounded-lg border border-surface-200/60">
                  <strong>Aprendizaje:</strong> {h.learning}
                </p>
                <div className="pt-2 border-t border-surface-100 text-[11px] font-semibold text-unal-900">
                  <strong>Decisión:</strong> {h.decision}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pestaña 2: Mapa del Recorrido */}
      {activeTab === 'journey' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {userJourney.map((stage) => (
              <Card key={stage.stageNumber} className="border-surface-200 bg-white">
                <CardContent className="p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-unal-700 text-white font-extrabold flex items-center justify-center text-xs">
                      {stage.stageNumber}
                    </span>
                    <h4 className="font-extrabold text-slate-900">{stage.title}</h4>
                  </div>
                  <div>
                    <span className="font-bold text-slate-500 text-[10px] uppercase">Qué hace:</span>
                    <p className="text-slate-700 mt-0.5">{stage.whatUserDoes}</p>
                  </div>
                  <div className="p-2 rounded bg-red-50 text-red-900 text-[11px] font-medium border border-red-100">
                    <span className="font-bold block text-[10px] uppercase text-red-700">Dolor:</span>
                    {stage.painPoint}
                  </div>
                  <div className="p-2 rounded bg-unal-50 text-unal-900 text-[11px] font-medium border border-unal-200">
                    <span className="font-bold block text-[10px] uppercase text-unal-800">Oportunidad:</span>
                    {stage.edumatchOpportunity}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pestaña 3: Piloto Comercial */}
      {activeTab === 'pilot' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {pilotKPIs.map((kpi) => (
              <Card key={kpi.id} className="border-surface-200 bg-white text-center">
                <CardContent className="p-6 space-y-2">
                  <div className="text-3xl font-black text-unal-700">{kpi.currentPercentage}%</div>
                  <h4 className="text-sm font-bold text-slate-900">{kpi.label}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{kpi.description}</p>
                  <span className="inline-block mt-2 text-[11px] font-semibold text-unal-800 bg-unal-50 px-2 py-0.5 rounded">
                    Meta de Piloto: {kpi.targetPercentage}%
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Pestaña 4: Equipo Grupo 15 */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <Card key={member.name} className="border-surface-200 bg-white">
              <CardContent className="p-4 space-y-1">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-unal-700" />
                  <h4 className="font-bold text-slate-900 text-sm">{member.name}</h4>
                </div>
                <p className="text-xs text-slate-500 pl-6">{member.role}</p>
                <span className="text-[10px] text-unal-800 font-semibold pl-6 block pt-1">
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
