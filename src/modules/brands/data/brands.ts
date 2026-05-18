export type BrandStatus = 'Active' | 'In Development' | 'Research Phase';

export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string; // how it fits in the ecosystem
  focusAreas: string[];
  status: BrandStatus;
  href: string;
  externalHref?: string;
  layer: string; // which operational layer it lives in
};

export const BRANDS: Brand[] = [
  {
    slug: 'mergex',
    name: 'MergeX',
    tagline: 'The primary scaling and business infrastructure brand.',
    description:
      'MergeX is the diagnostic-first business scaling engine at the core of the ecosystem. It works directly with founders and leadership teams to identify the real constraints — operational, commercial, structural — and architect the systems needed to resolve them. Every other brand is built to support the infrastructure MergeX prescribes.',
    role:
      'The primary client-facing operating unit. All other brands are built to extend MergeX\'s core mandate.',
    focusAreas: ['Systems Design', 'Strategy', 'Sales Architecture', 'Operations', 'Commercial Clarity'],
    status: 'Active',
    href: '/brands/mergex',
    layer: 'Core Infrastructure',
  },
  {
    slug: 'labs',
    name: 'MergeX Studio',
    tagline: 'Creative and brand infrastructure for modern businesses.',
    description:
      'MergeX Studio is the brand-building and creative execution layer of the ecosystem. It exists because most scaling businesses have an invisible problem: their brand no longer matches the system underneath it. Studio aligns identity, positioning, and communication to the operational reality — so the brand works as hard as the business.',
    role:
      'The brand and creative infrastructure layer. Activated when identity, positioning, or communication is holding commercial performance back.',
    focusAreas: ['Brand Strategy', 'Identity Design', 'Positioning', 'Content Systems', 'Creative Direction'],
    status: 'Active',
    href: '/brands/labs',
    layer: 'Creative Infrastructure',
  },
  {
    slug: 'foundry',
    name: 'MergeX Foundry',
    tagline: 'Product and technology infrastructure — MVPs to production systems.',
    description:
      'MergeX Foundry is the product and technology execution layer. It builds the digital infrastructure — SaaS products, internal tools, client-facing platforms — that modern scaling businesses require but rarely have the architecture to build correctly. Foundry takes a systems-first approach to every build: the architecture serves the business model, not the other way around.',
    role:
      'The technology and product infrastructure layer. Activated when digital products, internal systems, or operational automation need to be architected and built.',
    focusAreas: ['SaaS Architecture', 'MVP Development', 'Internal Tools', 'Automation', 'Platform Engineering'],
    status: 'Active',
    href: '/brands/foundry',
    layer: 'Technology Infrastructure',
  },
  {
    slug: 'crewley',
    name: 'Crewley',
    tagline: 'Talent infrastructure — recruitment, retention, and team structure.',
    description:
      'Crewley exists because talent is a systems problem, not a hiring problem. Most businesses that struggle to scale do so because their team structure is misaligned with the work that needs to be done. Crewley designs and implements the talent architecture — hiring processes, role definition, team structure, onboarding systems — that allow businesses to grow without fragmenting.',
    role:
      'The talent and people infrastructure layer. Activated when team structure, hiring quality, or organizational design is limiting operational capacity.',
    focusAreas: ['Talent Architecture', 'Recruitment Systems', 'Role Design', 'Onboarding', 'Team Structure'],
    status: 'Active',
    href: '/brands/crewley',
    layer: 'Talent Infrastructure',
  },
  {
    slug: 'academy',
    name: 'MergeX Academy',
    tagline: 'Knowledge infrastructure — training, enablement, and capability development.',
    description:
      'MergeX Academy is the knowledge and capability layer of the ecosystem. It exists to address a consistent pattern: businesses that engage with MergeX build strong systems, but those systems degrade if the team does not have the frameworks to operate and maintain them. Academy delivers structured knowledge programs, training infrastructure, and capability development that make the operational gains permanent.',
    role:
      'The knowledge and enablement infrastructure layer. Activated when internal capability gaps are limiting the sustainability of operational improvements.',
    focusAreas: ['Training Programs', 'Capability Development', 'Knowledge Systems', 'Enablement', 'Frameworks'],
    status: 'In Development',
    href: '/brands/academy',
    layer: 'Knowledge Infrastructure',
  },
];
