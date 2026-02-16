-- Crear tabla para almacenar URLs de medios (imágenes y videos)
CREATE TABLE IF NOT EXISTS editable_media (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    url TEXT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'image' o 'video'
    section VARCHAR(100),
    alt_text VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas rápidas por key
CREATE INDEX IF NOT EXISTS idx_media_key ON editable_media(key);
CREATE INDEX IF NOT EXISTS idx_media_section ON editable_media(section);

-- Insertar medios iniciales (videos del Hero)
INSERT INTO editable_media (key, url, type, section, alt_text) VALUES
('hero.video1', '/videos/IMG_0056.webm', 'video', 'hero', 'Puma''s Band - Video 1'),
('hero.video2', '/videos/IMG_2632.webm', 'video', 'hero', 'Puma''s Band - Video 2'),
('hero.video3', '/videos/IMG_0083.webm', 'video', 'hero', 'Puma''s Band - Video 3'),
('hero.video4', '/videos/IMG_0505.webm', 'video', 'hero', 'Puma''s Band - Video 4')
ON CONFLICT (key) DO NOTHING;

-- Insertar imágenes de la galería
INSERT INTO editable_media (key, url, type, section, alt_text) VALUES
('gallery.photo1', '/fotos/IMG_4847.webp', 'image', 'gallery', 'Puma''s Band - Foto 1'),
('gallery.photo2', '/fotos/IMG_4851.webp', 'image', 'gallery', 'Puma''s Band - Foto 2'),
('gallery.photo3', '/fotos/IMG_6101.webp', 'image', 'gallery', 'Puma''s Band - Foto 3'),
('gallery.photo4', '/fotos/IMG_2546.webp', 'image', 'gallery', 'Puma''s Band - Foto 4'),
('gallery.photo5', '/fotos/IMG_2562.webp', 'image', 'gallery', 'Puma''s Band - Foto 5'),
('gallery.photo6', '/fotos/IMG_2589.webp', 'image', 'gallery', 'Puma''s Band - Foto 6'),
('gallery.photo7', '/fotos/IMG_2647.webp', 'image', 'gallery', 'Puma''s Band - Foto 7'),
('gallery.photo8', '/fotos/IMG_2665.webp', 'image', 'gallery', 'Puma''s Band - Foto 8'),
('gallery.photo9', '/fotos/IMG_4341.webp', 'image', 'gallery', 'Puma''s Band - Foto 9'),
('gallery.photo10', '/fotos/IMG_4831.webp', 'image', 'gallery', 'Puma''s Band - Foto 10'),
('gallery.photo11', '/fotos/IMG_7747.webp', 'image', 'gallery', 'Puma''s Band - Foto 11'),
('gallery.photo12', '/fotos/IMG_8775.webp', 'image', 'gallery', 'Puma''s Band - Foto 12'),
('gallery.photo13', '/fotos/IMG_9836.webp', 'image', 'gallery', 'Puma''s Band - Foto 13'),
('gallery.photo14', '/fotos/IMG_9912.webp', 'image', 'gallery', 'Puma''s Band - Foto 14')
ON CONFLICT (key) DO NOTHING;

-- Insertar imágenes de eventos
INSERT INTO editable_media (key, url, type, section, alt_text) VALUES
('eventos.photo1', '/fotos/IMG_6101.webp', 'image', 'eventos', 'Evento 1 - Concierto Big Band'),
('eventos.photo2', '/fotos/IMG_7747.webp', 'image', 'eventos', 'Evento 2 - Noche Acústica'),
('eventos.photo3', '/fotos/IMG_8775.webp', 'image', 'eventos', 'Evento 3 - Fiesta Privada'),
('eventos.photo4', '/fotos/IMG_9836.webp', 'image', 'eventos', 'Evento 4 - Concierto Benéfico')
ON CONFLICT (key) DO NOTHING;
