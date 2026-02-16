import { CalendarIcon } from "@radix-ui/react-icons";
import { MapPinIcon, TicketIcon, UsersIcon, Music } from "lucide-react";

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { Section } from "./Section";
import { Title } from "./Title";

interface EventosProps {
    texts?: Record<string, string>;
    media?: Record<string, { url: string; type: string; alt?: string }>;
}

const defaultPhotos = [
    { src: "/fotos/IMG_6101.webp", alt: "Evento 1 - Concierto Big Band", key: "eventos.photo1" },
    { src: "/fotos/IMG_7747.webp", alt: "Evento 2 - Noche Acústica", key: "eventos.photo2" },
    { src: "/fotos/IMG_8775.webp", alt: "Evento 3 - Fiesta Privada", key: "eventos.photo3" },
    { src: "/fotos/IMG_9836.webp", alt: "Evento 4 - Concierto Benéfico", key: "eventos.photo4" },
    { src: "/fotos/IMG_9912.webp", alt: "Evento 5 - Foto 15", key: "eventos.photo5" },
];

export function Eventos({ texts = {}, media = {} }: EventosProps) {
    const photos = defaultPhotos.map(p => ({
        ...p,
        src: media[p.key]?.url || p.src,
        alt: media[p.key]?.alt || p.alt
    }));

    const eventos = [
        {
            Icon: Music,
            name: texts['evento1.name'] || "Concierto estilo Big Band",
            description: texts['evento1.description'] || "Una noche épica de rock en el festival más grande de la ciudad. Ven a disfrutar de nuestros mejores hits.",
            fecha: texts['evento1.fecha'] || "15 Diciembre 2024",
            lugar: texts['evento1.lugar'] || "Estadio Municipal",
            href: "#contact",
            cta: "Reservar",
            background: (
                <>
                    <img
                        src={photos[0].src}
                        alt={photos[0].alt}
                        className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-150 saturate-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                </>
            ),
            className: "lg:row-start-1 lg:row-end-5 lg:col-start-2 lg:col-end-3",
        },
        {
            Icon: CalendarIcon,
            name: texts['evento2.name'] || "Noche Acústica",
            description: texts['evento2.description'] || "Una experiencia íntima con versiones acústicas de nuestras canciones favoritas.",
            fecha: texts['evento2.fecha'] || "8 Enero 2025",
            lugar: texts['evento2.lugar'] || "Café Central",
            href: "#contact",
            cta: "Reservar",
            background: (
                <>
                    <img
                        src={photos[1].src}
                        alt={photos[1].alt}
                        className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-150 saturate-50"
                    />
                </>
            ),
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-4",
        },
        {
            Icon: UsersIcon,
            name: texts['evento3.name'] || "Fiesta Privada",
            description: texts['evento3.description'] || "Eventos privados y celebraciones especiales. Música personalizada para tu ocasión.",
            fecha: texts['evento3.fecha'] || "Disponible",
            lugar: texts['evento3.lugar'] || "Tu Evento",
            href: "#contact",
            cta: "Consultar",
            background: (
                <>
                    <img
                        src={photos[2].src}
                        alt={photos[2].alt}
                        className="absolute inset-0 w-full h-full object-cover opacity-70 brightness-75 contrast-170 backdrop-saturate-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                </>
            ),
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-5",
        },
        {
            Icon: TicketIcon,
            name: texts['evento4.name'] || "Concierto Benéfico",
            description: texts['evento4.description'] || "Música con causa. Únete a nosotros en este evento solidario.",
            fecha: texts['evento4.fecha'] || "22 Febrero 2025",
            lugar: texts['evento4.lugar'] || "Teatro Principal",
            href: "#contact",
            cta: "Participar",
            background: (
                <>
                    <img
                        src={photos[3].src}
                        alt={photos[3].alt}
                        className="absolute inset-0 w-full h-full object-cover opacity-70 brightness-75 contrast-170 backdrop-saturate-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
                </>
            ),
            className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-5",
        }
    ];

    return (
        <Section>
            <div className="mb-8 text-center">
                <Title
                    title={texts['eventos.title'] || "Nuestros Eventos"}
                    subtitle={texts['eventos.subtitle'] || "No te pierdas nuestras presentaciones"}
                />
            </div>

            <BentoGrid className="lg:grid-rows-4 h-full text-white">
                {eventos.map((evento, idx) => (
                    <BentoCard key={idx} {...evento} />
                ))}
            </BentoGrid>
        </Section>
    );
}