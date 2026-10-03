'use client'

import { useEffect, useState } from 'react'
import {
  EMPTY_INTAKE,
  FIELD_LABELS,
  type IntakeField,
  normalizeIntake,
  validateIntake,
} from '@/lib/preview-intake'

const INPUT_CLASS =
  'w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-smw-accent/30 focus:border-smw-accent transition-colors'

type FieldSpec = {
  key: IntakeField
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'url'
  multiline?: boolean
  autoComplete?: string
  placeholder?: string
  helper?: string
}

const REQUIRED_SPECS: FieldSpec[] = [
  { key: 'name', required: true, autoComplete: 'name', placeholder: 'Your name' },
  { key: 'email', required: true, type: 'email', autoComplete: 'email', placeholder: 'you@example.com' },
  { key: 'business_name', required: true, autoComplete: 'organization', placeholder: 'Your business name' },
  { key: 'business_phone', required: true, type: 'tel', autoComplete: 'tel', placeholder: 'e.g. (416) 555-0123' },
  {
    key: 'service_area',
    required: true,
    autoComplete: 'street-address',
    placeholder: 'e.g. 123 Main St, Toronto',
    helper: "Street address — or the area you serve if customers don't come to you (e.g. 'Greater Toronto Area')",
  },
]

const OPTIONAL_SPECS: FieldSpec[] = [
  { key: 'gbp_url', type: 'url', placeholder: 'https://maps.app.goo.gl/...' },
  { key: 'website_url', type: 'url', placeholder: 'https://yourbusiness.com' },
  { key: 'business_description', multiline: true, placeholder: 'What does your business do, and who do you serve?' },
  { key: 'services_offered', multiline: true, placeholder: 'List the main services you offer' },
  { key: 'assets_link', type: 'url', placeholder: 'https://drive.google.com/...' },
  { key: 'special_instructions', multiline: true, placeholder: 'Colours, wording, anything you want included...' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ ...EMPTY_INTAKE })
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<IntakeField, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  // Spam controls: signed form-load time (server enforces a minimum fill time) + honeypot.
  const [formToken, setFormToken] = useState('')
  const [honeypot, setHoneypot] = useState('')

  async function loadToken() {
    try {
      const res = await fetch('/api/contact/token', { cache: 'no-store' })
      const data = await res.json()
      if (typeof data.token === 'string') setFormToken(data.token)
    } catch {
      // Retried on submit.
    }
  }

  useEffect(() => {
    loadToken()
  }, [])

  // annual-v1: the pricing page's Website CTA carries the billing period. Nothing is charged here — the preview is free; the owner picks $99/month or $990/year when they approve it.
  const [planNote, setPlanNote] = useState('')
  useEffect(() => {
    const q = new URLSearchParams(window.location.search)
    if (q.get('plan') === 'website') setPlanNote(q.get('cycle') === 'annual'
      ? 'You picked the Website at $990/year. Your preview is free and needs no card — when you approve it you can go live at $990/year (2 months free).'
      : 'You picked the Website at $99/month. Your preview is free and needs no card — you only pay if you approve it.')
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    const errors = validateIntake(normalizeIntake(form))
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) {
      setStatus('error')
      setErrorMsg('Please fix the highlighted fields.')
      const first = Object.keys(errors)[0]
      document.getElementById(first)?.focus()
      return
    }

    if (!formToken) {
      loadToken()
      setStatus('error')
      setErrorMsg('The form is still loading. Please try again in a few seconds.')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, form_token: formToken, contact_fax: honeypot }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (data.fields) setFieldErrors(data.fields)
        throw new Error(data.error || 'Something went wrong')
      }
      setStatus('success')
      setForm({ ...EMPTY_INTAKE })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  function renderField(spec: FieldSpec) {
    const { key, required, type = 'text', multiline, autoComplete, placeholder, helper } = spec
    const err = fieldErrors[key]
    const describedBy = [helper ? `${key}-help` : '', err ? `${key}-error` : ''].filter(Boolean).join(' ') || undefined
    const common = {
      id: key,
      name: key,
      required,
      value: form[key],
      placeholder,
      autoComplete,
      'aria-invalid': err ? true : undefined,
      'aria-describedby': describedBy,
      className: `${INPUT_CLASS} ${err ? 'border-red-400' : 'border-gray-200'}`,
    }
    return (
      <div key={key}>
        <label htmlFor={key} className="block text-sm font-medium text-smw-navy mb-1">
          {FIELD_LABELS[key]}
          {required ? ' *' : <span className="font-normal text-smw-slate"> (optional)</span>}
        </label>
        {multiline ? (
          <textarea
            {...common}
            rows={3}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className={`${common.className} resize-y`}
          />
        ) : (
          <input
            {...common}
            type={type === 'url' ? 'text' : type}
            inputMode={type === 'url' ? 'url' : undefined}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        )}
        {helper && (
          <p id={`${key}-help`} className="text-xs text-smw-slate mt-1">{helper}</p>
        )}
        {err && (
          <p id={`${key}-error`} className="text-xs text-red-600 mt-1">{err}</p>
        )}
      </div>
    )
  }

  return (
    <>
      <section className="bg-smw-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-smw-accent">Free Preview</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mt-2">Free 7-Day Website Preview</h1>
          <p className="text-gray-400 mt-3 max-w-lg">
            Tell us about your business. We&apos;ll review the details, build your preview, and send you the link. No charge to see it.
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
              <h2 className="text-xl font-bold text-smw-navy mb-2">Request received!</h2>
              <p className="text-smw-slate">We&apos;ll review your details and email you when your preview is ready.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="relative bg-white rounded-xl p-5 sm:p-8 border border-gray-100 space-y-5">
              {planNote && <p className="rounded-lg bg-blue-50 px-4 py-3 text-sm text-blue-900" data-testid="plan-note">{planNote}</p>}
              {/* Honeypot: off-screen (not display:none), hidden from assistive tech and the tab order. */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
                <label htmlFor="contact_fax">Leave this field empty</label>
                <input
                  id="contact_fax"
                  name="contact_fax"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {REQUIRED_SPECS.map(renderField)}

              <div className="pt-2 border-t border-gray-100">
                <p className="text-sm font-semibold text-smw-navy pt-4">Optional — helps us build a better preview</p>
              </div>

              {OPTIONAL_SPECS.map(renderField)}

              {status === 'error' && (
                <div role="alert" className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">{errorMsg}</div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-smw-accent text-white font-semibold py-3 rounded-lg hover:bg-smw-accent-light transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Request My Free Preview'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
