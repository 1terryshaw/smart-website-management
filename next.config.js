/** @type {import('next').NextConfig} */
const nextConfig = {
  // leads-plus-checkout-funnel-fix-v1 (TDL #1359): legacy Leads Plus / Reviews Plus card links (/contact?plan=reviews-plus&cycle=…)
  // go to the self-serve Leads Plus start page on empire-billing instead of the generic contact page.
  async redirects() {
    return [
      {
        source: '/contact',
        has: [{ type: 'query', key: 'plan', value: '(?:reviews-plus|reviews_plus|leads-plus|leads_plus)' }],
        destination: 'https://billing.marketingteaminabox.com/leads-plus?mode=trial&cycle=monthly',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
