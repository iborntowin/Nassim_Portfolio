'use client';

import { useState, useEffect } from 'react'
import SimpleBootHero from '@/components/terminal/boot-sequence/simple-boot-hero'
import { SimpleTerminalLayout } from '@/components/terminal/layout/simple-terminal-layout'
import TestimonialsCarousel from '@/components/blocks/testimonials/testimonials-grid-with-centered-carousel'
import { StatsForChangelog } from '@/components/blocks/stats/statsforchangelog'
import { FooterWithGrid } from '@/components/blocks/footers/footer-with-grid'
import { SimpleCenteredContactForm } from '@/components/blocks/contact-forms/simple-centered-contact-form'
import { PersonStructuredData, WebsiteStructuredData } from '@/components/seo/structured-data'
import TechnicalPortfolioSection from '@/components/blocks/project-showcase/technical-portfolio-section'
import AdvancedTechShowcase from '@/components/blocks/technologies/advanced-tech-showcase'

export default function HomePage() {
  const [bootComplete, setBootComplete] = useState(false)

  const handleBootComplete = () => {
    setBootComplete(true)
  }

  // Auto-complete boot after 5 seconds as fallback
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!bootComplete) {
        setBootComplete(true)
      }
    }, 5000)
    return () => clearTimeout(timer)
  }, [bootComplete])

  return (
    <>
      <PersonStructuredData />
      <WebsiteStructuredData />
      
      {/* Boot Sequence Hero - Shows first, then transitions to main content */}
      {!bootComplete && (
        <SimpleBootHero 
          onBootComplete={handleBootComplete}
          skipAnimation={false}
        />
      )}

      {/* Main Portfolio Content - Wrapped in Terminal Layout */}
      {bootComplete && (
        <div className="min-h-screen bg-black">
          <div className="flex items-start justify-center p-4">
            <SimpleTerminalLayout
              showSystemMetrics={true}
              title="Nassim's Cloud Engineer Portfolio"
            >
              <div className="w-full scrollable-container">
                <main className="min-h-full">
                  {/* Technical Portfolio Section */}
                  <TechnicalPortfolioSection />

                  {/* Performance Stats */}
                  <StatsForChangelog />

                  {/* Testimonials */}
                  <TestimonialsCarousel />

                  {/* Contact Section */}
                  <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                      <h2 className="text-4xl font-bold text-terminal-green mb-6">
                        Contact
                      </h2>
                      <p className="text-lg text-terminal-cyan max-w-2xl mx-auto">
                        Get in touch for collaborations, project inquiries, or just to say hello!
                      </p>
                    </div>
                    <SimpleCenteredContactForm />
                  </section>

                  {/* Advanced Technologies Showcase - Before Footer */}
                  <AdvancedTechShowcase />

                  {/* Footer */}
                  <FooterWithGrid />
                </main>
              </div>
            </SimpleTerminalLayout>
          </div>
        </div>
      )}
    </>
  )
}
