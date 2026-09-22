import { createSeoAiHandler } from "@palmbay/sanity-seo/server";

// Backs the Studio's "Draft with AI" and "Generate alt text" buttons.
// Same-origin only, rate-limited, and will only describe images on this
// project's Sanity CDN. Needs ANTHROPIC_API_KEY (Sensitive) on Vercel.
export const POST = createSeoAiHandler({ language: "British English" });
