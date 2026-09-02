import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { work } from "@/lib/content";

export function WorkSection() {
  return (
    <section id="work" className="scroll-mt-20 bg-white px-[5%] py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading
          eyebrow="Featured work"
          title="Real sites, for real local businesses"
          intro="A few of the sites we’ve designed, built and look after."
        />

        <ul className="mt-10 grid grid-cols-1 gap-8 md:mt-14 md:grid-cols-2 md:gap-10">
          {work.map((item) => (
            <li key={item.url}>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block focus-visible:outline-none"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-sm transition-shadow group-hover:shadow-xl group-focus-visible:ring-2 group-focus-visible:ring-palmbay-darkpink">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 45vw, 90vw"
                    className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-monument text-lg text-neutral-950 md:text-xl">{item.name}</h3>
                    <p className="mt-1.5 font-helvetica text-sm text-neutral-600 md:text-base">{item.description}</p>
                  </div>
                  <span
                    aria-hidden
                    className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 text-neutral-950 transition-all group-hover:border-palmbay-darkpink group-hover:bg-palmbay-pink"
                  >
                    <ArrowUpRight size={20} weight="bold" />
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
