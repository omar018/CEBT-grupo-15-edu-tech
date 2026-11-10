import React from 'react'
import type { UnalFaculty } from '../../../types/professor'

interface StudentMetadataFormProps {
  readonly studentName: string
  readonly onNameChange: (name: string) => void
  readonly faculty: string
  readonly onFacultyChange: (fac: string) => void
  readonly semester: number
  readonly onSemesterChange: (sem: number) => void
}

const UNAL_FACULTIES: readonly UnalFaculty[] = [
  'Facultad de Ingeniería',
  'Facultad de Ciencias',
  'Facultad de Medicina',
  'Facultad de Ciencias Económicas',
  'Facultad de Artes',
  'Facultad de Ciencias Humanas',
]

export const StudentMetadataForm: React.FC<StudentMetadataFormProps> = ({
  studentName,
  onNameChange,
  faculty,
  onFacultyChange,
  semester,
  onSemesterChange,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-surface-100/70 border border-surface-200 rounded-xl mb-6">
      <div>
        <label htmlFor="student-name-input" className="block text-xs font-semibold text-slate-700 mb-1">
          Nombre o seudónimo del estudiante
        </label>
        <input
          id="student-name-input"
          type="text"
          value={studentName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Ej: Daniel Morales"
          className="w-full h-9 px-3 text-sm bg-white border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30 focus:border-unal-700"
        />
      </div>

      <div>
        <label htmlFor="faculty-select" className="block text-xs font-semibold text-slate-700 mb-1">
          Facultad (Sede UNAL)
        </label>
        <select
          id="faculty-select"
          value={faculty}
          onChange={(e) => onFacultyChange(e.target.value)}
          className="w-full h-9 px-3 text-sm bg-white border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30 focus:border-unal-700"
        >
          {UNAL_FACULTIES.map((fac) => (
            <option key={fac} value={fac}>
              {fac}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="semester-select" className="block text-xs font-semibold text-slate-700 mb-1">
          Semestre actual
        </label>
        <select
          id="semester-select"
          value={semester}
          onChange={(e) => onSemesterChange(Number(e.target.value))}
          className="w-full h-9 px-3 text-sm bg-white border border-surface-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30 focus:border-unal-700"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((sem) => (
            <option key={sem} value={sem}>
              Semestre {sem}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
