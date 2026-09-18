# Palm Bay Digital — SEO Plan

Created: 2026-09-18
Driven by: OpenSEO audit + local SEO + keyword research run 2026-09-18 (project `dd5f25c5`), Search Console (last 3 months), Studio SEO Health rubric (`sanity-plugin-seofields`).
Author: Claude Code with Alex
Scope: palmbay.digital only. Out of scope: client sites, coldsite previews, paid ads.

## Where we are (evidence, not opinion)

| Signal | Today | Best competitor | Source |
|---|---|---|---|
| Organic, "margate web designer" (Margate) | **#33** desktop & mobile, was #30–31 last week | Kate E Williamson #5, Smart Websites #6, 9G #7 | Rank tracker 2026-09-18 |
| Organic, "web design margate" | avg pos 22, 12 impressions / 3 mo, 0 clicks | — | Search Console |
| All Search Console queries, 3 months | **50 impressions, 0 clicks** | — | Search Console |
| Google Maps, "web designer margate" | **#7**, service-area listing (address hidden), 2 reviews, 2 photos | Johnston Marketing #1: 333 reviews, 117 photos, 4 extra categories, street address | Local SERP |
| Local 3-pack for "web design margate" | not in it | Margate Digital, Johnston, Kate E Williamson | Organic SERP |
| Backlinks | 28 referring domains, **all junk** (21 PBN "buy backlinks" scraper pages, 7 URL-shortener bots). Zero real links. | Johnston has a ranking blog post + 333 reviews | Backlinks profile |
| Client footer credits (dofollow) | corkandcapture.com, minnow.eco, palmsbuild.co link back; yourboldbirth, palmspizzeria, kindercollective do not (or not live) | — | Verified by fetching each footer |
| Indexable pages | 1 (homepage) + /terms | Competitors have dedicated "Web Design Margate" location pages | Site audit (2 pages, 0 issues) |
| Homepage on-page | 702 words. H1 has no service or place word. "web designer" appears 0 times. 1 internal link. | — | Fetched live HTML |
| Studio SEO Health | 100/100 after 2026-09-18 fixes (was 70) | — | Rubric read from plugin source |

### What this means

1. **The Margate terms are tiny.** "web design margate" / "margate web designer" show no measurable volume (<10/mo); 12 impressions in three months confirms it. Even #1 is worth a handful of visits a month. Worth having, not worth building the strategy around.
2. **The real prize is one step wider.** These are cheap and exactly your proposition:

   | Keyword | Volume/mo (UK) | Difficulty | Intent |
   |---|---|---|---|
   | small business website design | 880 | 7 | commercial |
   | web design kent | 880 | 15 | commercial |
   | web designer kent | 320 | 15 | commercial |
   | website design kent | 170 | 29 | commercial |
   | affordable websites for small business | 110 | 19 | commercial |
   | small business website packages | 50 | 1 | commercial |
   | website design canterbury | 90 | 6 | commercial |
   | web design canterbury | 90 | 9 | commercial |

   Difficulty 1–15 on 880/mo terms is unusual. These are winnable with one good page each plus a handful of real links.
3. **Position 33 is an authority + relevance problem, not a technical one.** The audit is clean. The page just doesn't say "web designer" and nothing real links to it. Google is ranking Dreamland roller-coaster videos above you for "web design margate" because the SERP is thin and you give it almost nothing to hold on to.
4. **The Maps listing is the fastest win.** You're already #7 with 2 reviews. Johnston's 333 reviews are the moat, but #2 and #3 have 15 and 5. Ten honest reviews from existing clients gets you into contention for the 3-pack.

---

## The one thing to do this week

**Ask every client for a Google review, and add the footer link to the three sites that don't have it.**

