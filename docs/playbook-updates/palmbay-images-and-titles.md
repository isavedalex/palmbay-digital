# Images and titles: playbook amendments (2026-11-06)

Paste these into the build playbook in Obsidian (wherever image and metadata rules live).
They come from the Ahrefs crawl of palmsbuild.co on 2026-11-04: "Image file size too
large" (3 pages), "Title too long" (3 pages) and "More than three parameters in URL" (2).

---

## Rule: cap `next/image` widths at 1920

The `src` attribute of every `next/image` is the **largest** generated size (default
`w=3840`). Crawlers such as Ahrefs don't send `Accept: image/avif`, so they download that
URL as JPEG. A 3000×4000 phone photo came out at **1.55 MB** and was flagged as too large.

In `next.config.ts`:

```ts
images: {
  formats: ["image/avif", "image/webp"],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920], // no 2048/3840
  // qualities: [...] as the site needs
},
```

1920px covers retina at the `sizes` our layouts use (≤ 90vw on mobile, ~45vw on
desktop). The worst photo drops to about 730 KB as JPEG and about 335 KB as AVIF.

Check: `curl -s -H 'Accept: */*' -o /dev/null -w '%{size_download}' "<site>/_next/image?url=…&w=1920&q=62"`
should be under 1 MB for the heaviest photo on the site.

## Rule: titles fit in 60 characters including the brand suffix

The layout template `"%s | Brand"` adds `brand.length + 3` characters to every CMS
title. The Studio's SEO tab warns editors about this, but nothing enforced it.

- `buildMetadata()` uses a `fitTitle()` guard. If `title + " | Brand"` would go over
  60 characters, it returns `{ absolute: title }` so the page renders without the brand.
  Short titles keep it. (Reference: `palms-build.co/lib/sanity/seo.ts`.)
- Editors still aim for **≤ 60 − (brand + 3)** characters so the brand shows. For
  "Palms Build.Co" that's 43.

## Rule: `/_next/image` params are expected, so exclude them from audits

On Vercel, local images get `?url=&w=&q=&dpl=` (4 params; `dpl` is skew protection).
Ahrefs reports these as "More than three parameters in URL". This is harmless. In the
Ahrefs project settings, exclude `/_next/image` or ignore URL parameters. Don't change
code for it.

## Launch checklist: add these steps

- [ ] `next.config.ts` `images.deviceSizes` tops out at 1920.
- [ ] No rendered `<title>` over 60 characters:
      `curl -s <url> | grep -o '<title>[^<]*'` on the hubs and the longest town page.
- [ ] Ahrefs project start URL = the `https://` canonical host (www or apex as declared),
      with `/_next/image` excluded.
