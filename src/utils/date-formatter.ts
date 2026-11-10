const CO_DATE_FORMATTER = new Intl.DateTimeFormat('es-CO', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const CO_TIME_FORMATTER = new Intl.DateTimeFormat('es-CO', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
})

export function formatColombianDate(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Fecha inválida proporcionada a formatColombianDate')
  }
  return CO_DATE_FORMATTER.format(date)
}

export function formatColombianTime(date: Date): string {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Hora inválida proporcionada a formatColombianTime')
  }
  return CO_TIME_FORMATTER.format(date)
}
