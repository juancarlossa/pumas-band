
import { Title } from "../juankui/Title";
import { Section } from "../juankui/Section";
import { ButtonCta, ButtonGhost } from "../juankui/Buttons";
import { CheckIcon } from "lucide-react";

const servicePacks = [
    {
        name: "Pack Charanga",
        price: "x€",
        description: "Energía pura que transforma cualquier celebración en una experiencia inolvidable. Ritmo, color y diversión sin límites para hacer vibrar a todos tus invitados.",
        popular: true,
        features: [
            "Formación completa de 12+ artistas profesionales",
            "Espectáculo móvil e interactivo sin barreras",
            "Catálogo musical ecléctico: pop, rock, latinos y clásicos",
            "Animación participativa que involucra al público",
            "Performance continua con transiciones seamless",
            "Actuación base de 2.5 horas + extensiones disponibles",
            "Adaptación total al timing de tu evento",
            "Satisfacción garantizada o devolución completa del importe"
        ],
        buttonText: "Reservar ahora",
        buttonVariant: "primary"
    },
    {
        name: "Pack Charanga Pro",
        price: "x€",
        description: "Sofisticación musical que eleva la atmósfera de tu evento. Sonidos refinados y presencia escénica impecable para ocasiones que merecen distinción.",
        popular: false,
        features: [
            "Ensemble selecto de 10+ músicos virtuosos",
            "Puesta en escena clásica con instrumentación completa",
            "Repertorio jazz, swing, bossa nova y standards internacionales",
            "Ambiente sonoro envolvente y elegante",
            "Banda sonora perfecta para networking y conversación",
            "Sesiones de 2 horas con posibilidad de ampliación",
            "Flexibilidad horaria según protocolo del evento",
            "Compromiso de excelencia con garantía de satisfacción"
        ],
        buttonText: "Consultar disponibilidad",
        buttonVariant: "secondary"
    },
    {
        name: "Pack Ceremonia",
        price: "x€",
        description: "La banda sonora perfecta para el día más importante de vuestras vidas. Música que acompaña cada momento mágico desde el 'sí quiero' hasta el último baile.",
        popular: false,
        features: [
            "Orquesta especializada de 15+ músicos expertos en bodas",
            "Ceremonial musical completo para cada fase de la boda",
            "Repertorio romántico personalizado según vuestros gustos",
            "Coordinación perfecta con wedding planner y protocolo",
            "Cobertura musical desde ceremonia hasta celebración",
            "Duración extendida hasta 4 horas incluidas",
            "Horarios personalizados según cronograma nupcial",
            "Experiencia premium con garantía de día perfecto"
        ],
        buttonText: "Crear propuesta",
        buttonVariant: "premium"
    }
];

export function Services() {
    return (
        <Section className="bg-gradient-to-b from-gray-50 to-white">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <Title
                        title="Nuestros Packs Musicales"
                        subtitle="Encuentra la propuesta perfecta que haga de tu evento una experiencia única e irrepetible"
                    />
                </div>

                {/* Service Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {servicePacks.map((pack, index) => (
                        <div
                            key={pack.name}
                            className={`relative rounded-2xl p-8 shadow-lg transition-all duration-300 hover:shadow-xl ${pack.popular
                                ? 'bg-white border-2 border-amber-400 transform scale-105'
                                : pack.buttonVariant === 'premium'
                                    ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white'
                                    : 'bg-white border border-gray-200'
                                }`}
                        >
                            {pack.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <span className="bg-amber-400 text-black px-4 py-2 rounded-full text-sm font-semibold">
                                        Más popular
                                    </span>
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className={`text-2xl font-bold mb-2 ${pack.buttonVariant === 'premium' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {pack.name}
                                </h3>
                                <div className={`text-4xl font-bold mb-4 ${pack.buttonVariant === 'premium' ? 'text-white' : 'text-gray-900'
                                    }`}>
                                    {pack.price}
                                </div>
                                <p className={`text-sm leading-relaxed ${pack.buttonVariant === 'premium' ? 'text-gray-300' : 'text-gray-600'
                                    }`}>
                                    {pack.description}
                                </p>
                            </div>

                            <div className="space-y-4 mb-8">
                                {pack.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-start gap-3">
                                        <CheckIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${pack.buttonVariant === 'premium' ? 'text-amber-400' : 'text-green-500'
                                            }`} />
                                        <span className={`text-sm ${pack.buttonVariant === 'premium' ? 'text-gray-300' : 'text-gray-700'
                                            }`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${pack.popular
                                    ? 'bg-amber-500 text-white hover:bg-amber-600'
                                    : pack.buttonVariant === 'premium'
                                        ? 'bg-white text-slate-900 hover:bg-gray-100'
                                        : 'bg-red-500 text-white hover:bg-red-600'
                                    }`}
                            >
                                {pack.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Call to Action Section */}
                <div className="text-center bg-gradient-to-br from-slate-900 via-gray-900 to-black rounded-3xl p-12 shadow-2xl">
                    <h3 className="text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-5">
                        ¿Listo para crear momentos mágicos?
                    </h3>
                    <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-8"></div>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Diseñamos experiencias musicales únicas que se ajustan a tu estilo, ambiente y presupuesto. Cada evento merece su propia banda sonora especial.
                    </p>
                    <ButtonCta>Contactar</ButtonCta>
                </div>
            </div>
        </Section>
    );
}