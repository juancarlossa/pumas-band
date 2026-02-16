import { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
    textKey: string;
    initialContent: string;
    className?: string;
    tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function EditableText({
    textKey,
    initialContent,
    className = '',
    tag: Tag = 'p'
}: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState(initialContent);
    const [isSaving, setIsSaving] = useState(false);
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleDoubleClick = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (content === initialContent) {
            setIsEditing(false);
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch(`/api/texts/${textKey}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content }),
            });

            if (response.ok) {
                setIsEditing(false);
                window.location.reload();
            } else {
                alert('Error al guardar el texto');
                setContent(initialContent);
            }
        } catch (error) {
            alert('Error de conexión');
            setContent(initialContent);
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setContent(initialContent);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    if (isEditing) {
        const isMultiline = content.length > 50;

        return (
            <div className="relative inline-block w-full">
                {isMultiline ? (
                    <textarea
                        ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`${className} border-2 border-blue-500 rounded px-2 py-1 w-full`}
                        rows={3}
                        disabled={isSaving}
                    />
                ) : (
                    <input
                        ref={inputRef as React.RefObject<HTMLInputElement>}
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className={`${className} border-2 border-blue-500 rounded px-2 py-1 w-full`}
                        disabled={isSaving}
                    />
                )}
                <div className="flex gap-2 mt-2">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 disabled:opacity-50"
                    >
                        {isSaving ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button
                        onClick={handleCancel}
                        disabled={isSaving}
                        className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <Tag
            onDoubleClick={handleDoubleClick}
            className={`${className} cursor-pointer hover:bg-gradient-to-r from-indigo-400 to-purple-400 hover:bg-opacity-30 transition-colors rounded px-1`}
            title="Doble click para editar"
        >
            {content}
        </Tag>
    );
}
