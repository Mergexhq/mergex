import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://mergex.in';

export default function robots(): MetadataRoute.Robots {
  const aiScrapers = [
    'GPTBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-Web',
    'Google-Extended',
    'CommonCrawl',
    'Anthropic-ai',
    'PerplexityBot',
    'cohere-ai',
    'Omgilibot',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/console/',   // Sanity Studio proxy
          '/api/',       // API routes
          '/_next/',     // Next.js internals
        ],
      },
      ...aiScrapers.map((agent) => ({
        userAgent: agent,
        disallow: '/',
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
