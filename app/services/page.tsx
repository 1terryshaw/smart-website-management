import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Services — Smart Website Management',
  description: 'Website design, marketing automation, and AI-powered lead generation for small service businesses. Launched in 7–10 days.',
  alternates: { canonical: 'https://www.smartwebsitemanagement.ca/services' },
}

const SERVICES = [
  {
    title: 'Website Design & Build',
    desc: 'We design and launch your custom website in 7–10 days. Mobile-optimized, SEO-ready, hosted on Vercel with SSL included. No templates — every site is built for your specific business.',
    features: [
      'Custom design tailored to your brand',
      'Mobile-first responsive layout',
      'SEO-optimized content and structure',
      'Hosting + SSL + custom domain',
      'Launched in 7–10 business days',
      'Ongoing updates included in your plan',
    ],
    icon: (
      <svg className="w-8 h-8 text-smw-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    ),
    color: 'bg-blue-50',
  },
  {
    title: 'Marketing Automation',
    desc: 'Your CRM, review management, and customer communication — all automated. Speed-to-lead response, review request sequences, AI-drafted review responses, and nurture campaigns that run while you sleep.',
    features: [
      'CRM with lead pipeline management',
      'Automated review request sequences',
      'AI-drafted Google review responses',
      'Speed-to-lead auto-responders',
      'Email & SMS nurture campaigns',
      'WhatsApp business automations',
    ],
    icon: (
      <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
    ),
    color: 'bg-emerald-50',
  },
  {
    title: 'Lead Generation',
    desc: 'AI-powered tools that attract and qualify leads before they reach your inbox. Our tools like AskAboutMyDog.com and DoINeedAPro funnel high-intent prospects directly into your pipeline.',
    features: [
      'AI triage tools that qualify leads',
      'Directory listings across MTB network',
      'AskAboutMyDog.com integration',
      'DoINeedAPro.info integration',
      'Lead routing to your CRM',
      'Monthly performance reporting',
    ],
    icon: (
      <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    ),
    color: 'bg-amber-50',
  },
]

export default function ServicesPage() {
  return (
    <>
      <section className="bg-smw-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-smw-accent">Services</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">Everything your business needs to grow online.</h1>
          <p className="text-gray-400 mt-3 max-w-lg">
            We handle the tech, the marketing, and the automation — so you can focus on running your business.
          </p>
        </div>
      </section>

      <section className="bg-smw-off-white bg-grid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-12">
          {SERVICES.map((service, i) => (
            <div key={service.title} className="bg-white rounded-xl p-8 border border-gray-100">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4`}>
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-smw-navy mb-3">{service.title}</h2>
                  <p className="text-smw-slate leading-relaxed">{service.desc}</p>
                </div>
                <div className="md:w-1/2">
                  <ul className="space-y-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <svg className="w-5 h-5 mt-0.5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-sm text-smw-slate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-smw-navy mb-4">Ready to get started?</h2>
          <p className="text-smw-slate mb-6 max-w-md mx-auto">Book a free strategy call and we&apos;ll map out exactly what your business needs.</p>
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
