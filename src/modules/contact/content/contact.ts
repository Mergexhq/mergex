// Simplified Contact Page Content for MergeX 2.0

export const CONTACT_HERO = {
    headline: "Let's build together.",
    subheadline: "Tell us about your project, software requirements, or AI integration needs. We review all submissions internally and respond within 48 hours.",
} as const;

export const CONTACT_FORM = {
    ctaText: "Send Inquiry",
    areasOfInterest: [
        "Software Development",
        "AI Solutions",
        "AI Creative Production",
        "Other",
    ],
} as const;

export const CONTACT_NEXT_STEPS = {
    headline: "What to expect next",
    steps: [
        {
            number: "01",
            description: "Internal Review: We review your project requirements and scope within 48 hours."
        },
        {
            number: "02",
            description: "Discovery Call: If we are a fit, we schedule a 30-minute call to align on objectives."
        },
        {
            number: "03",
            description: "Diagnostic Proposal: We define the problem and present a tailored action plan."
        }
    ]
} as const;
