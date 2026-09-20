# Architecture

The application is a Next.js App Router project using TypeScript, Tailwind CSS, Recharts, and Lucide icons. The current release is a client-rendered executive workspace backed by typed source data.

## Layers

- `app/` — application shell, metadata, global presentation.
- `components/` — dashboard views and reusable presentation elements.
- `data/` — editable demo and planning data; no secrets or confidential technical details.
- `types/` — shared data contracts and status vocabulary.
- `public/` — non-sensitive static assets.
- `docs/` — operations, security, deployment, and integration guidance.

Future production architecture should place identity enforcement and authorisation in front of every route, use server-side APIs, retain immutable audit history, encrypt data at rest/in transit, and separate executive summaries from restricted operational detail.
