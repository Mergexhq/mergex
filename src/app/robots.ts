import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mergex.in';

/**
 * robots.ts
 *
 * Allow policy:
 *   - All standard crawlers: allowed everywhere except private paths.
 *   - AI crawlers: ALLOWED on public pages so MergeX can be cited and
 *     indexed by ChatGPT, Perplexity, Claude, Gemini, and similar systems.
 *     Blocking these bots prevents GEO discoverability entirely.
 *
 * Disallow policy (all bots):
 *   - /console/  — Sanity Studio proxy (never public)
 *   - /api/      — API routes (not intended for crawlers)
 *   - /_next/    — Next.js internals
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/console/',
          '/api/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
