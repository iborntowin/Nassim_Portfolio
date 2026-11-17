import { Activity, Gauge, GitBranch, UserRound, type LucideIcon } from 'lucide-react'

interface Principle {
  title: string
  body: string
  proof: string
  icon: LucideIcon
}

const PRINCIPLES: Principle[] = [
  {
    title: 'Measure, then optimise',
    body: 'I benchmark on the real hardware before claiming an improvement. The nanosatellite board earned +40% transmission performance and −30% power draw because both numbers were tested on the bench, not assumed.',
    proof: 'Tech4IoT · 500 km link budget · 1.2 Mbps',
    icon: Activity,
  },
  {
    title: 'Reproducible by default',
    body: 'If an environment cannot be rebuilt from the repository, it is not finished. Role-based Ansible playbooks, Heat templates and a 9-stage idempotent installer replace machines that only exist in someone’s memory.',
    proof: 'OpenStack · Kubespray · offline installer',
    icon: GitBranch,
  },
  {
    title: 'Make failure visible',
    body: 'Prometheus, Grafana and Alertmanager were running before the cloud was handed over, and 32/32 health checks run on every clean install. A service that fails silently is a service I have not finished.',
    proof: '32/32 checks · ~2 s auto-recovery',
    icon: Gauge,
  },
  {
    title: 'Build for the person on shift',
    body: 'The best interface removes a chore. A 30–60 minute manual comparison became a 4-second diff, a checkout became F-keys and a barcode, and an air-gapped install became one command.',
    proof: '23 sites · keyboard-first POS · offline-first',
    icon: UserRound,
  },
]

export default function HowIWork() {
  return (
    <section className="bg-[var(--color-primary-background)] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-secondary-accent)]">
            How I work
          </p>
          <h2 className="mb-4 text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
            Four habits you can hold me to
          </h2>
          <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
            These are the decisions that repeat across every project on this site — and the evidence
            behind each one.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {PRINCIPLES.map((principle, index) => {
            const Icon = principle.icon
            return (
              <article
                key={principle.title}
                className="group relative overflow-hidden rounded-2xl border border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)]/40 p-6 transition-colors hover:border-[var(--color-secondary-accent)]/40"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1 -top-4 font-mono text-7xl font-bold text-white/[0.04] transition-colors group-hover:text-cyan-400/10"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-[var(--color-secondary-accent)]">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mb-2 text-lg font-semibold text-[var(--color-text-primary)]">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {principle.body}
                </p>

                <p className="mt-5 border-t border-white/[0.07] pt-3 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--color-text-secondary)]/80">
                  {principle.proof}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
