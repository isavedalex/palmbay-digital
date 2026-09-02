import { PaintBrush, CloudCheck, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandButton } from "@/components/ui/BrandButton";
import { services, type Service } from "@/lib/content";

const icons: Record<Service["icon"], typeof PaintBrush> = {
  design: PaintBrush,
  host: CloudCheck,
  search: MagnifyingGlass,
};

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20 bg-neutral-50 px-[5%] py-16 md:py-24">
      <div className="container mx-auto">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="What we do"
            title="Everything your website needs, in one place"
            intro="Design, build, hosting and search, looked after by the same people who built it."
          />
          <BrandButton href="#contact" variant="dark" className="shrink-0 self-start md:self-auto">
            Start a project
          </BrandButton>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.icon];
            return (
              <li
                key={s.title}
                className="group rounded-2xl border border-neutral-200 bg-white p-7 transition-colors hover:border-palmbay-darkpink md:p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-palmbay-bluebg text-white transition-colors group-hover:bg-palmbay-pink group-hover:text-neutral-950">
                  <Icon size={26} weight="bold" />
                </span>
                <h3 className="mt-6 font-monument text-lg text-neutral-950 md:text-xl">{s.title}</h3>
                <p className="mt-3 font-helvetica text-sm leading-relaxed text-neutral-600 md:text-base">{s.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
