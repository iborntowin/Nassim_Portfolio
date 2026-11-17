'use client'

import { Briefcase, GraduationCap, Users } from 'lucide-react'

interface ExperienceItem {
  id: number
  period: string
  title: string
  organization: string
  location: string
  kind: 'work' | 'education' | 'leadership'
  summary: string
  highlights: string[]
  stack: string[]
}

const experience: ExperienceItem[] = [
  {
    id: 1,
    period: 'Jun 2026 – Aug 2026',
    title: 'Cloud & Telecom Infrastructure Intern',
    organization: 'Huawei Technologies',
    location: 'Tunis, Tunisia',
    kind: 'work',
    summary:
      'Built and deployed an internal monitoring platform for the radio access network, now used by the network operations team across 23 sites.',
    highlights: [
      'Reduced a 30–60 minute manual health comparison to a 4-second diff',
      'Built a detect → extract → compare → notify pipeline over 19 report types and 4 input formats',
      'Shipped a 9-stage idempotent offline installer for Windows Server 2022',
      'Service recovers from a killed process in ~2 seconds; 32/32 health checks passing on a clean machine'
    ],
    stack: ['Python', 'Flask', 'htmx', 'PowerShell', 'Windows Server', 'Ansible']
  },
  {
    id: 7,
    period: '2024 – 2025',
    title: 'Cloud Intern',
    organization: 'Felcloud',
    location: 'Bizerte, Tunisia',
    kind: 'work',
    summary:
      'Cloud internship at a Tunisian OpenStack provider — infrastructure provisioning, tenant networking and automation for a small platform team.',
    highlights: [
      'Administered OpenStack compute, tenant networks, floating IPs and security groups',
      'Wrote Ansible playbooks so environments are rebuilt from the repository rather than by hand',
      'Managed bastion access and key-based SSH into the private cloud'
    ],
    stack: ['OpenStack', 'Ansible', 'Linux', 'Docker', 'PostgreSQL']
  },
  {
    id: 2,
    period: 'Feb 2024 – Jun 2024',
    title: 'Embedded Systems Engineer Intern',
    organization: 'Tech4IoT',
    location: 'Ariana, Tunisia',
    kind: 'work',
    summary:
      'Designed and validated a low-power LoRaWAN communication board for nanosatellites, from board bring-up through RF validation.',
    highlights: [
      '+40% transmission performance and 1.2 Mbps over a 500 km link budget',
      'Cut power consumption by 30% with an optimised STM32 sleep mode',
      'Full hardware bring-up, communication tests and RF validation',
      'Benchmarked throughput and power instead of trusting nominal component specs'
    ],
    stack: ['C/C++', 'STM32', 'LoRaWAN', 'Low-power design']
  },
  {
    id: 3,
    period: 'Jul 2023 – Aug 2023',
    title: 'Software Development Intern',
    organization: 'Eleonetech',
    location: 'Bizerte, Tunisia',
    kind: 'work',
    summary: 'Built internal tooling that removed manual reporting work from the team’s month-end.',
    highlights: [
      'C# tracking module that cut reporting time by 25%',
      'Automated 15 monthly reports with PowerShell, saving 20 hours per month'
    ],
    stack: ['C#', '.NET', 'PowerShell']
  },
  {
    id: 4,
    period: '2024 – 2027',
    title: 'Engineering Degree, Computer Engineering',
    organization: 'ESPRIT — Cloud & Network Architecture (ArcTIC)',
    location: 'Ariana, Tunisia',
    kind: 'education',
    summary:
      'Final-year engineering student specialising in cloud and network architecture. Graduating June 2027.',
    highlights: [],
    stack: []
  },
  {
    id: 5,
    period: '2021 – 2024',
    title: 'B.Sc. Computer Systems Engineering',
    organization: 'Faculté des Sciences de Bizerte',
    location: 'Bizerte, Tunisia',
    kind: 'education',
    summary: 'Graduated with distinction (Très Bien).',
    highlights: [],
    stack: []
  },
  {
    id: 6,
    period: 'Nov 2023 – Jun 2024',
    title: 'President, Smartech FSB Robotics Club',
    organization: 'Faculté des Sciences de Bizerte',
    location: 'Bizerte, Tunisia',
    kind: 'leadership',
    summary: 'Led a 20-member team and ran the club’s technical programme.',
    highlights: [
      'Organised 5 technical events with 150+ attendees',
      'Delivered robotics workshops to 200+ students'
    ],
    stack: []
  }
]

const kindMeta = {
  work: { icon: Briefcase, label: 'Experience' },
  education: { icon: GraduationCap, label: 'Education' },
  leadership: { icon: Users, label: 'Leadership' }
} as const

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="bg-[var(--color-primary-background)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-secondary-accent)] mb-3">
            Background
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Experience &amp; education
          </h2>
          <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
            Four internships across cloud infrastructure, telecom, embedded systems and internal tooling,
            plus a five-year engineering track in cloud and network architecture.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-text-secondary)]/20 hidden sm:block" />

          <div className="space-y-6">
            {experience.map((item, index) => {
              const meta = kindMeta[item.kind]
              const Icon = meta.icon
              return (
                <div
                  key={item.id}
                  className="relative sm:pl-10"
                >
                  <span className="hidden sm:flex absolute left-0 top-6 w-4 h-4 items-center justify-center rounded-full bg-[var(--color-primary-background)] border border-[var(--color-secondary-accent)]/60" />

                  <div className="rounded-2xl border border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)]/40 p-6">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-[var(--color-secondary-accent)]">
                        <Icon className="w-3.5 h-3.5" />
                        {meta.label}
                      </span>
                      <span className="text-[11px] font-mono text-[var(--color-text-secondary)]">
                        {item.period}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-3">
                      {item.organization} · {item.location}
                    </p>
                    <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] mb-4">
                      {item.summary}
                    </p>

                    {item.highlights.length > 0 && (
                      <ul className="space-y-1.5 mb-4">
                        {item.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex gap-2 text-sm text-[var(--color-text-secondary)] leading-relaxed"
                          >
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-secondary-accent)]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {item.stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--color-text-secondary)]/20 text-[var(--color-text-secondary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
