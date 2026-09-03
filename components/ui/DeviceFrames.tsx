import Image from "next/image";

interface Shot {
  src: string;
  alt: string;
}

/**
 * CSS-only MacBook and iPhone mock-ups. Pure markup + Tailwind, no images
 * beyond the screenshots themselves, so it stays a server component.
 */
export function LaptopFrame({ src, alt, sizes, priority }: Shot & { sizes: string; priority?: boolean }) {
  return (
    <div className="w-full">
      {/* lid */}
      <div className="rounded-t-xl rounded-b-md bg-neutral-900 p-[3%] pb-[2.5%] shadow-2xl ring-1 ring-black/40">
        <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-neutral-800">
          <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
        </div>
      </div>
      {/* base */}
      <div className="relative mx-[-3%] h-[10px] rounded-b-xl bg-gradient-to-b from-neutral-700 to-neutral-800 shadow-lg md:h-[14px]">
        <span className="absolute left-1/2 top-0 h-[4px] w-[14%] -translate-x-1/2 rounded-b-md bg-neutral-900/80" aria-hidden />
      </div>
    </div>
  );
}

export function PhoneFrame({ src, alt, sizes, className }: Shot & { sizes: string; className?: string }) {
  return (
    <div className={className}>
      <div className="rounded-[14%/6.5%] bg-neutral-900 p-[3.5%] shadow-2xl ring-1 ring-black/40">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[11%/5.2%] bg-neutral-800">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
          {/* dynamic island */}
          <span className="absolute left-1/2 top-[2.2%] h-[3.2%] w-[30%] -translate-x-1/2 rounded-full bg-neutral-950" aria-hidden />
        </div>
      </div>
    </div>
  );
}
