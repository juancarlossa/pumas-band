import { useState, useRef, useEffect } from 'react';

interface EditableButtonProps {
    textKey: string;
    hrefKey: string;
    initialText: string;
    initialHref: string;
    className?: string;
    variant?: 'cta' | 'ghost' | 'default';
}

export default function EditableButton({
    textKey,
    hrefKey,
    initialText,
    initialHref,
    className = '',
    variant = 'default'
}: EditableButtonProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(initialText);
    const [href, setHref] = useState(initialHref);
    const [isSaving, setIsSaving] = useState(false);
    const textInputRef = useRef<HTMLInputElement>(null);
    const hrefInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && textInputRef.current) {
            textInputRef.current.focus();
            textInputRef.current.select();
        }
    }, [isEditing]);

    const handleDoubleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (text === initialText && href === initialHref) {
            setIsEditing(false);
            return;
        }

        setIsSaving(true);

        try {
            // Guardar texto del botón
            if (text !== initialText) {
                const textResponse = await fetch(`/api/texts/${textKey}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: text }),
                });

                if (!textResponse.ok) {
                    alert('Error al guardar el texto del botón');
                    setText(initialText);
                    setIsSaving(false);
                    return;
                }
            }

            // Guardar href del botón
            if (href !== initialHref) {
                const hrefResponse = await fetch(`/api/texts/${hrefKey}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: href }),
                });

                if (!hrefResponse.ok) {
                    alert('Error al guardar el enlace del botón');
                    setHref(initialHref);
                    setIsSaving(false);
                    return;
                }
            }

            setIsEditing(false);
            window.location.reload();
        } catch (error) {
            alert('Error de conexión');
            setText(initialText);
            setHref(initialHref);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setText(initialText);
        setHref(initialHref);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    if (isEditing) {
        return (
            <div className="inline-block">
                <div className="bg-white p-4 rounded-lg shadow-lg border-2 border-blue-500">
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Texto del botón
                            </label>
                            <input
                                ref={textInputRef}
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full border-2 border-gray-300 rounded px-3 py-2 text-sm"
                                disabled={isSaving}
                                placeholder="Texto del botón"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Enlace (href)
                            </label>
                            <input
                                ref={hrefInputRef}
                                type="text"
                                value={href}
                                onChange={(e) => setHref(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full border-2 border-gray-300 rounded px-3 py-2 text-sm"
                                disabled={isSaving}
                                placeholder="#contacto"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className="bg-green-500 text-white px-4 py-2 rounded text-sm hover:bg-green-600 disabled:opacity-50"
                            >
                                {isSaving ? 'Guardando...' : 'Guardar'}
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={isSaving}
                                className="bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600 disabled:opacity-50"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const handleClick = (e: React.MouseEvent) => {
        // Prevenir navegación en modo admin
        e.preventDefault();
    };

    return (
        <a
            href={href}
            onClick={handleClick}
            onDoubleClick={handleDoubleClick}
            className={`${className} cursor-pointer hover:ring-2 hover:ring-yellow-400 hover:ring-offset-2 transition-all rounded`}
            title="Doble click para editar botón"
        >
            {text}
        </a>
    );
}
