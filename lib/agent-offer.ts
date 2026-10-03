// Business Agent offer on the pricing page: approved card copy (do not reword) + the monthly/annual figures. annual-v1 (CEO ruling 2026-10-03): $1,990/yr (= 10x monthly), founding $1,490/yr locked for life.
// The founding line is shown ONLY while Stripe's own shared redemption counter (read via swm-agent /api/pricing) says fewer than 10 are taken, per interval. Fail closed: endpoint unreachable => no founding line; list prices never depend on it.
export const START_URL = 'https://swm-agent-phi.vercel.app/start/'   // self-serve 7-day no-card trial (annual keeps the same no-card trial)
const PRICING_URL = 'https://swm-agent-phi.vercel.app/api/pricing'
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
  leadIn: "Includes Reviews Plus. Want our Website + AI Receptionist too? It's included in your $199.",
  features: [
    'Never miss a lead — every inquiry gets an instant reply, day or night.',
    'Replies drafted for you — you approve before anything is sent.',
    "Morning briefing — who's waiting and what to do first.",
    'Quiet quotes — follow-ups drafted for you.',
    'More reviews — a review request ready after every job.',
  ],
  closing: 'Try it free for 7 days, no card needed.',
  cta: 'Start free for 7 days — no card needed',
  starts: ['Free listing', 'Reviews Plus', 'Website + AI Receptionist'],
} as const
