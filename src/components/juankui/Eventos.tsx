import { CalendarIcon } from "@radix-ui/react-icons";
import { MapPinIcon, TicketIcon, UsersIcon, Music } from "lucide-react";

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { Section } from "./Section";
import { Title } from "./Title";

const photos = [
    { src: "/fotos/IMG_6101.webp", alt: "Puma's Band - Foto 11" },
    { src: "/fotos/IMG_7747.webp", alt: "Puma's Band - Foto 12" },
    { src: "/fotos/IMG_8775.webp", alt: "Puma's Band - Foto 13" },
    { src: "/fotos/IMG_9836.webp", alt: "Puma's Band - Foto 14" },
    { src: "/fotos/IMG_9912.webp", alt: "Puma's Band - Foto 15" },
];

const eventos = [
    {
        Icon: Music,
        name: "Concierto Rock Festival",
        description: "Una noche épica de rock en el festival más grande de la ciudad. Ven a disfrutar de nuestros mejores hits.",
        fecha: "15 Diciembre 2024",
        lugar: "Estadio Municipal",
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
        name: "Noche Acústica",
        description: "Una experiencia íntima con versiones acústicas de nuestras canciones favoritas.",
        fecha: "8 Enero 2025",
        lugar: "Café Central",
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
        name: "Fiesta Privada",
        description: "Eventos privados y celebraciones especiales. Música personalizada para tu ocasión.",
        fecha: "Disponible",
        lugar: "Tu Evento",
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
        name: "Concierto Benéfico",
        description: "Música con causa. Únete a nosotros en este evento solidario.",
        fecha: "22 Febrero 2025",
        lugar: "Teatro Principal",
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
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-3",
    },
    {
        Icon: MapPinIcon,
        name: "Gira de Verano",
        description: "Síguenos en nuestra gira por diferentes ciudades. Rock, energía y diversión garantizada.",
        fecha: "Junio - Agosto 2025",
        lugar: "Múltiples Ciudades",
        href: "#contact",
        cta: "Ver Fechas",
        background: (
            <>
                <img
                    src={photos[4].src}
                    alt={photos[4].alt}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 brightness-90 contrast-170 backdrop-saturate-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
            </>
        ),
        className: "lg:col-start-3 lg:col-end-3 lg:row-start-3 lg:row-end-5",
    },
];

export function Eventos() {
    return (
        <Section>
            <div className="mb-8 text-center">
                <Title title="Próximos Eventos" subtitle="No te pierdas nuestras presentaciones" />
            </div>

            <BentoGrid className="lg:grid-rows-4 h-full text-white">
                {eventos.map((evento, idx) => (
                    <BentoCard key={idx} {...evento} />

                ))}
            </BentoGrid>
        </Section>
    );
}