import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Smart Website Management — Marketing agency for small service businesses',
  description: 'Done-for-you websites, CRM, and lead generation for small service businesses. Powered by the Marketing Team in a Box platform. Canadian-owned.',
  icons: { icon: '/favicon.svg' },
  metadataBase: new URL('https://www.smartwebsitemanagement.ca'),
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'Smart Website Management',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://www.smartwebsitemanagement.ca',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Smart Website Management',
              url: 'https://www.smartwebsitemanagement.ca',
              logo: 'https://www.smartwebsitemanagement.ca/favicon.svg',
              description: 'Done-for-you websites, CRM, and lead generation for small service businesses.',
              contactPoint: {
                '@type': 'ContactPoint',
                email: 'terence@smartwebsitemanagement.ca',
                contactType: 'sales',
              },
              parentOrganization: {
                '@type': 'Organization',
                name: 'Marketing Team in a Box',
                url: 'https://www.marketingteaminabox.com',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              serviceType: 'Digital Marketing Agency',
              provider: {
                '@type': 'Organization',
                name: 'Smart Website Management',
              },
              areaServed: {
                '@type': 'Country',
                name: 'Canada',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Marketing Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'Website Design & Build' },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'Marketing Automation' },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: 'Lead Generation' },
                  },
                ],
              },
            }),
          }}
        />
      </body>
    </html>
  )
}
