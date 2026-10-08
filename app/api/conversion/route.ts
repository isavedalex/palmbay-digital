import { NextResponse } from "next/server";

/**
 * Conversion webhook. The go-live form POSTs here; we email the operator (via
 * Resend) with everything needed to close + run the port-lead handoff. No DB —
 * port-lead reads the lead JSON it already has locally, keyed by slug.
 */
export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const { business, slug, previewUrl, name, email, phone, domain, message } = body;

  if (!name?.trim() || !email?.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter your name and a valid email." }, { status: 400 });
  }

  const subject = `🟢 Conversion: ${business || slug || "lead"} wants to go live`;
  const lines = [
    `Business:  ${business || "(unknown)"}`,
    `Slug:      ${slug || "(none)"}`,
    `Preview:   ${previewUrl || "(none)"}`,
    "",
    `Name:      ${name}`,
    `Email:     ${email}`,
    phone ? `Phone:     ${phone}` : null,
    domain ? `Domain:    ${domain}` : null,
    message ? `Message:   ${message}` : null,
    "",
    "— To build their live site, run the handoff:",
    slug ? `  cd coldsite/orchestrator && npm run pipeline -- port-lead --slug ${slug}` : "  (no slug — match the business manually)",
  ].filter(Boolean);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Palm Bay Digital <onboarding@resend.dev>";

  const failed = NextResponse.json(
    { ok: false, error: "Couldn’t send right now. Please email hello@palmbay.digital instead." },
    { status: 500 },
  );

  // In production a missing key is an error, not a fake success, so leads
  // can't be silently swallowed. Locally the lead is just logged.
  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[conversion] RESEND_API_KEY/CONTACT_TO_EMAIL not set — lead NOT emailed\n${subject}\n${lines.join("\n")}`);
      return failed;
    }
    console.log(`[conversion] (no RESEND_API_KEY/CONTACT_TO_EMAIL)\n${subject}\n${lines.join("\n")}`);
    return NextResponse.json({ ok: true });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    // The SDK reports API rejections in `error` rather than throwing.
    const { error } = await resend.emails.send({ from, to, replyTo: email, subject, text: lines.join("\n") });
    if (error) throw error;
  } catch (err) {
    console.error(`[conversion] resend failed — lead NOT emailed\n${subject}\n${lines.join("\n")}`, err);
    return failed;
  }

  return NextResponse.json({ ok: true });
}
