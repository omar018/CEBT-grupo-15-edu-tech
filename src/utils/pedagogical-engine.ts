import type {
  DiagnosticOption,
  LearningDimensions,
  SensoryMode,
  KolbStyle,
  InteractionStyle,
  StudentProfile,
} from '../types/learning-profile'
import type { Professor, MatchScoreBreakdown, MatchedProfessor } from '../types/professor'

const INITIAL_DIMENSIONS: LearningDimensions = {
  visual: 50,
  auditory: 50,
  kinesthetic: 50,
  theoretical: 50,
  practical: 50,
  autonomy: 50,
}

export function calculateStudentProfile(
  studentName: string,
  faculty: string,
  semester: number,
  selectedOptions: readonly DiagnosticOption[]
): StudentProfile {
  if (!studentName.trim()) {
    throw new Error('El nombre del estudiante es obligatorio para generar el perfil.')
  }
  if (selectedOptions.length === 0) {
    throw new Error('Debe responder al menos una pregunta para deducir el método pedagógico.')
  }

  const rawDimensions: Record<keyof LearningDimensions, number> = { ...INITIAL_DIMENSIONS }

  for (const option of selectedOptions) {
    if (option.impact.visual !== undefined) rawDimensions.visual += option.impact.visual
    if (option.impact.auditory !== undefined) rawDimensions.auditory += option.impact.auditory
    if (option.impact.kinesthetic !== undefined) rawDimensions.kinesthetic += option.impact.kinesthetic
    if (option.impact.theoretical !== undefined) rawDimensions.theoretical += option.impact.theoretical
    if (option.impact.practical !== undefined) rawDimensions.practical += option.impact.practical
    if (option.impact.autonomy !== undefined) rawDimensions.autonomy += option.impact.autonomy
  }

  // Normalizar entre 15 y 100
  const dimensions: LearningDimensions = {
    visual: Math.min(100, Math.max(15, rawDimensions.visual)),
    auditory: Math.min(100, Math.max(15, rawDimensions.auditory)),
    kinesthetic: Math.min(100, Math.max(15, rawDimensions.kinesthetic)),
    theoretical: Math.min(100, Math.max(15, rawDimensions.theoretical)),
    practical: Math.min(100, Math.max(15, rawDimensions.practical)),
    autonomy: Math.min(100, Math.max(15, rawDimensions.autonomy)),
  }

  // Determinar canal sensorial dominante
  let primarySensory: SensoryMode = 'visual'
  if (dimensions.auditory > dimensions.visual && dimensions.auditory > dimensions.kinesthetic) {
    primarySensory = 'auditory'
  } else if (dimensions.kinesthetic > dimensions.visual && dimensions.kinesthetic > dimensions.auditory) {
    primarySensory = 'kinesthetic'
  }

  // Deducción estilo Kolb
  let kolbStyle: KolbStyle = 'assimilator'
  if (dimensions.theoretical >= 60 && dimensions.practical < 60) {
    kolbStyle = 'assimilator' // Teórico conceptual
  } else if (dimensions.practical >= 60 && dimensions.theoretical >= 50) {
    kolbStyle = 'converger' // Práctico técnico y formulación
  } else if (dimensions.practical >= 60 && dimensions.kinesthetic >= 60) {
    kolbStyle = 'accommodator' // Experimental de campo
  } else {
    kolbStyle = 'diverger' // Observador reflexivo
  }

  // Interacción
  let interactionStyle: InteractionStyle = 'structured_directive'
  if (dimensions.autonomy >= 70) {
    interactionStyle = 'socratic'
  } else if (dimensions.practical >= 65) {
    interactionStyle = 'project_based'
  }

  const keyTraits: string[] = []
  if (dimensions.visual >= 65) keyTraits.push('Mapas conceptuales y esquemas visuales')
  if (dimensions.kinesthetic >= 65) keyTraits.push('Resolución activa de ejercicios y laboratorio')
  if (dimensions.auditory >= 65) keyTraits.push('Discusión dialéctica y explicación verbal')
  if (dimensions.theoretical >= 65) keyTraits.push('Rigor analítico y demostraciones formales')
  if (dimensions.practical >= 65) keyTraits.push('Casos de estudio y aplicación en contexto colombiano')
  if (dimensions.autonomy >= 65) keyTraits.push('Aprendizaje autodirigido con guía puntual')

  const recommendedEnvironment =
    dimensions.practical > dimensions.theoretical
      ? 'Sesiones prácticas centradas en resolución de problemas tipo examen o proyectos con retroalimentación inmediata.'
      : 'Sesiones analíticas estructuradas, deducción desde primeros principios y síntesis conceptual profunda.'

  return {
    id: `std-${Date.now()}`,
    name: studentName,
    faculty,
    semester,
    primarySensory,
    kolbStyle,
    interactionStyle,
    dimensions,
    keyTraits,
    recommendedEnvironment,
  }
}

