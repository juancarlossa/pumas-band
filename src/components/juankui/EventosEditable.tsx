import { CalendarIcon } from "@radix-ui/react-icons";
import { MapPinIcon, TicketIcon, UsersIcon, Music } from "lucide-react";
import { BentoCard, BentoGrid } from "../magicui/bento-grid";
import { Section } from "./Section";
import EditableText from "../EditableText";
import EditableImageWithButton from "../EditableImageWithButton";
import { AuroraText } from "../ui/aurora-text";
import { AnimatedShinyText } from "../ui/animated-shiny-text";

interface EventosEditableProps {
    texts?: Record<string, string>;
    media?: Record<string, { url: string; type: string; alt?: string }>;
}

const defaultPhotos = [
    { src: "/fotos/IMG_6101.webp", alt: "Evento 1 - Concierto Big Band", key: "eventos.photo1" },
    { src: "/fotos/IMG_7747.webp", alt: "Evento 2 - Noche Acústica", key: "eventos.photo2" },
    { src: "/fotos/IMG_8775.webp", alt: "Evento 3 - Fiesta Privada", key: "eventos.photo3" },
    { src: "/fotos/IMG_9836.webp", alt: "Evento 4 - Concierto Benéfico", key: "eventos.photo4" },
];

export function EventosEditable({ texts = {}, media = {} }: EventosEditableProps) {
    const photos = defaultPhotos.map(p => ({
        ...p,
        src: media[p.key]?.url || p.src,
        alt: media[p.key]?.alt || p.alt
    }));
    const eventos = [
        {
            Icon: Music,
            nameKey: 'evento1.name',
            name: texts['evento1.name'] || "Concierto estilo Big Band",
            descKey: 'evento1.description',
            description: texts['evento1.description'] || "Una noche épica de rock en el festival más grande de la ciudad.",
            fechaKey: 'evento1.fecha',
            fecha: texts['evento1.fecha'] || "15 Diciembre 2024",
            lugarKey: 'evento1.lugar',
            lugar: texts['evento1.lugar'] || "Estadio Municipal",
            href: "/contact",
            cta: "Reservar",
            background: (
                <>
                    <EditableImageWithButton
                        mediaKey={photos[0].key}
                        initialUrl={photos[0].src}
                        alt={photos[0].alt}
                        className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-150 saturate-100"
                        buttonZIndex="z-[5]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 pointer-events-none" />
                </>
            ),
            className: "min-h-[400px] lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
        },
        {
            Icon: CalendarIcon,
            nameKey: 'evento2.name',
            name: texts['evento2.name'] || "Noche Acústica",
            descKey: 'evento2.description',
            description: texts['evento2.description'] || "Una experiencia íntima con versiones acústicas.",
            fechaKey: 'evento2.fecha',
            fecha: texts['evento2.fecha'] || "8 Enero 2025",
            lugarKey: 'evento2.lugar',
            lugar: texts['evento2.lugar'] || "Café Central",
            href: "/contact",
            cta: "Reservar",
            background: (
                <>
                    <EditableImageWithButton
                        mediaKey={photos[1].key}
                        initialUrl={photos[1].src}
                        alt={photos[1].alt}
                        className="absolute inset-0 w-full h-full object-cover brightness-90 contrast-150 saturate-50"
                        buttonZIndex="z-[5]"
                    />
                </>
            ),
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-4",
        },
        {
            Icon: UsersIcon,
            nameKey: 'evento3.name',
            name: texts['evento3.name'] || "Fiesta Privada",
            descKey: 'evento3.description',
            description: texts['evento3.description'] || "Eventos privados y celebraciones especiales.",
            fechaKey: 'evento3.fecha',
            fecha: texts['evento3.fecha'] || "Disponible",
            lugarKey: 'evento3.lugar',
            lugar: texts['evento3.lugar'] || "Tu Evento",
            href: "/contact",
            cta: "Consultar",
            background: (
                <>
                    <EditableImageWithButton
                        mediaKey={photos[2].key}
                        initialUrl={photos[2].src}
                        alt={photos[2].alt}
                        className="absolute inset-0 w-full h-full object-cover opacity-70 brightness-75 contrast-170"
                        buttonZIndex="z-[5]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40 pointer-events-none" />
                </>
            ),
            className: "lg:col-start-2 lg:col-end-3 lg:row-start-4 lg:row-end-7",
        },
        {
            Icon: TicketIcon,
            nameKey: 'evento4.name',
            name: texts['evento4.name'] || "Concierto Benéfico",
            descKey: 'evento4.description',
            description: texts['evento4.description'] || "Música con causa. Únete a nosotros.",
            fechaKey: 'evento4.fecha',
            fecha: texts['evento4.fecha'] || "22 Febrero 2025",
            lugarKey: 'evento4.lugar',
            lugar: texts['evento4.lugar'] || "Teatro Principal",
            href: "/contact",
            cta: "Participar",
            background: (
                <>
                    <EditableImageWithButton
                        mediaKey={photos[3].key}
                        initialUrl={photos[3].src}
                        alt={photos[3].alt}
                        className="absolute inset-0 w-full h-full object-cover opacity-70 brightness-75 contrast-170"
                        buttonZIndex="z-[5]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/20 pointer-events-none" />
                </>
            ),
            className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-7",
        },
        {
            Icon: Music,
            nameKey: 'eventos.description.only',
            name: "",
            descKey: 'eventos.logo.description',
            description: texts['eventos.logo.description'] || "Tu banda de confianza",
            fechaKey: 'eventos.description.fecha',
            fecha: "",
            lugarKey: 'eventos.description.lugar',
            lugar: "",
            href: "#",
            cta: "",
            background: <></>,
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-4 lg:row-end-5",
        },
        {
            Icon: Music,
            nameKey: 'eventos.logo.name',
            name: texts['eventos.logo.name'] || "Puma's Band",
            descKey: 'eventos.logo.description2',
            description: texts['eventos.logo.description2'] || "",
            fechaKey: 'eventos.logo.fecha',
            fecha: texts['eventos.logo.fecha'] || "",
            lugarKey: 'eventos.logo.lugar',
            lugar: texts['eventos.logo.lugar'] || "",
            href: "#",
            cta: "",
            background: (
                <>
                    <img
                        src="/logo.png"
                        alt="Puma's Band Logo"
                        className="w-32 h-32 object-contain "
                    />

                </>
            ),
            className: "lg:col-start-1 lg:col-end-2 lg:row-start-5 lg:row-end-7",
        },


    ];

    return (
        <Section>
            <div className="mb-8 text-center">
                <EditableText
                    textKey="eventos.title"
                    initialContent={texts['eventos.title'] || "Nuestros Eventos"}
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                    tag="h2"
                />
                <EditableText
                    textKey="eventos.subtitle"
                    initialContent={texts['eventos.subtitle'] || "No te pierdas nuestras presentaciones"}
                    className="text-xl text-gray-600"
                    tag="p"
                />
            </div>

            <BentoGrid className="lg:grid-rows-6 h-full text-white">
                {eventos.map((evento, idx) => {
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
                            <div
                                key={idx}
                                className={`hover:bg-linear-to-br hover:from-black/90 hover:to-black/90 transition duration-300 hover:border-4 hover:border-amber-500 bg-linear-to-br from-amber-600 to-amber-700 group relative col-span-3 flex flex-col justify-center items-center overflow-hidden rounded-4xl border border-white/10 shadow-lg ${evento.className}`}
                            >
                                <div className="relative z-10 flex items-center justify-center gap-4 p-4">
                                    <div className="flex items-center justify-center">{evento.background}</div>

                                    <div className="flex flex-col">
                                        <EditableText
                                            textKey={evento.nameKey}
                                            initialContent={evento.name}
                                            className="text-6xl font-extrabold text-white"
                                            tag="h3"
                                        />

                                    </div>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={idx}
                            className={`group relative col-span-3 flex flex-col justify-end overflow-hidden rounded-xl border border-white/10 shadow-lg ${evento.className}`}
                        >
                            <div className="absolute inset-0">{evento.background}</div>
                            <div className="relative p-4 z-10 group-hover:-translate-y-10 transition-all duration-300">
                                <div className="flex transform-gpu flex-col gap-1 transition-all duration-300 ">
                                    <evento.Icon className="h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out " />
                                    <EditableText
                                        textKey={evento.nameKey}
                                        initialContent={evento.name}
                                        className="text-xl font-semibold"
                                        tag="h3"
                                    />
                                    <EditableText
                                        textKey={evento.descKey}
                                        initialContent={evento.description}
                                        className="max-w-lg"
                                        tag="p"
                                    />
                                </div>

                                <div className="lg:hidden flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 mt-4">
                                    <a
                                        href={evento.href}
                                        className="text-white hover:underline "
                                    >
                                        {evento.cta}
                                    </a>
                                </div>
                            </div>

                            <div className="hidden  lg:flex absolute bottom-0 w-full translate-y-10 transform-gpu flex-row items-center p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                                <a
                                    href={evento.href}
                                    className="text-white underline hover:text-amber-400"
                                >
                                    {evento.cta}
                                </a>
                            </div>

                            <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03]" />
                        </div>
                    );
                })}
            </BentoGrid>
        </Section>
    );
}
