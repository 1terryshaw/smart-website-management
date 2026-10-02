import { NextResponse } from 'next/server'
import { issueFormToken } from '@/lib/intake-guard'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

// Signed form-load timestamp for the preview intake's minimum-fill-time check.
export async function GET() {
  return NextResponse.json(
    { token: issueFormToken() },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
