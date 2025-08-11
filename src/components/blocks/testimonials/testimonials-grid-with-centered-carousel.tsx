"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  projectType: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "CTO",
    company: "TechFlow Solutions",
    content: "Nassim delivered an exceptional full-stack solution that exceeded our expectations. His expertise in React and Spring Boot helped us launch 3 months ahead of schedule.",
    rating: 5,
    avatar: "/images/avatars/sarah-chen.jpg",
    projectType: "Full-Stack Development"
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    role: "Product Manager",
    company: "DataVision AI",
    content: "The AI-powered component detection system Nassim built achieved 92% accuracy and reduced our quality control time by 60%. Outstanding technical execution.",
    rating: 5,
    avatar: "/images/avatars/marcus-rodriguez.jpg",
    projectType: "AI/ML Engineering"
  },
  {
    id: 3,
    name: "Emily Watson",
    role: "Engineering Director",
    company: "CloudScale Inc",
    content: "Nassim's embedded systems expertise was crucial for our IoT project. The LoRaWAN implementation he developed achieved 40% better performance than our previous solution.",
    rating: 5,
    avatar: "/images/avatars/emily-watson.jpg",
    projectType: "Embedded Systems"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Startup Founder",
    company: "EventTech Pro",
    content: "The event management platform Nassim created transformed our business. The AI-powered feedback analysis and seamless booking system increased our efficiency by 45%.",
    rating: 5,
    avatar: "/images/avatars/david-kim.jpg",
    projectType: "Platform Development"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Operations Manager",
    company: "DevTools Corp",
    content: "The productivity tracking tool Nassim developed saved our team 25% of daily reporting time. Clean interface, robust functionality, and excellent support.",
    rating: 5,
    avatar: "/images/avatars/lisa-thompson.jpg",
    projectType: "Productivity Tools"
  }
]

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-background)]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
            Client Success Stories
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            Trusted by startups and enterprises to deliver high-impact solutions across 
            full-stack development, AI/ML, and embedded systems.
          </p>
        </motion.div>

        {/* Main Carousel */}
        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 p-3 rounded-full bg-[var(--color-secondary-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)] hover:border-[var(--color-primary-accent)] transition-all duration-300 shadow-lg"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 p-3 rounded-full bg-[var(--color-secondary-background)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)] hover:border-[var(--color-primary-accent)] transition-all duration-300 shadow-lg"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Testimonial Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-[var(--color-secondary-background)] rounded-2xl p-8 md:p-12 border border-[var(--color-border)] shadow-xl"
            >
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <div className="p-3 rounded-full bg-[var(--color-primary-accent)]/10">
                  <Quote className="w-8 h-8 text-[var(--color-primary-accent)]" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex justify-center mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentTestimonial.rating
                        ? 'text-[var(--color-warning-energy)] fill-current'
                        : 'text-[var(--color-text-secondary)]'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-xl md:text-2xl text-[var(--color-text-primary)] text-center leading-relaxed mb-8 font-medium">
                "{currentTestimonial.content}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[var(--color-border)]">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(currentTestimonial.name)}&background=3b82f6&color=ffffff&size=64`
                    }}
                  />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-[var(--color-text-primary)] text-lg">
                    {currentTestimonial.name}
                  </div>
                  <div className="text-[var(--color-text-secondary)] text-sm">
                    {currentTestimonial.role} at {currentTestimonial.company}
                  </div>
                  <div className="text-[var(--color-primary-accent)] text-xs font-medium mt-1">
                    {currentTestimonial.projectType}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-[var(--color-primary-accent)] scale-125'
                  : 'bg-[var(--color-border)] hover:bg-[var(--color-text-secondary)]'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-3xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-primary-accent)] mb-2">50+</div>
            <div className="text-sm text-[var(--color-text-secondary)]">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-primary-accent)] mb-2">150+</div>
            <div className="text-sm text-[var(--color-text-secondary)]">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-primary-accent)] mb-2">98%</div>
            <div className="text-sm text-[var(--color-text-secondary)]">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[var(--color-primary-accent)] mb-2">24/7</div>
            <div className="text-sm text-[var(--color-text-secondary)]">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}