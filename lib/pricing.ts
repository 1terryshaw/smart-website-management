// SWM legacy pricing shape — now an ADAPTER over the canonical empire SSOT.
// Single source of truth is lib/pricing-canonical.ts; this file only reshapes
// it into the PricingTier[] form the SWM homepage preview already consumes.
// Vestigial Stripe IDs flow through from the SSOT (SWM has no self-serve checkout).
import { TIERS, TIER_ORDER } from './pricing-canonical'

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

export const PRICING_TIERS: PricingTier[] = TIER_ORDER.map((id) => {
  const t = TIERS[id]
  return {
    name: t.name,
    slug: t.id,
    monthlyPrice: t.priceMonthlyUSD,
    annualPrice: t.priceAnnualUSD,
    stripePriceIdMonthly: t.stripePriceMonthlyId,
    stripePriceIdAnnual: t.stripePriceAnnualId,
    features: t.visibleFeatures,
    highlighted: t.anchored,
    // Anchored tier (Reviews Plus) shows "Most pros start here".
    // No "Most Popular" / "Recommended" badge anywhere.
    tag: t.anchored ? t.subtitle : undefined,
  }
})

export function getTierBySlug(slug: string): PricingTier | undefined {
  return PRICING_TIERS.find((t) => t.slug === slug)
}

export function getTierByPriceId(priceId: string): PricingTier | undefined {
  return PRICING_TIERS.find(
    (t) => t.stripePriceIdMonthly === priceId || t.stripePriceIdAnnual === priceId
  )
}
