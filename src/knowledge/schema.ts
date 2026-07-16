/**
 * MergeX Structured Data (schema.org JSON-LD)
 *
 * A reusable set of strongly-typed schema builders that derive structured data
 * from the knowledge layer (company.ts, services.ts, faq.ts). Keeping JSON-LD
 * behind builders (rather than raw constants) means each page can compose the
 * schemas it needs, entities reference each other by stable `@id` nodes, and
 * future schemas (WebSite, Service, Breadcrumb) follow the same pattern.
 *
 * Used by:
 *   - Root layout     → getOrganizationSchema()   (Milestone 3.1)
 *   - Homepage        → getFAQSchema()             (Milestone 2.1)
 *   - Future:
 *       getWebsiteSchema()      → root layout       (Milestone 3.2)
 *       getServiceSchema()      → /services pages   (Milestone 3.3)
 *       getBreadcrumbSchema()   → inner pages       (Milestone 3.8)
 *
 * Editing a knowledge file updates the UI, the AI assistant, and the
 * structured data simultaneously.
 */

import { COMPANY } from './company';
import { SERVICES } from './services';
import type { ServiceItem } from './services';
import type { FAQItem } from './faq';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? COMPANY.url;

/** Canonical logo URL used for Google rich results and knowledge panels. */
const logoUrl = `${siteUrl}/logo/mergex%20logo%20black.png`;

/**
 * Stable `@id` nodes so schemas can reference each other within the entity
 * graph (e.g. a Service points back to its provider Organization).
 */
const ORG_NODE = `${siteUrl}/#organization`;
const WEBSITE_NODE = `${siteUrl}/#website`;

/** A single segment of a breadcrumb trail. */
export interface BreadcrumbItem {
    name: string;
    url: string;
}

/**
 * Organization structured data.
 *
 * Describes MergeX as a distinct entity to search engines and LLM crawlers.
 * Injected once into the root layout so every page carries the same identity.
 */
export function getOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': ORG_NODE,
        name: COMPANY.name,
        legalName: COMPANY.legalName,
        url: siteUrl,
        logo: {
            '@type': 'ImageObject',
            url: logoUrl,
        },
        image: logoUrl,
        description: COMPANY.description,
        slogan: COMPANY.tagline,
        foundingDate: `${COMPANY.foundedYear}-01-01`,
        foundingLocation: {
            '@type': 'Place',
            name: `${COMPANY.location.city}, ${COMPANY.location.country}`,
            address: {
                '@type': 'PostalAddress',
                addressLocality: COMPANY.location.city,
                addressRegion: COMPANY.location.state,
                addressCountry: COMPANY.location.countryCode,
            },
        },
        founders: COMPANY.founders.map((founder) => ({
            '@type': 'Person',
            name: founder.name,
            jobTitle: founder.role,
            email: `mailto:${founder.email}`,
        })),
        email: `mailto:${COMPANY.email}`,
        contactPoint: [
            {
                '@type': 'ContactPoint',
                contactType: 'sales',
                email: COMPANY.email,
                areaServed: 'Worldwide',
                availableLanguage: ['English'],
            },
        ],
        sameAs: Object.values(COMPANY.socialProfiles).filter(
            (value): value is string => typeof value === 'string',
        ),
        knowsAbout: [
            ...SERVICES.map((service) => service.name),
            ...SERVICES.flatMap((service) => service.capabilities),
        ],
        areaServed: {
            '@type': 'Place',
            name: 'Worldwide',
        },
        serviceType: SERVICES.map((service) => service.name),
    };
}

/**
 * WebSite structured data.
 *
 * Establishes the site as an entity and links it to the Organization via
 * `publisher` using a stable `@id` reference, so Google and LLM crawlers treat
 * the Organization and WebSite as one connected entity graph rather than two
 * unrelated records.
 *
 * TODO(SearchAction): Do NOT add a `potentialAction` SearchAction until
 * MergeX has a real, public on-site search endpoint (e.g. `/search?q=`).
 * Pointing Google at a route that does not exist (or returns 404/empty
 * results) invalidates sitelinks search box eligibility and can trigger a
 * manual-action warning in Search Console. Add it only after the search page
 * is live and returns real results.
 */
export function getWebsiteSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_NODE,
        name: COMPANY.name,
        alternateName: COMPANY.legalName,
        url: siteUrl,
        description: COMPANY.description,
        inLanguage: 'en',
        publisher: { '@id': ORG_NODE },
    };
}

/**
 * FAQPage structured data.
 *
 * Accepts the FAQ items directly so callers can pass the full set or a filtered
 * subset (e.g. a category-specific page). The homepage passes `FAQ_ITEMS`.
 */
export function getFAQSchema(items: FAQItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    };
}

/**
 * BreadcrumbList structured data.
 *
 * Generic and reusable — pass one `{ name, url }` entry per trail step,
 * starting with the site root. Position is derived from array order.
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };
}

/**
 * Service structured data for a single MergeX capability.
 *
 * Each Service carries a stable `@id` (derived from `service.id`) so it can be
 * referenced independently within the entity graph, and its `provider` links
 * back to the Organization by `@id` — Google and LLM crawlers can therefore
 * resolve "this service is offered by MergeX" without duplicating company data.
 *
 * Usage:
 *   - Homepage / root: emit one schema per entry in SERVICES via map()
 *   - Future /services/[id] pages: pass a single ServiceItem for that route
 *
 * `service.pageUrl` is optional today; it resolves to the dedicated service
 * page when one exists (Milestone 10.2), otherwise to the site root.
 */
export function getServiceSchema(service: ServiceItem) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        '@id': `${siteUrl}/#service-${service.id}`,
        name: service.name,
        description: service.shortDescription,
        serviceType: service.name,
        provider: { '@id': ORG_NODE },
        areaServed: {
            '@type': 'Place',
            name: 'Worldwide',
        },
        url: service.pageUrl ? `${siteUrl}${service.pageUrl}` : siteUrl,
    };
}

/** Inferred return types — exported so callers stay strongly typed. */
export type OrganizationSchema = ReturnType<typeof getOrganizationSchema>;
export type WebsiteSchema = ReturnType<typeof getWebsiteSchema>;
export type FAQSchema = ReturnType<typeof getFAQSchema>;
export type BreadcrumbSchema = ReturnType<typeof getBreadcrumbSchema>;
export type ServiceSchema = ReturnType<typeof getServiceSchema>;
