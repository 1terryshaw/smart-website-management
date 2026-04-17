import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Case Studies — Smart Website Management',
  description: 'Real results for real businesses. See how SMW helped Casa Can and K59 Surf Resort grow with done-for-you marketing.',
  alternates: { canonical: 'https://www.smartwebsitemanagement.ca/case-studies' },
}

const CASE_STUDIES = [
  {
    id: 'casa-can',
    name: 'Casa Can — Centro Canino',
    location: 'Huizucar, El Salvador',
    tier: 'Growth ($97/mo + website build)',
    challenge: 'Zero digital presence. No website, no CRM, no lead pipeline. Relying entirely on word-of-mouth referrals.',
    solution: 'Built a custom website, set up CRM with lead pipeline, integrated AskAboutMyDog.com for AI-powered lead generation, and automated review request sequences.',
    result: 'From zero digital presence to fully automated lead pipeline. Leads now flow in from AskAboutMyDog.com and Google, captured automatically in the CRM.',
    tags: ['Growth Plan', 'AI Lead Gen', 'Website Build'],
    color: 'smw-accent',
  },
  {
    id: 'k59',
    name: 'K59 Surf Resort',
    location: 'Surf City, El Salvador',
    tier: 'Migration project',
    challenge: 'Paying $200+/month for GoHighLevel with slow page speeds and limited customization. Needed a modern, fast website without the bloated platform cost.',
    solution: 'Migrated from GoHighLevel to a custom Next.js site on Vercel with Supabase backend. Rebuilt the booking flow, optimized all images, and set up proper SEO.',
    result: 'Saved $200/month on platform costs, improved page speed 3x, and gained full control over the site design and functionality.',
    tags: ['Migration', 'Cost Savings', 'Performance'],
    link: 'https://k59surfresort.com',
    color: 'emerald-600',
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-smw-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-smw-accent">Case Studies</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">Real results for real businesses.</h1>
          <p className="text-gray-400 mt-3 max-w-lg">
            See how we&apos;ve helped small service businesses grow with done-for-you marketing.
          </p>
        </div>
      </section>

      <section className="bg-smw-off-white bg-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-8">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.id} id={cs.id} className="bg-white rounded-xl p-8 border border-gray-100">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {cs.tags.map((tag) => (
                  <span key={tag} className="text-xs font-medium text-smw-accent bg-smw-accent/10 px-2.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
                <span className="text-xs text-smw-slate">{cs.location}</span>
              </div>

              <h2 className="text-2xl font-bold text-smw-navy mb-2">{cs.name}</h2>
              <p className="text-sm text-smw-slate mb-6">{cs.tier}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-sm text-smw-navy mb-2 uppercase tracking-wider">Challenge</h3>
                  <p className="text-sm text-smw-slate leading-relaxed">{cs.challenge}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-smw-navy mb-2 uppercase tracking-wider">Solution</h3>
                  <p className="text-sm text-smw-slate leading-relaxed">{cs.solution}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-smw-navy mb-2 uppercase tracking-wider">Result</h3>
                  <p className="text-sm text-smw-slate leading-relaxed">{cs.result}</p>
                </div>
              </div>

              {cs.link && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <a
                    href={cs.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-smw-accent hover:text-smw-accent-light transition-colors"
                  >
                    Visit live site &rarr;
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-smw-navy mb-4">Want results like these?</h2>
          <p className="text-smw-slate mb-6 max-w-md mx-auto">Book a free strategy call and we&apos;ll show you exactly how we can help your business grow.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-smw-accent text-white font-semibold px-6 py-3.5 rounded-lg hover:bg-smw-accent-light transition-colors text-sm"
          >
            Book a Call
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>
    </>
  )
}
