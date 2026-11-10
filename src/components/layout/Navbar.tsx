import React from 'react'
import { Compass, Sparkles, BookOpen, Presentation, GraduationCap } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/utils'

export type ActiveView = 'diagnostic' | 'matcher' | 'booking' | 'cebt'

interface NavbarProps {
  readonly activeView: ActiveView
  readonly onViewChange: (view: ActiveView) => void
  readonly hasCompletedDiagnostic: boolean
  readonly matchCount: number
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onViewChange,
  hasCompletedDiagnostic,
  matchCount,
}) => {
  const navItems = [
    {
      id: 'diagnostic' as const,
      label: 'Entrevista Diagnóstica',
      icon: Compass,
      badge: hasCompletedDiagnostic ? 'Perfil listo' : '5 pasos',
      badgeVariant: hasCompletedDiagnostic ? ('lime' as const) : ('unal' as const),
    },
    {
      id: 'matcher' as const,
      label: 'Docentes & Match Pedagógico',
      icon: Sparkles,
      badge: matchCount > 0 ? `${matchCount} afines` : undefined,
      badgeVariant: 'amber' as const,
    },
    {
      id: 'booking' as const,
      label: 'Agenda y Compromiso',
      icon: BookOpen,
      badge: undefined,
      badgeVariant: 'secondary' as const,
    },
    {
      id: 'cebt' as const,
      label: 'Pitch & Rúbrica CEBT',
      icon: Presentation,
      badge: '100 pts',
      badgeVariant: 'lime' as const,
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* Barra superior de acento institucional UNAL */}
      <div className="h-1.5 w-full bg-gradient-to-r from-unal-700 via-unal-400 to-unal-300" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Identidad de la plataforma */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-unal-700 to-unal-900 text-white shadow-sm ring-1 ring-unal-800/10">
            <GraduationCap className="h-6 w-6 text-unal-300" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">
                Sintaxis<span className="text-unal-700">Pedagógica</span>
              </span>
              <span className="hidden sm:inline-block rounded-md bg-unal-50 px-2 py-0.5 text-[11px] font-semibold text-unal-800 border border-unal-200">
                UNAL Lab
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium hidden sm:block">
              Matching Inteligente Estudiante · Docente
            </span>
          </div>
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-1.5" aria-label="Navegación principal">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-150',
                  isActive
                    ? 'bg-unal-50 text-unal-800 shadow-sm border border-unal-200/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-surface-100'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-unal-700' : 'text-slate-500')} />
                <span>{item.label}</span>
                {item.badge && (
                  <Badge variant={item.badgeVariant} className="text-[10px] py-0 px-1.5 h-4">
                    {item.badge}
                  </Badge>
                )}
              </button>
            )
          })}
        </nav>

        {/* Selector rápido mobile */}
        <div className="flex md:hidden items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                className={cn(
                  'p-2 rounded-lg text-slate-600 transition-colors',
                  isActive
                    ? 'bg-unal-100 text-unal-800'
                    : 'hover:bg-surface-100 text-slate-500'
                )}
                aria-label={item.label}
              >
                <Icon className="h-5 w-5" />
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
