/**
 * CANONICAL HOST — the single source of truth for this site's public origin.
 *
 * Declared host: apex (measured live 2026-09-04 — palmbay.digital serves 200,
 * www.palmbay.digital 308s to it). Sites already established on a host KEEP it;
 * apex is only the default for NEW domains.
 *
 * The PRODUCTION URL is the fallback, never localhost. A missing
 * NEXT_PUBLIC_SITE_URL once shipped localhost URLs to Google (palms-pizzeria);
 * bare-apex URLs on a www site produced 29 Ahrefs "canonical points to
 * redirect" errors (cork-and-capture, 635fcbd). The env var still overrides for
 * preview deploys; a missing var can no longer break production.
 *
 * Nothing else in this repo may contain an absolute host literal.
 * Enforced by canonical-host-check.sh — see the `palmbay-canonical-host` skill.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://palmbay.digital"
).replace(/\/$/, "");

/** Bare host, e.g. "palmbay.digital" — for robots `host` and assertions. */
export const SITE_HOST = new URL(SITE_URL).host;

/** Absolute URL for a site-relative path. absoluteUrl("/") === SITE_URL. */
export const absoluteUrl = (path = "/"): string =>
  path === "/" || path === ""
    ? SITE_URL
    : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
