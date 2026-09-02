"use server";

import { z } from "zod";

export interface ContactState {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
}

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  message: z.string().trim().min(1, "Tell us a little about what you need."),
  website: z.string().max(0).optional(), // honeypot
});

/**
 * Homepage contact form. Same Resend + env-var contract as
 * app/api/conversion/route.ts: with no RESEND_API_KEY / CONTACT_TO_EMAIL the
 * submission is logged and reported as sent, so the site never breaks.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    message: formData.get("message") ?? "",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    const errors: ContactState["errors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "website") return { status: "success" }; // bot: pretend it worked
      if (key === "name" || key === "email" || key === "message") errors[key] ??= issue.message;
    }
    return { status: "error", errors };
  }

  const { name, email, message } = parsed.data;
  const subject = `💬 Website enquiry from ${name}`;
  const text = [`Name:    ${name}`, `Email:   ${email}`, "", message].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Palm Bay Digital <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.log(`[contact] (no RESEND_API_KEY/CONTACT_TO_EMAIL)\n${subject}\n${text}`);
    return { status: "success" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({ from, to, replyTo: email, subject, text });
  } catch (err) {
    console.error("[contact] resend failed", err);
    return { status: "error", message: "Couldn’t send right now. Please email alex@palmbay.digital instead." };
  }

  return { status: "success" };
}
