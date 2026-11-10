import React from 'react'

interface StatusAnnouncerProps {
  readonly message: string
}

/**
 * PR-10: Contenedor accesible montado de manera permanente en el DOM
 * para que lectores de pantalla detecten cambios de estado dinámicos.
 */
export const StatusAnnouncer: React.FC<StatusAnnouncerProps> = React.memo(({ message }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  )
})

StatusAnnouncer.displayName = 'StatusAnnouncer'
