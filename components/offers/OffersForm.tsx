"use client";

import { useState } from "react";

/**
 * "Tell us which one" form on /offers. POSTs to the existing /api/conversion
 * webhook (same as the go-live form) — the chosen tier travels in `message`,
 * so no backend change and the operator gets the same Resend email.
 */
export function OffersForm({
  business,
  tiers,
  preselect,
}: {
  business: string;
  tiers: { id: string; name: string }[];
  preselect?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const tierId = String(form.get("tier") || "");
    const tierName = tiers.find((t) => t.id === tierId)?.name ?? tierId;
    const note = String(form.get("message") || "").trim();
    const payload = {
      business: String(form.get("business") || business || ""),
      slug: "",
      previewUrl: "",
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      domain: "",
      message: [`Tier: ${tierName}`, "via /offers", note].filter(Boolean).join(" · "),
    };
    try {
      const res = await fetch("/api/conversion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <div className="rounded-2xl bg-palmbay-bluebg/5 p-6">
        <h3 className="font-monument text-xl font-bold text-palmbay-bluebg">Got it 🎉</h3>
        <p className="mt-2 text-neutral-700">Thanks — we’ll be in touch within a day.</p>
      </div>
    );
  }

  const input =
    "w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-base outline-none focus:border-palmbay-bluebg";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <fieldset>
        <legend className="mb-2 font-helvetica text-sm font-semibold text-neutral-700">Which one?</legend>
        <div className="grid grid-cols-2 gap-2">
          {tiers.map((t) => (
            <label
              key={t.id}
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-300 px-3 py-2.5 text-sm has-[:checked]:border-palmbay-darkpink has-[:checked]:bg-palmbay-pink/10"
            >
              <input
                type="radio"
                name="tier"
                value={t.id}
                defaultChecked={preselect ? preselect === t.id : t.id === "gbp"}
                className="accent-palmbay-darkpink"
              />
              <span>{t.name}</span>
            </label>
          ))}
        </div>
      </fieldset>
      {!business && <input name="business" placeholder="Business name" required className={input} />}
      <input name="name" placeholder="Your name" required className={input} />
      <input name="email" type="email" placeholder="Email" required className={input} />
      <input name="phone" placeholder="Phone (optional)" className={input} />
      <textarea name="message" placeholder="Anything we should know? (optional)" rows={3} className={input} />
      {state === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-lg bg-palmbay-darkpink px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-palmbay-pink disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
