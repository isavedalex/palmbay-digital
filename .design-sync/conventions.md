# Palm Bay Digital — how to build with this system

Palm Bay Digital is a small web studio in Margate, Kent. This library is the
studio's live homepage, componentised: full page **sections** plus a few
primitives. Build pages by stacking sections, not by assembling atoms.

## No provider, no theme setup

Components are plain React — there is no context provider, theme object, or
root wrapper. Render any component directly. All styling comes from
`_ds/<folder>/styles.css`, which `@import`s the brand `@font-face` rules and
the compiled component CSS. Include that one stylesheet and everything is
styled; without it every card renders in a system font on a white ground.

## The styling idiom: Tailwind utility classes

This is a Tailwind v3 system built on the Relume preset. Style your own layout
glue with utilities, and use the brand families below rather than raw hex —
the compiled stylesheet defines exactly these, and nothing else brand-specific.

| Family | Classes that exist | Use for |
|---|---|---|
| Brand blue | `bg-palmbay-bluebg`, `text-palmbay-bluebg` | The signature full-bleed section background (`#4B52D9`) |
| Brand pink | `bg-palmbay-pink`, `text-palmbay-pink` | CTA faces; eyebrow text on blue |
| Deep pink | `bg-palmbay-darkpink`, `text-palmbay-darkpink`, `border-palmbay-darkpink` | The button's offset edge; eyebrow text on white |
| Type | `font-monument`, `font-formula`, `font-helvetica` | Headings / eyebrows / body — see below |
| Motion | `animate-fade-in-up`, `animate-scale-in`, `animate-marquee`, `animate-delay-100` … `animate-delay-500` | Entrance animations, staggered by delay |

Everything else is stock Tailwind (`px-[5%]`, `md:text-5xl`, `grid`, `gap-8`).

## Typography — three families, three jobs

- **`font-monument`** (PP Monument Extended) — headings only, `h1`/`h2`. Wide
  and heavy; always pair with tight leading (`leading-[1.1]`) and never use it
  for body copy.
- **`font-formula`** (PP Formula) — eyebrows/kickers only: small, uppercase,
  `tracking-[0.2em]`, pink.
- **`font-helvetica`** — body copy, buttons, everything else.

The eyebrow → Monument heading → intro stack is the house pattern; use
`SectionHeading` rather than rebuilding it.

## Section conventions

Sections are full-bleed and own their own background and padding — put them as
direct children of the page, never inside a container. The house rhythm is
`px-[5%] py-16 md:py-20`, with an inner `container mx-auto`. Alternate white
sections against `bg-palmbay-bluebg` ones for contrast; on a blue section pass
`tone="light"` to `SectionHeading` so the eyebrow and text invert.

## Where the truth lives

Read `_ds/<folder>/styles.css` (and its imports) before styling, and the
per-component `<Name>.prompt.md` and `<Name>.d.ts` before using a component —
they carry the real props.

## An idiomatic build

```jsx
<section className="bg-palmbay-bluebg px-[5%] py-16 md:py-20">
  <div className="container mx-auto">
    <SectionHeading
      tone="light"
      eyebrow="What we do"
      title="Everything your website needs, in one place"
      intro="Design, build, hosting and search, from the same people who built it."
    />
    <div className="mt-10 flex flex-wrap gap-4">
      <BrandButton href="#contact">Let’s talk</BrandButton>
      <BrandButton href="#work" variant="ghost">See our work</BrandButton>
    </div>
  </div>
</section>
```

`BrandButton` variants are surface-specific: `primary` (pink, on white or
blue), `ghost` (white outline — **blue backgrounds only**), `dark` (dark
outline — **white backgrounds only**).
