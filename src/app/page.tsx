import SplitWithCodeExample from '@/components/blocks/heros/split-with-code-example'
import TechnicalPortfolioSection from '@/components/blocks/project-showcase/technical-portfolio-section'
import CLIWalkthrough from '@/components/blocks/interactive/cli-walkthrough'
import { TestimonialsGridWithCenteredCarousel } from '@/components/blocks/testimonials/testimonials-grid-with-centered-carousel'
import ThreeTiersWithToggle from '@/components/blocks/pricing/three-tiers-with-toggle'
import { StatsForChangelog } from '@/components/blocks/stats/statsforchangelog'
import { FooterWithGrid } from '@/components/blocks/footers/footer-with-grid'
import { SimpleCenteredContactForm } from '@/components/blocks/contact-forms/simple-centered-contact-form'
import SideBySideWithDetails from '@/components/blocks/newsletter-sections/side-by-side-with-details'
import { LogoCloudMarquee } from '@/components/blocks/logos-clouds/logo-cloud-marquee'
import { FullBackgroundImageWithText } from '@/components/blocks/heros/full-background-image-with-text'
import { PlayfulHeroSection } from '@/components/blocks/heros/playful-hero-section'
import { BackgroundDotsMaskedVertical } from '@/components/blocks/backgrounds/background-with-dots-masked-vertical'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-primary-background)]">
      {/* Hero Section */}
      <SplitWithCodeExample />


      {/* Full Background Image with Text */}
      <FullBackgroundImageWithText />

    

      {/* Logo Cloud Marquee */}
      <LogoCloudMarquee />

      {/* Technical Portfolio */}
      <div id="portfolio">
        <TechnicalPortfolioSection />
      </div>

      {/* Interactive CLI Tutorial */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-background)]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-[var(--color-text-primary)] mb-6">
            Interactive Development Experience
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            Experience the development workflow with our interactive CLI tutorial. 
            See how modern tooling and best practices come together in real-time.
          </p>
        </div>
        <CLIWalkthrough />
      </section>

      {/* Performance Stats */}
      <StatsForChangelog />

      {/* Client Testimonials */}
      <TestimonialsGridWithCenteredCarousel />

      {/* Pricing & Services */}
      <ThreeTiersWithToggle />

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

     

      {/* Background Dots Masked Vertical */}
      <BackgroundDotsMaskedVertical />

      {/* Footer */}
      <FooterWithGrid />
    </main>
  )
}
