# Operations — Smart Website Management

## Local Development

```bash
cd ~/empire/nav-fix/smart-website-management
npm run dev
```

Open http://localhost:3000

## Environment Setup

```bash
# Copy keys from empire master.env
grep -E "^(ANTHROPIC_API_KEY|NEXT_PUBLIC_SUPABASE|SUPABASE_SERVICE|STRIPE_|RESEND_)" ~/empire/secrets/master.env > .env.local
```

## Build

```bash
npm run build
```

Expect: all pages static except /api/contact, /api/health, /opengraph-image (dynamic).

## Deploy

```bash
git pull origin master
npm run build        # verify locally first
npx vercel --prod    # deploy to production
```

Scope: terence-shaws-projects

## Database

Table: `smw_leads` on shared Supabase instance (msqiynbhoeruqctaesqk).

To recreate:
1. Open Supabase Dashboard → SQL Editor
2. Paste contents of `setup-fresh.sql`
3. Run

RLS: service_role only (blocks anon/authenticated).

## Testing Endpoints

```bash
# Health check
curl http://localhost:3000/api/health

# Contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
```

## Monitoring

- Vercel dashboard: deployment logs, function logs
- Supabase dashboard: smw_leads table rows
- Resend dashboard: email delivery status
