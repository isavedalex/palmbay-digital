import clsx from "clsx";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

/** Eyebrow + h2 + optional intro, shared by every section below the hero. */
export function SectionHeading({ eyebrow, title, intro, tone = "dark", align = "left", className }: SectionHeadingProps) {
  const isLight = tone === "light";
  return (
    <div className={clsx("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={clsx("mb-3 font-formula text-sm uppercase tracking-[0.2em] md:mb-4", isLight ? "text-palmbay-pink" : "text-palmbay-darkpink")}>
          {eyebrow}
        </p>
      )}
      <h2 className={clsx("font-monument text-3xl leading-[1.1] md:text-5xl", isLight ? "text-white" : "text-neutral-950")}>
        {title}
      </h2>
      {intro && (
        <p className={clsx("mt-4 font-helvetica text-base md:mt-5 md:text-lg", isLight ? "text-white/80" : "text-neutral-600")}>
          {intro}
        </p>
      )}
    </div>
  );
}
