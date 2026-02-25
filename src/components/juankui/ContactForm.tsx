import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

interface ContactFormProps {
    texts?: Record<string, string>;
}

export function ContactForm({ texts = {} }: ContactFormProps) {
    const [state, handleSubmit] = useForm("mpqjkbob");

    if (state.succeeded) {
        return (
            <div className="mt-8 p-6 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-2xl">
                <p className="text-xl text-green-400 font-semibold">{texts['contact.form.success.title'] || '¡Gracias por tu mensaje! 🎉'}</p>
                <p className="text-white/80 mt-2">{texts['contact.form.success.subtitle'] || 'Te contactaremos pronto.'}</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                    <label htmlFor="name" className="block text-left text-white/90 font-semibold mb-2">
                        {texts['contact.form.name.label'] || 'Nombre'}
                    </label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder={texts['contact.form.name.placeholder'] || 'Tu nombre'}
                    />
                    <ValidationError
                        prefix="Nombre"
                        field="name"
                        errors={state.errors}
                        className="text-red-400 text-sm mt-1"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-left text-white/90 font-semibold mb-2">
                        {texts['contact.form.email.label'] || 'Email'}
                    </label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder={texts['contact.form.email.placeholder'] || 'tu@email.com'}
                    />
                    <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                        className="text-red-400 text-sm mt-1"
                    />
                </div>
            </div>

            {/* Teléfono */}
            <div>
                <label htmlFor="phone" className="block text-left text-white/90 font-semibold mb-2">
                    {texts['contact.form.phone.label'] || 'Teléfono (opcional)'}
                </label>
                <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                    placeholder={texts['contact.form.phone.placeholder'] || '+34 600 000 000'}
                />
                <ValidationError
                    prefix="Teléfono"
                    field="phone"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-1"
                />
            </div>

            {/* Mensaje */}
            <div>
                <label htmlFor="message" className="block text-left text-white/90 font-semibold mb-2">
                    {texts['contact.form.message.label'] || 'Mensaje'}
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-amber-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
                    placeholder={texts['contact.form.message.placeholder'] || 'Cuéntanos sobre tu evento: fecha, tipo de celebración, ubicación, número de invitados...'}
                />
                <ValidationError
                    prefix="Mensaje"
                    field="message"
                    errors={state.errors}
                    className="text-red-400 text-sm mt-1"
                />
            </div>

            {/* Botón de envío */}
            <button
                type="submit"
                disabled={state.submitting}
                className="cursor-pointer w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
                {state.submitting ? (texts['contact.form.submit.sending'] || 'Enviando...') : (texts['contact.form.submit.button'] || 'Enviar Mensaje 🎵')}
            </button>
        </form>
    );
}