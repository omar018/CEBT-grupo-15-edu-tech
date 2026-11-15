import React from 'react'
import { Compass, Sparkles, BookOpen, Presentation, Zap, Sun, Moon } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { cn } from '../../lib/utils'

export type ActiveView = 'diagnostic' | 'matcher' | 'booking' | 'cebt'

interface NavbarProps {
  readonly activeView: ActiveView
  readonly onViewChange: (view: ActiveView) => void
  readonly hasCompletedDiagnostic: boolean
  readonly matchCount: number
  readonly theme: 'light' | 'dark'
  readonly onToggleTheme: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onViewChange,
  hasCompletedDiagnostic,
  matchCount,
  theme,
  onToggleTheme,
}) => {
  const navItems = [
    {
      id: 'diagnostic' as const,
      label: 'Diagnóstico (< 5 min)',
      icon: Compass,
      badge: hasCompletedDiagnostic ? 'Perfil listo' : 'Rápido',
      badgeVariant: hasCompletedDiagnostic ? ('lime' as const) : ('unal' as const),
    },
    {
      id: 'matcher' as const,
      label: 'La Criba & Docentes',
      icon: Sparkles,
      badge: matchCount > 0 ? `${matchCount} afines` : undefined,
      badgeVariant: 'amber' as const,
    },
    {
      id: 'booking' as const,
      label: 'Tutorías y Garantías',
      icon: BookOpen,
      badge: undefined,
      badgeVariant: 'secondary' as const,
    },
    {
      id: 'cebt' as const,
      label: 'Validación CEBT (H1-H10)',
      icon: Presentation,
      badge: 'Grupo 15',
      badgeVariant: 'lime' as const,
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-200 dark:border-slate-800 bg-white/95 dark:bg-[#181C22]/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-[#181C22]/85 transition-colors">
      <div className="h-1.5 w-full bg-gradient-to-r from-unal-700 via-unal-400 to-unal-300" />

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Identidad Edumatch */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-unal-800 to-unal-950 text-white shadow-sm ring-1 ring-unal-800/20">
            <Zap className="h-5 w-5 text-unal-300 fill-unal-300" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 dark:text-slate-100 text-lg sm:text-xl tracking-tight">
                Edu<span className="text-unal-700 dark:text-unal-400">match</span>
              </span>
              <span className="hidden sm:inline-block rounded-md bg-unal-50 dark:bg-unal-950/80 px-2 py-0.5 text-[11px] font-bold text-unal-800 dark:text-unal-300 border border-unal-200 dark:border-unal-800">
                Grupo 15 · UNAL
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              De la improvisación al emparejamiento perfecto en ciencias básicas
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
                    ? 'bg-unal-50 dark:bg-unal-950/60 text-unal-800 dark:text-unal-300 shadow-sm border border-unal-200/80 dark:border-unal-800/80 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-surface-100 dark:hover:bg-slate-800/60'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-unal-700 dark:text-unal-400' : 'text-slate-500 dark:text-slate-400')} />
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

        {/* Selector de Tema y Mobile Trigger */}
        <div className="flex items-center gap-2">
          {/* Botón de cambio de tema Claro / Oscuro (con fondo gris elegante) */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-surface-200 dark:border-slate-700 bg-surface-50 dark:bg-[#1E232B] text-slate-700 dark:text-slate-200 hover:bg-surface-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
            title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro (fondo gris)'}`}
            aria-label="Alternar tema de interfaz"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" />
                <span className="hidden sm:inline">Claro</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-slate-600" />
                <span className="hidden sm:inline">Gris Oscuro</span>
              </>
            )}
          </button>

          {/* Menú Mobile */}
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
                    'p-2 rounded-lg text-slate-600 dark:text-slate-300 transition-colors',
                    isActive
                      ? 'bg-unal-100 dark:bg-unal-950 text-unal-800 dark:text-unal-300'
                      : 'hover:bg-surface-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                  )}
                  aria-label={item.label}
                >
                  <Icon className="h-5 w-5" />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
