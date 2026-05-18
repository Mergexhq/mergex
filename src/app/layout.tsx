import type { Metadata } from "next";
import { Manrope, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";
import LayoutShell from "@/components/LayoutShell";

/* ─── Fonts ─────────────────────────────────────────────────────────── */
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  display: "swap",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: "swap",
});

/* ─── Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "The MergeX Company — Scale is not luck. It's structure.",
  description: "The scaling ecosystem for ambition.",
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/favicon/site.webmanifest' },
    ],
  },
};

/* ─── Root Layout ────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${playfair.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full font-body text-foreground">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
