// Server-only spam controls for the preview intake (POST /api/contact):
// honeypot, signed form-load timestamp (minimum fill time) and a per-IP hash
// for the DB-backed rate limit. The HMAC key is an existing server secret, so
// tokens can't be forged and raw IPs are never stored.
import { createHmac, timingSafeEqual } from 'crypto'
import type { NextRequest } from 'next/server'

export const HONEYPOT_FIELD = 'contact_fax'
export const TOKEN_FIELD = 'form_token'
export const MIN_FILL_MS = 3_000
export const TOKEN_MAX_AGE_MS = 24 * 60 * 60 * 1000
export const RATE_LIMIT_MAX = 3
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000

function secret(): string {
  const s = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!s) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')
  return s
}

function hmac(purpose: string, value: string): string {
  return createHmac('sha256', secret()).update(`${purpose}:${value}`).digest('hex')
}

/** `<issued-ms>.<hmac>` — issued when the form loads. */
export function issueFormToken(now = Date.now()): string {
  return `${now}.${hmac('smw-intake-token', String(now))}`
}

export type TokenCheck = 'ok' | 'invalid' | 'too_fast'

export function checkFormToken(token: unknown, now = Date.now()): TokenCheck {
  if (typeof token !== 'string') return 'invalid'
  const [issued, sig] = token.split('.')
  if (!issued || !sig || !/^\d{13}$/.test(issued)) return 'invalid'
  const expected = Buffer.from(hmac('smw-intake-token', issued))
  const given = Buffer.from(sig)
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return 'invalid'
  const age = now - Number(issued)
  if (age < 0 || age > TOKEN_MAX_AGE_MS) return 'invalid'
  if (age < MIN_FILL_MS) return 'too_fast'
  return 'ok'
}

export function honeypotFilled(body: Record<string, unknown>): boolean {
  const v = body[HONEYPOT_FIELD]
  return typeof v === 'string' && v.trim() !== ''
}

/** HMAC-SHA256 of the client IP with a server secret; never the raw IP. */
export function clientIpHash(req: NextRequest): string {
  const ip =
    req.headers.get('x-real-ip')?.trim() ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.ip ||
    'unknown'
  return hmac('smw-intake-ip', ip)
}
