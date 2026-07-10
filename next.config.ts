import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dzl9yxixg/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: '/brands/mergex',
        destination: '/studio',
        permanent: true,
      },
      {
        source: '/brands/ovrn-studios',
        destination: '/studio',
        permanent: true,
      },
      {
        source: '/brands/academy',
        destination: '/launches',
        permanent: true,
      },
      {
        source: '/brands',
        destination: '/launches',
        permanent: true,
      },
      {
        source: '/methodology',
        destination: '/',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/',
        permanent: true,
      },
      {
        source: '/contact/diagnostic',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/sitemap',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;