import { Wrench, ForkKnife, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { clients } from "@/lib/content";

const icons = [Wrench, ForkKnife, UserCircle];

export function ClientsSection() {
  return (
    <section className="bg-neutral-50 px-[5%] py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading eyebrow="Clients" title={clients.heading} intro={clients.intro} />
        <ul className="mt-10 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3">
          {clients.groups.map((g, i) => {
            const Icon = icons[i];
            return (
              <li key={g.title} className="rounded-2xl bg-palmbay-bluebg p-7 text-white md:p-8">
                <Icon size={30} weight="bold" className="text-palmbay-pink" />
                <h3 className="mt-5 font-monument text-lg md:text-xl">{g.title}</h3>
                <p className="mt-3 font-helvetica text-sm leading-relaxed text-white/80 md:text-base">{g.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
