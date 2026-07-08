import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Smart Website Management.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: July 8, 2026</p>

      <div className="prose prose-gray max-w-none space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">1. Introduction</h2>
          <p>
            Smart Website Management, owned by Terence Shaw (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
            &ldquo;our&rdquo;) operates smartwebsitemanagement.ca, a website design and marketing
            agency and the agency arm of the Marketing Team in a Box network. This Privacy Policy
            explains how we collect, use, and protect your information when you use our website and
            services (the &ldquo;Service&rdquo;).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">2. Information We Collect</h2>
          <p>We may collect the following information:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>
              <strong>Prospective and current clients:</strong> Name, email address, phone number,
              business name, and message content you provide through our contact form or in the course
              of engaging our services.
            </li>
            <li>
              <strong>Billing information:</strong> Payment details are collected and processed by our
              payment provider; we do not store full card numbers.
            </li>
            <li>
              <strong>Automatically collected:</strong> Browser type, IP address, device type, pages
              visited, referring website, and cookies for session management.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Respond to inquiries and provide our services</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send service-related communications</li>
            <li>Improve the Service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">4. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li><strong>Supabase</strong> — database and authentication</li>
            <li><strong>Stripe</strong> — payment processing</li>
            <li><strong>Resend</strong> — transactional email</li>
          </ul>
          <p className="mt-2">
            These services have their own privacy policies governing their use of your data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">5. Cookies</h2>
          <p>
            We use essential cookies for session management. Where analytics cookies are used, they
            help us understand how visitors interact with our site. You can control cookies through
            your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">6. Data Retention</h2>
          <p>
            We retain your data for as long as your account or engagement is active. You may request
            deletion of your data by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">7. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information. However, no method
            of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">8. Your Rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal information at any
            time by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Regional Rights</h2>
          <p>
            Depending on where you live, you may have rights under laws such as Canada&rsquo;s Personal
            Information Protection and Electronic Documents Act (PIPEDA), applicable U.S. state privacy
            laws (including the California Consumer Privacy Act, as amended by the CPRA), the European
            Union General Data Protection Regulation (GDPR), or the United Kingdom GDPR and Data
            Protection Act 2018 &mdash; including the rights to access, correct, delete, or port your
            personal information, to object to or restrict certain processing, and to withdraw consent.
            To exercise these rights, contact us at{" "}
            <a href="mailto:privacy@marketingteaminabox.com" className="underline">
              privacy@marketingteaminabox.com
            </a>
            , and we will address your request. You also have the right to lodge a complaint with your
            local data protection authority.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated date.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">10. Contact</h2>
          <p>
            Questions about this policy? Contact Terence Shaw at{" "}
            <a href="mailto:privacy@marketingteaminabox.com" className="underline">
              privacy@marketingteaminabox.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
