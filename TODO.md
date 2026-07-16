# MergeX — Development Roadmap

> This file is the living development roadmap for the MergeX website.
> Every milestone should be updated as work progresses.
> Priorities: `critical` · `high` · `medium` · `low`
> Status: `not started` · `in progress` · `complete`

---

## Milestone 1 — Homepage Refinement

**Objective:** Fix the homepage to correctly represent MergeX as a premium AI and technology company. Remove all traces of the old "diagnostic consulting / business scaling" positioning from the metadata, copy, and UI strips.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 1.1 | Rewrite homepage `page.tsx` metadata — `title`, `description`, `keywords`, `og:description` | critical | complete | Removed all old positioning language. Aligned brand name, OG, Twitter, and added `siteUrl` variable |
| 1.2 | Align homepage `og:title` and `og:siteName` with root layout | high | complete | Resolved as part of 1.1 — both now read `"MergeX"` |
| 1.3 | Update `MarqueeStrip` phrases | high | not started | Current phrases ("DIAGNOSE BEFORE YOU BUILD", "SCALE WITH CLARITY") reflect old positioning. Replace with engineering/AI-first messaging |
| 1.4 | Review and refine `HomeHero` headline + subtext | medium | not started | "Business deserves better technology." is good but subtext can be sharper |
| 1.5 | Review `About Glimpse` copy inside the pinned hero layer | medium | not started | The scroll-in "Who We Are" section inside `HomeHero.tsx` needs review |
| 1.6 | Add a Services/Capabilities section on the homepage | medium | not started | Currently the homepage goes: Hero → Works Feed → FAQ. Consider adding a services strip or a brief capabilities block |
| 1.7 | Populate `worksData` video URLs | high | not started | All 5 projects in `works.ts` have `videoUrl: ""` — horizontal card feed shows no video |
| 1.8 | Remove dead `isDetailPage` and `isDropdownOpen` constants | low | not started | Both hardcoded `false` in `Navbar.tsx` and `LayoutShell.tsx` — dead code |

---

## Milestone 2 — FAQ & Knowledge Base

**Objective:** Make the FAQ section machine-readable, maintainable, and SEO-optimized. Lay the groundwork for a future `/faq` knowledge base page.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 2.1 | Add `FAQPage` structured data (`application/ld+json`) to homepage | critical | complete | JSON-LD generated server-side from `src/knowledge/faq.ts` in `page.tsx` — UI and schema always in sync |
| 2.2 | Extract FAQ data from `FAQ.tsx` into a dedicated data file | high | complete | Moved to `src/knowledge/faq.ts` — knowledge layer, not modules, as it feeds AI assistant and RAG |
| 2.3 | Update FAQ answers to align with current positioning | high | complete | All 10 answers rewritten with genuine customer value, correct service positioning, and natural language |
| 2.4 | Add `aria-expanded` to FAQ accordion buttons | high | complete | Added `aria-expanded`, `aria-controls`, `role=region`, `aria-labelledby`, `aria-hidden` on icon, and `focus-visible` ring |
| 2.5 | Create a dedicated `/faq` page | medium | not started | Extract FAQ section from homepage into its own route. Link from footer |
| 2.6 | Add FAQ to sitemap | medium | not started | Once `/faq` exists, add with `priority: 0.7` and `changeFrequency: 'monthly'` |
| 2.7 | Expand FAQ content | medium | not started | Add questions covering: pricing/engagement model, AI voice/chat product, turnaround, IP ownership, case study specifics |
| 2.8 | Consider search/filter on `/faq` page | low | not started | Useful if the knowledge base grows beyond 15+ entries |

---

## Milestone 3 — GEO Optimization

