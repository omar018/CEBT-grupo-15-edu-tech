import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-surface-200 bg-white/70 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-unal-600" />
            <p className="font-medium text-slate-700">
              Proyecto CEBT · Creación de Empresas de Base Tecnológica
            </p>
          </div>
          <p className="text-center sm:text-right">
            Inspirado en la paleta institucional de la Universidad Nacional de Colombia · Sin dependencia de kitUnal
          </p>
        </div>
      </div>
    </footer>
  )
}