export function computeMatchScore(
  studentDimensions: LearningDimensions,
  profDimensions: LearningDimensions
): MatchScoreBreakdown {
  const axes: (keyof LearningDimensions)[] = [
    'visual',
    'auditory',
    'kinesthetic',
    'theoretical',
    'practical',
    'autonomy',
  ]

  let sumSquaredDiff = 0
  for (const axis of axes) {
    const diff = (studentDimensions[axis] - profDimensions[axis]) / 100
    sumSquaredDiff += diff * diff
  }

  // Distancia normalizada entre 0 y 1
  const euclideanDist = Math.sqrt(sumSquaredDiff / axes.length)
  const rawScore = Math.round((1 - euclideanDist) * 100)
  const overallMatchScore = Math.max(50, Math.min(99, rawScore))

  // Sinergias específicas
  const sensorySynergy = Math.round(
    100 -
      ((Math.abs(studentDimensions.visual - profDimensions.visual) +
        Math.abs(studentDimensions.auditory - profDimensions.auditory) +
        Math.abs(studentDimensions.kinesthetic - profDimensions.kinesthetic)) /
        3)
  )

  const conceptualAlignment = Math.round(
    100 -
      ((Math.abs(studentDimensions.theoretical - profDimensions.theoretical) +
        Math.abs(studentDimensions.practical - profDimensions.practical)) /
        2)
  )

  const interactionFit = Math.round(
    100 - Math.abs(studentDimensions.autonomy - profDimensions.autonomy)
  )

  const pacingCompatibility = Math.round((sensorySynergy + conceptualAlignment) / 2)

  const matchingHighlights: string[] = []
  if (Math.abs(studentDimensions.visual - profDimensions.visual) <= 15 && profDimensions.visual >= 60) {
    matchingHighlights.push('Afinidad en recursos visuales, diagramación y pizarra analítica')
  }
  if (Math.abs(studentDimensions.practical - profDimensions.practical) <= 15 && profDimensions.practical >= 60) {
    matchingHighlights.push('Orientación compartida a problemas reales y talleres aplicados')
  }
  if (Math.abs(studentDimensions.theoretical - profDimensions.theoretical) <= 15 && profDimensions.theoretical >= 60) {
    matchingHighlights.push('Sintonía en rigor teórico, demostración y deducción formal')
  }
  if (Math.abs(studentDimensions.autonomy - profDimensions.autonomy) <= 20) {
    matchingHighlights.push('Ritmo y grado de autonomía equilibrados entre tutor y estudiante')
  }

  let potentialFrictionWarning: string | undefined
  if (Math.abs(studentDimensions.practical - profDimensions.practical) > 40) {
    potentialFrictionWarning = 'Discrepancia en equilibrio teoría vs práctica: acordar objetivos antes de la sesión.'
  }

  return {
    overallMatchScore,
    sensorySynergy: Math.max(40, Math.min(100, sensorySynergy)),
    conceptualAlignment: Math.max(40, Math.min(100, conceptualAlignment)),
    interactionFit: Math.max(40, Math.min(100, interactionFit)),
    pacingCompatibility: Math.max(40, Math.min(100, pacingCompatibility)),
    matchingHighlights: matchingHighlights.length > 0 ? matchingHighlights : ['Complementariedad pedagógica general'],
    potentialFrictionWarning,
  }
}

export function rankProfessors(
  studentProfile: StudentProfile,
  professors: readonly Professor[]
): readonly MatchedProfessor[] {
  const matches: MatchedProfessor[] = professors.map((prof) => ({
    professor: prof,
    breakdown: computeMatchScore(studentProfile.dimensions, prof.teachingProfile.dimensions),
  }))

  return matches.sort((a, b) => b.breakdown.overallMatchScore - a.breakdown.overallMatchScore)
}
