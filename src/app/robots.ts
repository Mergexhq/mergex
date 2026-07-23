import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mergex.in';

/**
 * robots.ts
 *
 * GOAL: Maximize GEO discoverability while protecting private routes.
 *
 * AI answer engines - ChatGPT, Perplexity, Claude, Gemini, Google AI
 * Overviews - learn about MergeX by crawling the site. Blocking their
 * crawlers is the single most damaging thing you can do to GEO: the site
 * becomes invisible to those systems and can never be cited. They are
 * therefore explicitly ALLOWED below.
 *
 * Disallow policy (applies to EVERY bot, including Googlebot/Bingbot):
 *   - /console/  - Sanity Studio proxy (never public)
 *   - /api/      - API routes (not intended for crawlers)
 *   - /_next/    - Next.js internals
 *
 * AI crawlers explicitly allowed (named for documentation, not for gating):
 *   - GPTBot, ChatGPT-User   → OpenAI / ChatGPT
 *   - PerplexityBot          → Perplexity
 *   - ClaudeBot, Claude-Web  → Anthropic / Claude
 *   - Google-Extended        → Gemini & Google AI Overviews
 *
 * Intentionally NOT singled out (governed by the '*' rule like every bot):
 *   - CCBot      → Common Crawl (open dataset). Fetched into models that
 *                  MergeX cannot be cited by. Left allowed under the
 *                  wildcard today for simplicity; if budget/throttling
 *                  becomes a concern, add an explicit Disallow here.
 *   - Amazonbot  → Amazon. Same reasoning as CCBot.
 *   - Bytespider → ByteDance / TikTok. Same reasoning as CCBot.
 *
 * These general-purpose scrapers are NOT answer engines; being in their
 * datasets does not earn MergeX a citation. They are left allowed under
 * the wildcard rather than blocked, because (a) the wildcard already
 * forbids the only routes that matter (/console, /api) and (b) blocking
 * them by name can trigger scraping-behaviour fingerprinting. Revisit if
 * bandwidth or content-scraping abuse becomes a problem.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Wildcard rule: every crawler, including AI bots, may crawl all
        // public routes. Private routes are forbidden to all.
        userAgent: '*',
        allow: '/',
        disallow: ['/console/', '/api/', '/_next/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
