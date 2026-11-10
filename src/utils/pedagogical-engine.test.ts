import { describe, it, expect } from 'vitest'
import {
  calculateStudentProfile,
  computeMatchScore,
  rankProfessors,
} from './pedagogical-engine'
import type { DiagnosticOption, LearningDimensions } from '../types/learning-profile'
import { UNAL_PROFESSORS } from '../data/professors'

describe('Pedagogical Engine - Pure functions', () => {
  it('throws an error if student name is empty (PR-07 fail-fast)', () => {
    expect(() =>
      calculateStudentProfile('', 'Facultad de Ingeniería', 1, [
        {
          id: 'opt-1',
          label: 'Test',
          description: 'Desc',
          impact: { visual: 10 },
        },
      ])
    ).toThrow('El nombre del estudiante es obligatorio')
  })

  it('throws an error if selected options is empty', () => {
    expect(() =>
      calculateStudentProfile('Carlos', 'Facultad de Ingeniería', 1, [])
    ).toThrow('Debe responder al menos una pregunta')
  })

  // PR-15: Pruebas Parametrizadas con it.each
  const sensoryTestCases = [
    {
      expectedSensory: 'visual' as const,
      options: [
        { id: 'v1', label: 'V', description: 'V', impact: { visual: 40 } },
        { id: 'v2', label: 'V2', description: 'V2', impact: { visual: 30 } },
      ],
    },
    {
      expectedSensory: 'auditory' as const,
      options: [
        { id: 'a1', label: 'A', description: 'A', impact: { auditory: 45 } },
        { id: 'a2', label: 'A2', description: 'A2', impact: { auditory: 30 } },
      ],
    },
    {
      expectedSensory: 'kinesthetic' as const,
      options: [
        { id: 'k1', label: 'K', description: 'K', impact: { kinesthetic: 45 } },
        { id: 'k2', label: 'K2', description: 'K2', impact: { kinesthetic: 35 } },
      ],
    },
  ]

  it.each(sensoryTestCases)(
    'deduces primary sensory as $expectedSensory when appropriate answers are provided',
    ({ expectedSensory, options }) => {
      const profile = calculateStudentProfile('Test User', 'Facultad de Ciencias', 2, options)
      expect(profile.primarySensory).toBe(expectedSensory)
    }
  )

  const matchDistanceTestCases = [
    {
      label: 'Identical profiles yield near 99% match',
      student: { visual: 80, auditory: 60, kinesthetic: 70, theoretical: 80, practical: 80, autonomy: 70 },
      teacher: { visual: 80, auditory: 60, kinesthetic: 70, theoretical: 80, practical: 80, autonomy: 70 },
      expectedMin: 95,
    },
    {
      label: 'Opposite profiles yield lower match above 50% baseline',
      student: { visual: 15, auditory: 15, kinesthetic: 15, theoretical: 15, practical: 15, autonomy: 15 },
      teacher: { visual: 95, auditory: 95, kinesthetic: 95, theoretical: 95, practical: 95, autonomy: 95 },
      expectedMin: 50,
    },
  ]

  it.each(matchDistanceTestCases)(
    'computes match score correctly: $label',
    ({ student, teacher, expectedMin }) => {
      const breakdown = computeMatchScore(student, teacher)
      expect(breakdown.overallMatchScore).toBeGreaterThanOrEqual(expectedMin)
      expect(breakdown.overallMatchScore).toBeLessThanOrEqual(100)
    }
  )

  it('ranks professors in descending order of compatibility', () => {
    const profile = calculateStudentProfile('Ana Gómez', 'Facultad de Ingeniería', 3, [
      { id: 'opt1', label: 'Opt1', description: 'Desc', impact: { visual: 30, practical: 35 } },
    ])

    const ranked = rankProfessors(profile, UNAL_PROFESSORS)
    expect(ranked.length).toBe(UNAL_PROFESSORS.length)

    for (let i = 0; i < ranked.length - 1; i++) {
      expect(ranked[i].breakdown.overallMatchScore).toBeGreaterThanOrEqual(
        ranked[i + 1].breakdown.overallMatchScore
      )
    }
  })
})
