import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site-url";

// Replaces the former static public/robots.txt, which hardcoded the host and
// advertised /studio and /api to crawlers. The sitemap URL now derives from the
// canonical host constant — see the `palmbay-canonical-host` skill.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api/"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
