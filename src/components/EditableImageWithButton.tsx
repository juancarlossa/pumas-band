import { useState, useRef } from 'react';
import { Upload, Edit } from 'lucide-react';

interface EditableImageWithButtonProps {
    mediaKey: string;
    initialUrl: string;
    alt?: string;
    className?: string;
    onAltChange?: (newAlt: string) => void;
    buttonZIndex?: string;
}

export default function EditableImageWithButton({
    mediaKey,
    initialUrl,
    alt = '',
    className = '',
    onAltChange,
    buttonZIndex = 'z-20'
}: EditableImageWithButtonProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [imageUrl, setImageUrl] = useState(initialUrl);
    const [altText, setAltText] = useState(alt);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const altInputRef = useRef<HTMLInputElement>(null);

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona un archivo de imagen válido');
            return;
        }

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
            formData.append('alt_text', altText);

            const response = await fetch('/api/media/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir la imagen');
            }

            const data = await response.json();
            setImageUrl(data.url);
            if (onAltChange) {
                onAltChange(altText);
            }
            setIsEditing(false);

            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al subir la imagen. Intenta de nuevo.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSaveAltOnly = async () => {
        if (altText === alt) {
            setIsEditing(false);
            return;
        }

        setIsUploading(true);
        try {
            const response = await fetch(`/api/media/${mediaKey}/alt`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ alt_text: altText }),
            });

            if (!response.ok) {
                throw new Error('Error al actualizar alt text');
            }

            if (onAltChange) {
                onAltChange(altText);
            }
            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el texto alternativo.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleCancel = () => {
        setAltText(alt);
        setIsEditing(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    if (isEditing) {
        return (
            <div className="relative w-full h-full">
                <img
                    src={imageUrl}
                    alt={alt}
                    className={`${className} opacity-30`}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md z-50">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">
                            Editar imagen
                        </h3>

                        {/* Campo de texto alternativo */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Texto alternativo (alt)
                            </label>
                            <input
                                ref={altInputRef}
                                type="text"
                                value={altText}
                                onChange={(e) => setAltText(e.target.value)}
                                className="w-full border-2 border-gray-300 rounded px-3 py-2 text-sm"
                                disabled={isUploading}
                                placeholder="Descripción de la imagen"
                            />
                        </div>

                        {/* Selector de archivo */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id={`file-${mediaKey}`}
                            disabled={isUploading}
                        />

                        <div className="flex gap-2 mb-2">
                            <label
                                htmlFor={`file-${mediaKey}`}
                                className={`flex items-center gap-2 bg-gradient-to-r from-indigo-800 to-purple-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Upload size={18} />
                                {isUploading ? 'Subiendo...' : 'Cambiar imagen'}
                            </label>
                            <button
                                onClick={handleSaveAltOnly}
                                disabled={isUploading}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors disabled:opacity-50"
                            >
                                Guardar alt
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isUploading}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                        </div>
                        <p className="text-xs text-gray-500">
                            Máximo 10MB. Formatos: JPG, PNG, WEBP, GIF
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            <img
                src={imageUrl}
                alt={altText}
                className={className}
            />
            {/* Botón de edición siempre visible en el centro */}
            <button
                onClick={handleEditClick}
                className={`cursor-pointer absolute top-15 left-1/2 -translate-x-1/2 -translate-y-1/2 ${buttonZIndex} bg-gradient-to-r from-indigo-800 to-purple-800 hover:to-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors`}
                title="Editar imagen"
            >
                <div className="flex items-center gap-2">
                    Cambiar imagen
                    <Edit size={24} />
                </div>
            </button>
        </div>
    );
}
