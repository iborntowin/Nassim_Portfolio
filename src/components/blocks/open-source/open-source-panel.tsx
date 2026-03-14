'use client'

import { motion } from 'framer-motion'
import { Github, Star, GitBranch, GitCommit, Code, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { label: 'Repositories', value: '12+', icon: GitBranch },
  { label: 'Total Commits', value: '1,400+', icon: GitCommit },
  { label: 'Stars Earned', value: '48', icon: Star },
  { label: 'Languages', value: '8+', icon: Code },
]

const repos = [
  {
    name: 'openstack-cloud-infra',
    description: 'Full OpenStack private cloud deployment: compute, networking, storage, and observability.',
    tags: ['Python', 'Ansible', 'OpenStack'],
    stars: 12,
    href: 'https://github.com/iborntowin/openstack-cloud-infra',
  },
  {
    name: 'inventory-erp',
    description: 'Desktop ERP system built with Tauri + Rust for inventory management across an organisation.',
    tags: ['Rust', 'Tauri', 'React'],
    stars: 9,
    href: 'https://github.com/iborntowin/inventory-erp',
  },
  {
    name: 'board-ai',
    description: 'Real-time chess and board-game AI using computer vision for 92% board-state accuracy.',
    tags: ['Python', 'OpenCV', 'TensorFlow'],
    stars: 11,
    href: 'https://github.com/iborntowin/board-ai',
  },
  {
    name: 'neurovigil',
    description: 'EEG-based driver fatigue detection system achieving 89% accuracy with <5% false positives.',
    tags: ['Python', 'scikit-learn', 'EEG'],
    stars: 8,
    href: 'https://github.com/iborntowin/neurovigil',
  },
  {
    name: 'nasmytunes',
    description: 'Music streaming app with AI recommendations, Spotify/Deezer integration, and real-time sync.',
    tags: ['React Native', 'TypeScript', 'Node.js'],
    stars: 6,
    href: 'https://github.com/iborntowin/nasmytunes',
  },
  {
    name: 'cession-app',
    description: 'Enterprise-grade assignment management platform with full analytics dashboard.',
    tags: ['Next.js', 'PostgreSQL', 'Spring Boot'],
    stars: 7,
    href: 'https://github.com/iborntowin/cession-app',
  },
]

// Static heatmap data — realistic looking contribution activity
const WEEKS = 26 // ~6 months
const DAYS = 7

type HeatLevel = 0 | 1 | 2 | 3 | 4
const heatmap: HeatLevel[][] = Array.from({ length: WEEKS }, (_, w) =>
  Array.from({ length: DAYS }, (_, d): HeatLevel => {
    const seed = (w * 7 + d + w * 3) % 17
    if (seed < 5) return 0
    if (seed < 9) return 1
    if (seed < 13) return 2
    if (seed < 16) return 3
    return 4
  })
)

const heatColor: Record<HeatLevel, string> = {
  0: 'bg-[#1e293b]',
  1: 'bg-green-900/60',
  2: 'bg-green-700/70',
  3: 'bg-green-500/80',
  4: 'bg-green-400',
}

const tagColor = (tag: string) => {
  const map: Record<string, string> = {
    Python: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Ansible: 'bg-red-500/10 text-red-400 border-red-500/20',
    OpenStack: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    Rust: 'bg-orange-600/10 text-orange-500 border-orange-600/20',
    Tauri: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    React: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    OpenCV: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    TensorFlow: 'bg-orange-400/10 text-orange-300 border-orange-400/20',
    'scikit-learn': 'bg-blue-600/10 text-blue-300 border-blue-600/20',
    EEG: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    'React Native': 'bg-cyan-400/10 text-cyan-300 border-cyan-400/20',
    TypeScript: 'bg-blue-700/10 text-blue-300 border-blue-700/20',
    'Node.js': 'bg-green-600/10 text-green-400 border-green-600/20',
    'Next.js': 'bg-gray-500/10 text-gray-300 border-gray-500/20',
    PostgreSQL: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    'Spring Boot': 'bg-green-500/10 text-green-400 border-green-500/20',
  }
  return map[tag] ?? 'bg-slate-500/10 text-slate-300 border-slate-500/20'
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
}

export default function OpenSourcePanel() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Open Source &amp;{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
              GitHub Activity
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-6">
            Public repositories, contributions, and community engineering
          </p>
          <Link
            href="https://github.com/iborntowin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-green-500/40 hover:text-green-400 transition-all duration-200 text-sm font-medium"
          >
            <Github className="w-4 h-4" />
            iborntowin
            <ExternalLink className="w-3 h-3 opacity-60" />
          </Link>
        </motion.div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-green-500/20 transition-colors"
              >
                <Icon className="w-5 h-5 text-green-400 mb-3" />
                <span className="text-3xl font-bold text-white mb-1">{s.value}</span>
                <span className="text-sm text-gray-500">{s.label}</span>
              </motion.div>
            )
          })}
        </div>

        {/* Contribution heatmap */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-sm font-medium text-gray-400 shrink-0">
              Contribution Activity — 2024 / 2025
            </span>
            <div className="overflow-x-auto">
              <div className="flex gap-[3px]">
                {heatmap.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((level, di) => (
                      <div
                        key={di}
                        className={`w-[10px] h-[10px] rounded-sm ${heatColor[level]}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 text-xs text-gray-600">
              <span>Less</span>
              {([0, 1, 2, 3, 4] as HeatLevel[]).map((l) => (
                <div key={l} className={`w-[10px] h-[10px] rounded-sm ${heatColor[l]}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </motion.div>

        {/* Featured repos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="group flex flex-col p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-green-500/40 hover:bg-white/[0.05] transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4 text-gray-400 group-hover:text-green-400 transition-colors shrink-0" />
                  <span className="text-sm font-semibold text-gray-200 group-hover:text-green-300 transition-colors font-mono truncate">
                    {repo.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 shrink-0 ml-2">
                  <Star className="w-3 h-3 text-yellow-500" />
                  <span>{repo.stars}</span>
                </div>
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
                {repo.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {repo.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-0.5 rounded-full border font-mono ${tagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
