# Deploy — Smart Website Management

## From Laptop (PowerShell)

### First-time setup

```powershell
cd C:\Users\lterr\Projects
```

```powershell
git clone https://github.com/1terryshaw/smart-website-management.git
```

```powershell
cd smart-website-management
```

### Deploy to production

```powershell
git pull origin master
```

```powershell
npx vercel --prod
```

### Add environment variables

Import `.env.example` via Vercel Dashboard → Settings → Environment Variables → Import .env

Or use Vercel CLI:

```powershell
npx vercel env pull
```

## DNS Cutover (Cloudflare)

1. Remove existing CNAME/A records pointing at GHL
2. Add: `CNAME www → cname.vercel-dns.com`
3. Add: `A @ → 76.76.21.21`
4. Proxy: ON (orange cloud)
5. SSL: Full (Strict)

## Vercel Domain Setup

1. Vercel Dashboard → smart-website-management → Settings → Domains
2. Add: `smartwebsitemanagement.ca`
3. Add: `www.smartwebsitemanagement.ca`
4. Verify both resolve with padlock

## Post-Deploy Verification

```powershell
curl https://smartwebsitemanagement.ca/api/health
```

Expect: `{"status":"ok","service":"smart-website-management",...}`
