-- Tabla para almacenar eventos del calendario de disponibilidad de la banda
CREATE TABLE IF NOT EXISTS calendar_events (
    id SERIAL PRIMARY KEY,
    event_date DATE NOT NULL,
    is_busy BOOLEAN NOT NULL DEFAULT false,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas rápidas por fecha
CREATE INDEX idx_calendar_events_date ON calendar_events(event_date);

-- Índice para búsquedas por disponibilidad
CREATE INDEX idx_calendar_events_busy ON calendar_events(is_busy);

-- Trigger para actualizar updated_at automáticamente
CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE
    ON calendar_events FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Datos de ejemplo para febrero-marzo 2026
INSERT INTO calendar_events (event_date, is_busy, titulo, descripcion) VALUES
    ('2026-02-14', true, 'Boda en Sevilla', 'Evento privado - Celebración de boda'),
    ('2026-02-15', false, 'Disponible', 'Fecha disponible para reservas'),
    ('2026-02-21', true, 'Concierto Big Band', 'Teatro Municipal - Concierto público'),
    ('2026-02-22', true, 'Fiesta Privada', 'Evento corporativo'),
    ('2026-02-28', false, 'Disponible', 'Fecha disponible para reservas'),
    ('2026-03-01', true, 'Tardeo en Málaga', 'Evento público - Plaza Mayor'),
    ('2026-03-08', false, 'Disponible', 'Fecha disponible para reservas')
ON CONFLICT DO NOTHING;
