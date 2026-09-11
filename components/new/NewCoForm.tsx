"use client";

import { useState } from "react";

/**
 * NewCo "Make it live" — a company from a letter has no phone on file (Companies
 * House doesn't publish one), so this is two fields, not one tap: name + best
 * number. WhatsApp and hello@ sit beside it as zero-typing routes. Posts to the
 * existing /api/conversion webhook (same email as every other lead).
 */
export function NewCoForm({ business, companyNumber }: { business: string; companyNumber: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  const waHref = wa ? `https://wa.me/${wa}?text=${encodeURIComponent(`Make ${business || "my new company"} live please (${companyNumber})`)}` : null;
  const mailHref = `mailto:hello@palmbay.digital?subject=${encodeURIComponent(`Make ${business || "my new company"} live`)}&body=${encodeURIComponent(`Company number: ${companyNumber}`)}`;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          business: business || String(fd.get("business") || ""),
          slug: "",
          previewUrl: "",
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          phone: String(fd.get("phone") || ""),
          domain: "",
          message: `NewCo £45 offer · via /new · company ${companyNumber}`,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Something went wrong");
      }
      setState("done");
    } catch (err) {
      setError((err as Error).message);
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-2xl bg-palmbay-bluebg/5 p-5">
        <p className="font-monument text-lg text-palmbay-bluebg">Done — Alex will call you within a day.</p>
        <p className="mt-1.5 font-helvetica text-sm text-neutral-600">Two questions and it&rsquo;s underway.</p>
      </div>
    );
  }

  const input = "w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-base outline-none focus:border-palmbay-bluebg";
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      {!business && <input name="business" placeholder="Company name" required className={input} />}
      <input name="name" placeholder="Your name" required className={input} autoComplete="name" />
      <input name="phone" placeholder="Best number to call" required className={input} inputMode="tel" autoComplete="tel" />
      <input name="email" type="email" placeholder="Email (optional)" className={input} autoComplete="email" />
      {state === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-lg bg-palmbay-darkpink px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-palmbay-pink disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Make it live"}
      </button>
      <div className="flex flex-col gap-2 pt-1 sm:flex-row">
        {waHref && (
          <a href={waHref} className="inline-flex flex-1 items-center justify-center rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-bold text-white">
            WhatsApp us
          </a>
        )}
        <a href={mailHref} className="inline-flex flex-1 items-center justify-center rounded-lg border border-neutral-300 px-4 py-2.5 text-sm font-semibold text-neutral-800">
          hello@palmbay.digital
        </a>
      </div>
    </form>
  );
}
