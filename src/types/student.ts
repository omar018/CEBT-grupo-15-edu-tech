export interface StudentIdentity {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly program: string
  readonly faculty: string
  readonly semester: number
  readonly isDemo: boolean
  readonly demoTag?: string
  readonly targetSubject?: string
  readonly presetAnswers?: Record<string, string> // questionId -> optionId
}
