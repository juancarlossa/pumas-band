import { useEffect, useRef, useState } from "react";
import { AnimatedButton } from "../ui/animated-button";
import { MagicCard } from "../ui/magic-card";
import { HeroMagicBento } from "./HeroMagicBento";
import { AvailabilityCalendar, type BandEvent } from "../ui/availability-calendar";
import type { CalendarEvent } from "@/lib/db";

interface HeroProps {
    texts?: Record<string, string>;
    media?: Record<string, { url: string; type: string; alt?: string }>;
    calendarEvents?: CalendarEvent[];
}

// Hook para detectar móvil
const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

const defaultVideos = [
    { src: "/videos/IMG_0056.webm", cols: 3, key: "hero.video1" },
    { src: "/videos/IMG_2632.webm", cols: 2, key: "hero.video2" },
    { src: "/videos/IMG_0083.webm", cols: 2, key: "hero.video3" },
    { src: "/videos/IMG_0505.webm", cols: 3, key: "hero.video4" },
];

const socialLinks = [
    { name: "Instagram", href: "#", icon: "i-mdi-instagram" },
    { name: "Facebook", href: "#", icon: "i-mdi-facebook" },
    { name: "WhatsApp", href: "#", icon: "i-mdi-whatsapp" },
];

export function Hero({ texts = {}, media = {}, calendarEvents = [] }: HeroProps) {
    const isMobile = useMobileDetection();

    // Combinar videos por defecto con los de la base de datos
    const videos = defaultVideos.map(v => ({
        ...v,
        src: media[v.key]?.url || v.src
    }));

    const [currentVideo, setCurrentVideo] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | undefined)[]>([]);

    // Convertir eventos de la DB al formato BandEvent
    const bandEvents: BandEvent[] = calendarEvents.map(event => ({
        date: new Date(event.event_date),
        isBusy: event.is_busy,
        titulo: event.titulo,
        descripcion: event.descripcion || ""
    }));

    useEffect(() => {
        videoRefs.current = Array.from({ length: videos.length }, () => undefined);
    }, []);

    // Cambiar video cada 8 segundos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideo((prev) => (prev + 1) % videos.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    // Asegurar autoplay en cada cambio
    useEffect(() => {
        const current = videoRefs.current[currentVideo];
        if (current) {
            current.play().catch((err) => {
                console.log("Video autoplay failed:", err);
            });
        }
    }, [currentVideo]);

    return (
        <section id="hero" className="relative w-full overflow-hidden">
            {/* Fondo optimizado según dispositivo */}
            {isMobile ? (
                // Fondo simple para móvil - solo un video estático sin efectos
                <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-30"
                    >
                        <source src={videos[0].src} type="video/webm" />
                    </video>
                </div>
            ) : (
                // Fondo completo con efectos para desktop
                <div className="absolute inset-0">
                    <HeroMagicBento
                        videos={videos}
                        videoRefs={videoRefs}
                        textAutoHide={false}
                        enableStars={true}
                        enableSpotlight={true}
                        enableBorderGlow={true}
                        enableTilt={false}
                        clickEffect={true}
                        enableMagnetism={true}
                        glowColor="251, 191, 36"
                    />
                </div>
            )}

            <div
                className="relative z-10 flex items-center justify-center min-h-screen px-4"
            >

                <MagicCard className="max-w-4xl py-1">
                    <div className="text-center mx-auto p-8">
                        <div className="space-y-6 mb-12">
                            <h1
                                className="text-6xl md:text-8xl font-bold text-white tracking-tight animate-fade-up"
                            >
                                {texts['hero.title'] || "Puma's Band"}
                            </h1>
                            <p
                                className="text-xl md:text-3xl text-white/90 leading-relaxed animate-fade-up animation-delay-100"
                            >
                                {texts['hero.subtitle'] || "Música en directo para eventos y todo tipo de fiestas"}
                            </p>
                        </div>

                        <div
                            className="flex flex-col sm:flex-row gap-6 justify-center  animate-fade-up animation-delay-200 "
                        >
                            <AnimatedButton
                                href={texts['hero.button1.href'] || "#contact"}
                                className='bg-linear-to-r from-amber-500 to-orange-600 text-white'
                                variant='default'
                                size='default'
                                glow={!isMobile}
                                textEffect='normal'
                                uppercase={true}
                                rounded='custom'
                                asChild={false}
                                hideAnimations={isMobile}
                                shimmerColor='#D53B3C'
                                shimmerSize='0.05em'
                                shimmerDuration='3s'
                                borderRadius='100px'
                                background='rgba(0, 0, 0, 0.8)'
                            >
                                {texts['hero.button1.text'] || "Contáctanos"}
                            </AnimatedButton>

                            <a
                                href={texts['hero.button2.href'] || "https://wa.me/123456789"}
                                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all duration-300 inline-block"
                            >
                                {texts['hero.button2.text'] || "WhatsApp"}
                            </a>
                        </div>

                        <div
                            className="flex justify-center gap-6 animate-fade-up animation-delay-300"
                        >
                            {
                                socialLinks.map((link) => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        className="text-white/80 hover:text-amber-500 transition-colors duration-300"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={link.name}
                                    >
                                        <i className={`${link.icon} text-2xl`} />
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </MagicCard>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <a
                        href="#about"
                        className="text-white/80 hover:text-amber-500 transition-colors duration-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};




