# Build Plan (working notes)

This file is the running decision log written while building. The final,
polished writeup lives in `design-and-research-report.md`; this file is the
raw material for it, kept for traceability.

## Stack decision

- MERN, JavaScript (not TypeScript). Rationale: the brief made TS optional
  ("your call, but be consistent"). For a single-author, time-boxed portfolio
  build across 11 pages plus a backend, plain modern ES2022+ JS with strict
  prop conventions and JSDoc-style comments on non-obvious functions gives
  the best speed/readability tradeoff without sacrificing consistency. Every
  file uses the same conventions throughout (functional components, named
  exports for utilities, default export for components).
- Vite + React 19 for the client, React Router v6 for routing.
- Express + Mongoose for the API. MongoDB via a local/free connection string
  (Mongo Atlas free tier or a local `mongod`); the app degrades gracefully
  (logs a warning, keeps serving static content and the rule-based
  assistant) if no DB is reachable, so the portfolio still runs without a
  live database.
- Tailwind CSS v4 (CSS-first `@theme` config) for utility styling, layered
  under a small set of hand-written components in `index.css` for the
  design tokens described in the report.

## Folder structure

```
complai/
  client/                  Vite + React app
    src/
      components/          Shared UI (Nav, Footer, Assistant widget, etc.)
      components/ui/        Small primitives (Button, Badge, Section, etc.)
      pages/                One file per route
      data/                 Structured site content (frameworks, pricing, blog)
      lib/                  assistant knowledge base + matcher, api client
      styles handled via index.css design tokens
  server/                  Express API
    src/
      models/               Mongoose schemas
      routes/                Express routers
      lib/                   assistant engine (shared logic, mirrors client copy)
      config/                db connection
      server.js
  docs/
    plan.md                        this file
    design-and-research-report.md  final report
    marketing-notes.md             ICP / GTM brief
  README.md
```

## Page list (final)

1. `/` Home
2. `/about`
3. `/solutions/grc` (flagship)
4. `/solutions/soc`
5. `/solutions/defensive`
6. `/solutions/offensive`
7. `/solutions` (overview/index, links into the four above)
8. `/frameworks`
9. `/how-ai-works`
10. `/case-studies`
11. `/pricing`
12. `/resources` (blog index)
13. `/resources/:slug` (4 article pages)
14. `/contact`
15. `/assistant` ("Ask ComplAI" full page)
16. `/privacy`
17. `/terms`
18. `/404`

GRC leads the main nav directly (`Solutions` opens with GRC first in the
dropdown and on the `/solutions` index), ahead of SOC, Defensive, and
Offensive, per the brief's positioning.

## Color palette (first pass, see report for final rationale)

- Background `#0a0e13`, raised `#10151c`, surface `#141a22`, surface-2 `#1b232d`
- Border `#232c37` / `#333f4d`
- Text `#e9eef4` / muted `#93a1b0`
- Accent: Signal Violet `#7b5cfa` (strong `#9580ff`)
- Status vocabulary (pass/warn/fail), reused everywhere a control, check,
  or risk shows a state: `#2ed3a3` / `#f5a623` / `#f0546b`

## Type

- Display: Space Grotesk
- Body: IBM Plex Sans
- Mono (control IDs, audit log lines, code): IBM Plex Mono

## AI assistant architecture decision

No paid LLM key is available in this environment and none should be assumed
for a portfolio deployment. Building a **retrieval + intent-matching
rule-based assistant** ("ComplAI Assistant") backed by a structured
knowledge base of the site's own content (frameworks, solutions, pricing,
FAQs). It:
- classifies the user's message against a small set of intents (framework
  lookup, "am I ready for SOC 2"-style readiness questions, service
  questions, pricing, navigation, definitions),
- returns a written answer plus optional "jump to page" actions,
- is implemented once, in `server/src/lib/assistantEngine.js`, and called
  by both the floating widget and the `/assistant` page through the same
  `/api/assistant/chat` endpoint (no duplicated logic client vs server).

This is documented in full in the report, including exactly where an LLM
API key could be dropped in later.

## Commit plan

Commits are grouped by layer as the brief requests: chore/scaffold, backend
models+routes, frontend design system, home page, solutions/frameworks
pages, remaining pages, AI assistant, docs, final polish.
