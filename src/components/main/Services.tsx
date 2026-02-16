import { Title } from "../juankui/Title";
import { Section } from "../juankui/Section";
import { ButtonCta, ButtonGhost } from "../juankui/Buttons";
import { CheckIcon } from "lucide-react";

interface ServicesProps {
    texts?: Record<string, string>;
}

export function Services({ texts = {} }: ServicesProps) {
    const servicePacks = [
        {
            name: texts['service.pack1.name'] || "Eventos Privados",
            description: texts['service.pack1.description'] || "Energía pura que transforma cualquier celebración en una experiencia inolvidable. Ritmo, color y diversión sin límites para hacer vibrar a todos tus invitados.",
            buttonText: texts['service.pack1.buttonText'] || "Reservar ahora",
        },
        {
            name: texts['service.pack2.name'] || "Fiestas populares",
            description: texts['service.pack2.description'] || "Sofisticación musical que eleva la atmósfera de tu evento. Sonidos refinados y presencia escénica impecable para ocasiones que merecen distinción.",
            buttonText: texts['service.pack2.buttonText'] || "Consultar disponibilidad",
        },
        {
            name: texts['service.pack3.name'] || "Tardeos",
            description: texts['service.pack3.description'] || "La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el 'sí quiero' hasta el último baile.",
            buttonText: texts['service.pack3.buttonText'] || "Crear propuesta",
        },
        {
            name: texts['service.pack4.name'] || "Bodas",
            description: texts['service.pack4.description'] || "La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el 'sí quiero' hasta el último baile.",
            buttonText: texts['service.pack4.buttonText'] || "Crear propuesta",
        },
        {
            name: texts['service.pack5.name'] || "Comidas de empresa",
            description: texts['service.pack5.description'] || "La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el 'sí quiero' hasta el último baile.",
            buttonText: texts['service.pack5.buttonText'] || "Crear propuesta",
        },
        {
            name: texts['service.pack6.name'] || "Conciertos de Big Band",
            description: texts['service.pack6.description'] || "La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el 'sí quiero' hasta el último baile.",
            buttonText: texts['service.pack6.buttonText'] || "Crear propuesta",
        }
    ];

    return (
        <Section className="bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Title
                        title={texts['services.title'] || "Contratación"}
                        subtitle={texts['services.subtitle'] || "Cada evento es distinto, por eso adaptamos el formato, la duración y el presupuesto según el tipo de contratación, número de músicos y localización."}
                    />
                </div>

                {/* Service Cards Grid */}
                <div className="grid grid-cols-2 gap-5">
                    {servicePacks.map((pack, index) => (
                        <div
                            key={pack.name}
                            className="relative rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl bg-white border border-gray-200"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                                    {pack.name}
                                </h3>
                                <p className="text-gray-600">
                                    {pack.description}
                                </p>
                            </div>

                            <ButtonCta>{pack.buttonText}</ButtonCta>
                        </div>
                    ))}
                </div>

                {/* Call to Action Section */}
                <div className="text-center bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl p-12 shadow-2xl">
                    <h3 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-5">
                        {texts['services.cta.title'] || "¿Listo para crear momentos mágicos?"}
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-8"></div>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        {texts['services.cta.description'] || "Diseñamos experiencias musicales únicas que se ajustan a tu estilo, ambiente y presupuesto. Cada evento merece su propia banda sonora especial."}
                    </p>
                    <a
                        href={texts['services.cta.button.href'] || "#contact"}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-block"
                    >
                        {texts['services.cta.button.text'] || "Contactar"}
                    </a>
                </div>
            </div>
        </Section>
    );
}