import { cn } from "@/lib/utils";

export function Section({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <section className={cn("py-20 overflow-x-hidden", className)}>
            {children}
        </section>
    );
};
