import React, { useState } from 'react'
import { CEBT_VALIDATION_DATA } from '../../../data/cebt-data'
import { Card, CardContent } from '../../ui/Card'
import { Badge } from '../../ui/Badge'

export const CebtValidationDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'rubric' | 'pitch'>('rubric')
  const { hypothesis, primaryMetric, threshold, totalScore, rubricItems, pitchSections } =
    CEBT_VALIDATION_DATA

  return (
    <div className="space-y-6">
      {/* Encabezado del módulo CEBT */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-unal-950 via-unal-900 to-unal-800 text-white shadow-elevated">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="lime" className="text-xs font-bold">
                Módulo Académico CEBT · UNAL
              </Badge>
              <span className="text-xs text-unal-200">
                Creación de Empresas de Base Tecnológica
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              Sintaxis Pedagógica: Pitch & Rúbrica de Validación
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/20">
            <button
              type="button"
              onClick={() => setActiveTab('rubric')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'rubric' ? 'bg-unal-300 text-unal-950 shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              Rúbrica (100 Puntos)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pitch')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'pitch' ? 'bg-unal-300 text-unal-950 shadow-sm' : 'text-white hover:bg-white/10'
              }`}
            >
              Estructura Pitch (6 Pasos)
            </button>
          </div>
        </div>

        {/* Hipótesis Crítica */}
        <div className="mt-4 p-3.5 rounded-xl bg-white/10 border border-white/15 text-xs">
          <p className="font-bold text-unal-300 uppercase tracking-wider mb-0.5">
            Hipótesis Comprobable & Crítica:
          </p>
          <p className="text-white font-medium leading-relaxed">
            "{hypothesis}"
          </p>
          <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-unal-200 pt-2 border-t border-white/10">
            <span><strong>Métrica:</strong> {primaryMetric}</span>
            <span><strong>Umbral:</strong> {threshold}</span>
          </div>
        </div>
      </div>

      {/* Vista Rúbrica de 100 Puntos (Imagen 2) */}
      {activeTab === 'rubric' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-surface-200">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">
                Evaluación Según Rúbrica Rápida CEBT
              </h3>
              <p className="text-xs text-slate-500">
                5 criterios fundamentales ponderados a 20 puntos cada uno
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-unal-800">
                {totalScore}
              </span>
              <span className="text-xs text-slate-400 font-bold"> / 100 pts</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rubricItems.map((item, idx) => (
              <Card key={item.id} className="border-surface-200 bg-white">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-unal-800">
                      Criterio 0{idx + 1}
                    </span>
                    <Badge variant="lime" className="text-xs font-bold">
                      {item.currentScore} / {item.maxPoints} pts
                    </Badge>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                  <div className="pt-2 border-t border-surface-100 text-[11px] text-unal-800 font-medium bg-unal-50/50 p-2 rounded">
                    <strong>Evidencia en prototipo:</strong> {item.evidenceDetail}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Vista Pitch Claro en 6 Bloques (Imagen 1) */}
      {activeTab === 'pitch' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pitchSections.map((sec) => (
            <Card key={sec.number} className="border-surface-200 bg-white flex flex-col justify-between">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-unal-700/80">
                    {sec.number}
                  </span>
                  <Badge variant="unal" className="text-[10px]">
                    Pitch UNAL
                  </Badge>
                </div>

                <div>
                  <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                    {sec.title}
                  </h4>
                  <p className="text-xs font-semibold text-unal-700 mt-0.5">
                    {sec.subtitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {sec.content}
                </p>

                {sec.metric && (
                  <div className="pt-2 border-t border-surface-100 text-xs font-bold text-unal-900 bg-surface-50 p-2 rounded-lg">
                    {sec.metric}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
