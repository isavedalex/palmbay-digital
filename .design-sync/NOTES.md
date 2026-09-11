# design-sync notes — palmbay.digital

## What this repo is
This is the Palm Bay Digital **Next.js site**, not a component library: no
`dist/`, no package exports, no Storybook. The sync therefore runs the package
shape in **synth-entry mode** off `components/`. Shipped components are page
sections plus a few primitives.

## Setup this repo needs (all already in config.json)
- **Self-link required.** `package-build.mjs` resolves the package at
  `node_modules/<pkg>`, which never exists for a repo that isn't published.
  Recreate it after any `npm install` that prunes it:
  `ln -sfn .. node_modules/palmbay.digital`
- **Tailwind must be compiled before every build.** `cfg.cssEntry` points at
  `.design-sync/generated/palmbay.css`, a build artifact — the raw
  `app/globals.css` is `@tailwind` source and ships no utilities. Regenerate with:
  `npx tailwindcss -c .design-sync/tailwind.sync.js -i app/globals.css -o .design-sync/generated/palmbay.css --minify`
  `.design-sync/tailwind.sync.js` re-exports the site config but widens `content`
  to include `.design-sync/previews/**`. **This matters:** utilities used only in
  authored preview cards (padding, grid, max-width) are otherwise never emitted,
  and cards render with collapsed spacing. That was a real failure on the first pass.
- **Framework shims.** `.design-sync/tsconfig.sync.json` maps `next/image` and
  `next/link` to plain `<img>`/`<a>` shims, and `@/app/actions/contact` to a stub
  (the real action pulls in resend/zod and is server-only). The paths plugin does
  not follow `extends`, so `paths` and `baseUrl` are declared literally in that file.

## Known render warns (triaged, not new)
- `[TOKENS_MISSING]` — ~10 vars (`--radix-*`, `--sidebar-*`, `--tw-shadow-color`,
  `--skeleton-width`, `--border-primary`). These come from the Relume preset for
  components this site never uses, and are set at runtime where they are used.
  Rendering is unaffected. Do not chase.
- `NavbarMobile` ships the typographic floor card — deliberate, out of the
  agreed scope for this sync.

## Known limitations
- **Images do not ship.** The package shape has no static-asset mechanism, so
  `/images/...` and `/fonts/...` absolute URLs do not resolve inside preview
  cards. `WorkSection` shows broken image placeholders and `StatementSection`
  shows empty device screens. The authored `LaptopFrame`/`PhoneFrame` previews
  work around this with base64 screenshots inlined from
  `.design-sync/shims/shots.ts`.
- `fonts/fonts.css` is emitted with absolute `url(/fonts/...)` paths that do not
  resolve. Fonts still render because `_ds_bundle.css` is imported *after* it and
  carries correctly-rewritten `./fonts/...` urls for the same families. Harmless
  today, but if font rendering ever breaks, look here first.
- Hero entrance animations (`animate-fade-in-up`, `animate-scale-in`) are still
  running when a card is captured, which washes the card out. The authored
  `HeroSection.tsx` freezes them with a local `.ds-still` style block. Any new
  preview of an animated section needs the same treatment.

## Re-sync risks
- The **base64 screenshots** in `.design-sync/shims/shots.ts` are copies of
  `public/images/work/ellwood-studio.jpg` (and its mobile variant). If those
  screenshots are recaptured, the preview cards keep showing the old ones until
  the data URIs are regenerated.
- The **compiled Tailwind CSS is a build artifact under `.design-sync/generated/`**
  and is gitignored. A fresh clone must recompile it (command above) or the build
  ships an empty stylesheet.
- `conventions.md` enumerates real class names verified against
  `_ds_bundle.css`. If `tailwind.config.js` changes its `palmbay` palette, font
  families, or animation names, re-validate those names.
- Components were verified against the **synth entry**, not a real library build.
  Adding a component that imports another Next-only module will need a new shim
  in `tsconfig.sync.json`.

## Re-sync command for this repo
Run these in order from the repo root — steps 1 and 2 are the repo-specific
prerequisites the generic driver does not do for you:

```sh
ln -sfn .. node_modules/palmbay.digital                     # 1. self-link (see above)
npx tailwindcss -c .design-sync/tailwind.sync.js \
  -i app/globals.css -o .design-sync/generated/palmbay.css --minify   # 2. compile CSS
node .ds-sync/resync.mjs --config .design-sync/config.json \
  --node-modules ./node_modules --out ./ds-bundle \
  --remote .design-sync/.cache/remote-sync.json             # 3. driver
```

Converter deps live in `.ds-sync/` (`npm i esbuild ts-morph @types/react playwright`).
npm may print an `allow-scripts` warning for esbuild's postinstall; the binary
still worked here — verify with
`node -e "require('esbuild').buildSync({stdin:{contents:'1'},write:false})"`
before assuming a build failure is caused by it.
