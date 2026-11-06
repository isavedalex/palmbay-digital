# palmbay-canonical-host: amendments (2026-11-06)

Paste these into the playbook in Obsidian. They come from the Ahrefs crawl of
palmbay.digital on 2026-11-04, which reported: Open Graph URL not matching canonical;
indexable page not in sitemap; page has only one dofollow incoming internal link;
HTTP→HTTPS redirect; 3XX redirect; redirect chain; more than three parameters in URL.

---

## Rule: og:url and canonical come from one `path`

Next.js **replaces** the layout's `openGraph` when a page sets one, and **inherits it
whole** when a page doesn't. A page that sets only `alternates.canonical` keeps the
layout's `og:url` (the home page), and Ahrefs flags "Open Graph URL not matching canonical".

- Every indexable page that isn't driven by the Studio uses `pageMetadata()` from
  `lib/seo/pageMetadata.ts`, which sets `alternates.canonical`, `openGraph.url`,
  og/twitter title, description and image from a single `path`.
- Studio-driven pages keep using `buildSeoMeta({ path })`, which already does the same.
- Pass the **bare** page title. The layout template adds `| Brand`. Writing
  `"Page | Brand"` renders the brand twice.

## Rule: one list of indexable routes feeds the sitemap

- `INDEXABLE_ROUTES` in `lib/seo/pageMetadata.ts` is the only list of indexable static
  routes. `app/sitemap.ts` maps over it, and CMS collections are appended with
  `indexableFilter`.
- A new indexable page = add it to `INDEXABLE_ROUTES` in the same commit.
- Private / noindex pages (`/offers`, `/go-live`, `/new`, previews) stay out of it, and
  out of the sitemap, and are disallowed in `robots.ts`.

## Rule: every indexable page gets at least 2 dofollow internal links from different pages

A footer-only link counts as one. Add a contextual link in body copy (e.g. the contact
section) as well as the footer. Pages like the CMS handbook need at least a footer link.
Otherwise they are orphans.

## Rule: audit tools use the canonical host

- Ahrefs Site Audit, GSC, PageSpeed and the seo-suite crawler are seeded with the
  **`https://` canonical host** (e.g. `https://palmbay.digital/`), never `http://` and never
  the non-canonical `www`/apex variant. Seeding `http://` creates HTTP→HTTPS, 3XX and
  redirect-chain notices that describe the seed URL, not the site.
- In Ahrefs project settings, exclude the private parameterised pages (`/go-live*`,
  `/offers*`, `/new*`) or set URL parameters to be ignored. They are noindex and
  robots-disallowed, but their QR/preview links carry 3+ query parameters.

## Rule: www → apex in one hop

In Vercel → Domains, set the non-canonical host to **redirect (308) straight to the
canonical `https://` host**, not "serve the same deployment". `http://www` will still go via
`https://www` (Vercel's HTTPS upgrade happens first, so it can't be avoided). Nothing links
to it, and once the audit seed is right it drops out of the crawl.

## Launch checklist: add these steps

- [ ] `og:url` equals `<link rel="canonical">` on every indexable page:
      `curl -s <url> | grep -E 'rel="canonical"|og:url'`
- [ ] `/sitemap.xml` lists every route in `INDEXABLE_ROUTES` (plus CMS entries).
- [ ] Each indexable page has 2 or more internal links from different pages.
- [ ] Ahrefs project start URL = `https://<canonical host>/`; private pages excluded.
