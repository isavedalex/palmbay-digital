import { nav, site } from "@/lib/content";

/**
 * Site-wide footer carrying the Companies Act 2006 s82 trading disclosures
 * (registered name, number, office) — statutory, do not remove — plus the
 * terms link and opt-out contact.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-neutral-950 px-[5%] font-helvetica text-white/60">
      <div className="container mx-auto flex flex-col gap-10 py-12 md:flex-row md:items-start md:justify-between md:py-16">
        <div className="max-w-sm">
          <p className="font-monument text-base text-white">
            PALM BAY <span className="text-palmbay-pink">DIGITAL</span>
          </p>
          <p className="mt-3 text-sm">{site.tagline} Designed, built and looked after in {site.location}.</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm" aria-label="Footer">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white">
              {l.label}
            </a>
          ))}
          <a href="/terms" className="hover:text-white">
            Subscription terms
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-white">
            {site.email}
          </a>
        </nav>
      </div>

      <div className="container mx-auto flex flex-col gap-3 border-t border-white/10 py-6 text-xs md:flex-row md:items-center md:justify-between">
        <p>
          © {year} Palm Bay Digital Ltd · Company no. 15996143 (England &amp; Wales)
          <span className="block md:inline">
            {" "}
            · Registered office: Flat 12a Highcliffe Hall, 16 Eastern Esplanade, Margate CT9 2JB
          </span>
        </p>
        <p className="shrink-0">
          <a href="/terms" className="underline underline-offset-2 hover:text-white">
            Subscription terms
          </a>
          {" · "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-2 hover:text-white">
            {site.email}
          </a>
        </p>
      </div>
    </footer>
  );
}
