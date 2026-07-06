import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID: process.env.NODE_ENV === 'development' ? 'dev' : Date.now().toString(),
  },
  /* ── Dev Server Tunnel Support ───────────────────────────────── */
  allowedDevOrigins: [
    'localhost',
    '*.localhost',
    '*.ngrok-free.app',
    '*.ngrok.app',
    '*.ngrok.io',
    '*.trycloudflare.com',
    '*.localtunnel.me',
    '*.pinggy.link',
    '*.loclx.io',
    '*.expose.dev',
    '*.tunnelto.dev',
    '*.lvh.me',
    '*.tunnel.dev',
    '*.sharedwithexpose.com',
  ],

  /* ── Server Actions (if any) Tunnel Support ──────────────────── */
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost',
        '*.localhost',
        '*.ngrok-free.app',
        '*.ngrok.app',
        '*.ngrok.io',
        '*.trycloudflare.com',
        '*.localtunnel.me',
        '*.pinggy.link',
        '*.loclx.io',
        '*.expose.dev',
        '*.tunnelto.dev',
        '*.lvh.me',
        '*.tunnel.dev',
        '*.sharedwithexpose.com',
      ],
    },
  },

  /* ── Performance ─────────────────────────────────────────────── */
  compress: true,           // Enable gzip/brotli compression
  poweredByHeader: false,   // Remove X-Powered-By: Next.js (security)

  /* ── Images ──────────────────────────────────────────────────── */
  images: {
    formats: ['image/avif', 'image/webp'], // Serve AVIF/WebP where supported
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  /* ── Security & Caching Headers ─────────────────────────────── */
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    const headersList = [
      {
        // Apply security headers to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];

    if (!isDev) {
      headersList.push(

        {
          // Cache public assets for 1 week
          source: '/favicon/(.*)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=604800, stale-while-revalidate=86400',
            },
          ],
        }
      );
    }

    return headersList;
  },

  /* ── Rewrites ────────────────────────────────────────────────── */
  async rewrites() {
    const isDev = process.env.NODE_ENV === 'development';
    return [
      {
        source: "/console/:path*",
        destination: isDev
          ? "http://localhost:3333/:path*"
          : "https://mergex-console.sanity.studio/:path*",
      },
    ];
  },
};

export default nextConfig;
