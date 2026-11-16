'use client'

import { motion } from 'framer-motion'
import { Github, Star, ArrowUpRight, Lock } from 'lucide-react'

const repos = [
  {
    name: 'NasmyTunes',
    description: 'Spotify playlist converter: CLI and Flask web app that resolve, download and convert tracks to 192 kbps MP3 with FFmpeg.',
    language: 'Python',
    stars: 2,
    href: 'https://github.com/iborntowin/NasmyTunes',
  },
  {
    name: 'Board-Ai-detection',
    description: 'CNN-based PCB component detection — dataset preparation, training and an inference pipeline for live images.',
    language: 'Jupyter Notebook',
    stars: 0,
    href: 'https://github.com/iborntowin/Board-Ai-detection',
  },
  {
    name: 'cession-frontend',
    description: 'Svelte frontend for a session-based contract management platform with JWT auth and role-based access.',
    language: 'Svelte',
    stars: 0,
    href: 'https://github.com/iborntowin/cession-frontend',
  },
  {
    name: 'LoRa-Packet-Forwarder',
    description: 'LoRa packet forwarder work from the nanosatellite LoRaWAN communication board.',
    language: 'Embedded',
    stars: 0,
    href: 'https://github.com/iborntowin/LoRa-Packet-Forwarder',
  },
  {
    name: 'Nassim_Portfolio',
    description: 'This site — Next.js, TypeScript and Tailwind, with a terminal mode and per-project write-ups.',
    language: 'TypeScript',
    stars: 0,
    href: 'https://github.com/iborntowin/Nassim_Portfolio',
  },
]

const privateWork = [
  'HuaweiHelper — internal RAN monitoring platform (Huawei Technologies)',
  'Hackership — internship platform for Felcloud',
  'Ansible Studio — desktop IDE for Ansible infrastructure',
  'InventoryERP — Tauri + Rust desktop ERP',
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.06 } }),
}

export default function OpenSourcePanel() {
  return (
    <section className="bg-[var(--color-primary-background)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="flex flex-wrap items-end justify-between gap-6 mb-10"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-secondary-accent)] mb-3">
              Code
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Public repositories
            </h2>
            <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
              What can be published is on GitHub. Most of the infrastructure work I do lives in private
              or company repositories, so it is documented here instead.
            </p>
          </div>
          <a
            href="https://github.com/iborntowin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-secondary-background)] px-4 py-2 text-sm text-[var(--color-text-primary)] hover:border-[var(--color-secondary-accent)]/60 transition-colors"
          >
            <Github className="w-4 h-4" />
            github.com/iborntowin
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {repos.map((repo, index) => (
              <motion.a
                key={repo.name}
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group flex flex-col rounded-xl border border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)]/40 p-5 hover:border-[var(--color-secondary-accent)]/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-[var(--color-text-primary)]">{repo.name}</span>
                  <ArrowUpRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[var(--color-secondary-accent)] transition-colors" />
                </div>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-4">
                  {repo.description}
                </p>
                <div className="mt-auto flex items-center gap-4 text-xs text-[var(--color-text-secondary)]">
                  <span className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-secondary-accent)]" />
                    {repo.language}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {repo.stars}
                  </span>
                </div>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
            variants={fadeUp}
            className="rounded-xl border border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)]/40 p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-[var(--color-text-secondary)]" />
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                Private &amp; internal work
              </h3>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
              Available to walk through in an interview or on request:
            </p>
            <ul className="space-y-3">
              {privateWork.map((item) => (
                <li key={item} className="flex gap-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-secondary-accent)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
