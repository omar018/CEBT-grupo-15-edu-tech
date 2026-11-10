export type SensoryMode = 'visual' | 'auditory' | 'kinesthetic'
export type KolbStyle = 'assimilator' | 'converger' | 'diverger' | 'accommodator'
export type PedagogicalPace = 'step_by_step' | 'holistic_top_down'
export type InteractionStyle = 'socratic' | 'structured_directive' | 'project_based'

export interface LearningDimensions {
  readonly visual: number      // 0 - 100
  readonly auditory: number    // 0 - 100
  readonly kinesthetic: number // 0 - 100
  readonly theoretical: number // 0 - 100 (Abstracción)
  readonly practical: number   // 0 - 100 (Aplicación real)
  readonly autonomy: number    // 0 - 100 (Guía estructurada vs autogestión)
}

export interface StudentProfile {
  readonly id: string
  readonly name: string
  readonly faculty: string
  readonly semester: number
  readonly primarySensory: SensoryMode
  readonly kolbStyle: KolbStyle
  readonly interactionStyle: InteractionStyle
  readonly dimensions: LearningDimensions
  readonly keyTraits: readonly string[]
  readonly recommendedEnvironment: string
}

export interface DiagnosticOption {
  readonly id: string
  readonly label: string
  readonly description: string
  readonly impact: Partial<LearningDimensions>
  readonly sensoryHint?: SensoryMode
  readonly kolbHint?: KolbStyle
}

export interface DiagnosticQuestion {
  readonly id: string
  readonly stepNumber: number
  readonly title: string
  readonly scenario: string
  readonly context: string
  readonly options: readonly DiagnosticOption[]
}
