import { LegalPageLayout, LegalSection, Paragraph, BulletList, SubHeading, Divider } from "@/components/layout/LegalPageLayout";
import Image from "next/image";

const sections = [
    {
        id: "about-mergex",
        title: "1. About MergeX"
    },
    {
        id: "eligibility",
        title: "2. Eligibility"
    },
    {
        id: "scope-of-services",
        title: "3. Scope of Services"
    },
    {
        id: "no-guarantee-of-results",
        title: "4. No Guarantee of Results"
    },
    {
        id: "client-responsibilities",
        title: "5. Client Responsibilities"
    },
    {
        id: "intellectual-property",
        title: "6. Intellectual Property"
    },
    {
        id: "acceptable-use",
        title: "7. Acceptable Use"
    },
    {
        id: "project-acceptance",
        title: "8. Project Acceptance"
    },
    {
        id: "payments",
        title: "9. Payments"
    },
    {
        id: "third-party-services",
        title: "10. Third-Party Services"
    },
    {
        id: "confidentiality",
        title: "11. Confidentiality"
    },
    {
        id: "limitation-of-liability",
        title: "12. Limitation of Liability"
    },
    {
        id: "independent-relationship",
        title: "13. Independent Relationship"
    },
    {
        id: "educational-content",
        title: "14. Educational Content"
    },
    {
        id: "user-content",
        title: "15. User Content"
    },
    {
        id: "experimental-features",
        title: "16. Experimental Features"
    },
    {
        id: "termination",
        title: "17. Termination"
    },
    {
        id: "changes-to-these-terms",
        title: "18. Changes to These Terms"
    },
    {
        id: "governing-law",
        title: "19. Governing Law"
    },
    {
        id: "contact",
        title: "20. Contact"
    },
    {
        id: "acceptance",
        title: "21. Acceptance"
    }
];

export const metadata = {
    title: "Terms of Use",
    description: "Terms of Use for MergeX.",
};

