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
    videoUrl:
      "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4",
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
    videoUrl:
      "https://videos.pexels.com/video-files/3121459/3121459-hd_1920_1080_24fps.mp4",
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
    videoUrl:
      "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
    posterUrl: "/works/posters/cinnastratech.jpg",
    tags: ["Corporate", "Branding", "Motion"],
    services: [
      "Web Development",
      "Brand Design",
      "Animation & Motion",
      "SEO Optimisation",
    ],
  },
];
