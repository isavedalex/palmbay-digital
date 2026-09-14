/**
 * Server-side client for the coldsite engagement project (Sanity `leadEvent`
 * docs — the same store preview.palmbay.digital/tracking reads). Used only by
 * /api/newco-scan so NewCo letter scans and intents land next to postcard scans.
 * Separate env vars from this site's own Sanity project (uedqyf40).
 */
import { createClient, type SanityClient } from "next-sanity";

let client: SanityClient | undefined;

export function coldsiteSanity(): SanityClient {
  if (!client) {
    client = createClient({
      projectId: process.env.COLDSITE_SANITY_PROJECT_ID || "",
      dataset: process.env.COLDSITE_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      token: process.env.COLDSITE_SANITY_WRITE_TOKEN,
      useCdn: false,
    });
  }
  return client;
}

export const coldsiteEnabled = () => !!(process.env.COLDSITE_SANITY_PROJECT_ID && process.env.COLDSITE_SANITY_WRITE_TOKEN);

/** Same id scheme as the preview app's eventId(): `evt.<slug>`; NewCo slugs are `newco-<company number>`. */
export const newcoEventId = (companyNumber: string) => `evt.newco-${companyNumber}`;
