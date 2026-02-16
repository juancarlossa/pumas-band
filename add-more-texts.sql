-- Agregar más textos editables para toda la home
INSERT INTO editable_texts (key, content, section) VALUES
    -- Botones del Hero
    ('hero.button1.text', 'Contáctanos', 'hero'),
    ('hero.button1.href', '#contact', 'hero'),
    ('hero.button2.text', 'WhatsApp', 'hero'),
    ('hero.button2.href', 'https://wa.me/123456789', 'hero'),
    
    -- Services section
    ('services.title', 'Contratación', 'services'),
    ('services.subtitle', 'Cada evento es distinto, por eso adaptamos el formato, la duración y el presupuesto según el tipo de contratación, número de músicos y localización.', 'services'),
    ('services.cta.title', '¿Listo para crear momentos mágicos?', 'services'),
    ('services.cta.description', 'Diseñamos experiencias musicales únicas que se ajustan a tu estilo, ambiente y presupuesto. Cada evento merece su propia banda sonora especial.', 'services'),
    ('services.cta.button.text', 'Contactar', 'services'),
    ('services.cta.button.href', '#contact', 'services'),
    
    -- Service packs
    ('service.pack1.name', 'Eventos Privados', 'services'),
    ('service.pack1.description', 'Energía pura que transforma cualquier celebración en una experiencia inolvidable. Ritmo, color y diversión sin límites para hacer vibrar a todos tus invitados.', 'services'),
    ('service.pack2.name', 'Fiestas populares', 'services'),
    ('service.pack2.description', 'Sofisticación musical que eleva la atmósfera de tu evento. Sonidos refinados y presencia escénica impecable para ocasiones que merecen distinción.', 'services'),
    ('service.pack3.name', 'Tardeos', 'services'),
    ('service.pack3.description', 'La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el ''sí quiero'' hasta el último baile.', 'services'),
    ('service.pack4.name', 'Bodas', 'services'),
    ('service.pack4.description', 'La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el ''sí quiero'' hasta el último baile.', 'services'),
    ('service.pack5.name', 'Comidas de empresa', 'services'),
    ('service.pack5.description', 'La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el ''sí quiero'' hasta el último baile.', 'services'),
    ('service.pack6.name', 'Conciertos de Big Band', 'services'),
    ('service.pack6.description', 'La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el ''sí quiero'' hasta el último baile.', 'services'),
    
    -- Galería section
    ('gallery.title', 'Galería de Fotos', 'gallery'),
    ('gallery.subtitle', 'Momentos únicos de Puma''s Band', 'gallery'),
    
    -- Eventos section
    ('eventos.title', 'Nuestros Eventos', 'eventos'),
    ('eventos.subtitle', 'No te pierdas nuestras presentaciones', 'eventos'),
    ('evento1.name', 'Concierto estilo Big Band', 'eventos'),
    ('evento1.description', 'Una noche épica de rock en el festival más grande de la ciudad. Ven a disfrutar de nuestros mejores hits.', 'eventos'),
    ('evento1.fecha', '15 Diciembre 2024', 'eventos'),
    ('evento1.lugar', 'Estadio Municipal', 'eventos'),
    ('evento2.name', 'Noche Acústica', 'eventos'),
    ('evento2.description', 'Una experiencia íntima con versiones acústicas de nuestras canciones favoritas.', 'eventos'),
    ('evento2.fecha', '8 Enero 2025', 'eventos'),
    ('evento2.lugar', 'Café Central', 'eventos'),
    ('evento3.name', 'Fiesta Privada', 'eventos'),
    ('evento3.description', 'Eventos privados y celebraciones especiales. Música personalizada para tu ocasión.', 'eventos'),
    ('evento3.fecha', 'Disponible', 'eventos'),
    ('evento3.lugar', 'Tu Evento', 'eventos'),
    ('evento4.name', 'Concierto Benéfico', 'eventos'),
    ('evento4.description', 'Música con causa. Únete a nosotros en este evento solidario.', 'eventos'),
    ('evento4.fecha', '22 Febrero 2025', 'eventos'),
    ('evento4.lugar', 'Teatro Principal', 'eventos')
ON CONFLICT (key) DO NOTHING;
