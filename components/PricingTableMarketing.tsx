// pricing-version: 2026-05-17-reviews-plus-canonical
// Marketing-site adaptation of the empire canonical PricingTable.
// - Data SSOT: lib/pricing-canonical.ts (verbatim copy from the 56 canonical repos;
//   vestigial Stripe IDs retained as-is — SWM has no self-serve checkout route)
// - No owner-auth / vertical.config coupling (SWM is the agency marketing site)
// - CTAs route to SWM's existing funnel: every tier → /contact
//   (never /claim or /directory/[slug]?upgrade=true)
"use client";

import { useState } from "react";
import Link from "next/link";
import { TIERS, TIER_ORDER } from "@/lib/pricing-canonical";

// SWM brand accent (smw-accent in tailwind.config.ts) — replaces verticalConfig.primaryColor
const primary = "#2563EB";

export default function PricingTableMarketing() {
  const [annual, setAnnual] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  return (
    <div>
      {/* Monthly / Annual toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full p-1">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !annual ? "bg-white shadow text-gray-900" : "text-gray-500"
            }`}
            onClick={() => setAnnual(false)}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              annual ? "bg-white shadow text-gray-900" : "text-gray-500"
            }`}
            onClick={() => setAnnual(true)}
          >
            Annual <span className="text-green-600 text-xs font-semibold">save 2 months</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto items-start">
        {TIER_ORDER.map((id) => {
          const tier = TIERS[id];
          const anchored = tier.anchored;
          const isFree = tier.priceMonthlyUSD === 0;
          const price = annual ? tier.priceAnnualUSD : tier.priceMonthlyUSD;
          const unit = annual ? "year" : "month";
          const isExpanded = !!expanded[tier.id];
          // SWM funnel routing: every tier routes to the consultation contact form.
          const ctaHref = "/contact";

          return (
            <div
              key={tier.id}
              className="rounded-xl p-8 flex flex-col bg-white relative"
              style={{
                border: anchored
                  ? `1.5px solid ${primary}`
                  : `0.5px solid #e5e7eb`,
                boxShadow: anchored ? "0 10px 25px -5px rgba(0,0,0,0.1)" : undefined,
              }}
            >
              <h3 className="text-xl font-bold">{tier.name}</h3>

              {/* Anchored tier: "Most pros start here" tag above price.
                  No "Most Popular" / "Recommended" badge anywhere. */}
              {anchored ? (
                <span
                  className="self-start text-xs font-semibold px-3 py-1 rounded-full text-white mt-2 mb-1"
                  style={{ backgroundColor: primary }}
                >
                  {tier.subtitle}
                </span>
              ) : tier.subtitle ? (
                <p className="text-sm text-gray-500 mt-2">{tier.subtitle}</p>
              ) : (
                <div className="mt-2 h-5" />
              )}

              <div className="mt-3">
                {isFree ? (
                  <span className="text-4xl font-bold">Free</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold">${price}</span>
                    <span className="text-gray-500">/{unit}</span>
                  </>
                )}
              </div>

              <ul className="mt-6 space-y-3 flex-1">
                {tier.visibleFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <span className="text-green-500 mt-0.5">&#10003;</span>
                    <span>{feature}</span>
                  </li>
                ))}
                {isExpanded &&
                  tier.expandedFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">&#10003;</span>
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>

              {tier.expandedFeatures.length > 0 && (
                <button
                  className="mt-3 text-sm font-semibold text-left"
                  style={{ color: primary }}
                  onClick={() => setExpanded((e) => ({ ...e, [tier.id]: !e[tier.id] }))}
                >
                  {isExpanded ? "Hide features" : "See all features"}
                </button>
              )}

              {/* CTA block */}
              {isFree ? (
                <Link
                  href={ctaHref}
                  className="mt-8 w-full py-3 rounded-lg text-center font-medium border-2 hover:bg-gray-50 transition-colors"
                  style={{ borderColor: primary, color: primary }}
                >
                  {tier.cta.label}
                </Link>
              ) : (
                <div className="mt-8 flex flex-col gap-2">
                  <Link
                    href={ctaHref}
                    className="w-full py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity text-center"
                    style={{ backgroundColor: anchored ? primary : "#374151" }}
                  >
                    {tier.cta.mode === "direct"
                      ? `${tier.cta.label} — $${tier.priceMonthlyUSD}/mo`
                      : tier.cta.label}
                  </Link>
                  {tier.secondaryCta && (
                    <Link
                      href={ctaHref}
                      className="w-full text-center text-xs font-medium text-gray-500 underline hover:text-gray-700"
                    >
                      {tier.secondaryCta.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
