import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, business_name, monthly_revenue, message } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const { error: dbError } = await getSupabaseAdmin()
      .from('smw_leads')
      .insert({
        name,
        email,
        business_name: business_name || null,
        monthly_revenue: monthly_revenue || null,
        message: message || null,
        source: 'smw_website',
      })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save your message. Please try again.' },
        { status: 500 }
      )
    }

    // Send notification email via Resend
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: process.env.RESEND_FROM || 'outreach@smartwebsitemanagement.ca',
        to: process.env.RESEND_NOTIFY_TO || '1terryshaw@gmail.com',
        subject: `New SMW Lead: ${name} — ${business_name || 'No business name'}`,
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `Business: ${business_name || 'Not provided'}`,
          `Revenue: ${monthly_revenue || 'Not provided'}`,
          `Message: ${message || 'No message'}`,
          '',
          `Source: smw_website`,
          `Time: ${new Date().toISOString()}`,
        ].join('\n'),
      })
    } catch (emailErr) {
      // Log but don't fail the request — lead is already saved
      console.error('Resend email error:', emailErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. Use POST /api/contact with { name, email, business_name?, monthly_revenue?, message? }.' },
    { status: 405 }
  )
}
