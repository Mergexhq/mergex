/** @type {import('tailwindcss').Config} */

module.exports = {
  // Important: This ensures Tailwind's styles are properly layered
  // and don't conflict with external component styles

  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#a855f7",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f3f4f6",
          foreground: "#6b7280",
        },
        border: "rgba(255, 255, 255, 0.1)",
        input: "rgba(255, 255, 255, 0.2)",
        ring: "#a855f7",
        accent: {
          DEFAULT: "rgba(168, 85, 247, 0.1)",
          foreground: "#a855f7",
        },
      },
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "orbit": "orbit var(--duration) linear infinite",
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(var(--radius)px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(var(--radius)px) rotate(-360deg)" },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
  
  // Safelist ensures these classes are always included, even when not detected in the codebase
  // This is useful for dynamically generated classes or classes added by external components
  safelist: [
    // Core layout classes that should never be purged
    'grid', 'flex', 'hidden', 'block', 'inline-block', 'absolute', 'relative', 'fixed', 'sticky',
    // Important utility classes
    'w-full', 'h-full', 'p-0', 'm-0', 'overflow-hidden', 'overflow-auto',
    // Animation classes
    'animate-fadeIn', 'animate-progress', 'animate-pulse', 'animate-pulse-slow', 'animate-orbit',
    // Gradient and color classes that might be dynamically generated or CMS-driven
    'bg-gradient-to-r', 'from-purple-500', 'to-indigo-900', 'text-purple-500', 'text-indigo-900',
    'bg-gradient-to-tl', 'from-gray-700', 'to-gray-900', // Example: if you have other gradients
    'bg-background', 'text-foreground', // Ensure custom CSS variables are not purged
  ],
};