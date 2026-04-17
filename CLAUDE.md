# Smart Website Management — smartwebsitemanagement.ca

## What This Is
Agency website for Smart Website Management — the done-for-you arm of the Marketing Team in a Box (MTB) network. Positioned as the agency that delivers the MTB platform to small service businesses.

## Architecture
- **Framework:** Next.js 14 App Router (TypeScript)
- **Styling:** Tailwind CSS v3 (DM Sans font, MTB color palette)
- **Database:** Supabase (shared empire instance — msqiynbhoeruqctaesqk)
- **Email:** Resend (from outreach@smartwebsitemanagement.ca, to 1terryshaw@gmail.com)
- **Payments:** Stripe (live mode, canonical empire pricing)
- **Hosting:** Vercel (scope: terence-shaws-projects)
- **Domain:** smartwebsitemanagement.ca (DNS via Cloudflare)

## Site Map
```
/               — Homepage (hero, stats, services, pricing preview, case studies, CTA)
/services       — Three service cards: Website Build, Marketing Automation, Lead Gen
/pricing        — 4 canonical empire tiers: Free / Reviews $15 / Website $49 / Growth $97
/case-studies   — Casa Can (Growth) + K59 Surf Resort (Migration)
/about          — Terry Shaw bio, MTB network links
/contact        — Lead capture form → smw_leads table + Resend notification
/api/health     — JSON health check
/api/contact    — POST: insert smw_leads + send email
```

## Key Files
```
app/layout.tsx              — Root layout, JSON-LD Organization + Service schemas
app/page.tsx                — Homepage with 6 sections
app/opengraph-image.tsx     — Dynamic OG image generator (edge runtime)
lib/pricing.ts              — Canonical empire pricing tiers + Stripe price IDs
lib/supabase.ts             — Supabase admin client (service_role)
components/Navigation.tsx   — Dark sticky nav, mobile hamburger
components/Footer.tsx       — 4-column footer with MTB network links
setup-fresh.sql             — Supabase schema for smw_leads table
```

## Canonical Empire Pricing (CAD monthly)
| Tier | Price | Use |
|------|-------|-----|
| Free | $0 | Directory listing |
| Reviews | $15 | Review automation |
| Website | $49 | Custom website + reviews |
| Growth | $97 | Website + CRM + lead gen |

Stripe price IDs loaded from env vars (STRIPE_PRICE_*). Same IDs across all empire properties.

## Design
- Colors: Navy #0F1B2D, Dark #1A2332, Accent #2563EB, Gold #F59E0B, Slate #64748B
- Font: DM Sans (Google Fonts import)
- Layout: max-w-6xl, light body (#fff), dark nav/footer/hero
- Matches marketingteaminabox.com exactly

## Dev Commands
```bash
npm run dev       # local dev server (port 3000)
npm run build     # production build
npm run lint      # ESLint
npx vercel --prod # deploy to production
```

## Environment Variables
All keys in ~/empire/secrets/master.env. Copy to .env.local:
- ANTHROPIC_API_KEY
- NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY, STRIPE_WEBHOOK_SECRET
- STRIPE_PRICE_* (6 canonical price IDs)
- RESEND_API_KEY, RESEND_FROM