- Six clients, one message each. Reviews are the single biggest gap between you (#7) and the 3-pack (#2 has 15). Link: your GBP review URL (Google Business Profile → "Ask for reviews").
- Suggested message: "Hi X — quick favour. If you're happy with the site, a short Google review would help other local businesses find us. It takes a minute: [review link]. Thanks!"
- Footer credit on yourboldbirth.co.uk, palmspizzeria.com, kindercollective.co.uk: check they're live and carry `<a href="https://palmbay.digital">Site by Palm Bay Digital</a>` (dofollow, as on cork/minnow/palmsbuild). Those are your only real backlinks; six is twice three.

---

## Priority order

### P0 — this week (no code, no cost)

1. **Reviews** — as above. Target: 10 within 30 days.
2. **GBP completeness** (Google Business Profile admin):
   - Add secondary categories to match the leader: *Design agency*, *Marketing agency*, *Web hosting company* (you already have Graphic designer, Internet marketing service, Marketing consultant).
   - Photos: upload 15–20 — screenshots of each client site, the OG image, you at work. Leader has 117; #3 has 29; you have 2.
   - Service areas: fill all 20 slots — Margate, Cliftonville, Westgate-on-Sea, Birchington, Broadstairs, Ramsgate, Herne Bay, Whitstable, Canterbury, Deal, Sandwich, Faversham, Folkestone, Ashford, Maidstone, Dover, Sittingbourne, Gillingham, Chatham, Tunbridge Wells.
   - Services: add one per keyword, ≤58-char title, ≤300-char description — "Small business website design", "Website subscription (£20/month)", "Website hosting & updates", "Local SEO for small businesses", "Google Business Profile setup".
   - Website field: change `www.palmbay.digital` → `https://palmbay.digital` (apex is canonical; www 308s).
   - Consider showing the registered address (Highcliffe Hall, CT9 2JB). Every listing above you in Maps except two shows a street address. If you'd rather not, leave hidden — reviews and photos matter more.
3. **Post on GBP weekly** — 100–200 words, one image, mirror the blog cadence below. Zero posts today.
4. **Footer credits** on the three client sites missing them.

### P1 — next two weeks (content + code, one commit per page, `npm run build` each)

5. **Fix the homepage title and H1** — Sanity `home.seo.title` and `home.heading`:
   - `seo.title`: **"Web Designer in Margate, Kent | Palm Bay Digital"** (48 chars — keeps the exact search phrase, fixes the missing separator, stays ≤60).
   - Keep the H1 voice but add the service: **"Websites for small businesses that want to be found."** stays as the hero, and the first H2 becomes **"Web design in Margate, Kent — on a £20/month subscription"**. Alternatively swap the H1 for "Small business web design in Margate, Kent" and demote the current line to a subheading. Your call; the first option keeps the brand voice.
   - Body: work "web designer", "web design", "Kent" and "small business website" into existing paragraphs — no stuffing, 2–3 natural mentions each. Currently "web designer" = 0.
   - `seo.keywords`: append (never replace) `web design margate`, `web designer margate`, `web design kent`, `small business website design`, `affordable websites for small business`, `website subscription`.
6. **Build three landing pages.** This is what every competitor above you has and you don't. Each 600–900 words, unique copy, one H1, FAQ section, internal links to each other and home, `seo` fields complete (title ≤60, desc 140–155, meta image = OG image). Suggested routes and targets:

   | Route | H1 | Primary keyword | Secondary |
   |---|---|---|---|
   | `/web-design-kent` | Web design for small businesses across Kent | web design kent (880) | web designer kent, website design kent |
   | `/small-business-websites` | Small business website design, £20 a month | small business website design (880) | affordable websites for small business, small business website packages |
   | `/web-design-margate` | Web designer in Margate & Thanet | web design margate | margate web designer, web design broadstairs/ramsgate |

   Then, if those move: `/web-design-canterbury` (90+90/mo, KD 6–9).

   Sanity: add a `landingPage` document type (or reuse `home`'s shape) with `seo: seoFields` and the publish-blocking validator from the SEO playbook §2. Sitemap picks them up from `app/sitemap.ts`. Submit via IndexNow after deploy.
7. **Nav links.** Currently 1 internal link. Put the three new pages in the header/footer so they get crawled and pass authority.

### P2 — ongoing (authority)

8. **Real links, ten of them.** Cheap and local beats expensive and generic:
   - Every client site footer (done above) — 6.
   - Thanet/Kent business directories: Thanet Chamber of Commerce, Kent Invicta Chamber, Margate Town Team / Margate Now, Locality Thanet, Yell, Bark, FreeIndex, Clutch/DesignRush (agency listings).
   - A case study or "site by" mention on each client's own About page where they'd be happy to.
   - One local piece: "How much should a small business website cost in Kent in 2026?" — the kind of page directories and local Facebook groups link to. Also mirrors your best keyword.
9. **Blog, fortnightly**, each post = one keyword from the table, 600–900 words, GBP post 3 days later. First five: (a) the cost post above, (b) "Why we charge £20 a month instead of £2,000 up front", (c) "Google Business Profile: the 20-minute setup every Margate business skips", (d) "Do I need a website if I have Instagram?" (trades/hospitality), (e) "Squarespace vs a managed site: what small businesses actually pay".
10. **Spam links** — the 21 PBN pages are scraper junk that lists every domain; Google ignores them. Do not disavow (no manual action; disavow can only hurt). Re-check in the backlink overview in 3 months.

---

## Rank tracker

Add to the weekly tracker (needs your OK — each keyword ≈ 2 SERP checks/week, desktop + mobile):
`web design kent`, `web designer kent`, `small business website design`, `affordable websites for small business`, `small business website packages`, `web design margate`.
Consider removing `margate digital` (brand of a competitor) and `web design near me` (unmeasurable — depends on searcher location).

## Definition of done (30 days)

- [ ] 10+ Google reviews, GBP ≥ 15 photos, 20 service areas, 5 services, weekly post
- [ ] Six client sites carry a dofollow footer link
- [ ] Homepage title/H1/body updated, keywords appended, SEO Health still 100
- [ ] `/web-design-kent`, `/small-business-websites`, `/web-design-margate` live, in nav, in sitemap, IndexNow submitted
- [ ] Two blog posts published, two GBP posts mirrored
- [ ] Tracker: "margate web designer" ≤ 15, Maps ≤ 5

## What NOT to do

- Do not buy links or respond to any of the "DA 50 PBN" pages linking to you.
- Do not keyword-stuff the GBP business name ("Palm Bay Digital – Web Design Margate" will get the listing suspended).
- Do not make the homepage a client component or add dependencies for any of this.
- Do not replace `seo.keywords`; append.
- Do not disavow.

## Method

Tools reported: OpenSEO rank tracker, Search Console (3 months), site audit (2 pages), backlinks overview + profile, Maps SERP (20 rows, zoom 13, Margate), organic SERP depth 40 for "web design margate" (the "margate web designer" SERP fetch failed — tracker data used instead), keyword research for 3 seeds. Verified by hand: live homepage headings/word count/links/JSON-LD, www→apex 308, each client footer for the credit link, the SEO Health rubric by reading the plugin's `calculateHealthScore`. Skipped to save credits: 3×3 rank grid (Maps evidence was already conclusive), competitor review pulls, domain overview.
