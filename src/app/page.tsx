'use client';

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import TestimonialsCarousel from '@/components/blocks/testimonials/testimonials-grid-with-centered-carousel'
import { StatsForChangelog } from '@/components/blocks/stats/statsforchangelog'
import { FooterWithGrid } from '@/components/blocks/footers/footer-with-grid'
import { SimpleCenteredContactForm } from '@/components/blocks/contact-forms/simple-centered-contact-form'
import { PersonStructuredData, WebsiteStructuredData } from '@/components/seo/structured-data'
import AdvancedTechShowcase from '@/components/blocks/technologies/advanced-tech-showcase'

const DevOpsHero = dynamic(() => import('@/components/blocks/heros/devops-hero'), {
  ssr: false
})

const TechnicalPortfolioSection = dynamic(() => import('@/components/blocks/project-showcase/technical-portfolio-section'), {
  ssr: false
})

export default function HomePage() {
  return (
    <>
      <PersonStructuredData />
      <WebsiteStructuredData />
      <main className="min-h-screen bg-[var(--color-primary-background)]">
        {/* Hero Section */}
        <DevOpsHero />

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
    </>
  )
}
