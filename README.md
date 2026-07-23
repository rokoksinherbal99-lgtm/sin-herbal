# Sin Herbal

E-commerce & company profile untuk Sin Herbal — distributor resmi produk herbal berkualitas dari TSI (PT Triday Sinergi Indonesia).

**Live:** [rokoksin.vercel.app](https://rokoksin.vercel.app)

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Database:** PostgreSQL (Neon) + Drizzle ORM
- **Auth:** Bcrypt password hashing, DB sessions (24h sliding window)
- **Rate Limiting:** Upstash Redis (with in-memory fallback)
- **Chat AI:** Groq LLM (Llama 3.3 70B) + Fuse.js knowledge base
- **PWA:** Service worker with stale-while-revalidate caching
- **Styling:** Tailwind CSS v4

## Features

- Product catalog with 19 products from TSI (SKT, SKM, Kopi)
- Shopping cart & order flow
- Admin panel (CRUD products, manage orders, testimonials)
- AI chatbot ("Sin") with knowledge base, conversational flows, anti-hallucination
- Journal articles
- PWA installable on mobile
- SEO: OG tags, JSON-LD, sitemap, robots.txt

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in env vars
npm run db:push               # push schema to Neon
npm run dev
```

## Environment Variables

See `.env.example` for the full list. Key vars:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `ADMIN_PASSWORD` | Admin panel password |
| `GROQ_API_KEY` | Groq API for chatbot LLM |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis (rate limiting + chat sessions) |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis auth token |

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run db:push` | Push Drizzle schema to database |
| `npm run db:seed` | Seed database with products |

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── admin/         # Admin API (auth-protected)
│   │   ├── chat/          # AI chatbot endpoint
│   │   └── orders/        # Public order creation
│   ├── admin/             # Admin panel pages
│   ├── products/          # Product catalog
│   ├── journal/           # Blog articles
│   └── ...                # Other pages (FAQ, Harga, etc.)
├── components/            # React components
├── lib/
│   ├── chat/              # Chatbot: knowledge base, flows, intent, matcher
│   ├── admin-auth.ts      # Admin session management
│   ├── rate-limit.ts      # Rate limiting (Redis + in-memory)
│   └── systemPrompt.ts    # LLM system prompt
├── db/
│   ├── schema.ts          # Drizzle schema
│   └── index.ts           # DB connection
public/
└── images/                # Product photos (local)
```

## Admin Access

- URL: [rokoksin.vercel.app/admin](https://rokoksin.vercel.app/admin)
- Credentials configured via `ADMIN_PASSWORD` env variable
