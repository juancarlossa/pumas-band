import { useEffect, useState } from 'react';
import EditableText from './EditableText';

interface HeaderEditableProps {
    texts?: Record<string, string>;
}

export function HeaderEditable({ texts = {} }: HeaderEditableProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const links = [
        { nameKey: 'nav.link1.name', hrefKey: 'nav.link1.href', name: texts['nav.link1.name'] || "Inicio", href: texts['nav.link1.href'] || "#hero" },
        { nameKey: 'nav.link2.name', hrefKey: 'nav.link2.href', name: texts['nav.link2.name'] || "Nosotros", href: texts['nav.link2.href'] || "#nosotros" },
        { nameKey: 'nav.link3.name', hrefKey: 'nav.link3.href', name: texts['nav.link3.name'] || "Galeria", href: texts['nav.link3.href'] || "#galeria" },
        { nameKey: 'nav.link4.name', hrefKey: 'nav.link4.href', name: texts['nav.link4.name'] || "Reservas", href: texts['nav.link4.href'] || "#contact" },
    ];

    useEffect(() => {
        const header = document.querySelector('header');
        let lastScroll = 0;

        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll <= 0) {
                header?.classList.remove('bg-black');
                header?.classList.add('bg-black/50');
                return;
            }

            if (currentScroll > lastScroll) {
                header?.classList.remove('-translate-y-full');
                header?.classList.remove('bg-black/50');
                header?.classList.add('bg-black');
            }

            lastScroll = currentScroll;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-black/50 backdrop-blur-md transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">
                    {/* Logo */}
                    <div className="shrink-0 flex items-center">
                        <a href="#hero" className="flex items-center gap-3">
                            <img
                                src="/logo.png"
                                alt="Puma's Band Logo"
                                className="h-12 w-12 md:h-14 md:w-14 object-contain"
                            />
                            <EditableText
                                textKey="nav.logo.text"
                                initialContent={texts['nav.logo.text'] || "Puma's Band"}
                                className="text-white text-xl md:text-2xl font-semibold hidden sm:block"
                                tag="span"
                            />
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-white hover:text-amber-500 transition-colors duration-200"
                        aria-controls="mobile-menu"
                        aria-expanded={isMenuOpen}
                        onClick={toggleMenu}
                    >
                        <span className="sr-only">Abrir menú principal</span>
                        <div className="relative w-6 h-6">
                            <span className={`absolute top-1 left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`absolute top-3 left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`absolute top-5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>

                    {/* Desktop menu */}
                    <nav className="hidden md:flex items-center gap-1">
                        {links.map((link, index) => (
                            <div key={index} className="relative group">
                                <EditableText
                                    textKey={link.nameKey}
                                    initialContent={link.name}
                                    className="text-white/90 px-4 py-2 text-sm font-medium hover:text-amber-500 transition-colors rounded-md cursor-pointer"
                                    tag="span"
                                />
                                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-amber-500 transition-all duration-300 ease-out group-hover:w-3/4 group-hover:left-1/8"></span>
                            </div>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
                id="mobile-menu"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className={`transform transition-all duration-200 ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                        >
                            <EditableText
                                textKey={link.nameKey}
                                initialContent={link.name}
                                className="text-white/90 block px-3 py-2 text-base font-medium hover:text-amber-500 transition-all duration-200"
                                tag="span"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}
