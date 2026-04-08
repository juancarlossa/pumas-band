import { Section } from "../juankui/Section";
import { Title } from "../juankui/Title";
import LogoSirfran from "../LogoSirfran";
import EditableText from "../EditableText";
import EditableImageWithButton from "../EditableImageWithButton";

interface NosotrosEditableProps {
    texts?: Record<string, string>;
    media?: Record<string, { url: string; type: string; alt?: string }>;
}

export function NosotrosEditable({ texts = {}, media = {} }: NosotrosEditableProps) {
    const features = [
        {
            key: 'nosotros.feature1',
            iconKey: 'nosotros.feature1.icon',
            icon: texts['nosotros.feature1.icon'] || "🎤",
            text: texts['nosotros.feature1'] || "Música 100% en directo"
        },
        {
            key: 'nosotros.feature2',
            iconKey: 'nosotros.feature2.icon',
            icon: texts['nosotros.feature2.icon'] || "🎶",
            text: texts['nosotros.feature2'] || "Repertorio adaptable al público"
        },
        {
            key: 'nosotros.feature3',
            iconKey: 'nosotros.feature3.icon',
            icon: texts['nosotros.feature3.icon'] || "🎉",
            text: texts['nosotros.feature3'] || "Experiencia en fiestas y eventos"
        },
        {
            key: 'nosotros.feature4',
            iconKey: 'nosotros.feature4.icon',
            icon: texts['nosotros.feature4.icon'] || "🤝",
            text: texts['nosotros.feature4'] || "Cercanía y trato directo"
        }
    ];

    return (
        <Section className="relative overflow-hidden py-">
            <div className="container mx-auto px-4 relative z-10">
                {/* Section Header */}
                <div className="text-center">
                    <div className="mb-12">
                        <EditableText
                            textKey="nosotros.title"
                            initialContent={texts['nosotros.title'] || "NOSOTROS"}
                            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent"
                            tag="h2"
                        />
                    </div>
                </div>

                {/* Main Content - Two Columns */}
                <div className="w-full mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12 items-stretch">
                        {/* Left Column - Description */}
                        <div className="lg:col-span-2 flex flex-col bg-linear-to-br from-slate-900/80 via-gray-900/80 to-black/80 backdrop-blur-sm rounded-2xl border border-amber-500/30 shadow-2xl hover:shadow-amber-500/20 transition-all duration-500">
                            <div className="relative flex-1 flex flex-col md:flex-row gap-4">
                                <div className="flex justify-between flex-col p-4 md:p-6 lg:p-8">
                                    <div className="absolute -top-4 -left-4 w-20 h-20 bg-linear-to-br from-amber-500 to-red-600 rounded-full blur-xl opacity-20"></div>
                                    <div className="text-sm md:text-base lg:text-xl text-gray-100 leading-relaxed relative z-10 flex-1">
                                        <span className="font-bold text-transparent bg-clip-text bg-linear-to-r from-amber-400 via-orange-400 to-red-400 text-xl md:text-2xl">PUMA'S BAND</span>{" "}
                                        <EditableText
                                            textKey="nosotros.description"
                                            initialContent={texts['nosotros.description'] || "nace en Monforte del Cid, Alicante en 2022 de la unión de músicos con experiencia en directo. Nos dedicamos a llevar la música allá donde vamos y crear el mejor ambiente en eventos privados, fiestas populares y todo tipo de celebraciones, adaptándonos a cada ocasión con gusto, cercanía y muchas ganas de hacer disfrutar al público."}
                                            className="text-lg md:text-xl text-gray-100 leading-relaxed inline"
                                            tag="span"
                                        />
                                    </div>
                                </div>
                                <div className="relative z-10 shrink-0 w-full md:w-auto">
                                    <EditableImageWithButton
                                        mediaKey="nosotros.image"
                                        initialUrl={media['nosotros.image']?.url || "/fotos/IMG_2546.webp"}
                                        alt={media['nosotros.image']?.alt || "Puma's Band"}
                                        className="h-48 md:h-full w-full md:w-auto md:max-w-[300px] lg:max-w-[400px] object-cover rounded-b-xl md:rounded-r-xl md:rounded-bl-none border-2 border-amber-500/30 shadow-lg"
                                        buttonZIndex="z-50"
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Right Column - Features */}
                        <div className="lg:col-span-1 flex flex-col">
                            <EditableText
                                textKey="nosotros.features.title"
                                initialContent={texts['nosotros.features.title'] || "¿Qué nos diferencia?"}
                                className="text-xl md:text-2xl lg:text-3xl text-center lg:text-end font-bold bg-linear-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent mb-4 md:mb-6 lg:mb-8 drop-shadow-lg"
                                tag="h3"
                            />
                            <div className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-5">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="group relative flex items-center gap-3 md:gap-4 bg-linear-to-r from-slate-900/90 via-gray-900/90 to-slate-800/90 backdrop-blur-sm p-4 md:p-5 lg:p-6 rounded-xl border border-amber-500/30 hover:border-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-amber-500/30"
                                    >
                                        {/* Glow effect on hover */}
                                        <div className="absolute inset-0 bg-linear-to-r from-amber-500/0 via-amber-500/5 to-red-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        <div className="relative z-10 flex items-center gap-3 md:gap-4 w-full">
                                            <EditableText
                                                textKey={feature.iconKey}
                                                initialContent={feature.icon}
                                                className="text-2xl md:text-3xl lg:text-4xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                                                tag="span"
                                            />
                                            <EditableText
                                                textKey={feature.key}
                                                initialContent={feature.text}
                                                className="text-sm md:text-base lg:text-lg text-gray-100 font-semibold group-hover:text-amber-100 transition-colors duration-300"
                                                tag="p"
                                            />
                                        </div>

                                        {/* Corner accent */}
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-linear-to-br from-amber-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
