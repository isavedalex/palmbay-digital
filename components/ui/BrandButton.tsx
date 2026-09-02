import type { ReactNode } from "react";
import clsx from "clsx";

interface BrandButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
  external?: boolean;
}

/**
 * The house button: pink face with the dark-pink offset edge that the
 * original hero shipped with. `ghost` is the outline variant for use on the
 * blue background; `dark` is the outline variant for white sections.
 */
export function BrandButton({ href, children, variant = "primary", className, external }: BrandButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-base font-medium font-helvetica transition-all duration-150 md:px-5 md:py-2.5 md:text-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-palmbay-pink focus-visible:ring-offset-2";
  const variants = {
    primary:
      "bg-palmbay-pink text-neutral-950 border-r-4 border-b-4 border-palmbay-darkpink hover:translate-x-[2px] hover:translate-y-[2px] hover:border-r-2 hover:border-b-2",
    ghost: "border-2 border-white/80 text-white hover:bg-white hover:text-palmbay-bluebg",
    dark: "border-2 border-neutral-950 text-neutral-950 hover:bg-neutral-950 hover:text-white",
  };
  return (
    <a
      href={href}
      className={clsx(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