**Objective:** Optimize the site for Generative Engine Optimization — ensure MergeX is accurately cited and described by AI tools (ChatGPT, Perplexity, Claude, Gemini) when users ask about AI companies, software partners, or tech vendors.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 3.1 | Add `Organization` structured data to root layout | critical | complete | Generated server-side from `src/knowledge/schema.ts` (derives from company.ts + services.ts) and injected into root `<head>` so every page carries the same entity identity |
| 3.2 | Add `WebSite` schema with `SearchAction` potential | high | complete | `getWebsiteSchema()` injected into root layout; links to Organization via `@id` publisher. SearchAction intentionally deferred (documented TODO) until a real search endpoint exists |
| 3.3 | Add `Service` schema for each core capability | high | complete | `getServiceSchema(service)` builder emits one schema per entry in `SERVICES`, each with a stable `@id` and `provider → #organization`. All three services (Custom Software, AI Systems, AI Creative) injected on the homepage |
| 3.4 | Create an `/about/company` or plain-text company description page | high | not started | LLMs need a simple, direct, factual page about MergeX. Avoid animations, carousels, or GSAP on this page. *(Not addressed in this pass — remains for a future milestone.)* |
| 3.5 | Reconsider AI scraper blocking in `robots.ts` | high | complete | Reviewed all 9 AI crawlers — none were blocked. Documented an explicit allow policy for answer-engine bots (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-Web, Google-Extended) and a documented non-gating stance on general-purpose scrapers (CCBot, Amazonbot, Bytespider). Private routes stay disallowed for all |
| 3.6 | Add descriptive `alt` text to all images | medium | not started | Many images use generic or empty alt text. Critical for both GEO and accessibility |
| 3.7 | Write a clear "What is MergeX" paragraph visible at page load (above the fold) | medium | not started | LLMs prefer factual, direct statements. Current hero is primarily visual and animated |
| 3.8 | Add breadcrumb structured data on inner pages | low | complete | `getPageBreadcrumbSchema()` builder added to schema.ts; injected on `/about`, `/contact`, `/studio`, `/launches`. Each emits Home → Current Page, URLs derived from shared `siteUrl` |
| 3.9 | Update `sitemap.ts` `lastModified` to use real timestamps | low | not started | Currently always returns `new Date()` — use build-time dates or content hashes |
| 3.10 | Fix hardcoded canonical URLs on `/about` and `/launches` | low | complete | All four inner pages (`/about`, `/contact`, `/studio`, `/launches`) now use `siteUrl` env var for canonical and OG URLs. Zero hardcoded `mergex.in` URLs remain in page metadata |

---

## Milestone 4 — AI Assistant

**Objective:** Build a real, functional AI chat assistant that can answer questions about MergeX, its services, and guide visitors toward the right next step.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 4.1 | Create `/api/chat` route | critical | complete | Architecture-only foundation laid in `src/intelligence/`: typed contracts (`types.ts`), engine pipeline (`engine/router`, `context`, `formatter`, `confidence`, `index`), provider registry (`providers/`), prompt + guardrail builders (`prompts/`), and reserved session memory (`memory/`). No implementation logic, no API calls, no UI/route changes, no vendor coupling. The `/api/chat` route handler and real provider wiring land in 4.2+ |
| 4.2 | Knowledge Provider + system prompt + intent + Gemini + prompt builder | critical | complete | Backend intelligence engine fully functional: `providers/knowledge.ts` (retrieval from knowledge layer), `providers/gemini.ts` (Google AI Studio REST, env-var auth), `intent/index.ts` (deterministic intent detection), `prompts/system.ts` + `prompts/guardrails.ts` + `prompts/knowledge-context.ts` (all dynamically generated from src/knowledge/). Engine pipeline: intent → retrieval → confidence → route → generate → format. Knowledge-first routing: Gemini only when deterministic knowledge is insufficient. Test harness at `__test-harness__.ts`. No UI or route changes |
| 4.3 | Replace fake `send()` function in `ChatCard` with real API call | high | not started | Wire `InteractiveExperiences.tsx` ChatCard to the real `/api/chat` endpoint |
| 4.4 | Add streaming response support | high | not started | Token-by-token streaming dramatically improves perceived performance |
| 4.5 | Rate limiting on `/api/chat` | high | not started | Required before going live — without it the endpoint is open to abuse |
| 4.6 | Add conversation context (multi-turn) | medium | not started | Send full `messages[]` array to the API, not just the last user message |
| 4.7 | Persist chat history in `sessionStorage` | medium | not started | So conversations don't reset on navigation |
| 4.8 | Add a floating global chat widget | medium | not started | Make the AI assistant accessible from every page, not just `/launches` |
| 4.9 | Add suggested starter questions to the chat UI | low | not started | Pre-fill chips like "What does MergeX build?", "How do I get started?", "Do you work internationally?" |
| 4.10 | Analytics on chat interactions | low | not started | Track questions asked to improve FAQs and product copy |

---

## Milestone 5 — AI Voice Receptionist

