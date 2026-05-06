export interface PricingTier {
  name: string
  slug: string
  monthlyPrice: number
  annualPrice: number
  stripePriceIdMonthly: string | null
  stripePriceIdAnnual: string | null
  features: string[]
  highlighted?: boolean
  tag?: string
}

export const PRICING_TIERS: PricingTier[] = [
  {
    name: 'Free',
    slug: 'free',
    monthlyPrice: 0,
    annualPrice: 0,
    stripePriceIdMonthly: null,
    stripePriceIdAnnual: null,
    features: [
      'Listed in MTB directory',
      'Basic business profile',
      'Appear in search results',
      'Consumer inquiry access',
    ],
  },
  {
    name: 'Leads Boost',
    slug: 'reviews',
    monthlyPrice: 7,
    annualPrice: 70,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_REVIEWS_MONTHLY || 'price_1TLq8uB4nhVx1nmUzoLEuTA8',
    stripePriceIdAnnual: process.env.STRIPE_PRICE_REVIEWS_ANNUAL || 'price_1TLq8RB4nhVx1nmUVF07t9dv',
    features: [
      'Lead forwarding to your inbox + phone',
      'Branded inquiry emails to your prospects',
      'Owner dashboard with Recent Leads',
      'Weekly digest of activity',
      'SMS notification on new lead (Twilio)',
    ],
    tag: 'Starter',
  },
  {
    name: 'Website',
    slug: 'website',
    monthlyPrice: 49,
    annualPrice: 490,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_WEBSITE_MONTHLY || 'price_1TLpGeB4nhVx1nmUj12by529',
    stripePriceIdAnnual: process.env.STRIPE_PRICE_WEBSITE_ANNUAL || 'price_1TLluuB4nhVx1nmUNi25QXJM',
    features: [
      'Everything in Leads Boost',
      'Full custom website design',
      'Mobile-optimized & responsive',
      'Hosting + SSL included',
      'Launched in 7–10 days',
      'SEO-optimized content',
    ],
  },
  {
    name: 'Growth',
    slug: 'growth',
    monthlyPrice: 97,
    annualPrice: 970,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_GROWTH_MONTHLY || 'price_1TLlvTB4nhVx1nmUpvP8EzvR',
    stripePriceIdAnnual: process.env.STRIPE_PRICE_GROWTH_ANNUAL || 'price_1TLlvyB4nhVx1nmUaNascixL',
    features: [
      'Everything in Website',
      'CRM + lead pipeline',
      'WhatsApp automations',
      'Monthly blog post',
      'Custom domain',
      'Priority support',
    ],
    tag: 'Full Service',
  },
]

export function getTierBySlug(slug: string): PricingTier | undefined {
  return PRICING_TIERS.find((t) => t.slug === slug)
}

export function getTierByPriceId(priceId: string): PricingTier | undefined {
  return PRICING_TIERS.find(
    (t) => t.stripePriceIdMonthly === priceId || t.stripePriceIdAnnual === priceId
  )
}
