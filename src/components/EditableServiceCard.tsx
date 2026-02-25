import EditableText from './EditableText';
import EditableImageWithButton from './EditableImageWithButton';

interface EditableServiceCardProps {
    nameKey: string;
    descKey: string;
    imageKey: string;
    name: string;
    description: string;
    imageUrl?: string;
    className?: string;
}

export default function EditableServiceCard({
    nameKey,
    descKey,
    imageKey,
    name,
    description,
    imageUrl = '',
    className = ''
}: EditableServiceCardProps) {

    return (
        <div
            className={`min-h-[300px] flex flex-col relative rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden justify-end items-end ${className}`}
            style={{
                backgroundColor: imageUrl ? 'transparent' : '#5c0202',
            }}
        >
            {/* Imagen de fondo editable */}

            <div className="absolute inset-0">
                <EditableImageWithButton
                    mediaKey={imageKey}
                    initialUrl={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                    buttonZIndex="z-99"
                />
                {/* Overlay para mejorar legibilidad del texto */}
                <div className="absolute inset-0 bg-black/50 z-0"></div>
            </div>


            {/* Contenido de la card */}
            <div className="relative z-0 p-8 text-center">
                <EditableText
                    textKey={nameKey}
                    initialContent={name}
                    className="text-2xl font-bold mb-2 text-white"
                    tag="h3"
                />
                <EditableText
                    textKey={descKey}
                    initialContent={description}
                    className="text-gray-200"
                    tag="p"
                />
            </div>
        </div>
    );
}
