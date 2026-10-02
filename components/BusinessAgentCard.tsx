// swm-business-agent-mva-v1: the $199 Business Agent card + the pricing ladder (Free listing -> $99 Website + AI Receptionist -> $199 Business Agent).
// The founding $149-for-life line is rendered ONLY while Stripe's own redemption counter (read via swm-agent /api/pricing) says fewer than 10 are taken.
// Fail closed: if the pricing endpoint is unreachable the founding line is simply not shown; the $199 list price never depends on it.
import Link from 'next/link'

const PRICING_URL = 'https://swm-agent-phi.vercel.app/api/pricing'
type Pricing = { founding?: { available?: boolean; price_usd?: number; cap?: number | null; remaining?: number | null } }
async function getPricing(): Promise<Pricing | null> {
  try {
    const r = await fetch(PRICING_URL, { next: { revalidate: 60 }, signal: AbortSignal.timeout(5000) })
    return r.ok ? ((await r.json()) as Pricing) : null
  } catch { return null }
}

// Approved card copy — do not reword. Each line maps to a live, tested feature (see swm-business-agent-mva-v1 REPORT).
const HEADLINE = 'Business Agent — $199/mo, no contract.'
const LEAD_IN = 'Everything in Website + AI Receptionist, plus:'
const FEATURES = [
  'Never miss a lead — every inquiry answered instantly, day or night.',
  'Replies written for you — approve with one tap.',
  "Morning briefing — who's waiting and what to do first.",
  'Quiet quotes followed up for you.',
  'More reviews — a request after every job.',
]
const CLOSING = 'Free for 7 days on your real leads.'
const LADDER = ['Free listing', '$99 Website + AI Receptionist', '$199 Business Agent']

export default async function BusinessAgentCard() {
  const p = await getPricing()
  const f = p?.founding
  const open = !!(f && f.available === true && typeof f.remaining === 'number' && typeof f.cap === 'number' && f.remaining > 0 && f.remaining <= f.cap)
  return (
    <div className="max-w-3xl mx-auto" data-testid="business-agent-section">
      <ol aria-label="Plan ladder" className="flex flex-col sm:flex-row sm:items-stretch gap-2 sm:gap-0 text-sm font-medium text-center mb-8" data-testid="ladder">
        {LADDER.map((step, i) => (
          <li key={step} className={`flex-1 flex items-center justify-center rounded-lg sm:rounded-none px-3 py-3 border ${i === LADDER.length - 1 ? 'bg-smw-navy text-white border-smw-navy' : 'bg-white text-gray-700 border-gray-200'} ${i === 0 ? 'sm:rounded-l-lg' : ''} ${i === LADDER.length - 1 ? 'sm:rounded-r-lg' : ''}`}>
            {i > 0 && <span aria-hidden="true" className="mr-2 text-gray-400">→</span>}{step}
          </li>
        ))}
      </ol>
      <div className="rounded-xl bg-white p-6 sm:p-8" style={{ border: '1.5px solid #2563EB', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} data-testid="business-agent-card">
        <h3 className="text-xl sm:text-2xl font-bold">{HEADLINE}</h3>
        <p className="mt-3 text-base">{LEAD_IN}</p>
        <ul className="mt-4 space-y-3">
          {FEATURES.map((t) => (
            <li key={t} className="flex items-start gap-2 text-base">
              <span className="text-green-500 mt-0.5" aria-hidden="true">&#10003;</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-base font-semibold">{CLOSING}</p>
        {open && (
          <p className="mt-4 rounded-lg bg-blue-50 px-4 py-3 text-base font-semibold text-blue-900" data-testid="founding-offer">
            Founding offer: ${f!.price_usd}/mo, locked for life — only {f!.remaining} of {f!.cap} spots left.
          </p>
        )}
        <Link href="/contact" className="mt-6 block w-full rounded-lg py-4 text-center text-lg font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: '#2563EB', minHeight: 56 }} data-testid="business-agent-cta">
          Get started — free for 7 days
        </Link>
      </div>
    </div>
  )
}
