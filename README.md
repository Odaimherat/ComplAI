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
