import Link from 'next/link'

const DIRECTORIES = [
  { name: 'GetAPro.org', href: 'https://getapro.org', desc: 'Licensed Trades' },
  { name: 'FindYourAccountant.ca', href: 'https://findyouraccountant.ca', desc: 'CPAs' },
  { name: 'FindMyMortgageBroker.ca', href: 'https://findmymortgagebroker.ca', desc: 'Brokers' },
]

const TOOLS = [
  { name: 'AskAboutMyDog.com', href: 'https://askaboutmydog.com' },
  { name: 'DoINeedAPro.info', href: 'https://doineedapro.info' },
  { name: 'DoINeedAnAccountant.com', href: 'https://doineedanaccountant.com' },
]

export default function Footer() {
  return (
    <footer className="bg-smw-navy text-gray-400 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg bg-smw-accent flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-white font-bold text-sm">Smart Website Management</span>
            </div>
            <p className="text-sm leading-relaxed">
              Done-for-you websites, CRM, and lead generation for small service businesses. Canadian-owned.
            </p>
            <p className="text-sm mt-3">
              Part of the{' '}
              <a
                href="https://www.marketingteaminabox.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-smw-accent hover:text-smw-accent-light transition-colors"
              >
                Marketing Team in a Box
              </a>{' '}
              network
            </p>
          </div>

          {/* Directories */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Directories</h4>
            {DIRECTORIES.map((d) => (
              <a
                key={d.href}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm hover:text-white transition-colors py-1"
              >
                {d.name}
              </a>
            ))}
          </div>

          {/* AI Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">AI Tools</h4>
            {TOOLS.map((t) => (
              <a
                key={t.href}
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm hover:text-white transition-colors py-1"
              >
                {t.name}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3 uppercase tracking-wider">Company</h4>
            <Link href="/services" className="block text-sm hover:text-white transition-colors py-1">Services</Link>
            <Link href="/pricing" className="block text-sm hover:text-white transition-colors py-1">Pricing</Link>
            <Link href="/case-studies" className="block text-sm hover:text-white transition-colors py-1">Case Studies</Link>
            <Link href="/about" className="block text-sm hover:text-white transition-colors py-1">About</Link>
            <Link href="/contact" className="block text-sm hover:text-white transition-colors py-1">Book a Call</Link>
          </div>
        </div>

        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs">&copy; {new Date().getFullYear()} Smart Website Management. All rights reserved.</p>
          <p className="text-xs">
            <a
              href="https://www.marketingteaminabox.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              marketingteaminabox.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
