import { ArrowRightIcon } from "@radix-ui/react-icons";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className: string;
  background: ReactNode;
  Icon: React.ElementType;
  description: string;
  href: string;
  cta: string;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-end overflow-hidden rounded-xl lg:w-full w-full",
      // Remove background colors to show image backgrounds
      "border border-white/10 shadow-lg",
      className,
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="relative p-4 z-10 group-hover:-translate-y-10 transition-all duration-300">
      <div className="flex transform-gpu flex-col gap-1 transition-all duration-300">
        <Icon className="h-12 w-12 origin-left transform-gpu transition-all duration-300 ease-in-out" />
        <h3 className="text-xl font-semibold ">
          {name}
        </h3>
        <p className="max-w-lg">{description}</p>
      </div>

      <div className="lg:hidden flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 mt-4">
        <a href={href} className="text-white hover:underline">
          {cta}
        </a>
      </div>
    </div>

    <div className="hidden lg:flex absolute -bottom-2 left-0  w-full translate-y-30 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <a
        href={href}
        className="inline-block rounded-lg bg-linear-to-r from-red-700 to-red-500 hover:from-red-800 hover:to-red-600 transition  px-5 py-2 font-medium text-white shadow-md duration-300 hover:bg-amber-400 hover:shadow-lg active:scale-95"
      >
        {cta}
      </a>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03]" />
  </div>
);

export { BentoCard, BentoGrid };
