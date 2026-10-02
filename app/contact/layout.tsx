import type { Metadata } from 'next'

const DESCRIPTION =
  "Tell us about your business. We'll review the details, build your free 7-day website preview, and send you the link. No charge to see it."

// The page is a client component, so its metadata lives here. Only the description
// changes; openGraph repeats the root fields because a child openGraph object
// replaces the parent's.
export const metadata: Metadata = {
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Smart Website Management',
    description: DESCRIPTION,
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
