import { Button } from "@relume_io/relume-ui";
import { RubikCubeClient } from "./RubikCubeClient";

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  body?: string;
  ctaLabel?: string;
  ctaUrl?: string;
}

export function HeroSection({
  heading,
  subheading,
  body,
  ctaLabel,
  ctaUrl,
}: HeroSectionProps) {
  return (
    <section
      id="relume"
      className="min-h-screen flex items-center justify-center px-[5%] py-16 md:py-0 bg-palmbay-bluebg"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center text-center lg:text-left">
          <div>
            <h1 className="mb-5 text-4xl font-bold md:mb-6 md:text-9xl lg:text-10xl text-white font-monument animate-fade-in-up animate-delay-100">
              {heading}
            </h1>

            {subheading && (
              <h2 className="md:text-md text-white font-helvetica font-light mb-4 animate-fade-in-up animate-delay-200">
                {subheading}
              </h2>
            )}

            {body && (
              <p className="md:text-md text-white font-helvetica font-light animate-fade-in-up animate-delay-300">
                {body}
              </p>
            )}

            {ctaLabel && ctaUrl && (
              <div className="mt-6 flex flex-wrap gap-4 md:mt-8 text-white justify-center lg:justify-start animate-fade-in-up animate-delay-400">
                <a
                  href={ctaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${ctaLabel} - Get your free website design consultation`}
                >
                  <Button
                    title={`${ctaLabel} - Get your free website design consultation`}
                    className="bg-palmbay-pink border-r-4 border-b-4 border-palmbay-darkpink rounded-lg"
                  >
                    {ctaLabel}
                  </Button>
                </a>
              </div>
            )}
          </div>

          <div
            className="w-full flex items-center justify-center animate-scale-in animate-delay-500"
            role="img"
            aria-label="Interactive 3D Rubik's cube animation showcasing Palm Bay Digital's web design creativity"
          >
            <div className="w-64 h-64 md:w-96 md:h-96 lg:max-w-md lg:w-full lg:h-auto">
              <RubikCubeClient />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
