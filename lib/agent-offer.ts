// Business Agent offer on the pricing page: approved card copy (do not reword) + the monthly/annual figures. annual-v1 (CEO ruling 2026-10-03): $1,990/yr (= 10x monthly), founding $1,490/yr locked for life.
// The founding line ("first 10 owners" — no counts, countdowns or timers) is shown ONLY while Stripe's own shared redemption counter (read via swm-agent /api/pricing) says fewer than 10 are taken, per interval. Fail closed: endpoint unreachable => no founding line; list prices never depend on it.
export const START_URL = 'https://app.smartwebsitemanagement.ca/start/'   // self-serve 7-day no-card trial (annual keeps the same no-card trial)
const PRICING_URL = 'https://app.smartwebsitemanagement.ca/api/pricing'
export type AgentPricing = { founding?: { available?: boolean; available_year?: boolean; price_usd?: number; price_year_usd?: number; cap?: number | null; remaining?: number | null } } | null
export async function getAgentPricing(): Promise<AgentPricing> {
  try {
    const r = await fetch(PRICING_URL, { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) })
    return r.ok ? ((await r.json()) as AgentPricing) : null
  } catch { return null }
}
export const AGENT = {
  name: 'Business Agent',
  monthlyUSD: 199, annualUSD: 1990, foundingMonthlyUSD: 149, foundingAnnualUSD: 1490,
  // Approved card copy (CEO 2026-10-03) — exactly these eight lines, in this order. Never claim phone/SMS, auto-send, or direct Gmail/Outlook.
  features: [
    'Everything in Reviews Plus',
    'AI agent helps catch and manage incoming leads',
    'Drafts replies for your approval',
    'Drafts follow-ups on quiet quotes',
    'Morning briefing',
    'Monthly results summary',
    'Review requests',
    'Website + AI Receptionist included if you want it',
  ],
  cta: 'Start 7-Day Free Trial',
  ctaNote: 'No card required',
  starts: ['Free listing', 'Reviews Plus', 'Website + AI Receptionist'],
} as const
