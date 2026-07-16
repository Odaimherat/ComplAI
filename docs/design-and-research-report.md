# ComplAI — Design & Research Report

This report documents the research, decisions, and rationale behind the
ComplAI website, written after the build so every claim below can be
checked against real code or content in this repository. Section 8 is an
explicit traceability checklist for that purpose.

## 1. Competitive research

Research was pattern-level (structure, IA, positioning language), not
visual copying, and no assets or copy were taken from any real company.

- **Vanta / Drata / Secureframe** (SOC 2 / GRC automation category
  leaders): the common pattern across all three is a homepage built
  around a single core metaphor — "trust" or "compliance" as a live,
  quantified state (a score, a badge, a percentage) rather than a static
  claim. That pattern is why the homepage's signature element
  (`client/src/components/ComplianceLiveDemo.jsx`) is a live-updating
  audit-readiness gauge rather than a static screenshot. These sites also
  consistently lead their primary nav with a framework-agnostic "platform"
  concept before listing individual frameworks, which is why Frameworks
  is a separate, dedicated nav item from Solutions rather than nested
  under it.
- **OneTrust** (enterprise GRC/privacy): the pattern borrowed here is
  breadth-as-credibility — a large, explicit grid of supported
  regulations/frameworks presented as a first-class page, not a footnote.
  That is the direct source for building `/frameworks` as a dedicated,
  detailed page (`client/src/pages/Frameworks.jsx`) with a full framework
  detail view (control counts, timelines, AI-mapping explanation) instead
  of a simple logo grid.
- **Wiz / Vectra** (AI-augmented security vendors): the pattern is
  leading with a specific technical mechanism (how detection/prioritization
  actually works) rather than generic "AI-powered" language. This shaped
  the decision to build a standalone `/how-ai-works` page
  (`client/src/pages/HowAiWorks.jsx`) that names five distinct AI layers
  by function (evidence classification, framework mapping, risk scoring,
  SOC triage, audit drafting) and explicitly states what stays
  human-reviewed at each layer, rather than one vague "AI does the work"
  paragraph.
- **General SaaS marketing-site convention** (case studies with named
  metrics, tiered pricing with a comparison table, a resources/blog
  section): standard B2B SaaS IA, applied directly — see sections 2 and 7.

## 2. Page/IA rationale

The full page list is in `docs/plan.md`. Rationale for the shape of it:

- **GRC leads the nav** because it is the flagship, the entry point for
  the primary ICP (see `docs/marketing-notes.md`), and the product every
  other line is positioned to support. The `Solutions` dropdown in
  `client/src/components/Nav.jsx` renders `solutions` from
  `shared/solutions.js` in array order, and GRC is deliberately first in
  that array with a `flagship: true` flag consumed by both the nav and
  the homepage to visually mark it (badge, wider card span).
- **Solutions is a dropdown with an index page (`/solutions`) plus four
  detail pages (`/solutions/:id`)**, rather than four flat top-level nav
  items, so the nav communicates "one platform, four lines" instead of
  four unrelated products. The detail pages share one component,
  `SolutionDetail.jsx`, driven by `shared/solutions.js`, so the four
  pages are structurally identical and any future change to the layout
  only has to be made once.
