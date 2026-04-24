import { useState, useRef } from 'react';
import { Upload, Edit } from 'lucide-react';

interface EditableVideoWithButtonProps {
    mediaKey: string;
    initialUrl: string;
    className?: string;
}

export default function EditableVideoWithButton({
    mediaKey,
    initialUrl,
    className = ''
}: EditableVideoWithButtonProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [videoUrl, setVideoUrl] = useState(initialUrl);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsEditing(true);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            alert('Por favor selecciona un archivo de video válido');
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            alert('El video es demasiado grande. Máximo 50MB');
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('key', mediaKey);
            formData.append('type', file.type);

            const response = await fetch('/api/media/upload', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Error al subir el video');
            }

            const data = await response.json();
            setVideoUrl(data.url);
            setIsEditing(false);

            setTimeout(() => {
                window.location.reload();
            }, 500);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al subir el video. Intenta de nuevo.');
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
            <div className="relative w-full h-full">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className={`${className} opacity-30`}
                    muted
                    playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm z-50">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">
                            Cambiar video
                        </h3>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="video/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id={`file-${mediaKey}`}
                            disabled={isUploading}
                        />
                        <div className="flex gap-3">
                            <label
                                htmlFor={`file-${mediaKey}`}
                                className={`flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                            Máximo 50MB. Formatos: MP4, WEBM, MOV
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            <video
                ref={videoRef}
                src={videoUrl}
                className={className}
                autoPlay
                loop
                muted
                playsInline
            />
            {/* Botón de edición siempre visible en el centro */}
            <button
                onClick={handleEditClick}
                className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-gradient-to-r from-indigo-800 to-purple-800 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                title="Editar video"
            >
                <div className="flex items-center gap-2">
                    Cambiar video
                    <Edit size={24} />
                </div>
            </button>

        </div>
    );
}
