import type { Metadata } from "next";
import { Inter, Questrial } from "next/font/google";

import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const questrial = Questrial({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-questrial",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mergex.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "MergeX",
    template: "%s - MergeX",
  },

  description:
    "MergeX is an independent software and AI company specializing in software development, AI solutions, and AI creative production.",

  keywords: [
    "MergeX",
    "Software Development",
    "AI Solutions",
    "AI Creative Production",
    "AI Commercials",
    "AI Brand Films",
    "AI Product Videos",
    "AI Photography",
    "Motion Graphics",
    "Creative Experiments"
  ],

  authors: [{ name: "MergeX", url: siteUrl }],
  creator: "MergeX",
  publisher: "MergeX",

  openGraph: {
    title: "MergeX",
    description:
      "MergeX specializes in software development, AI solutions, and AI creative production.",
    url: siteUrl,
    siteName: "MergeX",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-cover.jpg",
        width: 1200,
        height: 630,
        alt: "MergeX | Software, AI, and Creative Production.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "MergeX",
    description:
      "MergeX specializes in software development, AI solutions, and AI creative production.",
    images: ["/og-cover.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: siteUrl,
  },

  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/icon0.svg", type: "image/svg+xml" },
      { url: "/favicon/icon1.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/favicon/manifest.json",
  appleWebApp: {
    title: "MergeX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`
        ${inter.variable}
        ${questrial.variable}
        h-full
        scroll-smooth
        antialiased
      `}
    >
      <head>
        <meta name="theme-color" content="#080808" />
        <meta name="apple-mobile-web-app-title" content="MergeX" />
      </head>

      <body
        className="
          min-h-full
          bg-background
          font-body
          text-foreground
          overflow-x-hidden
          selection:bg-purple-500/20
          selection:text-foreground
        "
      >
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
