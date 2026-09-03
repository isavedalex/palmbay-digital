import { nav, site } from "@/lib/content";
import { NavbarMobile } from "./NavbarMobile";

/**
 * Sticky site header. Desktop links are plain HTML; only the mobile menu
 * toggle is a client island.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-palmbay-bluebg/95 px-[5%] backdrop-blur supports-[backdrop-filter]:bg-palmbay-bluebg/85">
      <div className="container mx-auto flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="font-monument text-sm tracking-wide text-white md:text-base" aria-label={`${site.name} home`}>
          PALM BAY <span className="text-palmbay-pink">DIGITAL</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-helvetica text-sm text-white/85 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            className="rounded-lg border-b-4 border-r-4 border-palmbay-darkpink bg-palmbay-pink px-4 py-2 font-helvetica text-sm font-medium text-neutral-950 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:border-b-2 hover:border-r-2"
          >
            {nav.cta.label}
          </a>
        </nav>

        <NavbarMobile links={nav.links} cta={nav.cta} />
      </div>
    </header>
  );
}
