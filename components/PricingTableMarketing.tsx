// pricing-version: 2026-05-17-reviews-plus-canonical
// Marketing-site adaptation of the empire canonical PricingTable.
// - Data SSOT: lib/pricing-canonical.ts (verbatim copy from the 56 canonical repos;
//   vestigial Stripe IDs retained as-is — SWM has no self-serve checkout route)
// - No owner-auth / vertical.config coupling (SWM is the agency marketing site)
// - CTAs route to SWM's existing funnel (/contact, never /claim or /directory/[slug]?upgrade=true) and CARRY the billing period
//   (annual-v1): Leads Plus (ex-Reviews Plus) + Website $49/$99 -> /contact?plan=…&cycle=…; Business Agent -> the self-serve 7-day no-card trial, ?interval=year when Annual is on.
// - annual-v1 (CEO ruling 2026-10-03): ONE Monthly/Annual toggle drives EVERY paid card (Reviews Plus $9/$90, Website $99/$990, Business Agent $199/$1,990)
//   and the "start from any plan" paths; founding $149/mo or $1,490/yr shown per interval from the shared Stripe counter.
"use client";

import { useState } from "react";
import Link from "next/link";
import { TIERS, TIER_ORDER } from "@/lib/pricing-canonical";
import { AGENT, START_URL, type AgentPricing } from "@/lib/agent-offer";

// SWM brand accent (smw-accent in tailwind.config.ts) — replaces verticalConfig.primaryColor
const primary = "#2563EB";

const fmt = (n: number) => "$" + n.toLocaleString("en-US");

export default function PricingTableMarketing({ pricing = null, showPaths = true }: { pricing?: AgentPricing; showPaths?: boolean }) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto items-start">
        {TIER_ORDER.map((id) => {
          const tier = TIERS[id];
          const anchored = tier.anchored;
          const isFree = tier.priceMonthlyUSD === 0;
          const yearly = annual && tier.priceAnnualUSD > 0 && !tier.monthlyOnly; // leads-plus-fleet-fan-v1: monthly-only cards ignore the toggle
          const price = yearly ? tier.priceAnnualUSD : tier.priceMonthlyUSD;
          const unit = yearly ? "year" : "month";
          const isExpanded = !!expanded[tier.id];
          // SWM funnel routing: tiers route to the contact/preview form and carry the plan + billing period.
          const cycle = annual ? "annual" : "monthly";
          // leads-plus-fleet-fan-v1: the $49 Website card asks for the same free preview (plan=website-49); monthly-only cards carry monthly.
          const ctaHref = isFree ? "/contact" : `/contact?plan=${tier.id === "website" ? "website" : tier.id === "website_basic" ? "website-49" : "reviews-plus"}&cycle=${tier.monthlyOnly ? "monthly" : cycle}`;

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
                      ? `${tier.cta.label} — $${price}/${yearly ? "yr" : "mo"}`
                      : tier.cta.label}
                  </Link>
                  {tier.secondaryCta && (
                    <Link
                      href={ctaHref}
                      className="w-full text-center text-xs font-medium text-gray-500 underline hover:text-gray-700"
                    >
                      {tier.secondaryCta.label.replace(/\$\d+\/mo$/, `$${price}/${yearly ? "yr" : "mo"}`)}
                    </Link>
                  )}
                </div>
              )}

              {tier.footnote && (
                <p className="mt-2 text-xs text-center text-gray-500">{tier.footnote}</p>
              )}
            </div>
          );
        })}
        <AgentCard annual={annual} pricing={pricing} />
      </div>

      {showPaths && (
      <div className="mt-12 max-w-3xl mx-auto" data-testid="ladder">
        <p className="text-sm font-medium text-center text-gray-600 mb-3">Start the Business Agent directly from any plan:</p>
        <ul aria-label="Ways to start the Business Agent" className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm font-medium text-center">
          {AGENT.starts.map((step) => (
            <li key={step} className="flex flex-col items-center justify-center rounded-lg px-3 py-3 border bg-white text-gray-700 border-gray-200" data-testid="start-path">
              <span>{step}</span>
              <span aria-hidden="true" className="text-gray-400">↓</span>
              <span className="font-semibold text-white bg-smw-navy rounded px-2 py-1">
                {annual ? `${fmt(AGENT.annualUSD)}/yr` : fmt(AGENT.monthlyUSD)} Business Agent
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-xs text-center text-gray-500">
          One {annual ? `${fmt(AGENT.annualUSD)}/yr` : `${fmt(AGENT.monthlyUSD)}/mo`} total, whichever way you start — a Website owner keeps their site live.
        </p>
      </div>
      )}
    </div>
  );
}

// The Business Agent as a full card in the grid (approved copy; the toggle changes only the price figures and the CTA's billing period).
function AgentCard({ annual, pricing }: { annual: boolean; pricing: AgentPricing }) {
  const f = pricing?.founding;
  const foundingOpen =
    !!f && (annual ? f.available_year === true : f.available === true) && typeof f.remaining === "number" && f.remaining > 0;
  const price = annual ? AGENT.annualUSD : AGENT.monthlyUSD;
  const unit = annual ? "yr" : "mo";
  const href = annual ? `${START_URL}?interval=year` : START_URL;
  return (
    <div
      className="rounded-xl p-8 flex flex-col bg-white relative"
      style={{ border: `1.5px solid ${primary}`, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
      data-testid="business-agent-card"
    >
      <h3 className="text-xl font-bold">{AGENT.name}</h3>
      <p className="text-sm text-gray-500 mt-2">No contract. Cancel anytime.</p>
      <div className="mt-3" data-testid="agent-price">
        <span className="text-4xl font-bold">{fmt(price)}</span>
        <span className="text-gray-500">/{annual ? "year" : "month"}</span>
      </div>
      <ul className="mt-4 space-y-3 flex-1">
        {AGENT.features.map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm">
            <span className="text-green-500 mt-0.5" aria-hidden="true">&#10003;</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
      {foundingOpen && (
        <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-900" data-testid="founding-offer">
          Founding price for the first 10 owners: {annual ? fmt(AGENT.foundingAnnualUSD) : fmt(AGENT.foundingMonthlyUSD)}/{unit}, locked for life.
        </p>
      )}
      <a
        href={href}
        className="mt-6 w-full px-4 py-3 rounded-lg text-white font-medium leading-snug hover:opacity-90 transition-opacity text-center"
        style={{ backgroundColor: primary, minHeight: 48 }}
        data-testid="business-agent-cta"
      >
        {AGENT.cta}
      </a>
      <p className="mt-2 text-xs text-center text-gray-500" data-testid="business-agent-cta-note">{AGENT.ctaNote}</p>
    </div>
  );
}
