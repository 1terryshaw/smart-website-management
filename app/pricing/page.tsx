import type { Metadata } from 'next'
import Link from 'next/link'
import { PRICING_TIERS } from '@/lib/pricing'

export const metadata: Metadata = {
  title: 'Pricing — Smart Website Management',
  description: 'Simple, transparent pricing for small service businesses. Free to start, paid plans from $15/mo CAD. Website, CRM, reviews, and lead generation included.',
  alternates: { canonical: 'https://www.smartwebsitemanagement.ca/pricing' },
}

export default function PricingPage() {
  return (
    <>
      <section className="bg-smw-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-smw-accent">Pricing</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">Simple, transparent pricing.</h1>
          <p className="text-gray-400 mt-3 max-w-lg">
            Start free. Upgrade when you&apos;re ready. Every tier delivers more value than it costs. All prices in CAD.
          </p>
        </div>
      </section>

      <section className="bg-smw-off-white bg-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.slug}
                className={`tier-card relative rounded-xl p-6 border bg-white ${
                  tier.highlighted
                    ? 'border-smw-accent ring-1 ring-smw-accent/20 bg-smw-accent/[0.02]'
                    : 'border-gray-200'
                }`}
              >
                {tier.tag && (
                  <span className={`absolute -top-2.5 left-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    tier.highlighted ? 'bg-smw-accent text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tier.tag}
                  </span>
                )}
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-smw-navy">{tier.name}</h3>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-3xl font-bold text-smw-navy">
                      {tier.monthlyPrice === 0 ? 'Free' : `$${tier.monthlyPrice}`}
                    </span>
                    {tier.monthlyPrice > 0 && <span className="text-sm text-smw-slate">/mo</span>}
                  </div>
                  {tier.annualPrice > 0 && (
                    <p className="text-xs text-smw-slate mt-1">
                      or ${tier.annualPrice}/yr (save 2 months)
                    </p>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <svg className="w-4 h-4 mt-0.5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      <span className="text-sm text-smw-slate">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block text-center text-sm font-semibold py-2.5 rounded-lg transition-colors ${
                    tier.highlighted
                      ? 'bg-smw-accent text-white hover:bg-smw-accent-light'
                      : 'bg-smw-navy text-white hover:bg-smw-dark'
                  }`}
                >
                  {tier.monthlyPrice === 0 ? 'Get Started Free' : 'Book a Call'}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center text-sm text-smw-slate">
            All plans include the full MTB platform. Annual plans save 2 months.
          </div>
        </div>
      </section>
    </>
  )
}
