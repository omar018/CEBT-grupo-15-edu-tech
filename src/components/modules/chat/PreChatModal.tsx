import React, { useState } from 'react'
import { Send, ShieldCheck, Sparkles, Clock } from 'lucide-react'
import type { MatchedProfessor } from '../../../types/professor'
import type { StudentProfile } from '../../../types/learning-profile'
import { Dialog } from '../../ui/Dialog'
import { Button } from '../../ui/Button'
import { Badge } from '../../ui/Badge'

interface ChatMessage {
  readonly id: string
  readonly sender: 'student' | 'professor'
  readonly text: string
  readonly time: string
}

interface PreChatModalProps {
  readonly match: MatchedProfessor | null
  readonly studentProfile: StudentProfile | null
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly onProceedToBooking: (match: MatchedProfessor) => void
}

export const PreChatModal: React.FC<PreChatModalProps> = ({
  match,
  studentProfile,
  isOpen,
  onClose,
  onProceedToBooking,
}) => {
  if (!match) return null

  const { professor, breakdown } = match
  const [inputText, setInputText] = useState('')
  const [messages, setMessages] = useState<readonly ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'professor',
      text: `¡Hola ${studentProfile?.name || 'colega'}! Veo que tenemos un ${breakdown.overallMatchScore}% de afinidad pedagógica. Cuéntame qué tema o ejercicio de ${professor.subjects[0]} tienes entre manos para ver cómo lo abordamos.`,
      time: 'Hace un momento',
    },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'student',
      text: inputText.trim(),
      time: 'Justo ahora',
    }

    setMessages((prev) => [...prev, userMsg])
    setInputText('')

    setTimeout(() => {
      const profReply: ChatMessage = {
        id: `reply-${Date.now()}`,
        sender: 'professor',
        text: `Comprendo perfecto. ${professor.teachingProfile.pedagogicalMotto} Si quieres, armamos una sesión de 90 minutos enfocada exactamente en ese punto. ¡Podemos agendar de una vez!`,
        time: 'Justo ahora',
      }
      setMessages((prev) => [...prev, profReply])
    }, 700)
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`Contacto Directo Gratuito: ${professor.fullName}`}
      description="Valida la química pedagógica y resuelve dudas antes de realizar la reserva"
      maxWidth="md"
    >
      <div className="flex flex-col h-[480px]">
        {/* Banner de Garantía y Confianza */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/60 text-xs mb-3 shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-900 dark:text-emerald-300 font-semibold">
            <ShieldCheck className="h-4 w-4 text-emerald-700 dark:text-emerald-400" />
            <span>Chat Previo sin Costo · Confianza antes del pago</span>
          </div>
          <Badge variant="lime" className="text-[10px]">
            <Clock className="h-3 w-3 mr-1" />
            Responde en ~{professor.responseTimeMinutes} min
          </Badge>
        </div>

        {/* Zona de Mensajes */}
        <div className="flex-1 overflow-y-auto space-y-3 p-3 rounded-xl bg-surface-50 dark:bg-[#171B21] border border-surface-200/70 dark:border-slate-800">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'student' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'student'
                    ? 'bg-unal-700 dark:bg-unal-600 text-white rounded-br-none shadow-sm'
                    : 'bg-white dark:bg-[#1E232B] text-slate-800 dark:text-slate-100 border border-surface-200 dark:border-slate-700 rounded-bl-none shadow-sm'
                }`}
              >
                {msg.text}
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 px-1">{msg.time}</span>
            </div>
          ))}
        </div>

        {/* Input para enviar mensaje */}
        <form onSubmit={handleSendMessage} className="mt-3 flex gap-2 shrink-0">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pregúntale sobre su método, disponibilidad o un ejercicio..."
            className="flex-1 h-10 px-3 text-xs bg-white dark:bg-[#171B21] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-surface-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-unal-700/30 dark:focus:ring-unal-400/30"
          />
          <Button type="submit" variant="default" size="sm" className="h-10 px-3">
            <Send className="h-3.5 w-3.5" />
          </Button>
        </form>

        {/* Call to Action */}
        <div className="mt-3 pt-3 border-t border-surface-100 dark:border-slate-800 flex items-center justify-between gap-2 shrink-0">
          <div className="text-[11px] text-slate-500 dark:text-slate-400">
            ¿Buena química? Tarifa de match: <strong className="text-slate-800 dark:text-slate-200">COP $5.000</strong>
          </div>
          <Button
            variant="lime"
            size="sm"
            onClick={() => {
              onClose()
              onProceedToBooking(match)
            }}
            className="text-xs font-bold shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1" />
            <span>Agendar con Garantía Edumatch</span>
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
