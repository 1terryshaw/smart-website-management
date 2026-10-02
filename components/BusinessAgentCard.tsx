// swm-business-agent-mva-v1: the $199 Business Agent card + the pricing ladder (Free listing -> $99 Website + AI Receptionist -> $199 Business Agent).
// The founding $149-for-life line is rendered ONLY while Stripe's own redemption counter (read via swm-agent /api/pricing) says fewer than 10 are taken.
// Fail closed: if the pricing endpoint is unreachable the founding line is simply not shown; the $199 list price never depends on it.

const START_URL = 'https://swm-agent-phi.vercel.app/start/'   // self-serve trial signup (swm-business-agent-billing-v1 item 6, after the live end-to-end proof)
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
const LEAD_IN = "Includes Reviews Plus. Want our Website + AI Receptionist too? It's included in your $199. Plus:"
const FEATURES = [
  'Never miss a lead — every inquiry gets an instant reply, day or night.',
  'Replies drafted for you — you approve before anything is sent.',
  "Morning briefing — who's waiting and what to do first.",
  'Quiet quotes — follow-ups drafted for you.',
  'More reviews — a review request ready after every job.',
]
const CLOSING = 'Try it free for 7 days, no card needed.'
// CEO ruling 2026-10-03: the Agent is available directly from Free, Reviews Plus or Website — NOT a linear ladder, and nobody is forced through $99 first.
const STARTS = ['Free listing', 'Reviews Plus ($9)', 'Website + AI Receptionist ($99)']

export default async function BusinessAgentCard() {
  const p = await getPricing()
  const f = p?.founding
  const open = !!(f && f.available === true && typeof f.remaining === 'number' && typeof f.cap === 'number' && f.remaining > 0 && f.remaining <= f.cap)
  return (
    <div className="max-w-3xl mx-auto" data-testid="business-agent-section">
      <div className="mb-8" data-testid="ladder">
        <p className="text-sm font-medium text-center text-gray-600 mb-3">Start the Business Agent directly from any plan:</p>
        <ul aria-label="Ways to start the Business Agent" className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm font-medium text-center">
          {STARTS.map((step) => (
            <li key={step} className="flex flex-col items-center justify-center rounded-lg px-3 py-3 border bg-white text-gray-700 border-gray-200" data-testid="start-path">
              <span>{step}</span>
              <span aria-hidden="true" className="text-gray-400">↓</span>
              <span className="font-semibold text-white bg-smw-navy rounded px-2 py-1">$199 Business Agent</span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-center text-gray-500">One $199 total, whichever way you start — a Website owner keeps their site live.</p>
      </div>
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
        <a href={START_URL} className="mt-6 block w-full rounded-lg py-4 text-center text-lg font-semibold text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: '#2563EB', minHeight: 56 }} data-testid="business-agent-cta">
          Start free for 7 days — no card needed
        </a>
      </div>
    </div>
  )
}
