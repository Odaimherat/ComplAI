# ComplAI

Continuous compliance, powered by AI. A full marketing website for ComplAI,
an AI-driven GRC (Governance, Risk & Compliance) company, with three
supporting AI-augmented security lines: SOC/MDR, Defensive Security, and
Offensive Security.

This is a portfolio build: a complete MERN application (MongoDB, Express,
React, Node) with a working backend, a rule-based AI assistant, and no paid
APIs or services anywhere in the stack.

## Stack

- **Client**: React 19 + Vite, React Router, Tailwind CSS v4, lucide-react icons.
- **Server**: Express + Mongoose (MongoDB), zero paid dependencies.
- **Fonts**: self-hosted via `@fontsource` (Space Grotesk, IBM Plex Sans,
  IBM Plex Mono, Cairo, Tajawal). No Google Fonts CDN request at runtime -
  the site works with the network fully disconnected once `npm install`
  has run once.
- **Theming**: light and dark mode, toggleable from the nav, persisted
  locally and defaulting to the visitor's OS preference. See
  `client/src/context/ThemeContext.jsx`.
- **Language**: English and Arabic, with right-to-left layout, toggleable
  from the nav. See `client/src/context/LanguageContext.jsx` and
  `client/src/i18n/translations.js`. Scope is documented honestly in
  `docs/design-and-research-report.md` section 10 - all navigation, forms,
  and marketing copy is translated; long-form content (full blog articles,
  full legal text, detailed case studies) stays English in this build.
- **Shared content**: `/shared` holds the site's real content (frameworks,
  solutions, pricing, case studies, blog, company info) as plain JS modules,
  imported by both the client (for pages) and the server (for the AI
  assistant's knowledge base), so there is one source of truth.

## Project structure

```
complai/
  client/     Vite + React app (the website)
  server/     Express API (contact form, newsletter, AI assistant)
  shared/     Site content shared between client and server
  docs/       Plan, marketing notes, and the design/research report
```

## Prerequisites

- Node.js 20+ and npm
- MongoDB is optional. Without it, the site runs fully; contact-form and
  newsletter submissions are accepted but not persisted (this is by
  design, see `server/src/config/db.js`).

## Setup

```bash
git clone <this-repo-url>
cd complai
npm run install:all   # installs client + server dependencies
```

### Environment variables

Copy the example env file and fill in what you have (everything is optional):

```bash
cp server/.env.example server/.env
```

| Variable | Required | Purpose |
|---|---|---|
| `MONGODB_URI` | No | Connects the API to MongoDB. Leave unset to run without persistence. A free MongoDB Atlas cluster works fine. |
| `PORT` | No | Port for the Express API. Defaults to `4000`. |
| `CLIENT_ORIGIN` | No | Allowed CORS origin. Defaults to `http://localhost:5173` in dev. |

The client needs no environment variables in development; Vite proxies
`/api` requests to the Express server (see `client/vite.config.js`).

## Running locally

From the repo root, run both client and server together:

```bash
npm run dev
```

This starts the Express API on `http://localhost:4000` and the Vite dev
server on `http://localhost:5173`. Open the latter in your browser.

Or run them separately:

```bash
npm run dev --prefix server   # API on :4000
npm run dev --prefix client   # website on :5173
```

## Building for production

```bash
npm run build --prefix client   # outputs client/dist
```

Serve `client/dist` with any static host, and run `node server/src/server.js`
(with `MONGODB_URI` set) as the API behind it.

## Troubleshooting

**`vite` or `nodemon` says "not found" right after `npm install`.**
Dependencies weren't installed in that specific folder yet. Run
`npm run install:all` from the repo root (see Setup above) - it installs
into `client/` and `server/` separately, since they're independent
projects with their own `package.json`.

**Running under WSL (Windows Subsystem for Linux) and `npm run dev`
crashes with `Bus error` / exit code 135.** This is a known WSL2 issue,
not a bug in this codebase: Vite's bundler ships a native binary
(`@rolldown/...`), and native binaries loaded from a Windows drive mounted
into WSL (a path under `/mnt/c/...`, using DrvFs) can fail to load
correctly, which the kernel reports as a bus error. Two fixes, pick one:
1. **Run from a native Windows shell instead** (PowerShell or Command
   Prompt, not the WSL/Ubuntu terminal) if your project folder is already
   on a Windows drive (e.g. `C:\Users\...`). Delete `node_modules` in the
   root, `client/`, and `server/` folders, then re-run `npm install` and
   `npm run install:all` **from that Windows shell** so it installs the
   Windows-native binaries, then `npm run dev`.
2. **Or move the project into WSL's own Linux filesystem** (e.g.
   `~/projects/complai`, not anywhere under `/mnt/c/...`) and reinstall
   there with a Linux shell. `ext4` doesn't have this DrvFs limitation.

Either way, once dependencies are installed from the environment you'll
actually run the dev server from, this does not recur.

## Additional features

Beyond the marketing site itself, this build includes a few features
that demonstrate full-stack, not just front-end, capability:

- **Admin dashboard** (`/admin/login`, linked quietly from the footer):
  password-protected internal tool showing lead/newsletter/subscription
  data with real Mongo aggregation queries and dependency-free SVG
  charts. Default password is `complai-admin` (set `ADMIN_PASSWORD` in
  `server/.env` to change it). Session tokens are real signed JWTs.
- **Mock self-serve checkout** (`/checkout/starter` from the Pricing
  page): a full card-entry flow with real client- and server-side
  validation (including a Luhn checksum), but no real payment processor
  is ever contacted - see the doc comment in
  `server/src/routes/billing.js` for exactly what a real Stripe
  integration would replace. Try `4242 4242 4242 4242`, any future
  expiry, any 3-digit CVC.
- **Trust Center** (`/trust-center`): a public status/certifications/
  sub-processors page, the same pattern real GRC vendors like Vanta and
  Drata publish.
- **Cmd+K / Ctrl+K global search**: client-side search across every
  framework, solution, article, and page.
- **Interactive platform preview**: a framed, tab-switching mockup of
  what the actual product dashboard would look like, on the GRC
  solution page.

## Frequently asked (about this build itself)

**Does this need internet access to run?** No. After the one-time
`npm install`, everything - fonts, icons, styling, the AI assistant, the
compliance-score animation - runs from local code and local files.
MongoDB is the only optional network dependency, and the app runs fully
without it (see the table above). There is no step in normal usage of the
site that calls out to the internet.

**Is the AI assistant "real"?** Yes, in the sense that it is genuinely
working software that reads your question, matches it against real site
content, and returns a real answer plus real working navigation buttons -
none of it is faked or hardcoded per-question. It is *not* a hosted large
language model; it is a rule-based/retrieval engine (see
`server/src/lib/assistantEngine.js`). This was a deliberate choice
explained in full in `docs/design-and-research-report.md` section 6, not
a shortcut: it means the assistant can never hallucinate a fake framework
detail, at the cost of only being able to answer questions its intents
cover.

## What's mocked vs. real

See `docs/design-and-research-report.md`, section 9, for the full
breakdown. In short: the contact form and newsletter signup genuinely
write to MongoDB when `MONGODB_URI` is set; outbound email is mocked
(the API returns a confirmation without calling a paid email provider);
the AI assistant is a real, working rule-based/retrieval engine querying
the site's own content, not a hosted LLM.

## Documentation

- `docs/plan.md` — working notes from the build process.
- `docs/marketing-notes.md` — positioning, ICP, and go-to-market brief.
- `docs/design-and-research-report.md` — full design rationale, competitive
  research, architecture overview, and a traceability check mapping every
  claim in the report to real code.
