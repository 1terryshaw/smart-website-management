import Link from 'next/link'
import { PRICING_TIERS } from '@/lib/pricing'

export default function HomePage() {
  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative bg-smw-navy overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Agency services &middot; MTB platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Your marketing team —{' '}
              <span className="text-smw-accent">on autopilot.</span>
            </h1>

            <p className="text-lg text-gray-400 max-w-xl mb-10 leading-relaxed">
              We build your website, run your CRM, capture your leads, and grow your Google reviews.
              All powered by the Marketing Team in a Box platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-smw-navy font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-100 transition-colors text-sm"
              >
                Book a Call
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-smw-accent text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-smw-accent-light transition-colors text-sm"
              >
                See Pricing
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-smw-navy">60+</div>
              <div className="text-sm text-smw-slate mt-1">Clients Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-smw-navy">3</div>
              <div className="text-sm text-smw-slate mt-1">Directories Live</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-smw-accent">7,100+</div>
              <div className="text-sm text-smw-slate mt-1">Pros in Network</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section className="bg-smw-off-white bg-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-smw-accent">What We Do</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-smw-navy mt-2">Three services. One subscription.</h2>
            <p className="text-smw-slate mt-2 max-w-lg">Everything your small service business needs to get found online, capture leads, and grow reviews.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-smw-accent/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-smw-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="font-bold text-lg text-smw-navy mb-2">Website Design & Build</h3>
              <p className="text-sm text-smw-slate">Custom sites, mobile-optimized, launched in 7&ndash;10 days. SEO-ready from day one.</p>
            </div>

            <div className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-smw-accent/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <h3 className="font-bold text-lg text-smw-navy mb-2">Marketing Automation</h3>
              <p className="text-sm text-smw-slate">CRM, speed-to-lead, review requests, review responses, and nurture sequences — all automated.</p>
            </div>

            <div className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-smw-accent/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="font-bold text-lg text-smw-navy mb-2">Lead Generation</h3>
              <p className="text-sm text-smw-slate">AI tools like AskAboutMyDog.com and DoINeedAPro that funnel qualified leads to your pipeline.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING PREVIEW ═══════════════ */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-smw-accent">Pricing</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-smw-navy mt-2">Simple, transparent pricing.</h2>
            <p className="text-smw-slate mt-2 max-w-lg">Start free. Upgrade when you&apos;re ready. All prices in CAD.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRICING_TIERS.map((tier) => (
              <div
                key={tier.slug}
                className={`tier-card relative rounded-xl p-5 border ${
                  tier.highlighted
                    ? 'border-smw-accent bg-smw-accent/[0.02] ring-1 ring-smw-accent/20'
                    : 'border-gray-100'
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
                </div>
                <ul className="space-y-2 mb-6">
                  {tier.features.slice(0, 4).map((f) => (
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
                  {tier.monthlyPrice === 0 ? 'Get Started' : 'Book a Call'}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="text-sm font-medium text-smw-accent hover:text-smw-accent-light transition-colors"
            >
              See full pricing details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ CASE STUDIES ═══════════════ */}
      <section className="bg-smw-off-white bg-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-smw-accent">Case Studies</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-smw-navy mt-2">Real results for real businesses.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Casa Can */}
            <Link
              href="/case-studies#casa-can"
              className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-smw-accent/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-smw-accent bg-smw-accent/10 px-2 py-0.5 rounded">Growth Plan</span>
                <span className="text-xs text-smw-slate">El Salvador</span>
              </div>
              <h3 className="font-bold text-lg text-smw-navy mb-2">Casa Can — Centro Canino</h3>
              <p className="text-sm text-smw-slate mb-3">From zero digital presence to fully automated lead pipeline. AskAboutMyDog.com integration driving qualified leads.</p>
              <span className="text-sm font-medium text-smw-accent group-hover:underline">Read case study &rarr;</span>
            </Link>

            {/* K59 */}
            <a
              href="https://k59surfresort.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-smw-accent/30 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Migration</span>
                <span className="text-xs text-smw-slate">El Salvador</span>
              </div>
              <h3 className="font-bold text-lg text-smw-navy mb-2">K59 Surf Resort</h3>
              <p className="text-sm text-smw-slate mb-3">Migrated from GoHighLevel to Next.js/Supabase/Vercel. Saved $200/month, improved page speed 3x.</p>
              <span className="text-sm font-medium text-smw-accent group-hover:underline">Visit live site &rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT / CTA ═══════════════ */}
      <section className="bg-smw-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-smw-accent">The Agency Behind MTB</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-4">
              Built by Terry Shaw.
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Operating between Toronto and El Salvador, Smart Website Management is the agency arm of the
              Marketing Team in a Box network. 60+ sites built. 3 directories live. 7,100+ pros in the network.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-smw-navy font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-100 transition-colors text-sm"
            >
              Book a Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
