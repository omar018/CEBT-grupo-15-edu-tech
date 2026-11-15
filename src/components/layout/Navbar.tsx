import React from 'react'
import { Compass, GraduationCap, BookOpen, Zap, Sun, Moon, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'
import type { StudentIdentity } from '../../types/student'

export type ActiveView = 'diagnostic' | 'matcher' | 'booking'

interface NavbarProps {
  readonly activeView: ActiveView
  readonly onViewChange: (view: ActiveView) => void
  readonly hasCompletedDiagnostic: boolean
  readonly matchCount: number
  readonly theme: 'light' | 'dark'
  readonly onToggleTheme: () => void
  readonly currentStudent: StudentIdentity
  readonly onOpenIdentityModal: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onViewChange,
  theme,
  onToggleTheme,
  currentStudent,
  onOpenIdentityModal,
}) => {
  const navItems = [
    {
      id: 'diagnostic' as const,
      label: 'Diagnóstico (< 5 min)',
      icon: Compass,
    },
    {
      id: 'matcher' as const,
      label: 'Tutores Recomendados',
      icon: GraduationCap,
    },
    {
      id: 'booking' as const,
      label: 'Mis Tutorías & Garantías',
      icon: BookOpen,
    },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-200/80 dark:border-slate-800 bg-white/90 dark:bg-[#16191E]/90 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Identidad de marca limpia y profesional */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-unal-700 to-unal-900 text-white shadow-sm ring-1 ring-unal-600/30">
            <Zap className="h-4.5 w-4.5 text-unal-300 fill-unal-300" />
          </div>

          <div className="flex items-center gap-2.5">
            <span className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight">
              Edu<span className="text-unal-700 dark:text-unal-400">match</span>
            </span>

            <span className="h-4 w-px bg-surface-200 dark:bg-slate-700 hidden sm:block" />

            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-surface-100 dark:bg-slate-800/80 border border-surface-200 dark:border-slate-700/60">
              UNAL · Sede Medellín
            </span>
          </div>
        </div>

        {/* Navegación Desktop limpia y espaciosa */}
        <nav className="hidden md:flex items-center p-1 rounded-xl bg-surface-100/60 dark:bg-slate-900/60 border border-surface-200/60 dark:border-slate-800" aria-label="Navegación principal">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id)}
                className={cn(
                  'flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 select-none',
                  isActive
                    ? 'bg-white dark:bg-[#1E232B] text-unal-800 dark:text-unal-300 shadow-sm border border-surface-200/80 dark:border-slate-700'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/50'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon className={cn('h-3.5 w-3.5', isActive ? 'text-unal-700 dark:text-unal-400' : 'text-slate-400 dark:text-slate-500')} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Controles de la derecha */}
        <div className="flex items-center gap-2">
          {/* Identidad del Estudiante Conectado */}
          <button
            type="button"
            onClick={onOpenIdentityModal}
            className="flex items-center gap-2 h-9 px-2.5 sm:px-3 text-xs font-semibold rounded-lg border border-surface-200 dark:border-slate-700/80 bg-white dark:bg-[#1E232B] text-slate-800 dark:text-slate-200 hover:bg-surface-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            title="Cambiar o configurar estudiante conectado"
          >
            <div className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-black text-[11px] flex items-center justify-center shrink-0">
              {currentStudent.name.charAt(0)}
            </div>
            <div className="hidden sm:flex flex-col text-left leading-tight">
              <span className="font-extrabold text-slate-900 dark:text-white truncate max-w-[110px]">
                {currentStudent.name.split(' ')[0]} {currentStudent.name.split(' ')[1]?.[0] ? `${currentStudent.name.split(' ')[1][0]}.` : ''}
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono truncate max-w-[110px]">
                {currentStudent.email.split('@')[0]}@unal...
              </span>
            </div>
            <ChevronDown className="h-3 w-3 text-slate-400 shrink-0" />
          </button>

          {/* Toggle de Tema Elegante */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex items-center gap-2 h-9 px-3 text-xs font-medium rounded-lg border border-surface-200 dark:border-slate-700/80 bg-white dark:bg-[#1E232B] text-slate-700 dark:text-slate-300 hover:bg-surface-50 dark:hover:bg-slate-800 transition-colors shadow-sm"
            title={`Cambiar a tema ${theme === 'dark' ? 'claro' : 'oscuro'}`}
            aria-label="Alternar tema de interfaz"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-amber-400" />
                <span className="hidden sm:inline text-slate-300 font-semibold">Tema Claro</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-slate-600" />
                <span className="hidden sm:inline text-slate-700 font-semibold">Tema Oscuro</span>
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
                    'p-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-unal-100 dark:bg-unal-950/80 text-unal-800 dark:text-unal-300'
                      : 'hover:bg-surface-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400'
                  )}
                  aria-label={item.label}
                >
                  <Icon className="h-4 w-4" />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
