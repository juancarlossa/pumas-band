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
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('video/')) {
            alert('Por favor selecciona un archivo de video válido');
            return;
        }

        if (file.size > 200 * 1024 * 1024) {
            alert('El video es demasiado grande. Máximo 200MB');
            return;
        }

        setIsUploading(true);
        setProgress(0);

        try {
            // 1. Pedir firma al servidor
            const signRes = await fetch('/api/media/sign-upload', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mediaKey }),
            });
            if (!signRes.ok) throw new Error('Error al obtener firma');
            const { timestamp, signature, folder, public_id, api_key, cloud_name } = await signRes.json();

            // 2. Subir directamente a Cloudinary con progreso via XHR
            const formData = new FormData();
            formData.append('file', file);
            formData.append('timestamp', timestamp);
            formData.append('signature', signature);
            formData.append('api_key', api_key);
            formData.append('folder', folder);
            formData.append('public_id', public_id);

            const uploadUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`;

            const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', uploadUrl);

                xhr.upload.onprogress = (e) => {
                    if (e.lengthComputable) {
                        setProgress(Math.round((e.loaded / e.total) * 100));
                    }
                };

                xhr.onload = () => {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        reject(new Error(`Cloudinary error: ${xhr.status}`));
                    }
                };

                xhr.onerror = () => reject(new Error('Error de red'));
                xhr.send(formData);
            });

            // 3. Guardar URL en la base de datos
            await fetch('/api/media/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    key: mediaKey,        // ← era mediaKey
                    url: result.secure_url,
                    type: file.type,      // ← era mediaType
                    // alt_text: null     // opcional, añádelo si lo necesitas
                }),
            });

            setVideoUrl(result.secure_url);
            setIsEditing(false);
            setTimeout(() => window.location.reload(), 500);

        } catch (error) {
            console.error('Error:', error);
            alert('Error al subir el video. Intenta de nuevo.');
        } finally {
            setIsUploading(false);
            setProgress(0);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    if (isEditing) {
        return (
            <div className="relative w-full h-full">
                <video ref={videoRef} src={videoUrl} className={`${className} opacity-30`} muted playsInline />
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm z-50">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900">Cambiar video</h3>

                        {isUploading ? (
                            <div className="space-y-3">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <p className="text-sm text-center text-gray-600">
                                    Subiendo... {progress}%
                                </p>
                            </div>
                        ) : (
                            <>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileSelect}
                                    className="hidden"
                                    id={`file-${mediaKey}`}
                                />
                                <div className="flex gap-3">
                                    <label
                                        htmlFor={`file-${mediaKey}`}
                                        className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
                                    >
                                        <Upload size={18} />
                                        Seleccionar
                                    </label>
                                    <button
                                        onClick={handleCancel}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Máximo 200MB. Formatos: MP4, WEBM, MOV
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            <video ref={videoRef} src={videoUrl} className={className} autoPlay loop muted playsInline />
            <button
                onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
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