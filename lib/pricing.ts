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
    monthlyPrice: 9,
    annualPrice: 90,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_REVIEWS_MONTHLY || 'price_1TWCWhB4nhVx1nmU7e5wn3EI',
    stripePriceIdAnnual: process.env.STRIPE_PRICE_REVIEWS_ANNUAL || 'price_1TWCWhB4nhVx1nmU9rAwLlH0',
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
    monthlyPrice: 29,
    annualPrice: 290,
    stripePriceIdMonthly: process.env.STRIPE_PRICE_WEBSITE_MONTHLY || 'price_1TWCWiB4nhVx1nmUlQWuYxkF',
    stripePriceIdAnnual: process.env.STRIPE_PRICE_WEBSITE_ANNUAL || 'price_1TWCWiB4nhVx1nmUtHQuD2co',
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
    stripePriceIdMonthly: process.env.STRIPE_PRICE_GROWTH_MONTHLY || 'price_1TWCWiB4nhVx1nmUcfLKGTtR',
    stripePriceIdAnnual: process.env.STRIPE_PRICE_GROWTH_ANNUAL || 'price_1TWCWjB4nhVx1nmUyZB92HW8',
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
