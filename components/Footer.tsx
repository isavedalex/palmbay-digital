/**
 * Site-wide footer carrying the Companies Act 2006 s82 trading disclosures
 * (registered name, number, office) — statutory, do not remove — plus the
 * terms link and opt-out contact.
 */
export function Footer() {
  return (
    <footer className="bg-neutral-950 px-[5%] py-8 font-helvetica text-xs text-white/60">
      <div className="container mx-auto flex max-w-5xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>
          Palm Bay Digital Ltd · Company no. 15996143 (England &amp; Wales)
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
          <a href="mailto:alex@palmbay.digital" className="underline underline-offset-2 hover:text-white">
            alex@palmbay.digital
          </a>
        </p>
      </div>
    </footer>
  );
}
