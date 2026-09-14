import { coldsiteSanity, coldsiteEnabled, newcoEventId } from "@/lib/coldsiteEvents";

/**
 * NewCo letter tracking. /new beacons here when opened with ?c=<company number>
 * (the URL printed on every letter) — a "scan"; the form / WhatsApp / email
 * buttons post `intent` — an "intent", same fields the coldsite dashboard already
 * shows. Upserts `evt.newco-<number>` in the coldsite events project. Fails
 * silently: tracking must never break the page.
 */
export async function POST(req: Request) {
  if (!coldsiteEnabled()) return new Response(null, { status: 204 });
  let body: Record<string, string | undefined> = {};
  try {
    body = await req.json();
  } catch {
    return new Response(null, { status: 400 });
  }
  const number = String(body.companyNumber || "").trim().toUpperCase();
  if (!/^[A-Z0-9]{8}$/.test(number)) return new Response(null, { status: 400 });
  const slug = `newco-${number}`;
  const business = String(body.business || "").slice(0, 200) || slug;
  const now = new Date().toISOString();
  const sanity = coldsiteSanity();
  try {
    await sanity.createIfNotExists({ _id: newcoEventId(number), _type: "leadEvent", slug, businessName: business, scanCount: 0, source: "newco" });
    if (body.intent) {
      await sanity
        .patch(newcoEventId(number))
        .set({ intentAt: now, intentChannel: String(body.intent).slice(0, 20), businessName: business, ...(body.phone ? { leadPhone: String(body.phone).slice(0, 40) } : {}), ...(body.name ? { leadName: String(body.name).slice(0, 80) } : {}) })
        .commit({ visibility: "async" });
    } else {
      await sanity
        .patch(newcoEventId(number))
        .setIfMissing({ firstScanAt: now, scanCount: 0, scanCountLetter: 0 })
        .set({ lastScanAt: now, lastSource: "letter", businessName: business })
        .inc({ scanCount: 1, scanCountLetter: 1 })
        .commit({ visibility: "async" });
    }
  } catch (e) {
    console.error("[newco-scan] sanity write failed:", (e as Error).message);
  }
  return new Response(null, { status: 204 });
}
