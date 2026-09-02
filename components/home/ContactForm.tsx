"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

const field =
  "w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 font-helvetica text-base text-neutral-900 placeholder:text-neutral-400 focus:border-palmbay-darkpink focus:outline-none focus:ring-2 focus:ring-palmbay-pink/50";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div className="rounded-2xl bg-white p-7 md:p-9" role="status">
        <h3 className="font-monument text-2xl text-neutral-950">Thanks, got it 🎉</h3>
        <p className="mt-3 font-helvetica text-neutral-600">
          We’ll reply within a working day. If it’s urgent, email{" "}
          <a href="mailto:alex@palmbay.digital" className="underline underline-offset-2">
            alex@palmbay.digital
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="rounded-2xl bg-white p-7 md:p-9" noValidate>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="contact-name" className="mb-1.5 block font-helvetica text-sm font-medium text-neutral-800">
            Name
          </label>
          <input id="contact-name" name="name" autoComplete="name" required className={field} />
          {state.errors?.name && <p className="mt-1 text-sm text-red-600">{state.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1.5 block font-helvetica text-sm font-medium text-neutral-800">
            Email
          </label>
          <input id="contact-email" name="email" type="email" autoComplete="email" required className={field} />
          {state.errors?.email && <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-1.5 block font-helvetica text-sm font-medium text-neutral-800">
            What do you need?
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            required
            placeholder="A new website for my café in Broadstairs…"
            className={field}
          />
          {state.errors?.message && <p className="mt-1 text-sm text-red-600">{state.errors.message}</p>}
        </div>
        {/* Honeypot: hidden from humans, filled by bots */}
        <div className="absolute -left-[9999px]" aria-hidden>
          <label htmlFor="contact-website">Website</label>
          <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-lg border-b-4 border-r-4 border-palmbay-darkpink bg-palmbay-pink px-5 py-3 font-helvetica text-base font-medium text-neutral-950 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:border-b-2 hover:border-r-2 disabled:cursor-wait disabled:opacity-70 md:text-lg"
      >
        {pending ? "Sending…" : "Send message"}
      </button>
      <p className="mt-3 text-center font-helvetica text-xs text-neutral-500">No newsletters, no spam. Just a reply.</p>
    </form>
  );
}
