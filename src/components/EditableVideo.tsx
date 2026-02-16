import { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface EditableVideoProps {
    mediaKey: string;
    initialUrl: string;
    className?: string;
}

export default function EditableVideo({
    mediaKey,
    initialUrl,
    className = ''
}: EditableVideoProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [videoUrl, setVideoUrl] = useState(initialUrl);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar que sea un video
        if (!file.type.startsWith('video/')) {
            alert('Por favor selecciona un archivo de video válido');
            return;
        }

        // Validar tamaño (máximo 50MB)
        if (file.size > 50 * 1024 * 1024) {
            alert('El video es demasiado grande. Máximo 50MB');
            return;
        }

        setIsUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('key', mediaKey);
            formData.append('type', 'video');

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

            // Recargar la página para mostrar el nuevo video
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
            <div className="relative inline-block w-full h-full">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    className={`${className} opacity-50`}
                    muted
                    playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
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
        <div
            className="relative w-full h-full"
            onDoubleClick={handleDoubleClick}
            title="Doble click para cambiar video"
        >
            <video
                ref={videoRef}
                src={videoUrl}
                className={`${className} pointer-events-none`}
                autoPlay
                loop
                muted
                playsInline
            />
            <div className="absolute inset-0 z-10 cursor-pointer hover:bg-yellow-400/10 transition-colors" />
        </div>
    );
}
