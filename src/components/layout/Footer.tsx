import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-surface-200 dark:border-slate-800 bg-white/80 dark:bg-[#181C22]/80 py-8 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-unal-600 dark:bg-unal-400" />
            <p className="font-bold text-slate-800 dark:text-slate-200">
              Edumatch · Tutorías Especializadas en Ciencias Básicas · Universidad Nacional de Colombia
            </p>
          </div>
          <p className="text-center sm:text-right font-medium">
            Facultad de Minas · Campus Robledo (Medellín)
          </p>
        </div>

        <div className="pt-3 border-t border-surface-100 dark:border-slate-800/80 text-[11px] text-slate-400 dark:text-slate-500 flex flex-wrap items-center justify-between gap-2">
          <span>
            Garantía de Reemplazo Inmediato · Pago de Tarifa por Hora Protegido con Reembolso
          </span>
          <span>
            Ciencias Básicas: Cálculo, Álgebra Lineal, Física Mecánica y Programación
          </span>
        </div>
      </div>
    </footer>
  )
}
