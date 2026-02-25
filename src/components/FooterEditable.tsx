import { SITE_TITLE } from "@/consts";
import EditableText from "./EditableText";

interface FooterEditableProps {
    texts?: Record<string, string>;
}

export function FooterEditable({ texts = {} }: FooterEditableProps) {
    const today = new Date();

    return (
        <footer className="pt-12 pb-6 w-full bg-gradient-to-b from-black to-gray-900">
            <div className="container mx-auto px-8">
                {/* Separador */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8"></div>

                {/* Redes Sociales y Contacto */}
                <div className="mb-8">
                    <EditableText
                        textKey="footer.contact.title"
                        initialContent={texts['footer.contact.title'] || "Nuestras redes y contacto"}
                        className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-6 text-center"
                        tag="h3"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {/* Instagram */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                <EditableText
                                    textKey="footer.instagram.label"
                                    initialContent={texts['footer.instagram.label'] || "Instagram"}
                                    className="text-white/90 font-semibold inline"
                                    tag="span"
                                />
                            </div>
                            <EditableText
                                textKey="footer.instagram.handle"
                                initialContent={texts['footer.instagram.handle'] || "@pumasband"}
                                className="text-amber-400 hover:text-amber-300 transition-colors inline"
                                tag="span"
                            />
                        </div>

                        {/* Email */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <EditableText
                                    textKey="footer.email.label"
                                    initialContent={texts['footer.email.label'] || "Email"}
                                    className="text-white/90 font-semibold inline"
                                    tag="span"
                                />
                            </div>
                            <EditableText
                                textKey="footer.email.address"
                                initialContent={texts['footer.email.address'] || "pumasbandinfo@gmail.com"}
                                className="text-amber-400 hover:text-amber-300 transition-colors break-all inline"
                                tag="span"
                            />
                        </div>

                        {/* Teléfono Pascual */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <EditableText
                                    textKey="footer.phone1.label"
                                    initialContent={texts['footer.phone1.label'] || "Pascual"}
                                    className="text-white/90 font-semibold inline"
                                    tag="span"
                                />
                            </div>
                            <EditableText
                                textKey="footer.phone1.number"
                                initialContent={texts['footer.phone1.number'] || "655 036 679"}
                                className="text-amber-400 hover:text-amber-300 transition-colors inline"
                                tag="span"
                            />
                        </div>

                        {/* Teléfono Antonio */}
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                </svg>
                                <EditableText
                                    textKey="footer.phone2.label"
                                    initialContent={texts['footer.phone2.label'] || "Antonio"}
                                    className="text-white/90 font-semibold inline"
                                    tag="span"
                                />
                            </div>
                            <EditableText
                                textKey="footer.phone2.number"
                                initialContent={texts['footer.phone2.number'] || "643 057 900"}
                                className="text-amber-400 hover:text-amber-300 transition-colors inline"
                                tag="span"
                            />
                        </div>
                    </div>
                </div>

                {/* Separador */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent mb-8"></div>

                <div className="grid grid-cols-3">
                    <div></div>
                    {/* Copyright */}
                    <div className="text-center flex justify-center items-center">
                        <p className="text-gray-400">
                            &copy; {today.getFullYear()} {SITE_TITLE}
                        </p>
                    </div>
                    {/* Sección de Colaboradores */}
                    <div className="text-center">
                        <div className="flex justify-center items-center gap-8 flex-wrap">
                            <div className="opacity-70 hover:opacity-100 transition-opacity duration-300">
                                <img
                                    src="/logo-sirfran_verde.png"
                                    alt="Sirfran - Colaborador oficial"
                                    className="h-20 md:h-24 w-auto object-contain filter brightness-90 hover:brightness-110 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
