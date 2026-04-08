import { Title } from "../juankui/Title";
import { Section } from "../juankui/Section";
import { ServicesMagicBento } from "./ServicesMagicBento";
import { ContactForm } from "../juankui/ContactForm";

interface ServicesProps {
    texts?: Record<string, string>;
    media?: Record<string, { url: string; type: string; alt?: string }>;
}

export function Services({ texts = {}, media = {} }: ServicesProps) {
    const servicePacks = [
        {
            title: texts['service.pack1.name'] || "Eventos Privados",
            description: texts['service.pack1.description'] || "Energía pura que transforma cualquier celebración en una experiencia inolvidable. Ritmo, color y diversión sin límites para hacer vibrar a todos tus invitados.",
            label: "Privado",
            backgroundImage: media['service.pack1.image']?.url,
        },
        {
            title: texts['service.pack2.name'] || "Fiestas populares",
            description: texts['service.pack2.description'] || "Sofisticación musical que eleva la atmósfera de tu evento. Sonidos refinados y presencia escénica impecable para ocasiones que merecen distinción.",
            label: "Popular",
            backgroundImage: media['service.pack2.image']?.url,
        },
        {
            title: texts['service.pack3.name'] || "Tardeos",
            description: texts['service.pack3.description'] || "La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el 'sí quiero' hasta el último baile.",
            label: "Tardeo",
            backgroundImage: media['service.pack3.image']?.url,
        },
        {
            title: texts['service.pack4.name'] || "Bodas",
            description: texts['service.pack4.description'] || "La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el 'sí quiero' hasta el último baile.",
            label: "Boda",
            backgroundImage: media['service.pack4.image']?.url,
        },
        {
            title: texts['service.pack5.name'] || "Comidas de empresa",
            description: texts['service.pack5.description'] || "La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el 'sí quiero' hasta el último baile.",
            label: "Empresa",
            backgroundImage: media['service.pack5.image']?.url,
        },
        {
            title: texts['service.pack6.name'] || "Conciertos de Big Band",
            description: texts['service.pack6.description'] || "La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el 'sí quiero' hasta el último baile.",
            label: "Big Band",
            backgroundImage: media['service.pack6.image']?.url,
        }
    ];

    return (
        <Section className="">
            <div className="container mx-auto px-4">
                {/*
               
                <div className="text-center mb-8">
                    <Title
                        title={texts['services.title'] || "Contratación"}
                        subtitle={texts['services.subtitle'] || "Cada evento es distinto, por eso adaptamos el formato, la duración y el presupuesto según el tipo de contratación, número de músicos y localización."}
                    />
                </div>

                
                <ServicesMagicBento
                    cards={servicePacks}
                    textAutoHide={true}
                    enableStars={true}
                    enableSpotlight={true}
                    enableBorderGlow={true}
                    enableTilt={false}
                    clickEffect={true}
                    enableMagnetism={true}
                    glowColor="251, 191, 36"
                />
*/}
                {/* Call to Action Section */}
                <div id="contact" className="bg-linear-to-br from-slate-900 via-gray-900 to-black rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-500/20">
                    <div className="text-center mb-8">
                        <h3 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-5">
                            {texts['services.cta.title'] || "Contratación"}
                        </h3>
                        <div className="w-24 h-1 bg-linear-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-6"></div>
                        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
                            {texts['services.cta.description'] || "Diseñamos experiencias musicales únicas que se ajustan a tu estilo, ambiente y presupuesto. Cada evento merece su propia banda sonora especial."}
                        </p>
                    </div>

                    <ContactForm texts={texts} />
                </div>
            </div>
        </Section>
    );
}