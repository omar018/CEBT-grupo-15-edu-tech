import { useState } from 'react'
import { Navbar, type ActiveView } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { StatusAnnouncer } from './components/layout/StatusAnnouncer'
import { DiagnosticInterview } from './components/modules/diagnostic/DiagnosticInterview'
import { ProfessorMatcher } from './components/modules/matcher/ProfessorMatcher'
import { BookingModal } from './components/modules/booking/BookingModal'
import { BookedSessionsList } from './components/modules/booking/BookedSessionsList'
import { CebtValidationDashboard } from './components/modules/cebt/CebtValidationDashboard'
import { useDiagnostic } from './hooks/useDiagnostic'
import { useProfessorMatcher } from './hooks/useProfessorMatcher'
import { useBooking } from './hooks/useBooking'
import type { MatchedProfessor } from './types/professor'

export function App() {
  const [activeView, setActiveView] = useState<ActiveView>('diagnostic')

  // Hooks orquestadores (Separación de responsabilidades y SoC estricta)
  const diagnosticState = useDiagnostic('Estudiante UNAL')
  const matcherState = useProfessorMatcher(diagnosticState.deducedProfile)
  const bookingState = useBooking()

  // Estado para el modal de agendamiento
  const [selectedMatchForBooking, setSelectedMatchForBooking] = useState<MatchedProfessor | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

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
    <div className="min-h-screen flex flex-col bg-surface-50 text-slate-800">
      {/* PR-10: Región accesible permanente para anuncios a lectores de pantalla */}
      <StatusAnnouncer
        message={`${diagnosticState.statusAnnouncement} ${bookingState.bookingStatusMessage}`}
      />

      {/* Navegación y encabezado institucional */}
      <Navbar
        activeView={activeView}
        onViewChange={setActiveView}
        hasCompletedDiagnostic={diagnosticState.isCompleted}
        matchCount={matcherState.filteredMatches.length}
      />

      {/* Contenido Principal */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Hero Contextual */}
        <div className="mb-8 rounded-2xl bg-white border border-surface-200 p-6 sm:p-8 shadow-subtle relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-unal-50/70 to-transparent pointer-events-none hidden md:block" />
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-unal-50 border border-unal-200 text-xs font-bold text-unal-800 mb-3">
              <span className="h-2 w-2 rounded-full bg-unal-600 animate-pulse" />
              Algoritmo de Matching Cognitivo VAK + Kolb
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
              Aprende con quien enseña como tú piensas
            </h1>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Deducimos tu método de aprendizaje (sensorial, teórico-práctico y de interacción) y te conectamos con docentes y tutores de la Universidad Nacional de Colombia en sintonía con tu ritmo cognitivo.
            </p>
          </div>
        </div>

        {/* Vistas del Microfrontend */}
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

        {activeView === 'cebt' && <CebtValidationDashboard />}
      </main>

      {/* Modal de Agendamiento */}
      <BookingModal
        match={selectedMatchForBooking}
        studentProfile={diagnosticState.deducedProfile}
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookingModal}
        onConfirm={handleBookingConfirmed}
      />

      <Footer />
    </div>
  )
}

export default App
