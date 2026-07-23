import { LegalPageLayout, LegalSection, Paragraph, BulletList, SubHeading, Divider } from "@/components/layout/LegalPageLayout";
import Image from "next/image";

const sections = [
    {
        id: "introduction",
        title: "Introduction"
    },
    {
        id: "who-we-are",
        title: "1. Who We Are"
    },
    {
        id: "information-we-collect",
        title: "2. Information We Collect"
    },
    {
        id: "how-we-use-information",
        title: "3. How We Use Information"
    },
    {
        id: "cookies-analytics",
        title: "4. Cookies & Analytics"
    },
    {
        id: "sharing-information",
        title: "5. Sharing Information"
    },
    {
        id: "data-security",
        title: "6. Data Security"
    },
    {
        id: "data-retention",
        title: "7. Data Retention"
    },
    {
        id: "client-confidentiality",
        title: "8. Client Confidentiality"
    },
    {
        id: "intellectual-property",
        title: "9. Intellectual Property"
    },
    {
        id: "third-party-services",
        title: "10. Third-Party Services"
    },
    {
        id: "your-rights",
        title: "11. Your Rights"
    },
    {
        id: "marketing-communications",
        title: "12. Marketing Communications"
    },
    {
        id: "children-s-privacy",
        title: "13. Children's Privacy"
    },
    {
        id: "international-data-processing",
        title: "14. International Data Processing"
    },
    {
        id: "limitation-of-liability",
        title: "15. Limitation of Liability"
    },
    {
        id: "changes-to-this-policy",
        title: "16. Changes to This Policy"
    },
    {
        id: "contact-us",
        title: "17. Contact Us"
    },
    {
        id: "your-consent",
        title: "18. Your Consent"
    }
];

export const metadata = {
    title: "Privacy Policy",
    description: "Privacy Policy for MergeX.",
};

