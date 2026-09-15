import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schema";
import { resolve } from "./sanity/presentation/resolve";
import seofields, { createSeoHealthPane } from "sanity-plugin-seofields";
import { dashboardTool } from "@sanity/dashboard";
import { plausibleWidget } from "sanity-plugin-plausible-analytics";
import { openSeoWidget } from "./sanity/dashboard/openSeoWidget";

const PLAUSIBLE_SHARED_URL = process.env.NEXT_PUBLIC_PLAUSIBLE_SHARED_URL;
// A project's OpenSEO share link (OpenSEO > project > Settings > Sharing >
// Create share link). Read-only and token-authenticated — no separate login
// needed for this tab. Must stay a non-Sensitive Vercel env var, same as
// NEXT_PUBLIC_PLAUSIBLE_SHARED_URL above: this file is bundled into the
// browser, so a Sensitive value reads as undefined here.
const OPENSEO_EMBED_URL = process.env.NEXT_PUBLIC_OPENSEO_EMBED_URL;

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (typeof location !== "undefined" ? location.origin : "http://localhost:3000");

export default defineConfig({
  name: "palmbay-digital",
  title: "Palm Bay Digital CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("SEO Health")
              .child(
                createSeoHealthPane(S, {
                  licenseKey:
                    process.env.NEXT_PUBLIC_SEOFIELDS_LICENSE_KEY || "",
                }),
              ),
            S.divider(),
            S.listItem()
              .title("Home Page")
              .child(
                S.document()
                  .schemaType("home")
                  .documentId("home-singleton"),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !["home"].includes(item.getId() as string),
            ),
          ]),
    }),
    presentationTool({
      previewUrl: {
        origin: SITE_URL,
        preview: "/",
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
        allowOrigins: [
          "https://palmbay.digital",
          "https://www.palmbay.digital",
          "https://*.vercel.app",
          "http://localhost:3000",
        ],
      },
      resolve,
    }),
    seofields({
      healthDashboard: {
        licenseKey: process.env.NEXT_PUBLIC_SEOFIELDS_LICENSE_KEY || "",
      },
    }),
    dashboardTool({
      name: "analytics",
      title: "Analytics",
      widgets: PLAUSIBLE_SHARED_URL
        ? [
            plausibleWidget({
              url: PLAUSIBLE_SHARED_URL,
              title: "Plausible Analytics",
              height: "2200px",
            }),
          ]
        : [],
    }),
    // Separate tab from Analytics: two unrelated iframes at different
    // heights fighting for scroll on one page isn't worth saving a tab for.
    // Named "Rank Tracking", not "SEO", so it doesn't read as a twin of the
    // seofields "SEO Health" pane (on-page fields vs. where the site ranks).
    dashboardTool({
      name: "rank-tracking",
      title: "Rank Tracking",
      widgets: OPENSEO_EMBED_URL
        ? [openSeoWidget({ url: OPENSEO_EMBED_URL, title: "Rank Tracking" })]
        : [],
    }),
    // The standalone `sanity-plugin-openseo` package (~/claude-code) does the
    // same job as openSeoWidget above; it was wired in here as a local-only
    // `file:` dependency, which Vercel cannot resolve, so the local widget is
    // the one that ships. Re-add the package only once it is published.
  ],
  schema: { types: schemaTypes },
});
