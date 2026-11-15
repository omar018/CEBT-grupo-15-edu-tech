import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-surface-200 bg-white/80 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-unal-600" />
            <p className="font-bold text-slate-800">
              Edumatch · Creación de Empresas de Base Tecnológica (CEBT) · Grupo 15
            </p>
          </div>
          <p className="text-center sm:text-right font-medium">
            Universidad Nacional de Colombia · Octubre de 2026
          </p>
        </div>

        <div className="pt-3 border-t border-surface-100 text-[11px] text-slate-400 flex flex-wrap justify-between gap-2">
          <span>
            Equipo: Santiago Cañaveral · Jose Gabriel Torres · Ruber Armando Mojica · Omar Enrique Chavez · Eduardo Daniel Payares
          </span>
          <span>
            Defensa contra WhatsApp: Garantía de reemplazo express y reembolso
          </span>
        </div>
      </div>
    </footer>
  )
}
