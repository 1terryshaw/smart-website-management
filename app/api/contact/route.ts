import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
import {
  FIELD_LABELS,
  INTAKE_FORM_VERSION,
  OPTIONAL_FIELDS,
  REQUIRED_FIELDS,
  normalizeIntake,
  validateIntake,
} from '@/lib/preview-intake'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

// Free 7-Day Website Preview intake. Every submission lands in smw_leads as
// review_status='needs_review' for hand-QA — nothing here builds, publishes or
// releases a preview.
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  try {
    const v = normalizeIntake(body)
    const errors = validateIntake(v)
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: Object.values(errors)[0], fields: errors },
        { status: 400 }
      )
    }

    // Flag-driven test marker (never string matching): prefixes the notification.
    const isTest = body.is_test === true

    const { error: dbError } = await getSupabaseAdmin()
      .from('smw_leads')
      .insert({
        name: v.name,
        email: v.email,
        business_name: v.business_name,
        business_phone: v.business_phone,
        service_area: v.service_area,
        gbp_url: v.gbp_url || null,
        website_url: v.website_url || null,
        business_description: v.business_description || null,
        services_offered: v.services_offered || null,
        assets_link: v.assets_link || null,
        special_instructions: v.special_instructions || null,
        form_version: INTAKE_FORM_VERSION,
        is_test: isTest,
        review_status: 'needs_review',
        source: 'smw_website',
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save your request. Please try again.' },
        { status: 500 }
      )
    }

    // Send notification email via Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const sent = await resend.emails.send({
        from: process.env.RESEND_FROM || 'outreach@smartwebsitemanagement.ca',
        to: process.env.RESEND_NOTIFY_TO || 'terry@doineedapro.com',
        subject: `${isTest ? '[TEST] ' : ''}Free Preview Request: ${v.business_name} — ${v.name}`,
        text: [
          ...(isTest ? ['[TEST — not a real customer]', ''] : []),
          'Free 7-Day Website Preview request — needs hand-QA before any build.',
          '',
          ...[...REQUIRED_FIELDS, ...OPTIONAL_FIELDS].map(
            (k) => `${FIELD_LABELS[k]}: ${v[k] || 'Not provided'}`
          ),
          '',
          `Source: smw_website (${INTAKE_FORM_VERSION})`,
          `Time: ${new Date().toISOString()}`,
        ].join('\n'),
      })
      if (sent.error) console.error('Resend email error:', sent.error)
      else console.log('Resend notification sent:', sent.data?.id)
    } catch (emailErr) {
      // Log but don't fail the request — lead is already saved
      console.error('Resend email error:', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: `Method not allowed. Use POST /api/contact with { ${REQUIRED_FIELDS.join(', ')} } (required) and optional { ${OPTIONAL_FIELDS.join(', ')} }.`,
    },
    { status: 405 }
  )
}
