import { Title } from "../juankui/Title";
import { Section } from "../juankui/Section";
import { ButtonCta } from "../juankui/Buttons";
import EditableText from "../EditableText";
import EditableButton from "../EditableButton";

interface ServicesEditableProps {
    texts?: Record<string, string>;
}

export function ServicesEditable({ texts = {} }: ServicesEditableProps) {
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
                    {servicePacks.map((pack) => (
                        <div
                            key={pack.nameKey}
                            className="relative rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl bg-white border border-gray-200"
                        >
                            <div className="text-center mb-6">
                                <EditableText
                                    textKey={pack.nameKey}
                                    initialContent={pack.name}
                                    className="text-2xl font-bold mb-2 text-gray-900"
                                    tag="h3"
                                />
                                <EditableText
                                    textKey={pack.descKey}
                                    initialContent={pack.description}
                                    className="text-gray-600"
                                    tag="p"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action Section */}
                <div className="text-center bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl p-12 shadow-2xl mt-8">
                    <EditableText
                        textKey="services.cta.title"
                        initialContent={texts['services.cta.title'] || "¿Listo para crear momentos mágicos?"}
                        className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-5"
                        tag="h3"
                    />
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-8"></div>
                    <EditableText
                        textKey="services.cta.description"
                        initialContent={texts['services.cta.description'] || "Diseñamos experiencias musicales únicas que se ajustan a tu estilo, ambiente y presupuesto."}
                        className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
                        tag="p"
                    />
                    <EditableButton
                        textKey="services.cta.button.text"
                        hrefKey="services.cta.button.href"
                        initialText={texts['services.cta.button.text'] || "Contactar"}
                        initialHref={texts['services.cta.button.href'] || "#contact"}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block"
                    />
                </div>
            </div>
        </Section>
    );
}
