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

const SEND_FAILED = "Couldn’t send right now. Please email hello@palmbay.digital instead.";

/**
 * Homepage contact form. Same Resend + env-var contract as
 * app/api/conversion/route.ts. With no RESEND_API_KEY / CONTACT_TO_EMAIL the
 * submission is logged; in dev it's reported as sent, but in production the
 * visitor gets an error so a missing key can't silently swallow leads.
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
    if (process.env.NODE_ENV === "production") {
      console.error(`[contact] RESEND_API_KEY/CONTACT_TO_EMAIL not set — enquiry NOT emailed\n${subject}\n${text}`);
      return { status: "error", message: SEND_FAILED };
    }
    console.log(`[contact] (no RESEND_API_KEY/CONTACT_TO_EMAIL)\n${subject}\n${text}`);
    return { status: "success" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    // The SDK reports API rejections in `error` rather than throwing.
    const { error } = await resend.emails.send({ from, to, replyTo: email, subject, text });
    if (error) throw error;
  } catch (err) {
    console.error(`[contact] resend failed — enquiry NOT emailed\n${subject}\n${text}`, err);
    return { status: "error", message: SEND_FAILED };
  }

  return { status: "success" };
}
