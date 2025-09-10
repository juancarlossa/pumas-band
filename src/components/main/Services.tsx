
import { BentoCard, BentoGrid } from "../magicui/bento-grid";

// Services section for Los Camaradas Trío
const services = [
    {
        name: "Bodas Elegantes",
        description:
            "Música romántica y sofisticada para tu día especial. Desde la ceremonia hasta la recepción, creamos la atmósfera perfecta para celebrar vuestro amor.",

        href: "#bodas",
        cta: "Consultar desde €800",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 opacity-60" />
        ),
    },
    {
        name: "Eventos Corporativos",
        description:
            "Música profesional para conferencias, cenas de gala, presentaciones y celebraciones empresariales. Elegancia y distinción para tu empresa.",
        href: "#corporativo",
        cta: "Consultar desde €600",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-50 to-blue-100 opacity-60" />
        ),
    },
    {
        name: "Fiestas Privadas",
        description:
            "Celebraciones íntimas y especiales en tu hogar o venue privado. Aniversarios, cumpleaños y ocasiones únicas con música personalizada.",

        href: "#fiestas",
        cta: "Consultar desde €500",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-violet-50 to-purple-100 opacity-60" />
        ),
    },
    {
        name: "Conciertos Privados",
        description:
            "Experiencias musicales exclusivas en espacios íntimos. Repertorio clásico y contemporáneo adaptado a tus gustos musicales.",

        href: "#conciertos",
        cta: "Más Info desde €400",
        className: "col-span-3 lg:col-span-2",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-100 opacity-60" />
        ),
    },
    {
        name: "Grabaciones de Estudio",
        description:
            "Servicios de grabación profesional para proyectos musicales, bandas sonoras y composiciones personalizadas.",

        href: "#grabaciones",
        cta: "Consultar Precio",
        className: "col-span-3 lg:col-span-1",
        background: (
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-amber-50 to-orange-100 opacity-60" />
        ),
    },
];

export function Services() {
    return (
        <section
            id="services"
            className="relative py-24 bg-gradient-to-b from-white via-gray-50 to-amber-50 overflow-hidden"
        >
            {/* Background decorative elements */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute top-10 right-20 w-64 h-64 bg-amber-400 rounded-full blur-3xl animate-pulse"
                >
                </div>
                <div
                    className="absolute bottom-20 left-10 w-48 h-48 bg-orange-400 rounded-full blur-3xl animate-pulse delay-1000"
                >
                </div>
            </div>

            <div className="relative z-10 container mx-auto px-8">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2
                        className="text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-6"
                    >
                        Nuestros Servicios
                    </h2>
                    <div
                        className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mx-auto mb-8"
                    >
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Ofrecemos experiencias musicales únicas para cada ocasión
                        especial, adaptándonos a tus necesidades y creando momentos
                        inolvidables.
                    </p>
                </div>

                <BentoGrid className="mb-16">
                    {
                        services.map((service) => (
                            <BentoCard
                                key={service.name}
                                name={service.name}
                                description={service.description}
                                Icon={() => <span className="text-4xl">🎸</span>}
                                href={service.href}
                                cta={service.cta}
                                className={service.className}
                                background={service.background}
                            />
                        ))
                    }
                </BentoGrid>

                {/* Call to Action */}
                <div className="text-center">
                    <div
                        className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-12 shadow-2xl"
                    >
                        <h3 className="text-4xl font-bold text-white mb-6">
                            ¿Tienes un evento especial en mente?
                        </h3>
                        <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
                            Contáctanos para crear una propuesta personalizada que se
                            adapte perfectamente a tu visión y presupuesto.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
                            >
                                Solicitar Presupuesto
                            </button>
                            <button
                                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300"
                            >
                                Ver Portfolio
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom decorative elements */}
            <div
                className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-amber-50 to-transparent"
            >
            </div>
        </section>
    );
}