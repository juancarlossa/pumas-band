import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { sectionHeight } from "../../consts"
import { Title } from "./Title";
import { Section } from "./Section";

interface CarouselFullProps {
    texts?: Record<string, string>;
    media?: Record<string, { url: string; type: string; alt?: string }>;
}

const defaultPhotos = [
    { src: "/fotos/IMG_4847.webp", alt: "Puma's Band - Foto 1", key: "gallery.photo1" },
    { src: "/fotos/IMG_4851.webp", alt: "Puma's Band - Foto 2", key: "gallery.photo2" },
    { src: "/fotos/IMG_6101.webp", alt: "Puma's Band - Foto 3", key: "gallery.photo3" },
    { src: "/fotos/IMG_2546.webp", alt: "Puma's Band - Foto 4", key: "gallery.photo4" },
    { src: "/fotos/IMG_2562.webp", alt: "Puma's Band - Foto 5", key: "gallery.photo5" },
    { src: "/fotos/IMG_2589.webp", alt: "Puma's Band - Foto 6", key: "gallery.photo6" },
    { src: "/fotos/IMG_2647.webp", alt: "Puma's Band - Foto 7", key: "gallery.photo7" },
    { src: "/fotos/IMG_2665.webp", alt: "Puma's Band - Foto 8", key: "gallery.photo8" },
    { src: "/fotos/IMG_4341.webp", alt: "Puma's Band - Foto 9", key: "gallery.photo9" },
    { src: "/fotos/IMG_4831.webp", alt: "Puma's Band - Foto 10", key: "gallery.photo10" },
    { src: "/fotos/IMG_7747.webp", alt: "Puma's Band - Foto 11", key: "gallery.photo11" },
    { src: "/fotos/IMG_8775.webp", alt: "Puma's Band - Foto 12", key: "gallery.photo12" },
    { src: "/fotos/IMG_9836.webp", alt: "Puma's Band - Foto 13", key: "gallery.photo13" },
    { src: "/fotos/IMG_9912.webp", alt: "Puma's Band - Foto 14", key: "gallery.photo14" },
];

export function CarouselFull({ texts = {}, media = {} }: CarouselFullProps) {
    const photos = defaultPhotos.map(p => ({
        ...p,
        src: media[p.key]?.url || p.src,
        alt: media[p.key]?.alt || p.alt
    }));
    return (
        <Section className={cn("w-full mx-auto px-4")}>
            <div className="text-center">
                <Title
                    title={texts['gallery.title'] || "Galería de Fotos"}
                    subtitle={texts['gallery.subtitle'] || "Momentos únicos de Puma's Band"}
                />
            </div>

            <div className="group/container">
                <Carousel className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {photos.map((photo, index) => (
                            <CarouselItem key={index} className="py-4 pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                                <div className="relative group overflow-hidden rounded-lg shadow-lg bg-black/20 lg:backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-has-[:hover]/container:lg:blur-sm lg:hover:!blur-none">
                                    <div className="aspect-square">
                                        <img
                                            src={photo.src}
                                            alt={photo.alt}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="absolute bottom-0 flex flex-col justify-center items-center text-center p-10">
                                            <h3 className="text-white text-4xl font-bold mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                                {photo.alt}
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 bg-black/50 border-white/20 text-white hover:bg-black/70" />
                    <CarouselNext className="right-2 bg-black/50 border-white/20 text-white hover:bg-black/70" />
                </Carousel>
            </div>
        </Section>
    );
};
