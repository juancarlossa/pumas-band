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
            // 1. Obtener signature del servidor
            const signatureResponse = await fetch('/api/media/signature', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    folder: 'pumas-band',
                    public_id: mediaKey.replace(/\./g, '_'),
                }),
            });

            if (!signatureResponse.ok) {
                throw new Error('Error al obtener signature');
            }

            const { signature, timestamp, cloudName, apiKey } = await signatureResponse.json();

            // 2. Subir directamente a Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp.toString());
            formData.append('api_key', apiKey);
            formData.append('folder', 'pumas-band');
            formData.append('public_id', mediaKey.replace(/\./g, '_'));

            const uploadResponse = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );

            if (!uploadResponse.ok) {
                const errorData = await uploadResponse.json();
                console.error('Error de Cloudinary:', errorData);
                throw new Error(errorData.error?.message || 'Error al subir a Cloudinary');
            }

            const cloudinaryResult = await uploadResponse.json();

            // 3. Guardar en la base de datos
            const dbResponse = await fetch('/api/media/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    key: mediaKey,
                    url: cloudinaryResult.secure_url,
                    type: 'image',
                    alt_text: null,
                }),
            });

            if (!dbResponse.ok) {
                throw new Error('Error al guardar en la base de datos');
            }

            setImageUrl(cloudinaryResult.secure_url);
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
