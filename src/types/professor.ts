import type { LearningDimensions, SensoryMode, KolbStyle, InteractionStyle } from './learning-profile'

export type UnalFaculty =
  | 'Facultad de Ingeniería'
  | 'Facultad de Ciencias'
  | 'Facultad de Medicina'
  | 'Facultad de Ciencias Económicas'
  | 'Facultad de Artes'
  | 'Facultad de Ciencias Humanas'

export type Modality = 'Presencial (Campus UNAL)' | 'Virtual sincrónico' | 'Híbrido'

export interface PeerReview {
  readonly id: string
  readonly studentInitials: string
  readonly semester: string
  readonly subject: string
  readonly rating: number
  readonly comment: string
  readonly dateFormatted: string
}

export interface ProfessorTeachingProfile {
  readonly dominantSensoryApproach: SensoryMode
  readonly kolbOrientation: KolbStyle
  readonly interactionStyle: InteractionStyle
  readonly dimensions: LearningDimensions
  readonly pedagogicalMotto: string
  readonly preferredMaterials: readonly string[]
  readonly evaluationApproach: string
}

export interface Professor {
  readonly id: string
  readonly fullName: string
  readonly academicTitle: string
  readonly faculty: UnalFaculty
  readonly department: string
  readonly avatarUrl: string
  readonly rating: number
  readonly completedSessions: number
  readonly subjects: readonly string[]
  readonly modality: Modality
  readonly officeHours: string
  readonly hourlyRateCop: number
  readonly peerReviews: readonly PeerReview[]
  readonly teachingProfile: ProfessorTeachingProfile
  readonly verifiedUnal: boolean
  readonly responseTimeMinutes: number
}

export interface MatchScoreBreakdown {
  readonly overallMatchScore: number // 0 - 100%
  readonly sensorySynergy: number     // 0 - 100%
  readonly conceptualAlignment: number // 0 - 100%
  readonly interactionFit: number      // 0 - 100%
  readonly pacingCompatibility: number // 0 - 100%
  readonly matchingHighlights: readonly string[]
  readonly potentialFrictionWarning?: string
}

export interface MatchedProfessor {
  readonly professor: Professor
  readonly breakdown: MatchScoreBreakdown
}
