import { marquee } from "@/lib/content";

/**
 * Looping text band (the template's "Form follows function" marquee).
 * Pure CSS: the track is duplicated and translated by -50%; reduced-motion
 * users get a static, wrapped row instead.
 */
export function Marquee() {
  const items = [...marquee, ...marquee];
  return (
    <div className="overflow-hidden border-y border-white/10 bg-palmbay-bluebg py-5 md:py-6" aria-hidden>
      <div className="flex w-max animate-marquee motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:animate-none">
        {items.map((text, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6 font-monument text-lg text-white md:text-2xl">
            {text}
            <span className="ml-12 text-palmbay-pink">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
