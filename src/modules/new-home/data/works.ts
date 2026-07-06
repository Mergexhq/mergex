export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  videoUrl: string;
  /** First-frame poster — shown instantly while the video loads in the background. */
  posterUrl: string;
  tags: string[];
  /** Services delivered — shown as chips (e.g. "Web Development"). */
  services?: string[];
  /** Live site URL for the "Visit site" button. */
  liveUrl?: string;
}

const buildId = process.env.NEXT_PUBLIC_BUILD_ID || '1';
const versioned = (url: string) => url.includes('?') ? `${url}&v=${buildId}` : `${url}?v=${buildId}`;

export const worksData: Project[] = [
  {
    id: "01",
    title: "Cedar Elevators",
    category: "B2B/B2C Industrial Platform",
    summary:
      "Phone calls and manual quotes were costing them scale. We built a B2B e-commerce platform with automated quotes, live inventory, and verified purchasing. Orders that took days now take minutes.",
    videoUrl: versioned("/works/cedar-elevators.mp4"),
    posterUrl: versioned("/works/posters/cedar-elevators.jpg"),
    tags: ["B2B", "E-Commerce", "Enterprise", "Industrial Equipment"],
    services: [
      "Full-Stack Development",
      "Quote Management System",
      "Business Verification",
      "CMS Integration",
    ],
  },
  {
    id: "02",
    title: "Cinnastratech",
    category: "Corporate Website",
    summary:
      "Great technology, underwhelming web presence. We rebuilt it with performance-first architecture, SEO structure, and UI that earns trust on first scroll. Now the website works as hard as the product.",
    videoUrl: versioned("/works/cinnastratech.mp4"),
    posterUrl: versioned("/works/posters/cinnastratech.jpg"),
    tags: ["Corporate", "Branding", "Motion", "AI & Digital Engineering"],
    services: [
      "Web Development",
      "Brand Design",
      "Animation & Motion",
      "SEO Optimisation",
    ],
  },
  {
    id: "03",
    title: "Dude Men's Wears",
    category: "E-Commerce Platform",
    summary:
      "WhatsApp orders were the ceiling. We built a premium e-commerce store that matched the quality of the collections. Monthly revenue went from ₹1–2 lakh to nearly ₹10 lakh.",
    videoUrl: versioned("/works/dude-mens-wear.mp4"),
    posterUrl: versioned("/works/posters/dude-mens-wear.jpg"),
    tags: ["E-Commerce", "Full-Stack", "Payments", "Premium Menswear"],
    services: [
      "Web Development",
      "UI/UX Design",
      "Payment Integration",
      "Admin Dashboard",
    ],
    liveUrl: "https://dudemw.com",
  },
  {
    id: "04",
    title: "Mic and Mac",
    category: "D2C Clean Beauty",
    summary:
      "Competing on ingredients in a market that stopped reading labels. We repositioned the brand around one idea — transit fatigue — and rebuilt everything from there. ₹12 lakh saved in annual marketing spend.",
    videoUrl: versioned("/works/mic-and-mac.mp4"),
    posterUrl: versioned("/works/posters/mic-and-mac.jpg"),
    tags: ["D2C", "Shopify", "Brand Identity", "Clean Beauty"],
    services: [
      "Shopify Development",
      "Brand Storytelling",
      "UI/UX Design",
      "Performance Optimisation",
    ],
  },
  {
    id: "05",
    title: "HeyProData",
    category: "Corporate Website",
    summary:
      "Film talent was everywhere. Infrastructure to connect them wasn't. We built the platform — portfolios, gigs, hiring, collaboration — in one place.",
    videoUrl: versioned("/works/hey-pro-data.mp4"),
    posterUrl: versioned("/works/posters/hey-pro-data.jpg"),
    tags: ["Next.js", "Supabase", "Radix UI", "Film Industry Network"],
    services: ["Platform Architecture", "API Development", "Web Development"],
  }
];
