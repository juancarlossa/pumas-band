import { CalendarIcon } from "@radix-ui/react-icons";
import { MapPinIcon, TicketIcon, UsersIcon, Music } from "lucide-react";

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { Section } from "./Section";
import { Title } from "./Title";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { AuroraText } from "../ui/aurora-text";
import { NeonGradientCard } from "../ui/neon-gradient-card";
import SpotlightCard from "../SpotlightCard";
import MagicBento from "../MagicBento";
import { Calendar } from "../ui/calendar";

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
            href: "/contact",
            cta: "Reservar",
            background: (
                <>
                    <img
                        src={photos[0].src}
                        alt={photos[0].alt}
                        className="absolute inset-0 w-full h-full object-cover 
                        opacity-100 brightness-75 contrast-100 saturate-100 
                        group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-80 
                        transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-b
                     from-black/10 via-black/40 to-black/80 
                     group-hover:from-black/0 group-hover:via-black/60 group-hover:to-black transition-all duration-300"
                    />
                </>
            ),
            className: "min-h-[400px] lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
        },
        {
            Icon: CalendarIcon,
            name: texts['evento2.name'] || "Noche Acústica",
            description: texts['evento2.description'] || "Una experiencia íntima con versiones acústicas de nuestras canciones favoritas.",
            fecha: texts['evento2.fecha'] || "8 Enero 2025",
            lugar: texts['evento2.lugar'] || "Café Central",
            href: "/contact",
            cta: "Reservar",
            background: (
                <>
                    <img
                        src={photos[1].src}
                        alt={photos[1].alt}
                        className="absolute inset-0 w-full h-full object-cover 
                        opacity-80  contrast-100  
                         group-hover:contrast-100 group-hover:saturate-100 
                        transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-b
                     from-black/0 via-black/30 to-black 
                     group-hover:from-black/0 group-hover:via-black/60 group-hover:to-black transition-all duration-300"
                    />
                </>
            ),
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-4 justify-end",
        },
        {
            Icon: UsersIcon,
            name: texts['evento3.name'] || "Fiesta Privada",
            description: texts['evento3.description'] || "Eventos privados y celebraciones especiales. Música personalizada para tu ocasión.",
            fecha: texts['evento3.fecha'] || "Disponible",
            lugar: texts['evento3.lugar'] || "Tu Evento",
            href: "/contact",
            cta: "Consultar",
            background: (
                <>
                    <img
                        src={photos[2].src}
                        alt={photos[2].alt}
                        className="absolute inset-0 w-full h-full object-cover 
                        opacity-80 brightness-120 contrast-100 saturate-10 
                        group-hover:brightness-120 group-hover:contrast-100 group-hover:saturate-100 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-b
                     from-black/10 via-black/60 to-black/80 
                     group-hover:from-black/0 group-hover:via-black/60 group-hover:to-black 
                     transition-all duration-300"
                    />
                </>
            ),
            className: "lg:col-start-1 lg:col-end-3 lg:row-start-4 lg:row-end-7 justify-end",
        },
        {
            Icon: TicketIcon,
            name: texts['evento4.name'] || "Concierto Benéfico",
            description: texts['evento4.description'] || "Música con causa. Únete a nosotros en este evento solidario.",
            fecha: texts['evento4.fecha'] || "22 Febrero 2025",
            lugar: texts['evento4.lugar'] || "Teatro Principal",
            href: "/contact",
            cta: "Participar",
            background: (
                <>
                    <img
                        src={photos[3].src}
                        alt={photos[3].alt}
                        className="absolute inset-0 w-full h-full object-cover opacity-80 brightness-75 contrast-170 saturate-0 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-linear-to-b
                     from-black/20 via-black/60 to-black/80 
                     group-hover:from-black/0 group-hover:via-black/30 group-hover:to-black transition-all duration-300"
                    />
                </>
            ),
            className: "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-7 justify-end",
        }
        /*
        {
            Icon: Music,
            name: "",
            description: "",
            fecha: "",
            lugar: "",
            href: "#",
            cta: "",
            background: <></>,
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-5",
        },
        {
            Icon: Music,
            name: texts['eventos.logo.name'] || "Puma's Band",
            description: "",
            fecha: texts['eventos.logo.fecha'] || "",
            lugar: texts['eventos.logo.lugar'] || "",
            href: "#",
            cta: "",
            background: (
                <>
                    <img
                        src="/logo.png"
                        alt="Puma's Band Logo"
                        className="size-28 object-contain"
                    />
                </>
            ),
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-5 lg:row-end-7",
        }
            */
    ];

    return (
        <div>
            <div className=" text-center mb-8">
                <Title
                    title={texts['eventos.title'] || "Nuestros Eventos"}
                    subtitle={texts['eventos.subtitle'] || "No te pierdas nuestras presentaciones"}
                />
            </div>

            <BentoGrid className="flex flex-col lg:grid lg:grid-rows-6 h-full text-white">
                {eventos.map((evento, idx) => {
                    /*
                    const isLogo = idx === eventos.length - 1;
                    const isDescriptionOnly = idx === eventos.length - 2;

                    
                    if (isDescriptionOnly) {
                        return (
                            <div
                                key={idx}
                                className={` group relative col-span-3 flex flex-col justify-center items-center overflow-hidden rounded-xl ${evento.className}`}
                            >
                                <div className="relative z-10 flex items-center justify-center p-4">
                                    <AuroraText
                                        className="text-center text-5xl font-extrabold "
                                    >
                                        {evento.description}
                                    </AuroraText>
                                </div>
                            </div>
                        );
                    }

                    if (isLogo) {
                        return (
                            <NeonGradientCard
                                key={idx}
                                className={` group relative col-span-3 flex flex-col justify-center items-center ${evento.className}`}

                            >
                                <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(213, 59, 60, 0.5)">
                                    <div className="relative z-10 flex items-center justify-center gap-4 p-4">
                                        <div className="flex items-center justify-center">{evento.background}</div>
                                        <span className="pointer-events-none z-10 h-full bg-linear-to-br from-amber-400 from-35% to-[#D53B3C] bg-clip-text text-center text-3xl leading-none font-bold tracking-tighter text-balance whitespace-pre-wrap text-transparent md:text-5xl dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">

                                            <h3 className="text-5xl font-bold ">{evento.name}</h3>
                                        </span>
                                    </div>
                                </SpotlightCard>
                            </NeonGradientCard>
                        );
                    }
*/
                    return <BentoCard key={idx} {...evento} />;
                })}
            </BentoGrid>
        </div>
    );
}