**Objective:** Build a real, functional AI voice receptionist demo that demonstrates MergeX's voice AI capability product offering.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 5.1 | Research voice AI provider (ElevenLabs, Vapi, Retell, Bland AI) | high | not started | Evaluate latency, quality, and pricing for a receptionist use case |
| 5.2 | Create `/api/voice` route or integrate voice SDK | high | not started | Currently `VoiceCard` is a purely simulated UI with no real audio |
| 5.3 | Build real browser WebRTC / WebSocket voice connection | high | not started | Connect to the voice AI service from the `VoiceCard` component |
| 5.4 | Write voice AI script / persona for the MergeX receptionist | high | not started | Define tone, greeting, FAQ knowledge, escalation path to email/calendar |
| 5.5 | Replace `LiveWaveform` mock animation with real audio-reactive bars | medium | not started | Current waveform is cosmetic. Real audio amplitude data should drive the bars |
| 5.6 | Add call recording / transcript (optional, with consent) | low | not started | Useful for demo lead capture |
| 5.7 | Ensure mobile compatibility | medium | not started | WebRTC has browser permission requirements — test iOS/Android behaviour |

---

## Milestone 6 — SEO Improvements

**Objective:** Ensure every page has correct, targeted metadata. Fix current inconsistencies and gaps.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 6.1 | Rewrite all per-page metadata to be accurate and targeted | critical | not started | Contact, Studio pages have no page-level metadata. All pages need targeted descriptions |
| 6.2 | Fix OG metadata inconsistencies between homepage and root layout | high | not started | See Architecture Report §7 |
| 6.3 | Add metadata to `/contact` page | high | not started | Currently inherits root defaults |
| 6.4 | Add metadata to `/studio` page | high | not started | Currently inherits root defaults |
| 6.5 | Compress and optimize large public images | high | not started | `manikandan siting.png` (4MB), `manikandan.png` (1.3MB) — serve via Cloudinary or `next/image` |
| 6.6 | Replace `<img>` in `about/page.tsx` with `<Image>` | high | not started | Founder photo bypasses Next.js image optimization |
| 6.7 | Add `hreflang` tags if international targeting is planned | low | not started | MergeX works with international clients — consider `en` + `en-IN` |
| 6.8 | Validate OG image dimensions and content | medium | not started | `/og-cover.jpg` (1.3MB) is large. Ensure 1200×630 and under 300KB for fast unfurls |
| 6.9 | Add `<link rel="preconnect">` for Cloudinary and Google Fonts | medium | not started | Reduce connection latency for above-the-fold resources |

---

## Milestone 7 — Performance

**Objective:** Ensure the site loads fast, renders efficiently, and maintains strong Core Web Vitals scores.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 7.1 | Enable TypeScript strict mode (remove `ignoreBuildErrors`) | critical | not started | Type safety is a prerequisite for production confidence |
| 7.2 | Decompose `StudioClient.tsx` (533 lines) | high | not started | Split into: `StudioHero`, `StudioHowItWorks`, `StudioCarousel`, `StudioReel`, `StudioCTA` |
| 7.3 | Audit and remove dead components | high | not started | `MobileBottomDock`, `MobileNav`, `FlowingMenu`, `mergex-orb`, `neon-orbs`, `typing-animation` — confirm unused and delete |
| 7.4 | Remove duplicate `useEffect` in `Navbar.tsx` | medium | not started | `setIsDetailMenuOpen(false)` is called in two effects both watching `[pathname]` |
| 7.5 | Benchmark Largest Contentful Paint (LCP) on each page | medium | not started | `HomeHero` background image and Studio carousel are LCP candidates |
| 7.6 | Evaluate GSAP ScrollTrigger refresh strategy | medium | not started | `ScrollTrigger.refresh()` called on every Lenis mount — may cause layout thrash |
| 7.7 | Add `next/font` for all typefaces | low | not started | `font-clash` and `font-roboto` are referenced in Tailwind/className but not loaded via `next/font` in root layout |
| 7.8 | Lazy-load non-critical sections with `React.lazy` / `dynamic` | low | not started | `StudioClient`, `InteractiveExperiences`, `ClientVoices` are good candidates |
| 7.9 | Set up Playwright visual regression tests | low | not started | `playwright` is already a devDependency — wire up basic snapshot tests |

---

## Milestone 8 — Accessibility

