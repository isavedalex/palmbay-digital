import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site-url";
import { INDEXABLE_ROUTES } from "@/lib/seo/pageMetadata";

// One entry per indexable route. Add new pages to INDEXABLE_ROUTES, not here.
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
