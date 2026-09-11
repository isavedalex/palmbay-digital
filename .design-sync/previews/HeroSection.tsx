import { HeroSection } from "palmbay.digital";

/**
 * The hero's entrance animations (fade-in-up / scale-in) are decorative and
 * still running when a card is captured, which washes the card out. Cards show
 * the settled state.
 */
function Still({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <style>{`.ds-still *, .ds-still *::before, .ds-still *::after { animation: none !important; opacity: 1 !important; transform: none !important; }`}</style>
      <div className="ds-still">{children}</div>
    </div>
  );
}

/** The live homepage hero, with the copy the site actually ships. */
export function Default() {
  return (
    <Still>
      <HeroSection
        heading="Websites for small businesses that want to be found."
        subheading="Web design studio in Margate, Kent"
        body="We design and build fast, good-looking websites for local businesses, then host them, keep them updated and make sure Google can find them. One simple monthly subscription, no agency runaround."
        ctaLabel="Let’s talk"
        ctaUrl="#contact"
        secondaryLabel="See our work"
        secondaryUrl="#work"
      />
    </Still>
  );
}

/** Heading and single CTA only — the minimal configuration. */
export function MinimalSingleCta() {
  return (
    <Still>
      <HeroSection
        heading="Your website, built and looked after for one monthly price."
        ctaLabel="Get started"
        ctaUrl="#contact"
      />
    </Still>
  );
}

/** No CTAs — the statement-style variant. */
export function HeadingOnly() {
  return (
    <Still>
      <HeroSection
        heading="Small businesses deserve websites as good as the big ones."
        subheading="Palm Bay Digital"
      />
    </Still>
  );
}
