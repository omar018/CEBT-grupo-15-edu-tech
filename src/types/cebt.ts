export interface CebtRubricItem {
  readonly id: string
  readonly title: string
  readonly maxPoints: number
  readonly currentScore: number
  readonly status: 'aligned' | 'in_progress' | 'needs_evidence'
  readonly description: string
  readonly evidenceDetail: string
}

export interface CebtPitchSection {
  readonly number: string
  readonly title: string
  readonly subtitle: string
  readonly content: string
  readonly metric?: string
}

export interface CebtValidationState {
  readonly hypothesis: string
  readonly primaryMetric: string
  readonly threshold: string
  readonly totalScore: number
  readonly rubricItems: readonly CebtRubricItem[]
  readonly pitchSections: readonly CebtPitchSection[]
}
