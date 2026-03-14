import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Nassim Maaoui Portfolio',
}

export default function TermsPage() {
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

        <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-400 mb-12">Last updated: March 2026</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this portfolio website (&quot;Site&quot;), you accept and agree to
              be bound by these Terms of Service. If you do not agree to these terms, please do not
              use this Site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Use of Content</h2>
            <p className="mb-3">
              All content on this Site — including text, code samples, project descriptions, and
              design assets — is the intellectual property of Nassim Maaoui unless otherwise
              credited.
            </p>
            <p>
              You may view and reference content for personal and non-commercial purposes. You may
              not reproduce, copy, or redistribute any content without prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. No Warranty</h2>
            <p>
              This Site is provided &quot;as is&quot; without any warranties of any kind. I make no
              guarantees regarding the accuracy, completeness, or availability of the Site or its
              content. The Site may be temporarily unavailable due to maintenance or technical issues.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, Nassim Maaoui shall not be liable
              for any indirect, incidental, or consequential damages arising from your use of, or
              inability to use, this Site or its content.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. External Links</h2>
            <p>
              This Site contains links to third-party websites (GitHub, LinkedIn, etc.). These links
              are provided for convenience only. I am not responsible for the content, accuracy, or
              practices of any external sites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Consulting & Engagements</h2>
            <p>
              Any consulting, freelance, or collaboration engagement enquired via this Site is subject
              to a separate written agreement between the parties. Nothing on this Site constitutes a
              binding contract or offer for services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of Tunisia. Any
              disputes arising from use of this Site shall be subject to the exclusive jurisdiction
              of the courts of Tunisia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Changes to These Terms</h2>
            <p>
              I reserve the right to update these Terms at any time. Continued use of the Site after
              changes are posted constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Contact</h2>
            <p>
              For any questions regarding these Terms, please contact{' '}
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
