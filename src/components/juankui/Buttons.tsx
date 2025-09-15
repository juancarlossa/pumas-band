import { API_WHATSAPP } from "@/consts";

export function ButtonApiWhatsapp() {
    return (
        <a
            href={API_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp"
        >
            Enviar WhatsApp
        </a>
    );
}

export function ButtonCta({ children }: { children: React.ReactNode }) {
    return (
        <a
            href={API_WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-gradient-to-br from-orange-600  to-[#b03b3b] rounded-full text-white px-8 py-4 font-medium text-lg tracking-wide  shadow-xl inline-flex items-center justify-center gap-2 hover:bg-amber-400 hover:scale-105 transition-all duration-300"
        >
            <span className="font-bold text-lg ">{children}</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
        </a>
    );
}

export function ButtonGhost({ children }: { children: React.ReactNode }) {
    return (
        <a
            href="#repertorio"
            className="group bg-white/10 backdrop-blur-sm text-white border border-white/20 px-8 py-4 font-medium text-lg tracking-wide rounded-lg shadow-xl inline-flex items-center justify-center gap-2 hover:bg-white/20 hover:scale-105 transition-all duration-300"
        >
            <span>VER REPERTORIO</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                ></path>
            </svg>
        </a>
    );
};
