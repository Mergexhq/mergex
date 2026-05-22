import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
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