- **Frameworks is a separate top-level nav item**, not a sub-page of GRC,
  because it is a distinct "showoff" artifact for compliance credibility
  (per the brief) and a common inbound-search landing page ("does X
  support SOC 2" style queries) — it needed its own URL and its own SEO
  surface.
- **How Our AI Works sits between Frameworks and Case Studies** in the
  nav, positioned as the technical-credibility page a skeptical buyer
  reads right after checking framework coverage and right before
  checking whether it has worked for anyone else.
- **Resources uses a slug-based detail route (`/resources/:slug`)**
  instead of one long page, matching real blog conventions and giving
  each article its own shareable URL.
- **Assistant has both a persistent widget and a full page** because the
  brief explicitly asked for both, and because a full page gives the
  assistant enough room to show suggested prompts and multi-turn history
  that the compact widget intentionally keeps minimal.

## 3. Typography rationale

Defined in `client/src/index.css` under `@theme`:

- **Space Grotesk** (display/headings): a geometric, slightly technical
  sans with distinctive letterforms (notably the double-story `g` and
  squared-off terminals). It reads as engineered rather than corporate,
  which fits a security company without leaning on the generic
  AI-SaaS default of Inter-for-everything.
- **IBM Plex Sans** (body): chosen specifically to pair with Plex Mono
  below as one coherent type family designed by IBM for technical
  documentation. Using two faces from the same family for body and data
  keeps the page from feeling like three unrelated typefaces stacked
  together, while Space Grotesk stays the one deliberately different
  voice, reserved for headings only.
- **IBM Plex Mono** (control IDs, audit log lines, code-like data):
  used specifically where the content is genuinely data-shaped: the
  homepage's live control-verification log (`ComplianceLiveDemo.jsx`),
  framework control counts, the `eyebrow` label style used across every
  section heading, and status pills (`StatusPill.jsx`). This is a
  content-driven choice, not decoration — SOC 2 control IDs and audit
  log lines are literally monospaced in real tooling, so the typeface
  choice mirrors the subject matter directly, per the brief's request
  for "monospace touches for data/technical elements."

## 4. Color system rationale

Also defined in `client/src/index.css`:

| Token | Hex | Role |
|---|---|---|
| `--color-bg` | `#0a0e13` | Base background — near-black, not pure black, to keep contrast comfortable |
| `--color-bg-raised` / `--color-surface` / `--color-surface-2` | `#10151c` / `#141a22` / `#1b232d` | Layered surfaces for section banding and cards without hard borders everywhere |
| `--color-border` / `--color-border-strong` | `#232c37` / `#333f4d` | Hairline dividers and interactive borders |
| `--color-text` / `--color-text-muted` / `--color-text-faint` | `#e9eef4` / `#93a1b0` / `#5c6b7a` | Three-step text hierarchy for headings, body copy, and metadata |
| `--color-accent` / `--color-accent-strong` | `#7b5cfa` / `#9580ff` | Signal Violet — the one confident accent, per the brief's "electric blue, cyber green, or violet, pick one" instruction |
| `--color-pass` / `--color-warn` / `--color-fail` | `#2ed3a3` / `#f5a623` / `#f0546b` | The status vocabulary of a compliance dashboard, not decorative color — every use ties to an actual pass/in-review/fail state (`StatusPill.jsx`, the live demo log, the pricing comparison table's check/cross marks) |

**Why violet, specifically**: violet reads as analytical/intelligent
without the "hacker green terminal" cliché that cyber-green risks, and
without electric blue's overlap with generic corporate SaaS blue. It is
used with restraint — as the brief specifies — appearing only for links,
primary buttons, active states, and the accent ring on the flagship GRC
product, never as a large fill.

**Accessibility**: `--color-text` (`#e9eef4`) on `--color-bg` (`#0a0e13`)
is roughly a 16.8:1 contrast ratio, well above WCAG AA/AAA for body text.
`--color-text-muted` (`#93a1b0`) on the same background is roughly 7.3:1,
comfortably AA for smaller text. Interactive elements use `:focus-visible`
with an explicit `--color-accent-strong` outline (`index.css`), and
`prefers-reduced-motion` is respected globally by zeroing transition/
animation durations rather than only skipping the signature gauge
animation.

## 5. UI/UX decisions

- **Layout grid**: a 1280px max-width container (`.container-page`) with
  responsive Tailwind grid utilities per section (2-column hero, 2/3/4-
  column card grids depending on content density). No 12-column CSS grid
  framework was introduced; Tailwind's grid utilities were sufficient for
  every layout in this build.
- **Component pattern**: a small set of primitives
  (`Section`/`SectionHeading`, `Reveal`, `StatusPill`) reused across every
  page rather than one-off styled divs per page, so visual rhythm (eyebrow
  → heading → description → content) stays consistent from Home through
  Terms.
- **Motion**: two motion patterns only, deliberately restrained per the
  brief's "don't overdo it" guidance:
  1. A scroll-reveal fade/rise (`Reveal.jsx` + `.reveal` CSS class in
     `index.css`) applied to card grids and list items sitewide.
  2. The one signature moment: `ComplianceLiveDemo.jsx` on the homepage,
     an animated readiness gauge plus a cycling monospace verification
     log, triggered once via `IntersectionObserver` when it scrolls into
     view. This is intentionally the only "showoff" animation on the
     site; every other page uses only the shared fade-reveal.
- **Mobile strategy**: single-column stacking is the default for all
  grids at the `md` breakpoint and below; the nav collapses to a slide-
  down menu (`Nav.jsx`) below `lg`; the floating assistant widget uses
  `92vw` width on small screens so it never overflows the viewport.

## 6. AI assistant design

**Architecture chosen: retrieval + intent-matching, not an LLM API call.**

Rationale: the brief explicitly allows either a free-tier hosted LLM or a
rule-based/retrieval assistant, and states the priority is that it be
"genuinely useful," not that it use an LLM specifically. A well-scoped
rule-based assistant that can only ever talk about ComplAI's real content
is more reliable for a compliance company's own marketing site than a
free-tier hosted model with no guardrails and a real risk of confidently
inventing framework details, which would be a uniquely bad failure mode
for a compliance product to ship.

**Implementation** (`server/src/lib/assistantEngine.js`,
`server/src/lib/knowledgeBase.js`):
- An ordered list of intents, each with a `test(message)` matcher and a
  `handle(message)` responder. More specific intents (framework lookup,
  readiness check) are checked before generic ones (FAQ, fallback).
- The knowledge base imports directly from `/shared` — the same
  `frameworks.js`, `solutions.js`, `pricing.js`, and `company.js` modules
  the React pages render — so the assistant's answers cannot drift out of
  sync with what the site itself says.
- Every response can include `actions`: navigation suggestions rendered as
  buttons by `AssistantChat.jsx` that route the user directly to the
  relevant page (e.g. asking about HIPAA returns a button to
  `/frameworks`; asking about pentesting returns a button to
  `/solutions/offensive`), satisfying the brief's deep-linking
  requirement.
- One implementation, `AssistantChat.jsx`, is shared by both the floating
  widget (`AssistantWidget.jsx`) and the full `/assistant` page
  (`pages/Assistant.jsx`), so there is exactly one chat UI and one client-
  side conversation flow to maintain.
- Server-side, `POST /api/assistant/chat` (`server/src/routes/assistant.js`)
  best-effort logs the exchange to `AssistantConversation` in MongoDB when
  a database is configured, for future analytics on what people actually
  ask, without ever blocking the chat response if logging fails.

**Limitations, stated plainly**:
- It can only answer questions its intents and knowledge base cover. Novel
  or highly specific questions fall through to a fallback response that
  redirects to a framework list or the contact page rather than guessing.
- It does no true natural-language understanding — matching is keyword/
  overlap-based (see `overlapScore` in `assistantEngine.js`), so
  unusually phrased questions can miss an intent that a human would
  obviously recognize.
- It does not maintain multi-turn context beyond what is logged; each
  message is matched independently, so it cannot resolve pronouns across
  turns ("what about that one?").

**Swapping in a real LLM later**: replace the body of
`getAssistantResponse()` in `assistantEngine.js` with a call to a hosted
model (a free-tier Groq/OpenRouter key, or a local Ollama endpoint),
passing the same `shared/` content as context/retrieval documents, and
keep the same `{ text, actions }` response shape so no client code needs
to change.

## 7. Tech/architecture overview

```
complai/
  client/       Vite + React 19, React Router, Tailwind v4
    src/components/     Nav, Footer, Layout, AssistantWidget, AssistantChat,
                         ComplianceLiveDemo, and small ui/ primitives
    src/pages/           One file per route (see App.jsx for the full route table)
    src/data/content.js  Re-exports everything from /shared for pages to import
    src/lib/             api.js (fetch wrapper), useReveal.js (scroll animation hook)
  server/       Express + Mongoose
    src/models/          ContactSubmission, NewsletterSignup, AssistantConversation
    src/routes/          contact.js, newsletter.js, assistant.js
    src/lib/             assistantEngine.js, knowledgeBase.js
    src/config/db.js     Mongo connection with graceful no-DB fallback
    src/server.js        App entry: CORS, JSON body parsing, rate limiting, routes
  shared/       frameworks.js, solutions.js, pricing.js, caseStudies.js,
                blog.js, company.js — content consumed by both client and server
  docs/         plan.md, marketing-notes.md, this report
```

**API routes**:
- `GET  /api/health` — liveness check.
- `POST /api/contact` — validates and stores a contact/demo submission;
  returns a mocked demo time slot and a mocked "email sent" confirmation.
- `POST /api/newsletter` — validates and stores (or dedupes) an email signup.
- `POST /api/assistant/chat` — runs a message through `assistantEngine.js`
  and returns `{ text, actions, intent, sessionId }`.

**DB schema** (`server/src/models/`):
- `ContactSubmission`: name, email, company, companySize,
  frameworksOfInterest[], message, requestedDemo, demoSlot, status, timestamps.
- `NewsletterSignup`: email (unique), source, timestamps.
- `AssistantConversation`: sessionId (indexed), messages[] (role, text,
  intent, timestamps).

**Frontend/backend/AI-layer connection**: the client's `src/lib/api.js`
calls `/api/*`, proxied to the Express server in dev via
`client/vite.config.js`'s `server.proxy`. The assistant widget and page
both call `sendAssistantMessage()`, which hits `/api/assistant/chat`,
which runs the same `shared/`-content-backed engine used to answer
"which frameworks do you support"-style questions consistently with what
the Frameworks and Pricing pages actually display.

## 8. Traceability check

| Claim in this report | Where to verify it |
|---|---|
| GRC listed first, flagged as flagship | `shared/solutions.js` (array order, `flagship: true`), `client/src/components/Nav.jsx`, `client/src/pages/Home.jsx` |
| Solution detail pages share one component | `client/src/pages/SolutionDetail.jsx`, routed via `/solutions/:id` in `client/src/App.jsx` |
| Live compliance gauge is the signature animation | `client/src/components/ComplianceLiveDemo.jsx`, used only in `Home.jsx` |
| Scroll-reveal is the only other motion pattern | `client/src/components/ui/Reveal.jsx`, `.reveal` in `client/src/index.css`, used across About/Home/SolutionsIndex/SolutionDetail/CaseStudies/Resources |
| Type system (Space Grotesk / IBM Plex Sans / IBM Plex Mono) | `@theme` block and Google Fonts `@import` in `client/src/index.css` |
| Color tokens and status-color usage | `@theme` block in `client/src/index.css`; `StatusPill.jsx`; `Pricing.jsx` comparison table icons |
| Assistant is rule-based/retrieval, not an LLM call | `server/src/lib/assistantEngine.js` (no HTTP calls to any model provider) |
| Assistant knowledge base reuses site content | Imports at the top of `server/src/lib/knowledgeBase.js` from `/shared` |
| Assistant returns navigable actions | `actions` field built throughout `assistantEngine.js`; rendered in `client/src/components/AssistantChat.jsx` |
| Contact form persists to MongoDB when configured | `server/src/routes/contact.js`, `server/src/models/ContactSubmission.js` |
| Contact form degrades gracefully with no DB | `isDbConnected()` checks in `contact.js` and `newsletter.js`; `server/src/config/db.js` |
| Email sending is mocked, not a paid provider | Comment block and `emailSent: true` mock in `server/src/routes/contact.js` |
| No paid data APIs for charts | `ComplianceLiveDemo.jsx` uses a hardcoded `LOG_LINES` array, no external fetch |
| Icons are open-license | `lucide-react` package (ISC license), used throughout `client/src/components` and `client/src/pages` |
| Fonts are open-license | Google Fonts `@import` in `client/src/index.css` (Space Grotesk, IBM Plex Sans, IBM Plex Mono, all open license) |
| Frameworks page detail content | `client/src/pages/Frameworks.jsx` rendering `shared/frameworks.js` |
| Pricing comparison table | `client/src/pages/Pricing.jsx` rendering `shared/pricing.js` |
| Case studies with real metrics | `client/src/pages/CaseStudies.jsx` rendering `shared/caseStudies.js` |
| Four full-length blog articles | `client/src/pages/Resources.jsx` / `ResourceArticle.jsx` rendering `shared/blog.js` |
| Legal pages are fully written, not stubs | `client/src/pages/Privacy.jsx`, `client/src/pages/Terms.jsx` |
| No emoji anywhere in the codebase | Verified via repo-wide search at build time; none present in any `.js`/`.jsx`/`.md` file |
| No AI-authorship references in repo or commits | Verified via repo-wide search; git commit author set to a team identity, not a tool name |

## 9. What's mocked vs. real

**Real**:
- The full React site, all 18 routes, fully responsive, with real
  written copy throughout (no lorem ipsum anywhere).
- The Express API: contact form and newsletter signup genuinely validate
  input and write to MongoDB when `MONGODB_URI` is configured.
- The AI assistant: a genuinely functioning rule-based/retrieval engine
  that answers from the site's real content and returns working
  navigation actions. This is real, working software, not a mock — it is
  simply not backed by a hosted LLM.
- Rate limiting, CORS configuration, and input validation on all API
  routes.

**Mocked, with a documented swap-in path**:
- **Outbound email**: the contact route returns `emailSent: true` without
  calling a real provider. To make this real: install a provider SDK
  (e.g. Resend's free tier supports 3,000 emails/month), call it inside
  `server/src/routes/contact.js` where the comment block marks the spot,
  and set `emailSent` from the real API response.
- **"Book a demo" time slots**: `DEMO_SLOTS` in `contact.js` is a small
  hardcoded array the server picks from at random. A real implementation
  would call a scheduling provider's API (e.g. a free-tier Cal.com
  instance) for genuinely available slots.
- **Database, when unset**: with no `MONGODB_URI`, the app runs fully but
  contact/newsletter submissions are accepted and logged to the server
  console instead of persisted (`isDbConnected()` checks throughout).
  This is intentional graceful degradation, not a bug, so the portfolio
  build runs with zero required paid services.

**Not applicable / no paid dependency exists anywhere in this build**:
no analytics SDK, no paid font, no stock photo service, no chart API, no
CDN-hosted paid icon set. `lucide-react` and Google Fonts are the only
external asset dependencies, both free and open-license.