**Objective:** Ensure the site meets WCAG 2.1 AA standards and is fully usable by all visitors.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 8.1 | Add `aria-expanded` to FAQ accordion buttons | high | not started | Confirmed gap from architecture review |
| 8.2 | Add a skip-to-content link | high | not started | First focusable element should allow skipping to `#main-content` |
| 8.3 | Audit all interactive elements for keyboard focus styles | high | not started | Focus styles are removed in many places with `focus:outline-none` |
| 8.4 | Add `aria-label` to icon-only buttons | high | not started | ChatCard send button, voice mute/end buttons, social icons in footer |
| 8.5 | Ensure colour contrast on all text | medium | not started | `text-black/70`, `text-black/55`, `text-white/40` — check against backgrounds |
| 8.6 | Replace `dangerouslySetInnerHTML` CSS in `not-found.tsx` | medium | not started | Use CSS Modules or class-based approach for the 404 style overrides |
| 8.7 | Add `lang` attribute verification — ensure it's always `en` | low | not started | Root layout sets `lang="en"` correctly. Confirm no child overrides it |
| 8.8 | Add `role="region"` and `aria-label` to major page sections | low | not started | `<section>` elements should have accessible labels |
| 8.9 | Test with VoiceOver (macOS) and NVDA (Windows) | low | not started | Manual screen reader testing is necessary |

---

## Milestone 9 — Case Studies

**Objective:** Build a proper case study system that showcases MergeX's work with depth, evidence, and business context.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 9.1 | Define case study data schema | high | not started | Extend `Project` type in `works.ts` or create a new `CaseStudy` type with: problem, approach, outcome, metrics, tech stack, testimonial |
| 9.2 | Create `/work/[slug]` dynamic route | high | not started | Individual case study pages with full narrative |
| 9.3 | Write case study content for 5 existing projects | high | not started | Cedar Elevators, Cinnastratech, Dude Men's Wears, Mic and Mac, HeyProData — all have strong outcomes worth documenting |
| 9.4 | Add `Article` / `CaseStudy` structured data | medium | not started | Helps LLMs and search engines surface specific project results |
| 9.5 | Update `sitemap.ts` to include case study URLs | medium | not started | Once `/work/[slug]` exists |
| 9.6 | Add a case study preview section to the homepage | medium | not started | Two or three featured cases to anchor credibility above the FAQ |
| 9.7 | Add case study metadata (per-page OG images) | medium | not started | Each case study should have a unique OG image |
| 9.8 | Add client testimonials to case studies | low | not started | `ClientVoices` on launches page has testimonials — connect them to relevant case study pages |

---

## Milestone 10 — Future Features

**Objective:** Track longer-horizon ideas that require research, design, or external dependencies.

| # | Task | Priority | Status | Notes |
|---|---|---|---|---|
| 10.1 | Blog / Insights section | medium | not started | Engineering-first content (AI automation, software patterns, MergeX opinions) — good for GEO and authority |
| 10.2 | `/services` page | medium | not started | Dedicated page for each service: Custom Software, AI Systems, AI Automation, AI Voice, AI Chat, Business Automation, Web Applications, Digital Engineering, AI Creative Production |
| 10.3 | Dark mode | low | not started | CSS variables are set up for dark mode (`@custom-variant dark`) but no toggle is wired to the layout |
| 10.4 | Multi-language support | low | not started | MergeX works internationally. Consider `en` + Tamil (`ta`) given Chennai base |
| 10.5 | Client portal / login area | low | not started | Future product idea — authenticated area for project tracking |
| 10.6 | MergeX Academy dedicated page | low | not started | Redirects currently go to `/launches`. A proper page may be needed as this matures |
| 10.7 | Pricing / Engagement model page | low | not started | Even a "How we engage" page reduces friction and builds trust |
| 10.8 | Newsletter signup | low | not started | Capture emails for MergeX updates, case studies, and product launches |
| 10.9 | CMS integration | low | not started | FAQ, works, case studies are all hardcoded. A headless CMS (Sanity, Contentful) would enable non-developer updates — `console/` disallow in robots.ts suggests Sanity was considered |
| 10.10 | Cookie consent / privacy banner | low | not started | Required for GDPR compliance if collecting any analytics or running ads |

---

*Last updated: July 2026*
*Updated by: Architecture review — Antigravity*
