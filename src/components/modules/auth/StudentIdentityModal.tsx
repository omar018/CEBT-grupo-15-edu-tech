import React, { useState } from 'react'
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react'
import type { StudentIdentity } from '../../../types/student'
import { DEMO_STUDENTS, MINAS_PROGRAMS } from '../../../data/demo-students'
import { Dialog } from '../../ui/Dialog'
import { Button } from '../../ui/Button'
import { Badge } from '../../ui/Badge'

interface StudentIdentityModalProps {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly currentStudent: StudentIdentity
  readonly onSelectDemo: (demoId: string) => void
  readonly onLoginWithUnal: (
    name: string,
    email: string,
    program: string,
    semester: number
  ) => { success: boolean; error?: string }
}

export const StudentIdentityModal: React.FC<StudentIdentityModalProps> = ({
  isOpen,
  onClose,
  currentStudent,
  onSelectDemo,
  onLoginWithUnal,
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [program, setProgram] = useState<string>(MINAS_PROGRAMS[0])
  const [semester, setSemester] = useState<number>(2)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    const result = onLoginWithUnal(name, email, program, semester)
    if (!result.success && result.error) {
      setFormError(result.error)
    } else {
      setName('')
      setEmail('')
    }
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title="Identificación de Estudiante UNAL"
      description="Exclusivo para la comunidad universitaria de la Universidad Nacional · Sede Medellín"
    >
      <div className="space-y-6 pt-2">
        {/* Sección A: Perfiles Demo para la Sustentación */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Perfiles Rápidos de Prueba (Facultad de Minas)
            </span>
            <Badge variant="lime" className="text-[10px] font-bold">
              Demostración ágil
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {DEMO_STUDENTS.map((demo) => {
              const isSelected = currentStudent.id === demo.id

              return (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => onSelectDemo(demo.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative ${
                    isSelected
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                      : 'bg-surface-50 dark:bg-[#171B21] border-surface-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 text-emerald-700 dark:text-emerald-400">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                  )}
                  <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                    {demo.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {demo.program}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">
                    {demo.email}
                  </p>
                  {demo.demoTag && (
                    <span className="inline-block mt-2 text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 bg-white dark:bg-[#1E232B] px-1.5 py-0.5 rounded border border-emerald-200/60 dark:border-emerald-900/60">
                      {demo.demoTag}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Separador */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-surface-200 dark:border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-[#1E232B] px-3 text-slate-400 font-bold text-[10px] tracking-wider">
              O Ingresa con tu Correo Institucional
            </span>
          </div>
        </div>

        {/* Sección B: Formulario de Correo @unal.edu.co */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {formError && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-200 text-xs font-semibold flex items-center gap-2 border border-red-200 dark:border-red-800">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="student-name-input" className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Nombre Completo *
              </label>
              <input
                id="student-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Santiago Cañaveral"
                required
                className="w-full h-9 px-3 text-xs rounded-lg border border-surface-300 dark:border-slate-700 bg-white dark:bg-[#171B21] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-unal-700"
              />
            </div>

            <div>
              <label htmlFor="student-email-input" className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Correo Institucional (@unal.edu.co) *
              </label>
              <input
                id="student-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@unal.edu.co"
                required
                className="w-full h-9 px-3 text-xs rounded-lg border border-surface-300 dark:border-slate-700 bg-white dark:bg-[#171B21] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-unal-700 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="student-program-select" className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Carrera (Facultad de Minas) *
              </label>
              <select
                id="student-program-select"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                className="w-full h-9 px-2.5 text-xs rounded-lg border border-surface-300 dark:border-slate-700 bg-white dark:bg-[#171B21] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-unal-700"
              >
                {MINAS_PROGRAMS.map((prog) => (
                  <option key={prog} value={prog}>
                    {prog}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="student-semester-select" className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                Semestre en Curso *
              </label>
              <select
                id="student-semester-select"
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full h-9 px-2.5 text-xs rounded-lg border border-surface-300 dark:border-slate-700 bg-white dark:bg-[#171B21] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-unal-700"
              >
                <option value={1}>Semestre 1 (Ciclo Básico)</option>
                <option value={2}>Semestre 2 (Ciclo Básico)</option>
                <option value={3}>Semestre 3 (Ciclo Básico)</option>
                <option value={4}>Semestre 4 (Filtro)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
              <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Acceso seguro sin contraseñas para el MVP</span>
            </div>

            <Button type="submit" variant="default" size="sm" className="font-bold">
              <span>Ingresar como Estudiante UNAL</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
}
