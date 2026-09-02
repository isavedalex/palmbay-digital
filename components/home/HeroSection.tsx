import { BrandButton } from "@/components/ui/BrandButton";
import { RubikCubeClient } from "./RubikCubeClient";

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  body?: string;
  ctaLabel?: string;
  ctaUrl?: string;
  secondaryLabel?: string;
  secondaryUrl?: string;
}

export function HeroSection({
  heading,
  subheading,
  body,
  ctaLabel,
  ctaUrl,
  secondaryLabel,
  secondaryUrl,
}: HeroSectionProps) {
  const ctaIsExternal = Boolean(ctaUrl && /^https?:\/\//.test(ctaUrl));

  return (
    <section
      id="top"
      className="flex min-h-[calc(100vh-4rem)] items-center bg-palmbay-bluebg px-[5%] py-16 md:min-h-[calc(100vh-5rem)] md:py-20"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-[1.15fr_1fr]">
          <div className="text-center lg:text-left">
            {subheading && (
              <p className="mb-4 font-formula text-sm uppercase tracking-[0.2em] text-palmbay-pink animate-fade-in-up animate-delay-100 md:mb-5">
                {subheading}
              </p>
            )}

            <h1 className="font-monument text-3xl leading-[1.08] text-white animate-fade-in-up animate-delay-200 md:text-5xl lg:text-6xl">
              {heading}
            </h1>

            {body && (
              <p className="mx-auto mt-6 max-w-xl font-helvetica text-base font-light text-white/85 animate-fade-in-up animate-delay-300 md:text-lg lg:mx-0">
                {body}
              </p>
            )}

            {(ctaLabel && ctaUrl) || (secondaryLabel && secondaryUrl) ? (
              <div className="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up animate-delay-400 lg:justify-start">
                {ctaLabel && ctaUrl && (
                  <BrandButton href={ctaUrl} external={ctaIsExternal}>
                    {ctaLabel}
                  </BrandButton>
                )}
                {secondaryLabel && secondaryUrl && (
                  <BrandButton href={secondaryUrl} variant="ghost">
                    {secondaryLabel}
                  </BrandButton>
                )}
              </div>
            ) : null}
          </div>

          <div
            className="flex w-full items-center justify-center animate-scale-in animate-delay-500"
            role="img"
            aria-label="Animated 3D Rubik's cube in Palm Bay Digital pink"
          >
            <div className="aspect-square w-64 md:w-96 lg:w-full lg:max-w-md">
              <RubikCubeClient />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
