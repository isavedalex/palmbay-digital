import Image from "next/image";
import { statement, work } from "@/lib/content";

/** The template's "Good design means better world" band: big statement + two images. */
export function StatementSection() {
  const a = work.find((w) => w.name === "Cork & Capture") ?? work[0];
  const b = work.find((w) => w.name === "Palms Build.Co") ?? work[1];
  return (
    <section className="bg-white px-[5%] py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-monument text-3xl leading-[1.1] text-neutral-950 md:text-5xl">{statement.heading}</h2>
            <p className="mt-6 max-w-xl font-helvetica text-base text-neutral-600 md:text-lg">{statement.body}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
              <Image src={a.image} alt={a.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover object-left-top" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-2xl bg-neutral-100">
              <Image src={b.image} alt={b.alt} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover object-left-top" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