export default function TermsofUsePage() {
    return (
        <LegalPageLayout
            title="Terms of Use"
            description="Terms of Use for MergeX."
            effectiveDate="15 May 2026"
            lastUpdated="10 July 2026"
            readingTime="8 min read"
            sections={sections}
        >
            <Paragraph>These Terms of Use ("Terms") govern your access to and use of the websites, services, communications, software, content, and digital platforms operated by <strong className="font-semibold text-black">MergeX</strong> ("MergeX", "we", "our", or "us").</Paragraph>
            <Paragraph>By accessing our website or engaging our services, you agree to these Terms. If you do not agree, please do not use our website or services.</Paragraph>

            <Divider />

            <LegalSection id="about-mergex" title="1. About MergeX">
                <Paragraph>MergeX is an independent software and AI company focused on:</Paragraph>
                <BulletList items={[
                    "Software Development",
                    "AI Solutions & Automation",
                    "AI Creative Production"
                ]} />
                <Paragraph>We may introduce, modify, suspend, or discontinue services or features at any time without prior notice.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="eligibility" title="2. Eligibility">
                <Paragraph>By using MergeX you confirm that:</Paragraph>
                <BulletList items={[
                    "You are at least 18 years old.",
                    "You have the legal authority to enter into binding agreements.",
                    "You will use our services lawfully.",
                    "Information you provide is accurate and complete."
                ]} />
                <Paragraph>We reserve the right to refuse service where appropriate.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="scope-of-services" title="3. Scope of Services">
                <Paragraph>Our work may include:</Paragraph>
                <BulletList items={[
                    "Software Development",
                    "AI Solutions & Automation",
                    "AI Creative Production",
                    "Digital Platforms",
                    "Internal Business Systems",
                    "Motion Graphics & Visual Production"
                ]} />
                <Paragraph>Project-specific deliverables, timelines, ownership, and commercial terms are governed by proposals, Statements of Work (SOW), quotations, or signed agreements.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="no-guarantee-of-results" title="4. No Guarantee of Results">
                <Paragraph>MergeX provides professional services and technical expertise.</Paragraph>
                <Paragraph>We do <strong className="font-semibold text-black">not</strong> guarantee specific commercial outcomes including:</Paragraph>
                <BulletList items={[
                    "Revenue growth",
                    "Profitability",
                    "Sales performance",
                    "Marketing performance",
                    "Business success",
                    "Operational improvements"
                ]} />
                <Paragraph>Results depend on many factors outside our control, including client decisions, implementation, market conditions, and external circumstances.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="client-responsibilities" title="5. Client Responsibilities">
                <Paragraph>Clients agree to:</Paragraph>
                <BulletList items={[
                    "Provide accurate information.",
                    "Supply required assets and approvals on time.",
                    "Cooperate throughout the engagement.",
                    "Review deliverables promptly."
                ]} />
                <Paragraph>Delays in communication or approvals may affect timelines.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="intellectual-property" title="6. Intellectual Property">
                <Paragraph>Unless otherwise agreed in writing:</Paragraph>
                <BulletList items={[
                    "MergeX retains ownership of its proprietary software components,",
                    "frameworks, documentation, templates, creative methods, research,",
                    "internal tools, and intellectual property.",
                    "Client-owned assets remain the property of the client.",
                    "Ownership of project deliverables is determined by the applicable",
                    "project agreement."
                ]} />
                <Paragraph>No MergeX intellectual property may be copied, redistributed, reverse engineered, or commercially reused without written permission.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="acceptable-use" title="7. Acceptable Use">
                <Paragraph>You agree not to:</Paragraph>
                <BulletList items={[
                    "Use the website unlawfully.",
                    "Attempt unauthorized access.",
                    "Introduce malicious software.",
                    "Scrape or harvest website content.",
                    "Infringe intellectual property rights.",
                    "Misrepresent your identity."
                ]} />
                <Paragraph>We may suspend or terminate access for violations.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="project-acceptance" title="8. Project Acceptance">
                <Paragraph>Submitting an enquiry does not create a business relationship.</Paragraph>
                <Paragraph>MergeX reserves the right to decline projects, discontinue discussions, or refuse engagements at its discretion.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="payments" title="9. Payments">
                <Paragraph>Commercial terms are governed by project agreements.</Paragraph>
                <Paragraph>Unless otherwise agreed:</Paragraph>
                <BulletList items={[
                    "Payments are due according to invoices.",
                    "Work may pause for overdue payments.",
                    "Deliverables may be withheld until outstanding balances are cleared.",
                    "Fees already earned for completed work are generally non-refundable."
                ]} />
            </LegalSection>

            <Divider />

            <LegalSection id="third-party-services" title="10. Third-Party Services">
                <Paragraph>Projects may involve third-party software, APIs, hosting providers, AI platforms, payment processors, or cloud services.</Paragraph>
                <Paragraph>MergeX is not responsible for outages, policy changes, pricing changes, or failures of third-party providers.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="confidentiality" title="11. Confidentiality">
                <Paragraph>We treat client information responsibly.</Paragraph>
                <Paragraph>Where required, confidentiality obligations may be reinforced through a separate Non-Disclosure Agreement (NDA).</Paragraph>
                <Paragraph>Both parties agree not to misuse confidential information shared during an engagement.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="limitation-of-liability" title="12. Limitation of Liability">
                <Paragraph>To the fullest extent permitted by law, MergeX is not liable for indirect, incidental, consequential, or special damages arising from the use of our services.</Paragraph>
                <Paragraph>Where liability cannot be excluded, our total liability shall not exceed the fees paid for the specific engagement giving rise to the claim.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="independent-relationship" title="13. Independent Relationship">
                <Paragraph>Nothing in these Terms creates:</Paragraph>
                <BulletList items={[
                    "Employment",
                    "Partnership",
                    "Joint venture",
                    "Agency",
                    "Equity ownership"
                ]} />
                <Paragraph>MergeX and its clients remain independent parties.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="educational-content" title="14. Educational Content">
                <Paragraph>Articles, case studies, videos, demonstrations, presentations, and other public content are provided for general informational purposes only and should not be considered legal, financial, investment, or professional advice.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="user-content" title="15. User Content">
                <Paragraph>By submitting files, feedback, ideas, or other materials, you confirm that:</Paragraph>
                <BulletList items={[
                    "You have the right to provide them.",
                    "They do not infringe third-party rights.",
                    "They comply with applicable laws."
                ]} />
                <Paragraph>Feedback may be used internally to improve our services unless otherwise agreed.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="experimental-features" title="16. Experimental Features">
                <Paragraph>MergeX may release beta features, research projects, AI experiments, prototypes, or preview functionality.</Paragraph>
                <Paragraph>These offerings may change, be limited, or be discontinued without notice.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="termination" title="17. Termination">
                <Paragraph>We may suspend or terminate services where:</Paragraph>
                <BulletList items={[
                    "These Terms are violated.",
                    "Required payments are not made.",
                    "Fraud, abuse, or unlawful activity is identified.",
                    "Continued engagement becomes impractical."
                ]} />
                <Paragraph>Termination does not remove outstanding payment obligations.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="changes-to-these-terms" title="18. Changes to These Terms">
                <Paragraph>We may update these Terms periodically.</Paragraph>
                <Paragraph>The latest version will always be published on this page with an updated revision date.</Paragraph>
                <Paragraph>Continued use of our website or services constitutes acceptance of the updated Terms.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="governing-law" title="19. Governing Law">
                <Paragraph>These Terms are governed by the laws of India.</Paragraph>
                <Paragraph>Any disputes shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu, India.</Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="contact" title="20. Contact">
                <Paragraph><strong className="font-semibold text-black">MergeX</strong></Paragraph>
                <Paragraph>Email: <a href="mailto:hello@mergex.in" className="text-violet-600 hover:text-violet-700 underline underline-offset-4 font-medium">hello@mergex.in</a></Paragraph>
                <Paragraph>Website: <a href="https://www.mergex.in" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 underline underline-offset-4 font-medium">https://www.mergex.in</a></Paragraph>
            </LegalSection>

            <Divider />

            <LegalSection id="acceptance" title="21. Acceptance">
                <Paragraph>By accessing our website or using our services, you acknowledge that you have read, understood, and agreed to these Terms of Use.</Paragraph>
                
                <div className="mt-8 flex flex-col items-start gap-4">
                    <div>
                        <Image
                            src="/logo/mergex logo black.png"
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
