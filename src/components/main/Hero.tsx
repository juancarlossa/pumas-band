import { useEffect, useRef, useState } from "react";
import { ButtonCta, ButtonGhost } from "../juankui/Buttons";
const videos = [
    { src: "/videos/IMG_0056.webm", cols: 3 },
    { src: "/videos/IMG_0068.webm", cols: 2 },
    { src: "/videos/IMG_0083.webm", cols: 2 },
    { src: "/videos/IMG_0505.webm", cols: 3 },
    //{ src: "/videos/IMG_0552.webm", cols: 3 },
    //{ src: "/videos/IMG_2577.webm", cols: 2 },
    //{ src: "/videos/IMG_2583.webm", cols: 2 },
    //{ src: "/videos/IMG_2632.webm", cols: 3 },
];

const socialLinks = [
    { name: "Instagram", href: "#", icon: "i-mdi-instagram" },
    { name: "Facebook", href: "#", icon: "i-mdi-facebook" },
    { name: "WhatsApp", href: "#", icon: "i-mdi-whatsapp" },
];

export function Hero() {
    const [currentVideo, setCurrentVideo] = useState(0);
    const videoRefs = useRef<(HTMLVideoElement | undefined)[]>([]);

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
            <div className="absolute inset-0">
                <div className="grid grid-cols-5 grid-rows-2 gap-4 w-full mx-auto p-2">
                    {
                        videos.map((video, index) => (
                            <div
                                key={index}
                                className={`relative overflow-hidden group w-full h-[50vh] rounded-lg shadow-lg ${video.cols === 2 ? 'col-span-2' :
                                    video.cols === 3 ? 'col-span-3' :
                                        video.cols === 4 ? 'col-span-4' : 'col-span-1'
                                    }`}
                            >
                                <video
                                    ref={(el) => {
                                        if (el) {
                                            videoRefs.current[index] = el;
                                        }
                                    }}
                                    className="h-full w-full object-cover transform  transition-transform duration-300"
                                    muted
                                    loop
                                    autoPlay
                                    playsInline
                                    preload="auto"
                                    data-video-index={index}
                                >
                                    <source src={video.src} type="video/webm" />
                                </video>
                            </div>
                        ))
                    }
                </div>
            </div>


            <div
                className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"
            >
            </div>

            <div
                className="relative z-10 flex items-center justify-center min-h-screen px-4"
            >
                <div className="text-center max-w-4xl mx-auto">
                    <div className="space-y-6 mb-12">
                        <h1
                            className="text-6xl md:text-8xl font-bold text-white tracking-tight animate-fade-up"
                        >
                            Puma's Band
                        </h1>
                        <p
                            className="text-xl md:text-3xl text-white/90 leading-relaxed animate-fade-up animation-delay-100"
                        >
                            Música en vivo que hace vibrar tus eventos
                        </p>
                    </div>

                    <div
                        className="flex flex-col sm:flex-row gap-6 justify-center mb-12 animate-fade-up animation-delay-200"
                    >
                        <ButtonCta>Contáctanos</ButtonCta>
                        <ButtonGhost>Ver Repertorio</ButtonGhost>
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




