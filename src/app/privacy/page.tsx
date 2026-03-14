import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Nassim Maaoui Portfolio',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-gray-100 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: March 2026</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Overview</h2>
            <p>
              This Privacy Policy describes how Nassim Maaoui (&quot;I&quot;, &quot;me&quot;, or &quot;my&quot;)
              handles information collected through this portfolio website (&quot;Site&quot;). I take
              your privacy seriously and am committed to being transparent about my practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Information I Collect</h2>
            <p className="mb-3">
              <strong className="text-white">Contact form submissions:</strong> When you use the contact
              form, I collect your name, email address, company name (optional), and message content.
              This information is used solely to respond to your inquiry.
            </p>
            <p>
              <strong className="text-white">Usage data:</strong> This Site may collect standard
              technical data such as browser type, referring URLs, and page views through
              privacy-respecting analytics tools. No personally identifiable data is linked to
              analytics records.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. How I Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>To respond to your messages and enquiries</li>
              <li>To improve the content and performance of this Site</li>
              <li>I do not sell, rent, or share your personal data with third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Cookies</h2>
            <p>
              This Site does not use tracking or advertising cookies. Any cookies set are strictly
              necessary for the Site to function (e.g., session state). You can disable cookies in
              your browser settings without affecting your ability to view this Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Third-Party Links</h2>
            <p>
              This Site may contain links to external services (GitHub, LinkedIn, etc.). I am not
              responsible for the privacy practices of those sites and encourage you to review their
              policies directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Data Retention</h2>
            <p>
              Contact form data is retained only as long as necessary to address your inquiry and is
              not stored in any public database.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of any personal
              data I hold about you. To exercise these rights, contact me at{' '}
              <a
                href="mailto:nassimmaaoui@outlook.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                nassimmaaoui@outlook.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to This Policy</h2>
            <p>
              I may update this Privacy Policy from time to time. Any changes will be reflected on
              this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach out at{' '}
              <a
                href="mailto:nassimmaaoui@outlook.com"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                nassimmaaoui@outlook.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
