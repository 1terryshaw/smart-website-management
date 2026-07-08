import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Smart Website Management.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: July 8, 2026</p>

      {/* NOTE: Placeholder port of the empire directory Terms, adapted for Smart Website
          Management. These Terms do NOT yet cover agency-specific matters — service scope,
          deliverables/SLAs, cancellation/refunds, and contractor liability chain for site work.
          Agency-specific rewrite tracked in TDL (Phase 5 hub refresh, 2026-07-08). */}
      <div className="prose prose-gray max-w-none space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Agreement to Terms</h2>
          <p>
            By accessing or using smartwebsitemanagement.ca (the &ldquo;Service&rdquo;), operated by
            Smart Website Management, owned by Terence Shaw (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
            &ldquo;our&rdquo;), you agree to be bound by these Terms of Service. If you do not agree,
            do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Description of Service</h2>
          <p>
            Smart Website Management is a website design and marketing agency, the agency arm of the
            Marketing Team in a Box network. We provide website design and build, marketing
            automation, and lead-generation services to small and medium-sized businesses under
            free and paid plans.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Accounts and Communications</h2>
          <p>
            When you contact us or engage our services, you are responsible for the accuracy of the
            information you provide and for maintaining the confidentiality of any access credentials
            issued to you.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Payments and Subscriptions</h2>
          <p>
            Paid plans are billed via Stripe. You may cancel at any time; access continues through the
            end of the billing period. Refunds are provided at our discretion. Detailed service,
            deliverable, and cancellation terms may be set out in a separate service agreement.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Prohibited Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Submit false or misleading information</li>
            <li>Scrape, crawl, or harvest data from the Service</li>
            <li>Interfere with the operation of the Service</li>
            <li>Impersonate another person or business</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Limitation of Liability</h2>
          <p>
            The Service is provided &ldquo;as is&rdquo; without warranties of any kind. Smart Website
            Management shall not be liable for any indirect, incidental, or consequential damages
            arising from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Changes to Terms</h2>
          <p>
            We may update these Terms at any time. Continued use of the Service after changes
            constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Governing Law</h2>
          <p>
            These Terms are governed by the laws of the Province of Ontario and the federal laws of
            Canada applicable therein, without regard to conflict-of-law principles. Where applicable,
            the consumer-protection and privacy laws of a user&rsquo;s province, state, or country may
            also apply. Nothing in these Terms limits rights you may have under the mandatory laws of
            your jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Contact</h2>
          <p>
            Questions about these Terms? Contact Terence Shaw at{" "}
            <a href="mailto:privacy@marketingteaminabox.com" className="underline">
              privacy@marketingteaminabox.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
