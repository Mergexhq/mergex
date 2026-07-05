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

export const worksData: Project[] = [
  {
    id: "01",
    title: "Dude Men's Wears",
    category: "E-Commerce Platform",
    summary:
      "A full-stack e-commerce platform for premium men's streetwear. Built with Next.js 16, React 19, and Supabase — featuring Razorpay payments, GST compliance, real-time analytics, and a comprehensive admin dashboard. Achieved 94 Lighthouse score and sub-2s page loads.",
    videoUrl: "/works/dude-mens-wear.mp4",
    posterUrl: "/works/posters/dude-mens-wear.jpg",
    tags: ["E-Commerce", "Full-Stack", "Payments"],
    services: [
      "Web Development",
      "UI/UX Design",
      "Payment Integration",
      "Admin Dashboard",
    ],
    liveUrl: "https://dudemw.com",
  },
  {
    id: "02",
    title: "Cedar Elevators",
    category: "B2B/B2C Industrial Platform",
    summary:
      "A comprehensive digital transformation for a traditional elevator parts distributor. Multi-tier user system with business verification, intelligent quote management, CSV bulk imports, and a 17-module admin panel across 70+ routes and 150+ components.",
    videoUrl: "/works/cedar-elevators.mp4",
    posterUrl: "/works/posters/cedar-elevators.jpg",
    tags: ["B2B", "E-Commerce", "Enterprise"],
    services: [
      "Full-Stack Development",
      "Quote Management System",
      "Business Verification",
      "CMS Integration",
    ],
  },
  {
    id: "03",
    title: "Mic and Mac",
    category: "D2C Clean Beauty",
    summary:
      "A direct-to-consumer e-commerce platform for clean, cruelty-free personal care. Built on Shopify with Liquid templating, emphasising brand storytelling, ingredient transparency, and sustainability — designed mobile-first for conscious consumers.",
    videoUrl: "/works/mic-and-mac.mp4",
    posterUrl: "/works/posters/mic-and-mac.jpg",
    tags: ["D2C", "Shopify", "Brand Identity"],
    services: [
      "Shopify Development",
      "Brand Storytelling",
      "UI/UX Design",
      "Performance Optimisation",
    ],
  },
  {
    id: "04",
    title: "Cinnastratech",
    category: "Corporate Website",
    summary:
      "A modern corporate web presence showcasing services, portfolio, and expertise. Built with Next.js 16 and Framer Motion — featuring 50+ reusable components, WCAG 2.1 AA accessibility, and 90+ Lighthouse scores with sub-2s initial loads.",
    videoUrl: "/works/cinnastratech.mp4",
    posterUrl: "/works/posters/cinnastratech.jpg",
    tags: ["Corporate", "Branding", "Motion"],
    services: [
      "Web Development",
      "Brand Design",
      "Animation & Motion",
      "SEO Optimisation",
    ],
  },
  {
    id: "05",
    title: "Hey Pro Data",
    category: "Corporate Website",
    summary:
      "A professional networking ecosystem and gigs marketplace designed exclusively for hiring and collaboration in the film and media industries.",
    videoUrl: "/works/hey-pro-data.mp4",
    posterUrl: "/works/posters/hey-pro-data.jpg",
    tags: ["Next.js", "Supabase", "Radix UI"],
    services: ["Platform Architecture", "API Development", "Web Development"],
  },
  {
    id: "06",
    title: "Zeko",
    category: "Corporate Website",
    summary:
      "An innovative RAG-architected platform that enables users to upload PDF documents and seamlessly extract information through an AI-powered conversational interface.",
    videoUrl: "/works/zeko.mp4",
    posterUrl: "/works/posters/zeko.jpg",
    tags: ["AI/LLM", "RAG Architecture", "Next.js"],
    services: ["AI Integration", "UI/UX Design", "Workflow Automation"],
  },
];
