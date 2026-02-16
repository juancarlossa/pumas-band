-- Tabla para almacenar los textos editables
CREATE TABLE IF NOT EXISTS editable_texts (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    section VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas rápidas por key
CREATE INDEX idx_editable_texts_key ON editable_texts(key);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_editable_texts_updated_at BEFORE UPDATE
    ON editable_texts FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Datos iniciales de ejemplo
INSERT INTO editable_texts (key, content, section) VALUES
    ('hero.title', 'Puma''s Band', 'hero'),
    ('hero.subtitle', 'La mejor banda para tus eventos', 'hero'),
    ('about.title', 'Sobre Nosotros', 'about'),
    ('about.description', 'Somos una banda profesional con años de experiencia', 'about'),
    ('services.title', 'Nuestro Repertorio', 'services'),
    ('contact.title', 'Reservas', 'contact')
ON CONFLICT (key) DO NOTHING;
