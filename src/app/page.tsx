import DevOpsHero from '@/components/blocks/heros/devops-hero'
import { TestimonialsGridWithCenteredCarousel } from '@/components/blocks/testimonials/testimonials-grid-with-centered-carousel'
import { StatsForChangelog } from '@/components/blocks/stats/statsforchangelog'
import { FooterWithGrid } from '@/components/blocks/footers/footer-with-grid'
import { SimpleCenteredContactForm } from '@/components/blocks/contact-forms/simple-centered-contact-form'
import { TechMarquee } from '@/components/blocks/logos-clouds/tech-marquee'
import { PersonStructuredData, WebsiteStructuredData } from '@/components/seo/structured-data'
import UnifiedTerminalSection from '@/components/blocks/terminal/unified-terminal-section'
import { TerminalModeToggle } from '@/components/terminal/terminal-mode-toggle'

export default function HomePage() {
  return (
    <>
      <PersonStructuredData />
      <WebsiteStructuredData />
      <main className="min-h-screen bg-[var(--color-primary-background)]">
        {/* Terminal Mode Toggle */}
        <TerminalModeToggle />

        {/* Hero Section */}
        <DevOpsHero />

        {/* Unified Interactive Terminal - Main Feature */}
        <UnifiedTerminalSection />

        {/* Logo Cloud Marquee */}
        <TechMarquee />

        {/* Performance Stats */}
        <StatsForChangelog />

        {/* Testimonials */}
        <TestimonialsGridWithCenteredCarousel />

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-background)]">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mb-6">
              Contact
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Get in touch for collaborations, project inquiries, or just to say hello!
            </p>
          </div>
          <SimpleCenteredContactForm />
        </section>

        {/* Footer */}
        <FooterWithGrid />
      </main>
    </>
  )
}
