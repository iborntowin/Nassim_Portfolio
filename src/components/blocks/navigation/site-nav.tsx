'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUpRight, Command, Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CommandPalette } from './command-palette'

const SECTIONS = [
  { id: 'technical-portfolio', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
]

export default function SiteNav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 130, damping: 30, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const elements = SECTIONS.map((section) => document.getElementById(section.id)).filter(
      (element): element is HTMLElement => Boolean(element)
    )
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
          scrolled || menuOpen
            ? 'border-b border-white/10 bg-[#09090f]/88 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-cyan-400 via-sky-400 to-purple-500"
        />

        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Nassim Maaoui — home"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/5 font-mono text-[11px] font-semibold text-white transition-colors group-hover:border-cyan-400/50 group-hover:text-cyan-300">
              NM
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[13px] font-semibold text-white">Nassim Maaoui</span>
              <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                Cloud &amp; infrastructure
              </span>
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            {SECTIONS.map((section) => {
              const isActive = active === section.id
              return (
                <a
                  key={section.id}
                  href={`/#${section.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'relative rounded-md px-2.5 py-1.5 text-[13px] transition-colors',
                    isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                  )}
                >
                  {section.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-2.5 -bottom-0.5 h-px bg-cyan-300 transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </a>
              )
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false)
                setPaletteOpen(true)
              }}
              aria-label="Open command palette"
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-xs text-slate-400 transition-colors hover:border-cyan-400/40 hover:text-white"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Jump to</span>
              <kbd className="hidden items-center gap-0.5 rounded border border-white/15 px-1 py-0.5 font-mono text-[10px] text-slate-400 sm:flex">
                <Command className="h-2.5 w-2.5" />K
              </kbd>
            </button>

            <a
              href="mailto:nassimmaaoui@outlook.com?subject=Internship%20opportunity%20%E2%80%94%20Cloud%20%2F%20Infrastructure"
              className="group hidden items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#09090f] transition-opacity hover:opacity-90 sm:inline-flex"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Hire me
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-300 transition-colors hover:text-white md:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            id="mobile-menu"
            className="border-t border-white/10 bg-[#09090f] px-4 pb-5 pt-2 md:hidden"
          >
            <nav aria-label="Sections" className="flex flex-col">
              {SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`/#${section.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/5 py-3 text-sm text-slate-300 transition-colors hover:text-white"
                >
                  {section.label}
                </a>
              ))}
              <Link
                href="/terminal"
                onClick={() => setMenuOpen(false)}
                className="border-b border-white/5 py-3 text-sm text-slate-300 transition-colors hover:text-white"
              >
                Terminal mode
              </Link>
            </nav>
            <a
              href="mailto:nassimmaaoui@outlook.com"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#09090f]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Open to internships — email me
            </a>
          </div>
        )}
      </header>

      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
    </>
  )
}
