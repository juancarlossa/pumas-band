import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import EditableText from '../EditableText';

interface ContactFormEditableProps {
    texts?: Record<string, string>;
}

export function ContactFormEditable({ texts = {} }: ContactFormEditableProps) {
    const [state, handleSubmit] = useForm("mpqjkbob");

    if (state.succeeded) {
        return (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl">
                <EditableText
                    textKey="contact.form.success.title"
                    initialContent={texts['contact.form.success.title'] || "¡Gracias por tu mensaje! 🎉"}
                    className="text-xl text-green-400 font-semibold"
                    tag="p"
                />
                <EditableText
                    textKey="contact.form.success.subtitle"
                    initialContent={texts['contact.form.success.subtitle'] || "Te contactaremos pronto."}
                    className="text-white/80 mt-2"
                    tag="p"
                />
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                    <label className="block text-left text-white/90 font-semibold mb-2">
                        <EditableText
                            textKey="contact.form.name.label"
                            initialContent={texts['contact.form.name.label'] || "Nombre"}
                            className="inline"
                            tag="span"
                        />
                    </label>
                    <div className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/30 rounded-xl">
                        <EditableText
                            textKey="contact.form.name.placeholder"
                            initialContent={texts['contact.form.name.placeholder'] || "Tu nombre"}
                            className="text-white/60"
                            tag="p"
                        />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <label className="block text-left text-white/90 font-semibold mb-2">
                        <EditableText
                            textKey="contact.form.email.label"
                            initialContent={texts['contact.form.email.label'] || "Email"}
                            className="inline"
                            tag="span"
                        />
                    </label>
                    <div className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/30 rounded-xl">
                        <EditableText
                            textKey="contact.form.email.placeholder"
                            initialContent={texts['contact.form.email.placeholder'] || "tu@email.com"}
                            className="text-white/60"
                            tag="p"
                        />
                    </div>
                </div>
            </div>

            {/* Teléfono */}
            <div>
                <label className="block text-left text-white/90 font-semibold mb-2">
                    <EditableText
                        textKey="contact.form.phone.label"
                        initialContent={texts['contact.form.phone.label'] || "Teléfono (opcional)"}
                        className="inline"
                        tag="span"
                    />
                </label>
                <div className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/30 rounded-xl">
                    <EditableText
                        textKey="contact.form.phone.placeholder"
                        initialContent={texts['contact.form.phone.placeholder'] || "+34 600 000 000"}
                        className="text-white/60"
                        tag="p"
                    />
                </div>
            </div>

            {/* Mensaje */}
            <div>
                <label className="block text-left text-white/90 font-semibold mb-2">
                    <EditableText
                        textKey="contact.form.message.label"
                        initialContent={texts['contact.form.message.label'] || "Mensaje"}
                        className="inline"
                        tag="span"
                    />
                </label>
                <div className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/30 rounded-xl min-h-[120px]">
                    <EditableText
                        textKey="contact.form.message.placeholder"
                        initialContent={texts['contact.form.message.placeholder'] || "Cuéntanos sobre tu evento: fecha, tipo de celebración, ubicación, número de invitados..."}
                        className="text-white/60"
                        tag="p"
                    />
                </div>
            </div>

            {/* Botón de envío */}
            <div
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                <EditableText
                    textKey="contact.form.submit.button"
                    initialContent={texts['contact.form.submit.button'] || "Enviar Mensaje 🎵"}
                    className="text-center flex justify-center items-center"
                    tag="span"
                />
            </div>
        </form>
    );
}