export default function PrivacyPolicyPage() {
    return (
        <LegalPageLayout
            title="Privacy Policy"
            description="Privacy Policy for MergeX."
            effectiveDate="15 May 2026"
            lastUpdated="10 July 2026"
            readingTime="6 min read"
            sections={sections}
        >
            <Paragraph>1. Who We Are 2. Information We Collect 3. How We Use Information 4. Cookies & Analytics 5. Sharing Information 6. Data Security 7. Data Retention 8. Client Confidentiality 9. Intellectual Property 10. Third-Party Services 11. Your Rights 12. Marketing Communications 13. Children's Privacy 14. International Data Processing 15. Limitation of Liability 16. Changes to This Policy 17. Contact Us 18. Your Consent</Paragraph>

            <Divider />

            <LegalSection id="introduction" title="Introduction">
                <Paragraph>Welcome to <strong className="font-semibold text-black">MergeX</strong>.</Paragraph>
                <Paragraph>MergeX ("MergeX", "we", "our", or "us") is an independent software and AI company. This Privacy Policy explains how we collect, use, store, disclose, and protect information when you use our website, contact us, or engage our services.</Paragraph>
                <Paragraph>By accessing our website or working with MergeX, you acknowledge that you have read and understood this Privacy Policy.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="who-we-are" title="1. Who We Are">
                <Paragraph>MergeX is an independent software and AI company focused on:</Paragraph>
                <BulletList items={[
                    "Software Development",
                    "AI Solutions & Automation",
                    "AI Creative Production"
                ]} />
                <Paragraph>We help businesses create reliable software, intelligent systems, and AI-powered creative experiences.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="information-we-collect" title="2. Information We Collect">
                <SubHeading>Personal Information</SubHeading>
                <Paragraph>Information you voluntarily provide may include:</Paragraph>
                <BulletList items={[
                    "Name",
                    "Email address",
                    "Phone number",
                    "Company name",
                    "Job title",
                    "Billing information",
                    "Business information",
                    "Files or documents you share"
                ]} />
                <SubHeading>Business Information</SubHeading>
                <Paragraph>During engagements we may receive:</Paragraph>
                <BulletList items={[
                    "Business objectives",
                    "Operational workflows",
                    "Technical infrastructure",
                    "Brand assets",
                    "Internal documentation",
                    "Product requirements"
                ]} />
                <SubHeading>Technical Information</SubHeading>
                <Paragraph>When visiting our website we may automatically collect:</Paragraph>
                <BulletList items={[
                    "IP address",
                    "Browser and device information",
                    "Operating system",
                    "Website usage data",
                    "Referring pages",
                    "Cookies and analytics information"
                ]} />
                <SubHeading>Communication Information</SubHeading>
                <Paragraph>We may retain records of:</Paragraph>
                <BulletList items={[
                    "Emails",
                    "Contact form submissions",
                    "Meeting notes",
                    "Call summaries",
                    "Support conversations"
                ]} />
            </LegalSection>

            <Divider />

            <LegalSection id="how-we-use-information" title="3. How We Use Information">
                <Paragraph>We use information to:</Paragraph>
                <BulletList items={[
                    "Deliver our services",
                    "Communicate with clients",
                    "Prepare proposals and project documentation",
                    "Improve our website and services",
                    "Maintain platform security",
                    "Prevent fraud and abuse",
                    "Comply with legal obligations",
                    "Conduct internal research and product improvement"
                ]} />
                <Paragraph>We only collect information reasonably necessary for these purposes.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="cookies-analytics" title="4. Cookies & Analytics">
                <Paragraph>We use cookies and similar technologies to:</Paragraph>
                <BulletList items={[
                    "Maintain website functionality",
                    "Measure website performance",
                    "Understand visitor behaviour",
                    "Improve user experience"
                ]} />
                <Paragraph>You may disable cookies through your browser settings, although some features may not function correctly.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="sharing-information" title="5. Sharing Information">
                <Paragraph>MergeX does <strong className="font-semibold text-black">not sell</strong> personal information.</Paragraph>
                <Paragraph>Information may only be shared:</Paragraph>
                <BulletList items={[
                    "With trusted service providers necessary to operate our business",
                    "When required by law",
                    "To protect our legal rights or investigate fraud",
                    "As part of a merger, acquisition, or business restructuring"
                ]} />
                <Paragraph>Third-party providers only receive information necessary to perform their services.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="data-security" title="6. Data Security">
                <Paragraph>We implement reasonable administrative, technical, and organisational safeguards to protect information against:</Paragraph>
                <BulletList items={[
                    "Unauthorised access",
                    "Loss",
                    "Misuse",
                    "Alteration",
                    "Disclosure",
                    "Destruction"
                ]} />
                <Paragraph>No online service can guarantee absolute security.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="data-retention" title="7. Data Retention">
                <Paragraph>We retain information only for as long as reasonably necessary to:</Paragraph>
                <BulletList items={[
                    "Deliver services",
                    "Meet legal obligations",
                    "Resolve disputes",
                    "Maintain business records"
                ]} />
                <Paragraph>Information may be securely deleted or anonymised when no longer required.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="client-confidentiality" title="8. Client Confidentiality">
                <Paragraph>Client confidentiality is fundamental to how MergeX operates.</Paragraph>
                <Paragraph>Unless authorised by the client or required by law, we do not disclose confidential business information, internal documentation, product concepts, strategic materials, or operational data.</Paragraph>
                <Paragraph>Separate Non-Disclosure Agreements (NDAs) may apply where appropriate.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="intellectual-property" title="9. Intellectual Property">
                <Paragraph>Unless otherwise agreed in writing:</Paragraph>
                <BulletList items={[
                    "MergeX retains ownership of its proprietary tools, frameworks,",
                    "templates, research, software components, documentation, and",
                    "creative methodologies.",
                    "Client-owned assets remain the property of the client.",
                    "Ownership of project deliverables is governed by the applicable",
                    "project agreement."
                ]} />
            </LegalSection>

            <Divider />

            <LegalSection id="third-party-services" title="10. Third-Party Services">
                <Paragraph>Our website may contain links to external websites or rely on third-party providers.</Paragraph>
                <Paragraph>MergeX is not responsible for their privacy practices, content, or policies.</Paragraph>
                <Paragraph>Please review their policies separately.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="your-rights" title="11. Your Rights">
                <Paragraph>Depending on applicable law, you may have the right to:</Paragraph>
                <BulletList items={[
                    "Access your information",
                    "Correct inaccurate information",
                    "Request deletion",
                    "Restrict processing",
                    "Request data portability",
                    "Withdraw consent where applicable",
                    "Opt out of marketing communications"
                ]} />
                <Paragraph>Requests may be submitted using the contact details below.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="marketing-communications" title="12. Marketing Communications">
                <Paragraph>We may occasionally send:</Paragraph>
                <BulletList items={[
                    "Company updates",
                    "Product announcements",
                    "Educational resources",
                    "Service-related communications"
                ]} />
                <Paragraph>You may unsubscribe at any time.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="children-s-privacy" title="13. Children's Privacy">
                <Paragraph>MergeX services are intended for business users and are not directed toward individuals under 18 years of age.</Paragraph>
                <Paragraph>We do not knowingly collect personal information from children.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="international-data-processing" title="14. International Data Processing">
                <Paragraph>Information may be processed in countries where our service providers operate.</Paragraph>
                <Paragraph>Where applicable, we take reasonable measures to protect information during international transfers.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="limitation-of-liability" title="15. Limitation of Liability">
                <Paragraph>While we implement reasonable safeguards, MergeX cannot guarantee absolute protection against cyberattacks, internet failures, or circumstances beyond our reasonable control.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="changes-to-this-policy" title="16. Changes to This Policy">
                <Paragraph>We may update this Privacy Policy periodically.</Paragraph>
                <Paragraph>The latest version will always be available on this page with an updated revision date.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="contact-us" title="17. Contact Us">
                <Paragraph><strong className="font-semibold text-black">MergeX</strong></Paragraph>
                <Paragraph>Email: <a href="mailto:hello@mergex.in" className="text-violet-600 hover:text-violet-700 underline underline-offset-4 font-medium">hello@mergex.in</a></Paragraph>
                <Paragraph>Website: <a href="https://www.mergex.in" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 underline underline-offset-4 font-medium">https://www.mergex.in</a></Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="your-consent" title="18. Your Consent">
                <Paragraph>By accessing our website or using our services, you acknowledge that you have read, understood, and accepted this Privacy Policy.</Paragraph>
                
                <div className="mt-8 flex flex-col items-start gap-4">
                    <div>
                        <Image
                            src="/logo/mergex-logo-black.webp"
                            alt="MergeX Logo"
                            width={120}
                            height={120}
                            className="object-contain w-10 h-10"
                        />
                    </div>
                    <div>
                        <p className="font-semibold text-black text-lg font-questrial">MergeX</p>
                        <p className="text-violet-600 text-xs tracking-widest uppercase font-semibold">One System, Zero Friction.</p>
                    </div>
                    <div className="text-[13px] text-gray-400 mt-2">
                        Copyright © 2025-2026 MergeX. All rights reserved.
                    </div>
                </div>
            </LegalSection>
        </LegalPageLayout>
    );
}
