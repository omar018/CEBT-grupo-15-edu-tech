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
}
