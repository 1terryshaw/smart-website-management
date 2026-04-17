'use client'

import { useState } from 'react'

const REVENUE_OPTIONS = [
  'Under $5,000/mo',
  '$5,000 – $10,000/mo',
  '$10,000 – $25,000/mo',
  '$25,000 – $50,000/mo',
  '$50,000+/mo',
  'Other',
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    business_name: '',
    monthly_revenue: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      setStatus('success')
      setForm({ name: '', email: '', business_name: '', monthly_revenue: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <>
      <section className="bg-smw-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-smw-accent">Contact</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">Book a free strategy call.</h1>
          <p className="text-gray-400 mt-3 max-w-lg">
            Tell us about your business and we&apos;ll show you exactly how we can help you grow.
          </p>
        </div>
      </section>

      <section className="bg-smw-off-white bg-grid">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
          {status === 'success' ? (
            <div className="bg-white rounded-xl p-8 border border-green-200 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-50 flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-xl font-bold text-smw-navy mb-2">Message sent!</h2>
              <p className="text-smw-slate mb-4">We&apos;ll get back to you within 24 hours.</p>
              <p className="text-sm text-smw-slate">
                Want to book a specific time?{' '}
                <a href="https://cal.com/terryshaw/mtb-strategy-call" target="_blank" rel="noopener noreferrer" className="text-smw-accent hover:underline">
                  Schedule a strategy call &rarr;
                </a>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 border border-gray-100 space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-smw-navy mb-1">Name *</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-smw-accent/30 focus:border-smw-accent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-smw-navy mb-1">Email *</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-smw-accent/30 focus:border-smw-accent transition-colors"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="business_name" className="block text-sm font-medium text-smw-navy mb-1">Business Name</label>
                <input
                  id="business_name"
                  type="text"
                  value={form.business_name}
                  onChange={(e) => setForm({ ...form, business_name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-smw-accent/30 focus:border-smw-accent transition-colors"
                  placeholder="Your business name"
                />
              </div>

              <div>
                <label htmlFor="monthly_revenue" className="block text-sm font-medium text-smw-navy mb-1">Current Monthly Revenue</label>
                <select
                  id="monthly_revenue"
                  value={form.monthly_revenue}
                  onChange={(e) => setForm({ ...form, monthly_revenue: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-smw-accent/30 focus:border-smw-accent transition-colors bg-white"
                >
                  <option value="">Select range</option>
                  {REVENUE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-smw-navy mb-1">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-smw-accent/30 focus:border-smw-accent transition-colors resize-none"
                  placeholder="Tell us about your business and what you're looking for..."
                />
              </div>

              {status === 'error' && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errorMsg}</div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-smw-accent text-white font-semibold py-3 rounded-lg hover:bg-smw-accent-light transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
