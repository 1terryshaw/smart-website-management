import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Smart Website Management — Marketing agency for small service businesses'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0F1B2D',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              background: '#2563EB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '24px',
              fontWeight: 800,
            }}
          >
            S
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>
              Smart Website Management
            </span>
          </div>
        </div>

        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.1,
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Your marketing team</span>
          <span style={{ color: '#2563EB' }}>on autopilot.</span>
        </div>

        <div
          style={{
            fontSize: '22px',
            color: '#94A3B8',
            marginBottom: '40px',
          }}
        >
          Websites &middot; CRM &middot; Reviews &middot; Lead Generation
        </div>

        <div style={{ display: 'flex', gap: '48px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '32px', fontWeight: 800 }}>60+</span>
            <span style={{ color: '#64748B', fontSize: '14px' }}>Clients Served</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: 'white', fontSize: '32px', fontWeight: 800 }}>3</span>
            <span style={{ color: '#64748B', fontSize: '14px' }}>Directories Live</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#2563EB', fontSize: '32px', fontWeight: 800 }}>7,100+</span>
            <span style={{ color: '#64748B', fontSize: '14px' }}>Pros in Network</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
