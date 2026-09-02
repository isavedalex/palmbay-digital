import { SectionHeading } from "@/components/ui/SectionHeading";
import { process } from "@/lib/content";

export function ProcessSection() {
  return (
    <section id="process" className="scroll-mt-20 bg-white px-[5%] py-16 md:py-24">
      <div className="container mx-auto">
        <SectionHeading eyebrow="How it works" title={process.heading} intro={process.intro} />

        <ol className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 md:mt-14 md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => (
            <li key={step.title} className="relative border-t-2 border-neutral-200 pt-6">
              <span className="absolute -top-[2px] left-0 h-[2px] w-12 bg-palmbay-darkpink" aria-hidden />
              <p className="font-formula text-sm tracking-[0.2em] text-palmbay-darkpink">0{i + 1}</p>
              <h3 className="mt-3 font-monument text-xl text-neutral-950 md:text-2xl">{step.title}</h3>
              <p className="mt-3 font-helvetica text-sm leading-relaxed text-neutral-600 md:text-base">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
