import { SectionHeading } from "palmbay.digital";

/** The default: eyebrow + h2 + intro, left aligned on a white section. */
export function Default() {
  return (
    <div className="bg-white p-10">
      <SectionHeading
        eyebrow="What we do"
        title="Everything your website needs, in one place"
        intro="Design, build, hosting and search, looked after by the same people who built it."
      />
    </div>
  );
}

/** Light tone, for use on the Palm Bay blue background. */
export function LightOnBlue() {
  return (
    <div className="bg-palmbay-bluebg p-10">
      <SectionHeading
        tone="light"
        eyebrow="Contact"
        title="Let’s talk"
        intro="Tell us a little about your business and what you’re after. We’ll reply within a working day."
      />
    </div>
  );
}

/** Centre aligned, as used above the process steps. */
export function Centered() {
  return (
    <div className="bg-white p-10">
      <SectionHeading
        align="center"
        eyebrow="How it works"
        title="A simple process, from first chat to live site"
        intro="No long briefs, no six-week timelines. We keep things moving and keep you in the loop."
      />
    </div>
  );
}

/** Title only — the minimal case. */
export function TitleOnly() {
  return (
    <div className="bg-white p-10">
      <SectionHeading title="Real sites, for real local businesses" />
    </div>
  );
}
