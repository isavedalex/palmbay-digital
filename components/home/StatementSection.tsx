import { LaptopFrame, PhoneFrame } from "@/components/ui/DeviceFrames";
import { statement, work } from "@/lib/content";

/**
 * "Small businesses deserve websites as good as the big ones": big statement
 * beside a MacBook + iPhone mock-up of one client site, to show the work is
 * responsive rather than just a cropped desktop screenshot.
 */
export function StatementSection() {
  // Same site on both devices so the band reads as "one site, every screen".
  const site = work.find((w) => w.name === "Ellwood Studio") ?? work[0];
  const laptop = site;
  const phone = site;

  return (
    <section className="overflow-hidden bg-white px-[5%] py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <h2 className="font-monument text-3xl leading-[1.1] text-neutral-950 md:text-5xl">{statement.heading}</h2>
            <p className="mt-6 max-w-xl font-helvetica text-base text-neutral-600 md:text-lg">{statement.body}</p>
            <p className="mt-6 max-w-xl font-helvetica text-base text-neutral-600 md:text-lg">
              Every site we build is designed for the phone first, then the desktop, so it looks right wherever your customers find you.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-2xl pb-[8%] pr-[14%] sm:pr-[12%]">
            <LaptopFrame
              src={laptop.image}
              alt={`${laptop.name} on a laptop`}
              sizes="(min-width: 1024px) 50vw, 90vw"
            />
            <PhoneFrame
              src={`/images/work/mobile/${phone.image.split("/").pop()}`}
              alt={`${phone.name} on a phone`}
              sizes="(min-width: 1024px) 12vw, 25vw"
              className="absolute bottom-0 right-0 w-[26%]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
