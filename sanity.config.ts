import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./sanity/schema";
import { resolve } from "./sanity/presentation/resolve";
import seofields, { createSeoHealthPane } from "sanity-plugin-seofields";
import { searchConsolePlugin } from "sanity-plugin-ga-dashboard";
import { dashboardTool } from "@sanity/dashboard";
import { plausibleWidget } from "sanity-plugin-plausible-analytics";

const PLAUSIBLE_SHARED_URL = process.env.NEXT_PUBLIC_PLAUSIBLE_SHARED_URL;

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
      },
      resolve,
    }),
    seofields({
      healthDashboard: {
        licenseKey: process.env.NEXT_PUBLIC_SEOFIELDS_LICENSE_KEY || "",
      },
    }),
    searchConsolePlugin(),
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
  ],
  schema: { types: schemaTypes },
});
