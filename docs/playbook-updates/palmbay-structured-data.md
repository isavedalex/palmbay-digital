# palmbay-structured-data: amendments (2026-11-06)

Paste these into the playbook in Obsidian. They come from the Ahrefs crawl of
palmbay.digital on 2026-11-04, which reported "Structured data has schema.org validation
error" and "Organization schema missing or incomplete". Other sites built from this
playbook show the same two issues.

**Root cause:** the playbook's business-node example passed `inLanguage: "en-GB"`, and
`@palmbay/sanity-seo` ≤ 1.1.1 emitted it. `inLanguage` is not a schema.org property of
LocalBusiness or Organization. Because the business node is rendered site-wide, every
indexable page had the error. Google's Rich Results Test ignores unknown properties,
which is why the error got past launch checks.

---

## §2 Rules: add

**Rule: only properties schema.org defines for the node's type.**
- `inLanguage` goes on **WebSite, WebPage (and subtypes), Article/BlogPosting, Menu**.
  **Never** put it on LocalBusiness (any subtype), Organization, Service or Person.
- Restaurant-only properties (`servesCuisine`, `acceptsReservations`, `hasMenu`) go only
  on FoodEstablishment subtypes (Restaurant, CafeOrCoffeeShop, Bakery, BarOrPub…).
- Use `@palmbay/sanity-seo` **≥ 1.2.0**. Its `graph()` checks every node against a
  per-type property allowlist: it **throws in `next dev`** and logs
  `[@palmbay/sanity-seo] Invalid JSON-LD` in production builds. Treat that log line as a
  build failure.

**Rule: the logo must be a real file.**
- Commit a square PNG, at least 112×112 (we use 512×512), legible on white, at
  `public/logo.png`. Pass `logo: { url: absoluteUrl("/logo.png"), width: 512, height: 512 }`.
  It is emitted as an `ImageObject`.
- Do not point the logo at `/icon.png` unless `app/icon.png` actually exists. A 404 logo
  is what Ahrefs reports as "Organization schema missing or incomplete".
- Check it: `curl -sI https://<host>/logo.png` must return `200`.

**Rule: the business node carries a `contactPoint`.**
```ts
contactPoint: {
  telephone: BUSINESS.phone.e164,
  email: BUSINESS.email,
  contactType: "customer service",
  areaServed: "GB",
  availableLanguage: ["English"],
},
```
Pass `knowsAbout` as a builder input (1.2.0+). Don't spread it onto the node afterwards.

## §3 Business node example: replace

```ts
localBusinessJsonLd({
  type: BUSINESS.schemaType,           // most specific subtype; never ProfessionalService / Photographer
  name, legalName, url: SITE_URL,
  logo: { url: absoluteUrl("/logo.png"), width: 512, height: 512 },
  image, description, telephone, email, priceRange,
  contactPoint: { telephone, email, contactType: "customer service", areaServed: "GB", availableLanguage: ["English"] },
  knowsAbout: [...],
  address, geo, hasMap, areaServed, sameAs, hasOfferCatalog,
  // NO inLanguage here. It lives on webSiteJsonLd / webPageJsonLd.
})
```

## Pre-launch checklist: add these steps

1. `npm run dev`, then open every indexable page. The 1.2.0 guard throws on screen if any
   property is invalid.
2. `npm run build`, then grep the output for `Invalid JSON-LD`. Expect nothing.
3. Paste each indexable URL into **validator.schema.org** and expect **0 errors, 0 warnings**.
   The Rich Results Test alone is **not enough**: it ignores unknown properties.
4. `curl -sI <logo url>` returns 200.

## New section: known-bad patterns

| Pattern | What Ahrefs / validators report |
|---|---|
| `inLanguage` on LocalBusiness / Organization / Service | schema.org validation error, on every page |
| Logo URL that 404s (`/icon.png` with no `app/icon.png`) | Organization schema missing or incomplete |
| `ProfessionalService` | deprecated type warning |
| `Photographer` | not a schema.org type (use `LocalBusiness` + `knowsAbout`) |
| Self-authored `aggregateRating` / `review` | ignored by Google (self-serving rule) |
| JSON-LD via `next/script` | not in the HTML, so crawlers see no structured data |

## New section: retrofitting existing sites

1. Vendor `@palmbay/sanity-seo` 1.2.0 (`vendor/palmbay-sanity-seo-1.2.0.tgz`), point
   `package.json` at it and run `npm install`. **This alone removes `inLanguage`** from the
   business and Service nodes, because the input is kept as deprecated and ignored.
2. Delete `inLanguage` from the `localBusinessJsonLd` / `serviceJsonLd` calls (tidy-up).
3. Check the logo URL returns 200. If not, add `public/logo.png` and switch to the
   `{url, width, height}` form.
4. Add `contactPoint`, and move `knowsAbout` into the builder call.
5. `npm run dev`. Fix anything the guard throws on.
6. validator.schema.org on the home page plus one inner page, then re-crawl in Ahrefs.
