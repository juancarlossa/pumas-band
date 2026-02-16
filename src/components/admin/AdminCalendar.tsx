import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"


interface CalendarEvent {
  id?: number
  date: Date
  isBusy: boolean
  titulo: string
  descripcion: string
}

interface AdminCalendarProps {
  initialEvents: CalendarEvent[]
  className?: string
}

export function AdminCalendar({ initialEvents, className }: AdminCalendarProps) {
  const [events, setEvents] = React.useState<CalendarEvent[]>(initialEvents)
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>()
  const [isEditing, setIsEditing] = React.useState(false)
  const [formData, setFormData] = React.useState({
    titulo: "",
    descripcion: "",
    isBusy: false,
  })
  const [saving, setSaving] = React.useState(false)

  // Crear un mapa de fechas a eventos
  const eventMap = React.useMemo(() => {
    const map = new Map<string, CalendarEvent>()
    events.forEach(event => {
      const dateKey = event.date.toDateString()
      map.set(dateKey, event)
    })
    return map
  }, [events])

  // Obtener evento para una fecha específica
  const getEventForDate = (date: Date) => {
    return eventMap.get(date.toDateString())
  }

  // Cuando se selecciona una fecha
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      const existingEvent = getEventForDate(date)
      if (existingEvent) {
        setFormData({
          titulo: existingEvent.titulo,
          descripcion: existingEvent.descripcion,
          isBusy: existingEvent.isBusy,
        })
      } else {
        setFormData({
          titulo: "",
          descripcion: "",
          isBusy: false,
        })
      }
      setIsEditing(true)
    } else {
      setIsEditing(false)
    }
  }

  // Guardar o actualizar evento
  const handleSave = async () => {
    if (!selectedDate) return

    setSaving(true)
    try {
      const existingEvent = getEventForDate(selectedDate)
      // Formatear fecha en formato YYYY-MM-DD sin conversión de timezone
      const year = selectedDate.getFullYear()
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
      const day = String(selectedDate.getDate()).padStart(2, '0')
      const formattedDate = `${year}-${month}-${day}`

      const eventData = {
        event_date: formattedDate,
        is_busy: formData.isBusy,
        titulo: formData.titulo,
        descripcion: formData.descripcion,
      }

      let response
      if (existingEvent?.id) {
        // Actualizar evento existente
        response = await fetch(`/api/calendar-events/${existingEvent.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        })
      } else {
        // Crear nuevo evento
        response = await fetch("/api/calendar-events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventData),
        })
      }

      if (response.ok) {
        const savedEvent = await response.json()

        // Actualizar lista de eventos
        setEvents(prev => {
          const filtered = prev.filter(e => e.date.toDateString() !== selectedDate.toDateString())
          return [...filtered, {
            id: savedEvent.id,
            date: new Date(savedEvent.event_date),
            isBusy: savedEvent.is_busy,
            titulo: savedEvent.titulo,
            descripcion: savedEvent.descripcion,
          }]
        })

        alert("Evento guardado correctamente")
      } else {
        alert("Error al guardar el evento")
      }
    } catch (error) {
      console.error("Error saving event:", error)
      alert("Error al guardar el evento")
    } finally {
      setSaving(false)
    }
  }

  // Eliminar evento
  const handleDelete = async () => {
    if (!selectedDate) return

    const existingEvent = getEventForDate(selectedDate)
    if (!existingEvent?.id) return

    if (!confirm("¿Estás seguro de eliminar este evento?")) return

    setSaving(true)
    try {
      const response = await fetch(`/api/calendar-events/${existingEvent.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setEvents(prev => prev.filter(e => e.id !== existingEvent.id))
        setIsEditing(false)
        setSelectedDate(undefined)
        alert("Evento eliminado correctamente")
      } else {
        alert("Error al eliminar el evento")
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      alert("Error al eliminar el evento")
    } finally {
      setSaving(false)
    }
  }

  const currentEvent = selectedDate ? getEventForDate(selectedDate) : null

  return (
    <div className={cn("flex gap-8", className)}>
      {/* Calendario */}
      <div className="flex flex-col gap-4 bg-black rounded-xl p-6 border border-gray-200 shadow-lg">
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold text-xl">Disponibilidad</h3>
          <p className="text-white text-sm">
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
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          className="rounded-md border border-gray-200 text-white"
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
            selected: "bg-blue-500 text-white hover:bg-blue-600",
          }}
        />
      </div>

      {/* Formulario de edición */}
      {isEditing && selectedDate && (
        <div className="flex flex-col gap-4 bg-white rounded-xl p-6 border border-gray-200 shadow-lg w-96">
          <h3 className="text-white font-semibold text-xl">
            {currentEvent ? "Editar Evento" : "Nuevo Evento"}
          </h3>

          <div className="text-sm text-white">
            Fecha: {selectedDate.toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="titulo">Título</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
                placeholder="Ej: Boda en Sevilla"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={formData.descripcion}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                placeholder="Detalles del evento..."
                rows={3}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isBusy"
                checked={formData.isBusy}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData(prev => ({ ...prev, isBusy: e.target.checked }))}
                className="w-4 h-4"
              />
              <Label htmlFor="isBusy">Día ocupado (desmarca para disponible)</Label>
            </div>

            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleSave}
                disabled={saving || !formData.titulo}
                className="flex-1"
              >
                {saving ? "Guardando..." : "Guardar"}
              </Button>

              {currentEvent && (
                <Button
                  onClick={handleDelete}
                  disabled={saving}
                  variant="destructive"
                >
                  Eliminar
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
