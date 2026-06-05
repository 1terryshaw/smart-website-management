import type { Metadata } from 'next'
import PricingTableMarketing from '@/components/PricingTableMarketing'

export const metadata: Metadata = {
  title: 'Pricing — Smart Website Management',
  description: 'Simple, transparent pricing for small service businesses. Free to start, paid plans from $9/mo. Lead forwarding, custom website, CRM, and lead generation included.',
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
            Start free. Upgrade when you&apos;re ready. Every tier delivers more value than it costs.
          </p>
        </div>
      </section>

      {/* Pricing tiers — canonical empire card (lib/pricing-canonical.ts SSOT) */}
      <section className="bg-smw-off-white bg-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <PricingTableMarketing />

          <div className="mt-10 text-center text-sm text-smw-slate">
            All plans include the full MTB platform. Annual plans save 2 months.
          </div>
        </div>
      </section>
    </>
  )
}
