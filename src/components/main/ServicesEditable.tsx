import { Section } from "../juankui/Section";
import EditableText from "../EditableText";
import EditableServiceCard from "../EditableServiceCard";
import { ContactFormEditable } from "../juankui/ContactFormEditable";

interface ServicesEditableProps {
    texts?: Record<string, string>;
    media?: Record<string, { url: string; type: string; alt?: string }>;
}

export function ServicesEditable({ texts = {}, media = {} }: ServicesEditableProps) {
    const servicePacks = [
        {
            nameKey: 'service.pack1.name',
            name: texts['service.pack1.name'] || "Eventos Privados",
            descKey: 'service.pack1.description',
            description: texts['service.pack1.description'] || "Energía pura que transforma cualquier celebración en una experiencia inolvidable.",
        },
        {
            nameKey: 'service.pack2.name',
            name: texts['service.pack2.name'] || "Fiestas populares",
            descKey: 'service.pack2.description',
            description: texts['service.pack2.description'] || "Sofisticación musical que eleva la atmósfera de tu evento.",
        },
        {
            nameKey: 'service.pack3.name',
            name: texts['service.pack3.name'] || "Tardeos",
            descKey: 'service.pack3.description',
            description: texts['service.pack3.description'] || "La banda sonora perfecta para el día más importante de vuestras vidas.",
        },
        {
            nameKey: 'service.pack4.name',
            name: texts['service.pack4.name'] || "Bodas",
            descKey: 'service.pack4.description',
            description: texts['service.pack4.description'] || "Música que acompaña cada momento mágico desde el 'sí quiero' hasta el último baile.",
        },
        {
            nameKey: 'service.pack5.name',
            name: texts['service.pack5.name'] || "Comidas de empresa",
            descKey: 'service.pack5.description',
            description: texts['service.pack5.description'] || "Experiencias musicales para eventos corporativos.",
        },
        {
            nameKey: 'service.pack6.name',
            name: texts['service.pack6.name'] || "Conciertos de Big Band",
            descKey: 'service.pack6.description',
            description: texts['service.pack6.description'] || "El sonido clásico de una big band en vivo.",
        }
    ];

    return (
        <Section className="bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <EditableText
                        textKey="services.title"
                        initialContent={texts['services.title'] || "Contratación"}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                        tag="h2"
                    />
                    <EditableText
                        textKey="services.subtitle"
                        initialContent={texts['services.subtitle'] || "Cada evento es distinto, por eso adaptamos el formato, la duración y el presupuesto según el tipo de contratación, número de músicos y localización."}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                        tag="p"
                    />
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-2 gap-5">
                    {servicePacks.map((pack, index) => {
                        const imageKey = `service.pack${index + 1}.image`;
                        const imageUrl = media[imageKey]?.url || '';

                        return (
                            <EditableServiceCard
                                key={pack.nameKey}
                                nameKey={pack.nameKey}
                                descKey={pack.descKey}
                                imageKey={imageKey}
                                name={pack.name}
                                description={pack.description}
                                imageUrl={imageUrl}
                            />
                        );
                    })}
                </div>

                {/* Call to Action Section */}
                <div id="contact" className="bg-linear-to-br from-slate-900 via-gray-900 to-black rounded-3xl p-8 md:p-12 shadow-2xl border border-amber-500/20 mt-8">
                    <div className="text-center mb-8">
                        <EditableText
                            textKey="services.cta.title"
                            initialContent={texts['services.cta.title'] || "¿Listo para crear momentos mágicos?"}
                            className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-5"
                            tag="h3"
                        />
                        <div className="w-24 h-1 bg-linear-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-6"></div>
                        <EditableText
                            textKey="services.cta.description"
                            initialContent={texts['services.cta.description'] || "Diseñamos experiencias musicales únicas que se ajustan a tu estilo, ambiente y presupuesto. Cada evento merece su propia banda sonora especial."}
                            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto"
                            tag="p"
                        />
                    </div>

                    <ContactFormEditable texts={texts} />
                </div>
            </div>
        </Section>
    );
}
