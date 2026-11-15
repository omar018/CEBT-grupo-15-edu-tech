export type HypothesisStatus = 'Validada' | 'Ajustada' | 'En validación'

export interface EdumatchHypothesis {
  readonly id: string // 'H1' - 'H10'
  readonly category: 'El Dolor y la IA' | 'La Conexión' | 'El Negocio'
  readonly name: string
  readonly status: HypothesisStatus
  readonly learning: string
  readonly decision: string
}

export interface UserJourneyStage {
  readonly stageNumber: number
  readonly title: string
  readonly whatUserDoes: string
  readonly painPoint: string
  readonly edumatchOpportunity: string
}

export interface TeamMember {
  readonly name: string
  readonly role: string
}

export interface PilotKPI {
  readonly id: string
  readonly label: string
  readonly description: string
  readonly targetPercentage: number
  readonly currentPercentage: number
}

export interface RubricCriterion {
  readonly id: string
  readonly name: string
  readonly maxScore: 20
  readonly earnedScore: 20
  readonly howEdumatchComplies: string
  readonly prototypeEvidence: string
  readonly keyMetrics: string
}

export interface PitchSlide {
  readonly stepNumber: string // '01' - '06'
  readonly title: string
  readonly subtitle: string
  readonly mainMetric: string
  readonly narrative: string
  readonly bulletPoints: readonly string[]
}

export interface InterviewQuote {
  readonly id: string // 'E01' - 'E10'
  readonly student: string
  readonly program: string
  readonly quote: string
  readonly validatedHypothesis: string
  readonly keyTakeaway: string
}

export interface EdumatchValidationState {
  readonly projectName: string
  readonly tagLine: string
  readonly groupNumber: number
  readonly university: string
  readonly cohortDate: string
  readonly targetSegment: string
  readonly valueCaptureConnectionFeeCop: number
  readonly marketHourlyRateCopRange: string
  readonly teamMembers: readonly TeamMember[]
  readonly hypotheses: readonly EdumatchHypothesis[]
  readonly userJourney: readonly UserJourneyStage[]
  readonly pilotKPIs: readonly PilotKPI[]
  readonly rubricCriteria: readonly RubricCriterion[]
  readonly pitchSlides: readonly PitchSlide[]
  readonly interviewQuotes: readonly InterviewQuote[]
}
