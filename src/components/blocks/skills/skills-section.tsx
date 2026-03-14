'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Cloud, Code, Brain, Cpu } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Skill {
  name: string;
  level: number; // 0–100
}

interface Domain {
  id: string;
  label: string;
  icon: React.ReactNode;
  skills: Skill[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getLevel(pct: number): 'Expert' | 'Proficient' | 'Working Knowledge' {
  if (pct >= 80) return 'Expert';
  if (pct >= 65) return 'Proficient';
  return 'Working Knowledge';
}

function getBarColor(pct: number): string {
  if (pct >= 80) return 'from-emerald-500 to-green-400';
  if (pct >= 65) return 'from-blue-500 to-blue-400';
  return 'from-amber-500 to-orange-400';
}

function getLevelColor(pct: number): string {
  if (pct >= 80) return 'text-emerald-400';
  if (pct >= 65) return 'text-blue-400';
  return 'text-amber-400';
}

function getLevelBadgeStyle(pct: number): string {
  if (pct >= 80)
    return 'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/30';
  if (pct >= 65)
    return 'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/30';
  return 'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/30';
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const domains: Domain[] = [
  {
    id: 'cloud',
    label: 'Cloud & Infrastructure',
    icon: <Cloud className="h-4 w-4" />,
    skills: [
      { name: 'Docker', level: 87 },
      { name: 'Linux / Bash', level: 85 },
      { name: 'OpenStack', level: 82 },
      { name: 'AWS', level: 76 },
      { name: 'Kubernetes', level: 72 },
      { name: 'Ansible', level: 74 },
      { name: 'Terraform', level: 68 },
      { name: 'Prometheus / Grafana', level: 63 },
    ],
  },
  {
    id: 'fullstack',
    label: 'Full-Stack Dev',
    icon: <Code className="h-4 w-4" />,
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript', level: 82 },
      { name: 'Python', level: 84 },
      { name: 'PostgreSQL', level: 78 },
      { name: 'Node.js', level: 76 },
      { name: 'Spring Boot', level: 68 },
      { name: 'MongoDB', level: 67 },
      { name: 'Symfony / PHP', level: 60 },
    ],
  },
  {
    id: 'aiml',
    label: 'AI / ML',
    icon: <Brain className="h-4 w-4" />,
    skills: [
      { name: 'OpenCV', level: 78 },
      { name: 'scikit-learn', level: 75 },
      { name: 'TensorFlow', level: 72 },
      { name: 'Signal Processing (EEG)', level: 68 },
      { name: 'Hugging Face', level: 62 },
    ],
  },
  {
    id: 'systems',
    label: 'Systems',
    icon: <Cpu className="h-4 w-4" />,
    skills: [
      { name: 'C / C++', level: 65 },
      { name: 'Java', level: 70 },
      { name: 'C#', level: 62 },
      { name: 'Embedded Systems', level: 60 },
    ],
  },
];

// ─── SkillBar ──────────────────────────────────────────────────────────────────

interface SkillBarProps {
  skill: Skill;
  index: number;
}

function SkillBar({ skill, index }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const label = getLevel(skill.level);
  const barColor = getBarColor(skill.level);
  const levelColor = getLevelColor(skill.level);
  const badgeStyle = getLevelBadgeStyle(skill.level);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 backdrop-blur-sm"
    >
      {/* Name + percentage */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-neutral-200">
          {skill.name}
        </span>
        <span className={`text-sm font-semibold tabular-nums ${levelColor}`}>
          {skill.level}%
        </span>
      </div>

      {/* Progress track */}
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
          initial={{ width: '0%' }}
          animate={inView ? { width: `${skill.level}%` } : { width: '0%' }}
          transition={{
            duration: 0.9,
            delay: index * 0.06 + 0.15,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>

      {/* Level badge */}
      <div className="mt-2.5 flex items-center">
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[11px] font-medium tracking-wide ${badgeStyle}`}
        >
          {label}
        </span>
      </div>
    </motion.div>
  );
}

// ─── SkillsSection ─────────────────────────────────────────────────────────────

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>('cloud');

  const activeDomain = domains.find((d) => d.id === activeTab) ?? domains[0];

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-background)]"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="mb-14 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Core{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-500 bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-base text-neutral-400 sm:text-lg"
          >
            Honest proficiency levels — built through real projects and
            production deployments
          </motion.p>
        </div>

        {/* ── Domain Tabs ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {domains.map((domain) => {
            const isActive = domain.id === activeTab;
            return (
              <button
                key={domain.id}
                onClick={() => setActiveTab(domain.id)}
                className={[
                  'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white ring-1 ring-blue-500/40'
                    : 'bg-white/[0.04] text-neutral-400 ring-1 ring-white/[0.08] hover:bg-white/[0.08] hover:text-neutral-200',
                ].join(' ')}
              >
                {domain.icon}
                {domain.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Skill Grid ────────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="grid grid-cols-1 gap-4 md:grid-cols-2"
          >
            {activeDomain.skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Disclaimer note ───────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center text-sm italic text-neutral-500"
        >
          Proficiency is self-assessed based on production deployments, project
          outcomes, and peer code reviews.
        </motion.p>
      </div>
    </section>
  );
}
