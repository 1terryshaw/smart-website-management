import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About — Smart Website Management',
  description: 'Meet Terry Shaw, founder of Smart Website Management. Operating between Toronto and El Salvador, building done-for-you marketing for small service businesses.',
  alternates: { canonical: 'https://www.smartwebsitemanagement.ca/about' },
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-smw-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-smw-accent">About</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">The agency behind Marketing Team in a Box.</h1>
          <p className="text-gray-400 mt-3 max-w-lg">
            Smart Website Management is the done-for-you arm of the MTB network.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-smw-navy mb-6">Terry Shaw, Founder</h2>

            <div className="space-y-4 text-smw-slate leading-relaxed">
              <p>
                I started Smart Website Management because I saw too many small service businesses paying
                too much for marketing that didn&apos;t work. Bloated platforms, cookie-cutter websites, and
                agencies that charge enterprise prices for SMB results.
              </p>
              <p>
                Operating between Toronto and El Salvador, I&apos;ve built 60+ websites, launched 3 professional
                directories with 7,100+ verified professionals, and created AI-powered tools that generate
                qualified leads on autopilot.
              </p>
              <p>
                The Marketing Team in a Box platform is the engine. Smart Website Management is the team
                that runs it for you. We handle the websites, the CRM, the reviews, the automations — so
                you can focus on what you do best: serving your clients.
              </p>
              <p>
                Every business in our network gets the same enterprise-grade tools and automation, delivered
                at a price point that makes sense for small service businesses. No contracts. No surprises.
                Just results.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-smw-off-white border border-gray-100">
                <div className="text-2xl font-bold text-smw-navy">60+</div>
                <div className="text-sm text-smw-slate mt-1">Sites built</div>
              </div>
              <div className="p-5 rounded-xl bg-smw-off-white border border-gray-100">
                <div className="text-2xl font-bold text-smw-navy">3</div>
                <div className="text-sm text-smw-slate mt-1">Directories live</div>
              </div>
              <div className="p-5 rounded-xl bg-smw-off-white border border-gray-100">
                <div className="text-2xl font-bold text-smw-accent">7,100+</div>
                <div className="text-sm text-smw-slate mt-1">Pros in network</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-smw-off-white bg-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="text-2xl font-bold text-smw-navy mb-6">The MTB Network</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="https://www.marketingteaminabox.com" target="_blank" rel="noopener noreferrer"
              className="group p-5 bg-white rounded-xl border border-gray-100 hover:border-smw-accent/30 hover:shadow-md transition-all">
              <h3 className="font-bold text-smw-navy group-hover:text-smw-accent transition-colors">Marketing Team in a Box</h3>
              <p className="text-xs text-smw-slate mt-1">The platform & network</p>
            </a>
            <a href="https://getapro.org" target="_blank" rel="noopener noreferrer"
              className="group p-5 bg-white rounded-xl border border-gray-100 hover:border-smw-accent/30 hover:shadow-md transition-all">
              <h3 className="font-bold text-smw-navy group-hover:text-smw-accent transition-colors">GetAPro.org</h3>
              <p className="text-xs text-smw-slate mt-1">4,300+ Ontario trades</p>
            </a>
            <a href="https://findyouraccountant.ca" target="_blank" rel="noopener noreferrer"
              className="group p-5 bg-white rounded-xl border border-gray-100 hover:border-smw-accent/30 hover:shadow-md transition-all">
              <h3 className="font-bold text-smw-navy group-hover:text-smw-accent transition-colors">FindYourAccountant.ca</h3>
              <p className="text-xs text-smw-slate mt-1">1,966 CPAs</p>
            </a>
            <a href="https://findmymortgagebroker.ca" target="_blank" rel="noopener noreferrer"
              className="group p-5 bg-white rounded-xl border border-gray-100 hover:border-smw-accent/30 hover:shadow-md transition-all">
              <h3 className="font-bold text-smw-navy group-hover:text-smw-accent transition-colors">FindMyMortgageBroker.ca</h3>
              <p className="text-xs text-smw-slate mt-1">832 brokers</p>
            </a>
          </div>
        </div>
      </section>

      <section className="bg-smw-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Let&apos;s build something together.</h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-smw-navy font-semibold px-6 py-3.5 rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            Book a Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
