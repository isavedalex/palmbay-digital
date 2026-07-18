"use client";

import { useState } from "react";

/**
 * Conversion form → POSTs to /api/conversion (the webhook). On success the
 * operator gets a Resend email and runs the port-lead handoff.
 */
export function ConversionForm({
  business,
  slug,
  previewUrl,
}: {
  business: string;
  slug: string;
  previewUrl: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setError("");
    const form = new FormData(e.currentTarget);
    const payload = {
      business,
      slug,
      previewUrl,
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      domain: String(form.get("domain") || ""),
      message: String(form.get("message") || ""),
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
      <div className="mt-6 rounded-2xl bg-palmbay-bluebg/5 p-6">
        <h3 className="font-monument text-xl font-bold text-palmbay-bluebg">You’re all set 🎉</h3>
        <p className="mt-2 text-neutral-700">
          Thanks — we’ve got your details and will be in touch within a day to get {business}{" "}
          live.
        </p>
      </div>
    );
  }

  const input =
    "w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-base outline-none focus:border-palmbay-bluebg";

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-3">
      <input name="name" placeholder="Your name" required className={input} />
      <input name="email" type="email" placeholder="Email" required className={input} />
      <input name="phone" placeholder="Phone (optional)" className={input} />
      <input name="domain" placeholder="Preferred domain, e.g. yourbusiness.co.uk (optional)" className={input} />
      <textarea name="message" placeholder="Anything you’d change? (optional)" rows={3} className={input} />
      {state === "error" && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full rounded-lg bg-palmbay-darkpink px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-palmbay-pink disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : "Make it live"}
      </button>
    </form>
  );
}
