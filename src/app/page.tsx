import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Download, Mail, Github, Linkedin } from 'lucide-react'
import { StatsForChangelog } from '@/components/blocks/stats/statsforchangelog'
import { FooterWithGrid } from '@/components/blocks/footers/footer-with-grid'
import { SimpleCenteredContactForm } from '@/components/blocks/contact-forms/simple-centered-contact-form'
import { PersonStructuredData, WebsiteStructuredData } from '@/components/seo/structured-data'
import AdvancedTechShowcase from '@/components/blocks/technologies/advanced-tech-showcase'
import ExperienceTimeline from '@/components/blocks/experience/experience-timeline'

const DevOpsHero = dynamic(() => import('@/components/blocks/heros/devops-hero'))

const TechnicalPortfolioSection = dynamic(
  () => import('@/components/blocks/project-showcase/technical-portfolio-section')
)

const OpenSourcePanel = dynamic(() => import('@/components/blocks/open-source/open-source-panel'))

export default function HomePage() {
  return (
    <>
      <PersonStructuredData />
      <WebsiteStructuredData />
      <main className="min-h-screen bg-[var(--color-primary-background)]">
        <DevOpsHero />

        {/* Projects */}
        <div id="projects">
          <TechnicalPortfolioSection />
        </div>

        {/* Experience & education */}
        <ExperienceTimeline />

        {/* Timeline of shipped work */}
        <StatsForChangelog />

        {/* Public repositories */}
        <OpenSourcePanel />

        {/* Skills */}
        <AdvancedTechShowcase />

        {/* Contact */}
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-secondary-accent)] mb-3">
              Contact
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Looking for a six-month intern from December 2026
            </h2>
            <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">
              I am available for an end-of-studies internship in cloud, infrastructure or platform
              engineering from December 2026 to May 2027 — in Tunisia, remote, or across the EU/EEA
              with work-permit sponsorship.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/cv/Nassim-Maaoui-CV.pdf"
                download
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-text-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--color-primary-background)] hover:opacity-90 transition-opacity"
              >
                <Download className="w-4 h-4" />
                Download CV (PDF)
              </a>
              <a
                href="mailto:nassimmaaoui@outlook.com"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-secondary-background)] px-5 py-2.5 text-sm text-[var(--color-text-primary)] hover:border-[var(--color-secondary-accent)]/60 transition-colors"
              >
                <Mail className="w-4 h-4" />
                nassimmaaoui@outlook.com
              </a>
              <Link
                href="https://github.com/iborntowin"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-secondary-background)] px-5 py-2.5 text-sm text-[var(--color-text-primary)] hover:border-[var(--color-secondary-accent)]/60 transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </Link>
              <Link
                href="https://www.linkedin.com/in/maaoui-nassim"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-secondary-background)] px-5 py-2.5 text-sm text-[var(--color-text-primary)] hover:border-[var(--color-secondary-accent)]/60 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </Link>
            </div>
          </div>
          <SimpleCenteredContactForm />
        </section>

        {/* Footer */}
        <FooterWithGrid />
      </main>
    </>
  )
}
