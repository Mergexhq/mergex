// Contact Page Content for MergeX

export const CONTACT_HERO = {
    headline: "Let's talk.",
    location: {
        label: "Located",
        city: "Chennai",
        country: "India"
    },
    contact: {
        label: "Contact",
        email: "hello@mergex.in"
    },
    founders: {
        label: "Connect with founders",
        list: [
            {
                name: "Manikandan S",
                role: "Founder & CEO",
                email: "manikandan@mergex.in"
            },
            {
                name: "Sharukesh P",
                role: "Co-founder & CIO",
                email: "sharukesh@mergex.in"
            }
        ]
    }
} as const;

export interface ConnectionPath {
    title: string;
    description: string;
    actionLabel: string;
    actionType: 'link' | 'email';
    target: string;
}

export const WAYS_TO_CONNECT: ConnectionPath[] = [
    {
        title: "Launches",
        description: "Explore the software, AI solutions, and digital experiences we've built.",
        actionLabel: "View Launches",
        actionType: "link",
        target: "/launches"
    },
    {
        title: "Studio",
        description: "Discover our AI-powered creative production work, commercials, product films, and visual storytelling.",
        actionLabel: "Visit Studio",
        actionType: "link",
        target: "/studio"
    }
];

export interface EngagementCard {
    title: string;
    description: string;
    actionLabel: string;
    bgImage: string;
    target: string;
}

export const BOTTOM_CARDS: EngagementCard[] = [
    {
        title: "Partnerships",
        description: "We work closely with founders, startups, and established businesses to build software, AI solutions, and creative productions that create lasting value.",
        actionLabel: "contact@mergex.in",
        bgImage: "/background/partner.png",
        target: "mailto:contact@mergex.in"
    },
    {
        title: "We keep our team intentionally small.",
        description: "We're looking for curious builders, thoughtful designers, engineers, and creative problem-solvers who care about quality more than quantity.",
        actionLabel: "careers@mergex.in",
        bgImage: "/background/Career.png",
        target: "mailto:careers@mergex.in"
    }
];
