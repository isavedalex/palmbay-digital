"use client";

import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

interface NavLink {
  label: string;
  href: string;
}

export function NavbarMobile({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex h-10 w-10 items-center justify-center rounded-lg text-white hover:bg-white/10"
      >
        {open ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
      </button>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="absolute inset-x-0 top-16 border-t border-white/10 bg-palmbay-bluebg px-[5%] pb-6 pt-2 shadow-xl"
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-white/10 py-3 font-helvetica text-lg text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={cta.href}
            onClick={() => setOpen(false)}
            className="mt-4 block rounded-lg border-b-4 border-r-4 border-palmbay-darkpink bg-palmbay-pink px-4 py-2 text-center font-helvetica text-base font-medium text-neutral-950"
          >
            {cta.label}
          </a>
        </nav>
      )}
    </div>
  );
}
