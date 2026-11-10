import { describe, it, expect } from 'vitest'
import { formatColombianDate, formatColombianTime } from './date-formatter'
import { isProblemDetails } from '../types/rfc7807'

describe('Date Formatter with Intl.DateTimeFormat (es-CO) (PR-14)', () => {
  it('throws early for invalid dates (PR-07 fail-fast)', () => {
    expect(() => formatColombianDate(new Date('invalid-date'))).toThrow('Fecha inválida')
    expect(() => formatColombianTime(new Date('invalid-date'))).toThrow('Hora inválida')
  })

  // PR-15: it.each table-driven
  const dateCases = [
    { iso: '2026-03-15T10:00:00Z', expectedYear: '2026' },
    { iso: '2026-11-20T15:30:00Z', expectedYear: '2026' },
  ]

  it.each(dateCases)('formats Colombian dates for $iso', ({ iso, expectedYear }) => {
    const formatted = formatColombianDate(new Date(iso))
    expect(formatted).toContain(expectedYear)
  })

  it('validates RFC 7807 Problem Details type guard safely', () => {
    expect(isProblemDetails(null)).toBe(false)
    expect(isProblemDetails('error')).toBe(false)
    expect(
      isProblemDetails({
        title: 'Error de validación',
        status: 400,
        detail: 'El campo asignatura es requerido',
      })
    ).toBe(true)
  })
})
