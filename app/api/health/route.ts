import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'smart-website-management',
    timestamp: new Date().toISOString(),
  })
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. Use GET /api/health to check service status.' },
    { status: 405 }
  )
}
