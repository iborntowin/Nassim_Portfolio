'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Download, Mail, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FAQS } from '@/lib/faq-data'

const FACTS = [
  { label: 'Role', value: 'Cloud · Infrastructure · Platform' },
  { label: 'Level', value: 'Final-year engineering student' },
  { label: 'Start', value: 'December 2026' },
  { label: 'Duration', value: '6 months — end-of-studies' },
  { label: 'Location', value: 'Tunis · remote · EU/EEA' },
  { label: 'Work permit', value: 'Sponsorship needed in the EU/EEA' },
  { label: 'Languages', value: 'Arabic · French · English' },
]

export default function RecruiterFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="border-t border-[var(--color-secondary-background)] bg-[var(--color-primary-background)] px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-secondary-accent)]">
            For recruiters
          </p>
          <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
            The questions that decide the call
          </h2>
          <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
            Availability, sponsorship, role fit and proof of work — answered up front, so you do not
            have to email me to find out.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-12">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)]/40 p-6">
              <div className="mb-5 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-emerald-400">
                  Open to offers
                </span>
              </div>

              <dl className="space-y-3">
                {FACTS.map((fact) => (
                  <div key={fact.label} className="grid grid-cols-[92px_minmax(0,1fr)] gap-3">
                    <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-text-secondary)]/70">
                      {fact.label}
                    </dt>
                    <dd className="text-sm leading-snug text-[var(--color-text-primary)]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-col gap-2 border-t border-white/[0.07] pt-5">
                <a
                  href="/cv/Nassim-Maaoui-CV.pdf"
                  download
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[var(--color-text-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--color-primary-background)] transition-opacity hover:opacity-90"
                >
                  <Download className="h-4 w-4" />
                  Download CV (PDF)
                </a>
                <a
                  href="mailto:nassimmaaoui@outlook.com"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[var(--color-secondary-background)] px-4 py-2.5 text-sm text-[var(--color-text-primary)] transition-colors hover:border-[var(--color-secondary-accent)]/60"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
              </div>
            </div>
          </aside>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {FAQS.map((faq, index) => {
              const isOpen = open === index
              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-start justify-between gap-5 py-5 text-left"
                  >
                    <span className="text-sm font-medium leading-snug text-[var(--color-text-primary)] sm:text-base">
                      {faq.question}
                    </span>
                    <Plus
                      aria-hidden="true"
                      className={cn(
                        'mt-0.5 h-4 w-4 shrink-0 text-[var(--color-text-secondary)] transition-transform duration-200',
                        isOpen && 'rotate-45 text-[var(--color-secondary-accent)]'
                      )}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 pr-9 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
