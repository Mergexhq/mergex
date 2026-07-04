export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  videoUrl: string;
  tags: string[];
  /** Services delivered — shown as chips (e.g. "Web Development"). */
  services?: string[];
  /** Live site URL for the "Visit site" button. */
  liveUrl?: string;
}

export const worksData: Project[] = [
  {
    id: "01",
    title: "Aura",
    category: "Brand Identity",
    summary: "A modern reimagining of digital wellness through ethereal aesthetics and calm interactions.",
    videoUrl: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
    tags: ["Branding", "UI/UX", "Motion"]
  },
  {
    id: "02",
    title: "Vanguard",
    category: "Financial Tech",
    summary: "Disrupting the traditional banking experience with bold typography and seamless transitions. We completely overhauled their core user journeys, introducing a dark-mode first design system that prioritizes legibility and data visualization. The new architecture supports real-time market data streaming while maintaining strict 60fps animations across all interactive charts and financial dashboards.",
    videoUrl: "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4",
    tags: ["Fintech", "Web Design", "Development"]
  },
  {
    id: "03",
    title: "Onyx",
    category: "E-Commerce",
    summary: "A dark-mode exclusive luxury fashion platform built for performance and high-end conversion.",
    videoUrl: "https://videos.pexels.com/video-files/3121459/3121459-hd_1920_1080_24fps.mp4",
    tags: ["E-Commerce", "Strategy", "3D"]
  },
  {
    id: "04",
    title: "Nexus",
    category: "Web3 Infrastructure",
    summary: "Visualizing complex blockchain data through generative art and interactive storytelling.",
    videoUrl: "https://videos.pexels.com/video-files/3121459/3121459-hd_1920_1080_24fps.mp4",
    tags: ["Web3", "Data Viz", "Branding"]
  },
  {
    id: "05",
    title: "Lumina",
    category: "Editorial Platform",
    summary: "Elevating digital journalism with editorial layouts and immersive scroll experiences.",
    videoUrl: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
    tags: ["Editorial", "Typography", "CMS"]
  },
  {
    id: "06",
    title: "Echo",
    category: "Audio Software",
    summary: "A sleek interface for the next generation of sound engineers, focusing on tactical feedback.",
    videoUrl: "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4",
    tags: ["App Design", "UX Research", "System"]
  },
  {
    id: "07",
    title: "Prism",
    category: "Brand Identity",
    summary: "A colorful, vibrant rebrand for a global creative agency.",
    videoUrl: "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4",
    tags: ["Branding", "Creative", "Motion"]
  },
  {
    id: "08",
    title: "Velocity",
    category: "Automotive",
    summary: "A high-octane digital experience for a new EV hypercar.",
    videoUrl: "https://videos.pexels.com/video-files/3121459/3121459-hd_1920_1080_24fps.mp4",
    tags: ["Automotive", "WebGL", "Performance"]
  },
  {
    id: "09",
    title: "Serenity",
    category: "Health & Wellness",
    summary: "A calm, minimalist app for guided meditation and mindfulness.",
    videoUrl: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
    tags: ["App Design", "Wellness", "UI/UX"]
  },
  {
    id: "10",
    title: "Apex",
    category: "Sports Tech",
    summary: "Data-driven performance tracking interface for elite athletes.",
    videoUrl: "https://videos.pexels.com/video-files/3121459/3121459-hd_1920_1080_24fps.mp4",
    tags: ["Data Viz", "Sports", "App Design"]
  },
  {
    id: "11",
    title: "Nova",
    category: "Space Exploration",
    summary: "An educational platform mapping the known universe in 3D.",
    videoUrl: "https://videos.pexels.com/video-files/3163534/3163534-hd_1920_1080_30fps.mp4",
    tags: ["Education", "3D", "Web Design"]
  },
  {
    id: "12",
    title: "Zenith",
    category: "Architecture",
    summary: "Showcasing modern architectural marvels through cinematic video tours.",
    videoUrl: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
    tags: ["Architecture", "Video", "Editorial"]
  }
];
