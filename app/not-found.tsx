import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { BrandButton } from "@/components/ui/BrandButton";

export const metadata: Metadata = {
  title: "Page not found | Palm Bay Digital",
  robots: { index: false, follow: false },
};

/**
 * 404 page — from the "404 error page design" Claude Design project. Uses the
 * site's own tokens (bluebg / pink / Monument / Formula) and components. The
 * design's own contact strip sits above the global Footer from the root layout.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-[calc(100vh-4rem)] items-center bg-palmbay-bluebg px-[5%] py-16 text-white md:min-h-[calc(100vh-5rem)] md:py-24">
        <div className="container mx-auto grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="font-formula text-sm uppercase tracking-[0.2em] text-palmbay-pink animate-fade-in-up">
              Error 404
            </p>
            <h1 className="font-monument text-3xl leading-[1.1] text-balance animate-fade-in-up animate-delay-100 md:text-5xl lg:text-6xl">
              This page has gone out with the tide.
            </h1>
            <p className="max-w-lg font-helvetica text-base font-light leading-relaxed text-white animate-fade-in-up animate-delay-200 md:text-lg">
              The link may be old, or the address mistyped. Nothing else is broken. Head back to the
              homepage or tell us what you were looking for.
            </p>
            <div className="mt-2 flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
              <BrandButton href="/">Back to homepage</BrandButton>
              <BrandButton href="/#contact" variant="ghost">
                Get in touch
              </BrandButton>
            </div>
          </div>

          <div className="flex min-w-0 justify-center [container-type:inline-size] animate-scale-in animate-delay-200">
            <div
              aria-hidden="true"
              className="select-none font-monument leading-[0.9] tracking-[-0.04em] text-transparent"
              style={{ fontSize: "clamp(96px, 38cqw, 300px)", WebkitTextStroke: "2px rgba(255,255,255,0.6)" }}
            >
              404
            </div>
          </div>
        </div>
      </main>
      <div className="border-t border-white/20 bg-palmbay-bluebg px-[5%] py-6 font-helvetica text-sm text-white">
        <div className="container mx-auto flex flex-wrap justify-between gap-x-8 gap-y-3">
          <span>Palm Bay Digital · Margate, Kent</span>
          <a href="mailto:hello@palmbay.digital" className="underline underline-offset-[3px]">
            hello@palmbay.digital
          </a>
        </div>
      </div>
    </>
  );
}
