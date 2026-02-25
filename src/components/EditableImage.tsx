import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface EditableImageProps {
    mediaKey: string;
    initialUrl: string;
    alt?: string;
    className?: string;
}

export default function EditableImage({
    mediaKey,
    initialUrl,
    alt = '',
    className = ''
}: EditableImageProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState(initialUrl);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido');
            return;
        }

        // Validar tamaño (máximo 10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('La imagen es demasiado grande. Máximo 10MB');
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('key', mediaKey);
            formData.append('type', 'image');

            const response = await fetch('/api/media/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Error del servidor:', data);
                throw new Error(data.details || data.error || 'Error al subir la imagen');
            }

            setImageUrl(data.url);
            setIsEditing(false);

            // Recargar la página para mostrar la nueva imagen
            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error('Error completo:', error);
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
            alert(`Error al subir la imagen: ${errorMessage}`);
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (isEditing) {
        return (
            <div className="relative inline-block">
                <img
                    src={imageUrl}
                    alt={alt}
                    className={`${className} opacity-50`}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">
                            Cambiar imagen
                        </h3>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id={`file-${mediaKey}`}
                            disabled={isUploading}
                        />
                        <div className="flex gap-3">
                            <label
                                htmlFor={`file-${mediaKey}`}
                                className={`flex items-center gap-2 bg-gradient-to-r from-indigo-800 to-purple-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Upload size={18} />
                                {isUploading ? 'Subiendo...' : 'Seleccionar'}
                            </label>
                            <button
                                onClick={handleCancel}
                                disabled={isUploading}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Máximo 10MB. Formatos: JPG, PNG, WEBP, GIF
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="relative inline-block w-full h-full"
            onDoubleClick={handleDoubleClick}
            title="Doble click para cambiar imagen"
        >
            <img
                src={imageUrl}
                alt={alt}
                className={`${className} cursor-pointer hover:ring-4 hover:ring-yellow-400 hover:ring-offset-2 transition-all pointer-events-none`}
            />
            <div className="absolute inset-0 z-10 cursor-pointer hover:bg-yellow-400/10 transition-colors" />
        </div>
    );
}
