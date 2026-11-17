import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Download, Mail, Github, Linkedin } from 'lucide-react'
import { StatsForChangelog } from '@/components/blocks/stats/statsforchangelog'
import { FooterWithGrid } from '@/components/blocks/footers/footer-with-grid'
import { SimpleCenteredContactForm } from '@/components/blocks/contact-forms/simple-centered-contact-form'
import {
  FaqStructuredData,
  ItemListStructuredData,
  PersonStructuredData,
  WebsiteStructuredData,
} from '@/components/seo/structured-data'
import { getAllProjects } from '@/lib/projects-data'
import AdvancedTechShowcase from '@/components/blocks/technologies/advanced-tech-showcase'
import ExperienceTimeline from '@/components/blocks/experience/experience-timeline'
import SiteNav from '@/components/blocks/navigation/site-nav'
import HowIWork from '@/components/blocks/about/how-i-work'
import RecruiterFaq from '@/components/blocks/recruiter/recruiter-faq'
import { CopyEmailButton } from '@/components/blocks/contact-forms/copy-email-button'

const DevOpsHero = dynamic(() => import('@/components/blocks/heros/devops-hero'))

const TechnicalPortfolioSection = dynamic(
  () => import('@/components/blocks/project-showcase/technical-portfolio-section')
)

const OpenSourcePanel = dynamic(() => import('@/components/blocks/open-source/open-source-panel'))

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
}

const AT_A_GLANCE = [
  {
    label: 'Focus',
    value: 'Cloud · Infrastructure · Platform',
    note: 'OpenStack, Kubernetes, Ansible, Terraform, Prometheus, Linux',
  },
  {
    label: 'Available',
    value: 'Six-month internship',
    note: 'December 2026 – May 2027 · end-of-studies',
  },
  {
    label: 'Based in',
    value: 'Tunis, Tunisia',
    note: 'Remote, or EU/EEA with work-permit sponsorship',
  },
  {
    label: 'Most recent work',
    value: 'Internal platform at Huawei',
    note: '23 radio sites · 30–60 minute manual check becomes 4 seconds',
  },
]

export default function HomePage() {
  const projects = getAllProjects()

  return (
    <>
      <PersonStructuredData />
      <WebsiteStructuredData />
      <ItemListStructuredData projects={projects} />
      <FaqStructuredData />
      <div className="min-h-screen bg-[var(--color-primary-background)]">
        <SiteNav />
        <DevOpsHero />

        {/* Recruiter quick scan */}
        <section
          aria-label="Profile at a glance"
          className="border-y border-[var(--color-secondary-background)]"
        >
          <dl className="mx-auto grid max-w-6xl divide-y divide-[var(--color-secondary-background)] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
            {AT_A_GLANCE.map((fact) => (
              <div
                key={fact.label}
                className="px-5 py-5 sm:px-6 sm:py-6"
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-secondary-accent)]">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-[var(--color-text-primary)]">
                  {fact.value}
                </dd>
                <dd className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {fact.note}
                </dd>
              </div>
            ))}
          </dl>
        </section>

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

        {/* Working principles */}
        <HowIWork />

        {/* Recruiter questions */}
        <RecruiterFaq />

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
              <CopyEmailButton />
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
      </div>
    </>
  )
}
