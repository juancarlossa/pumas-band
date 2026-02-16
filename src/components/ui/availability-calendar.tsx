import * as React from "react"
import { Calendar, CalendarDayButton } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import type { DayButton } from "react-day-picker"

export interface BandEvent {
  date: Date
  isBusy: boolean
  titulo: string
  descripcion: string
}

interface AvailabilityCalendarProps {
  events: BandEvent[]
  className?: string
}

export function AvailabilityCalendar({ events, className }: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()

  // Crear un mapa de fechas a eventos para búsqueda rápida
  const eventMap = React.useMemo(() => {
    const map = new Map<string, BandEvent>()
    events.forEach(event => {
      const dateKey = event.date.toDateString()
      map.set(dateKey, event)
    })
    return map
  }, [events])

  // Obtener evento para una fecha específica
  const getEventForDate = (date: Date) => {
    const dateKey = date.toDateString()
    const event = eventMap.get(dateKey)
    return event
  }

  // Encontrar evento seleccionado (solo al hacer click)
  const currentEvent = selectedDate ? getEventForDate(selectedDate) : null

  return (
    <div className={cn("relative flex flex-col gap-4 bg-black/80 backdrop-blur-md rounded-xl p-4 border border-white/10", className)}>
      <div className="flex flex-col gap-2">
        <h3 className="text-white font-semibold text-lg">Disponibilidad</h3>
        <p className="text-white/70 text-sm">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Disponible
          </span>
          <span className="inline-flex items-center gap-1 ml-4">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Ocupado
          </span>
        </p>
      </div>

      <Calendar
        lang="es"
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border border-white/10 text-white"

        modifiers={{
          busy: (date) => {
            const event = getEventForDate(date)
            return !!event && event.isBusy
          },
          available: (date) => {
            const event = getEventForDate(date)
            return !!event && !event.isBusy
          },
        }}
        modifiersClassNames={{
          busy: "bg-red-500/40 rounded-lg border-2 border-red-500 text-white hover:bg-red-500/50",
          available: "bg-green-500/40 rounded-lg border-2 border-green-500 text-white hover:bg-green-500/50",
          today: "bg-neutral-100 rounded-lg border-2 text-black",
        }}
        components={{
          DayButton: (props: React.ComponentProps<typeof DayButton>) => {
            return (
              <CalendarDayButton
                {...props}
                className={cn(
                  "relative",
                  !props.modifiers.today && "text-white",
                  props.className
                )}
              >
                {props.day.date.getDate()}
              </CalendarDayButton>
            )
          },
        }}
      />

      {currentEvent && (
        <div className="absolute top-full left-0 mt-2 lg:top-0 lg:left-full lg:ml-4 lg:mt-0 bg-neutral-900/95 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-xl z-50 min-w-[280px] animate-fade-up">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                currentEvent.isBusy ? "bg-red-500" : "bg-green-500"
              )}
            />
            <h4 className="text-white font-semibold text-sm">
              {currentEvent.titulo}
            </h4>
          </div>
          <p className="text-white/70 text-xs">{currentEvent.descripcion}</p>
        </div>
      )}
    </div>
  )
}
