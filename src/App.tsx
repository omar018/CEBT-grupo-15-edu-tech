import { useState } from 'react'
import { Navbar, type ActiveView } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { StatusAnnouncer } from './components/layout/StatusAnnouncer'
import { DiagnosticInterview } from './components/modules/diagnostic/DiagnosticInterview'
import { ProfessorMatcher } from './components/modules/matcher/ProfessorMatcher'
import { BookingModal } from './components/modules/booking/BookingModal'
import { BookedSessionsList } from './components/modules/booking/BookedSessionsList'
import { StudentIdentityModal } from './components/modules/auth/StudentIdentityModal'
import { useStudentIdentity } from './hooks/useStudentIdentity'
import { useDiagnostic } from './hooks/useDiagnostic'
import { useProfessorMatcher } from './hooks/useProfessorMatcher'
import { useBooking } from './hooks/useBooking'
import { useTheme } from './hooks/useTheme'
import type { MatchedProfessor } from './types/professor'
import { DEMO_STUDENTS } from './data/demo-students'
import { Zap, ShieldCheck, Clock } from 'lucide-react'

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>('diagnostic')
  const { theme, toggleTheme } = useTheme()

  const {
    currentStudent,
    isIdentityModalOpen,
    openIdentityModal,
    closeIdentityModal,
    selectDemoStudent,
    loginWithUnalEmail,
  } = useStudentIdentity()

  const diagnosticState = useDiagnostic(currentStudent)
  const matcherState = useProfessorMatcher(diagnosticState.deducedProfile)
  const bookingState = useBooking()

  const [selectedMatchForBooking, setSelectedMatchForBooking] = useState<MatchedProfessor | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleSelectDemo = (demoId: string) => {
    selectDemoStudent(demoId)
    const found = DEMO_STUDENTS.find((s) => s.id === demoId)
    if (found) {
      diagnosticState.loadStudentIdentity(found)
    }
  }

  const handleLoginWithUnal = (
    name: string,
    email: string,
    program: string,
    semester: number
  ) => {
    const res = loginWithUnalEmail(name, email, program, semester)
    if (res.success) {
      diagnosticState.loadStudentIdentity({
        id: `unal-${Date.now()}`,
        name,
        email,
        program,
        faculty: 'Facultad de Minas',
        semester,
        isDemo: false,
      })
    }
    return res
  }

  const handleOpenBookingModal = (match: MatchedProfessor) => {
    setSelectedMatchForBooking(match)
    setIsBookingModalOpen(true)
  }

  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false)
    setSelectedMatchForBooking(null)
  }

  const handleBookingConfirmed = (
    ...args: Parameters<typeof bookingState.handleConfirmBooking>
  ) => {
    bookingState.handleConfirmBooking(...args)
    setIsBookingModalOpen(false)
    setSelectedMatchForBooking(null)
    setActiveView('booking')
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface-50 dark:bg-[#14171B] text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* PR-10: Región accesible permanente */}
      <StatusAnnouncer
        message={`${diagnosticState.statusAnnouncement} ${bookingState.bookingStatusMessage}`}
      />

      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
        hasCompletedDiagnostic={diagnosticState.isCompleted}
        matchCount={matcherState.filteredMatches.length}
        theme={theme}
        onToggleTheme={toggleTheme}
        currentStudent={currentStudent}
        onOpenIdentityModal={openIdentityModal}
      />

      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Hero Edumatch */}
        <div className="mb-8 rounded-2xl bg-white dark:bg-[#1E232B] border border-surface-200 dark:border-slate-800 p-6 sm:p-8 shadow-subtle relative overflow-hidden transition-colors">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-unal-50/70 dark:from-unal-950/20 to-transparent pointer-events-none hidden md:block" />
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-unal-50 dark:bg-unal-950/80 border border-unal-200 dark:border-unal-800 text-xs font-bold text-unal-800 dark:text-unal-300 mb-3">
              <Zap className="h-3.5 w-3.5 text-unal-600 dark:text-unal-400" />
              <span>Edumatch · Tutorías Especializadas en Ciencias Básicas · Facultad de Minas</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              De la improvisación al emparejamiento perfecto en ciencias básicas
            </h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              7 de 10 estudiantes tardan más de 24 horas buscando tutor en WhatsApp. Con Edumatch, obtén en ≤ 5 minutos tus 2-3 tutores ideales, valida la química con un chat previo gratuito y agenda con garantía de reemplazo por solo $5.000 COP.
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-1 text-unal-800 dark:text-unal-300">
                <Clock className="h-4 w-4 text-unal-700 dark:text-unal-400" />
                <span>Diagnóstico ágil en &lt; 5 min</span>
              </div>
              <div className="flex items-center gap-1 text-unal-800 dark:text-unal-300">
                <ShieldCheck className="h-4 w-4 text-unal-700 dark:text-unal-400" />
                <span>Garantía de reembolso o reemplazo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vistas Principales del Estudiante */}
        {activeView === 'diagnostic' && (
          <DiagnosticInterview
            diagnosticState={diagnosticState}
            onNavigateToMatches={() => setActiveView('matcher')}
          />
        )}

        {activeView === 'matcher' && (
          <ProfessorMatcher
            matcherState={matcherState}
            studentProfile={diagnosticState.deducedProfile}
            onBookSession={handleOpenBookingModal}
            onGoToDiagnostic={() => setActiveView('diagnostic')}
          />
        )}

        {activeView === 'booking' && (
          <BookedSessionsList
            sessions={bookingState.sessions}
            onExploreMore={() => setActiveView('matcher')}
          />
        )}
      </main>

      <BookingModal
        match={selectedMatchForBooking}
        studentProfile={diagnosticState.deducedProfile}
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onConfirm={handleBookingConfirmed}
      />

      <StudentIdentityModal
        isOpen={isIdentityModalOpen}
        onClose={closeIdentityModal}
        currentStudent={currentStudent}
        onSelectDemo={handleSelectDemo}
        onLoginWithUnal={handleLoginWithUnal}
      />

      <Footer />
    </div>
  )
}

export default App
