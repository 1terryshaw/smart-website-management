// Free 7-Day Website Preview intake — field schema + validation shared by the
// /contact form (client) and POST /api/contact (server). Keep the two in lockstep
// by importing from here; the server is the authority.

export const INTAKE_FORM_VERSION = 'preview-intake-v1'

export type IntakeField =
  | 'name'
  | 'email'
  | 'business_name'
  | 'business_phone'
  | 'service_area'
  | 'gbp_url'
  | 'website_url'
  | 'business_description'
  | 'services_offered'
  | 'assets_link'
  | 'special_instructions'

export type IntakeValues = Record<IntakeField, string>

export const REQUIRED_FIELDS: IntakeField[] = [
  'name',
  'email',
  'business_name',
  'business_phone',
  'service_area',
]

export const OPTIONAL_FIELDS: IntakeField[] = [
  'gbp_url',
  'website_url',
  'business_description',
  'services_offered',
  'assets_link',
  'special_instructions',
]

export const FIELD_LABELS: Record<IntakeField, string> = {
  name: 'Name',
  email: 'Email',
  business_name: 'Business Name',
  business_phone: 'Business Phone',
  service_area: 'Business Address or Service Area',
  gbp_url: 'Google Business Profile / Google Maps link',
  website_url: 'Existing Website',
  business_description: 'Business Description',
  services_offered: 'Services Offered',
  assets_link: 'Link to your photos or logo (Google Drive, Dropbox, your website)',
  special_instructions: 'Special Instructions / Anything else to include',
}

const MAX_LEN: Record<IntakeField, number> = {
  name: 200,
  email: 254,
  business_name: 200,
  business_phone: 40,
  service_area: 300,
  gbp_url: 1000,
  website_url: 500,
  business_description: 4000,
  services_offered: 4000,
  assets_link: 1000,
  special_instructions: 4000,
}

export const EMPTY_INTAKE: IntakeValues = {
  name: '',
  email: '',
  business_name: '',
  business_phone: '',
  service_area: '',
  gbp_url: '',
  website_url: '',
  business_description: '',
  services_offered: '',
  assets_link: '',
  special_instructions: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Permissive, international-friendly: digits plus common separators / "ext".
const PHONE_CHARS_RE = /^[0-9+().\-\s/xXextEXT#*]+$/

export function normalizeIntake(raw: unknown): IntakeValues {
  const src = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>
  const out = { ...EMPTY_INTAKE }
  for (const k of [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]) {
    const v = src[k]
    out[k] = typeof v === 'string' ? v.trim() : ''
  }
  return out
}

/** Returns field -> error message. Empty object = valid. */
export function validateIntake(v: IntakeValues): Partial<Record<IntakeField, string>> {
  const errors: Partial<Record<IntakeField, string>> = {}
  for (const k of REQUIRED_FIELDS) {
    if (!v[k]) errors[k] = `${FIELD_LABELS[k]} is required.`
  }
  if (v.email && !EMAIL_RE.test(v.email)) errors.email = 'Please enter a valid email address.'
  if (v.business_phone) {
    const digits = v.business_phone.replace(/\D/g, '')
    if (!PHONE_CHARS_RE.test(v.business_phone) || digits.length < 7 || digits.length > 20) {
      errors.business_phone = 'Please enter a valid phone number.'
    }
  }
  for (const k of [...REQUIRED_FIELDS, ...OPTIONAL_FIELDS]) {
    if (!errors[k] && v[k].length > MAX_LEN[k]) {
      errors[k] = `${FIELD_LABELS[k]} is too long (max ${MAX_LEN[k]} characters).`
    }
  }
  return errors
}
