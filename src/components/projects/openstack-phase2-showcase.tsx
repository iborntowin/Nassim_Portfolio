"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import {
  Layers, Bot, Cpu, Activity,
  CheckCircle2, Zap, GitBranch, BarChart3,
  BellRing, Sparkles, Server, Network,
  HardDrive, Smartphone, ArrowRight, Terminal
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

/* ─── Phone Frame ─────────────────────────────────────── */
function PhoneFrame({ src, label, size = 'md' }: {
  src: string
  label: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const [loaded, setLoaded] = useState(false)
  const widths = { sm: 'w-[120px]', md: 'w-[150px]', lg: 'w-[180px]' }

  return (
    <div className={`flex flex-col items-center gap-2 flex-shrink-0 ${widths[size]}`}>
      <div
        className="relative w-full rounded-[20px] border-[3px] border-gray-700 bg-gray-950 overflow-hidden shadow-2xl ring-1 ring-white/10"
        style={{ aspectRatio: '9 / 20' }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-gray-700 rounded-b-lg z-10" />
        {!loaded && (
          <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        )}
        <Image
          src={src}
          alt={label}
          fill
          className={`object-cover object-top transition-opacity duration-400 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          sizes="200px"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <p className="text-[10px] text-center text-[var(--color-text-secondary)] font-medium leading-tight px-1">
        {label}
      </p>
    </div>
  )
}

/* ─── Pipeline Step ───────────────────────────────────── */
function PipelineStep({ step, label, desc, icon: Icon, color, isLast }: {
  step: string
  label: string
  desc: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
  isLast?: boolean
}) {
  return (
    <div className="flex items-start gap-0 flex-1 min-w-0">
      <div className="flex flex-col items-center flex-shrink-0">
        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${color} flex items-center justify-center shadow-lg flex-shrink-0`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        {!isLast && <div className="w-px h-full bg-[var(--color-border)] mt-1" />}
      </div>
      <div className="ml-3 pb-6 min-w-0">
        <span className={`text-[10px] font-bold uppercase tracking-wider bg-gradient-to-r ${color} bg-clip-text text-transparent`}>{step}</span>
        <p className="text-sm font-semibold text-[var(--color-text-primary)] mt-0.5 mb-1">{label}</p>
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}

/* ─── Section Header ──────────────────────────────────── */
function SectionLabel({ label, icon: Icon, color }: {
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  color: string
}) {
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide ${color}`}>
      <Icon className="w-3 h-3" />
      {label}
    </div>
  )
}

/* ─── Main Component ──────────────────────────────────── */
export default function OpenStackPhase2Showcase() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[var(--color-secondary-background)]">
      <div className="max-w-6xl mx-auto space-y-24">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 mb-5">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="text-sm font-bold text-indigo-400 tracking-wide uppercase">Phase 2 — Deep Dive</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-4">
            Kubernetes Automation Framework
          </h2>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            A fully automated pipeline that takes a Telegram message and delivers a
            production-grade Kubernetes cluster — no manual steps, no terminal access required.
          </p>
        </motion.div>

        {/* ══════════════════════════════════════════
            BLOCK 1 — THE AUTOMATION ENGINE
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-8">
            <SectionLabel label="Automation Pipeline" icon={Zap} color="bg-indigo-500/10 border-indigo-500/25 text-indigo-400" />
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-3 mb-1">
              From One Message to a Running Cluster
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl">
              A single Telegram command kicks off a deterministic 5-stage pipeline.
              No SSH, no YAML editing, no manual steps — the entire process runs autonomously.
            </p>
          </div>

          <Card className="bg-[var(--color-primary-background)] border-[var(--color-border)]">
            <CardContent className="p-8">
              <div className="flex flex-col">
                <PipelineStep
                  step="Stage 1"
                  label="Heat Provisions VMs"
                  desc="OpenStack Heat creates master and worker VMs, attaches 40 GB Cinder volumes, assigns floating IPs and security groups from a parameterized template."
                  icon={Server}
                  color="from-red-500 to-orange-500"
                />
                <PipelineStep
                  step="Stage 2"
                  label="SSH Verified on All Nodes"
                  desc="Connectivity is confirmed with exponential-backoff retries — ping, TCP port 22, then key-based auth — before any configuration begins."
                  icon={Terminal}
                  color="from-orange-500 to-amber-500"
                />
                <PipelineStep
                  step="Stage 3"
                  label="Kubespray Inventory Generated"
                  desc="Ansible inventory (hosts.yaml) is built from the floating/private IPs: master, workers, etcd, and k8s_cluster groups with pinned kube_version v1.28.10."
                  icon={GitBranch}
                  color="from-blue-500 to-indigo-500"
                />
                <PipelineStep
                  step="Stage 4"
                  label="Kubespray Deploys K8s"
                  desc="The cluster.yml playbook runs: containerd runtime → PKI certs → etcd → API server → kubelet join → Calico CNI → CoreDNS + NodeLocal DNSCache."
                  icon={Layers}
                  color="from-indigo-500 to-violet-500"
                />
                <PipelineStep
                  step="Stage 5"
                  label="Monitoring Stack Auto-Deployed"
                  desc="Prometheus + Node Exporter DaemonSet + kube-state-metrics + Grafana are deployed into the monitoring namespace with NodePort services on :30090 and :30030."
                  icon={BarChart3}
                  color="from-purple-500 to-fuchsia-500"
                  isLast
                />
              </div>

              {/* Tech pills */}
              <div className="mt-6 pt-6 border-t border-[var(--color-border)] flex flex-wrap gap-2">
                {['Kubespray v1.28.10', 'Ansible', 'Calico CNI', 'containerd', 'etcd', 'CoreDNS', 'Prometheus', 'Grafana', 'Node Exporter', 'Heat IaC'].map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* ══════════════════════════════════════════
            BLOCK 2 — MOBILE CONTROL (Phone frames)
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left — description */}
            <div>
              <SectionLabel label="Mobile Interface" icon={Smartphone} color="bg-sky-500/10 border-sky-500/25 text-sky-400" />
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-3 mb-3">
                CloudCraft Bot — Telegram Control
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                The automation pipeline is orchestrated entirely through a Python Telegram bot.
                Deploy clusters, scale workers, manage instances, and assign floating IPs
                from a phone — no VPN, no terminal.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Zap,        label: 'Deploy Instances',    desc: 'Interactive host & flavor selection then Nova API boot' },
                  { icon: Layers,     label: 'Launch K8s Cluster',  desc: 'Full pipeline trigger — picks master/workers from menu' },
                  { icon: GitBranch,  label: 'Add Workers Live',    desc: 'Scale running clusters without downtime' },
                  { icon: HardDrive,  label: 'Volume & IP Control', desc: 'Cinder volumes and floating IPs managed in-chat' },
                ].map((f, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-sky-500/15 border border-sky-500/25 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-3.5 h-3.5 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">{f.label}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — phone gallery */}
            <div className="flex justify-center">
              <div className="flex gap-4 items-end">
                <PhoneFrame src="/images/projects/openstack/telegram/main-menu.PNG"       label="Main Menu"        size="md" />
                <PhoneFrame src="/images/projects/openstack/telegram/list-instances.PNG"  label="List Instances"   size="lg" />
                <PhoneFrame src="/images/projects/openstack/telegram/delete-instances.PNG" label="Delete Flow"     size="md" />
                <PhoneFrame src="/images/projects/openstack/telegram/volumes.PNG"         label="Volumes"          size="md" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            BLOCK 3 — WORKER SCALING
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left — phone gallery */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="flex gap-4 items-end">
                <PhoneFrame src="/images/projects/openstack/telegram/add-2-chosing_the_host.PNG"   label="Pick Host"         size="md" />
                <PhoneFrame src="/images/projects/openstack/telegram/add-2-chosing_the_host-2.PNG" label="Assign Worker"     size="lg" />
                <PhoneFrame src="/images/projects/openstack/telegram/add_worker-1.PNG"             label="Provisioning…"     size="md" />
                <PhoneFrame src="/images/projects/openstack/telegram/add_worker-final.PNG"         label="Worker Joined ✓"   size="md" />
              </div>
            </div>

            {/* Right — description */}
            <div className="order-1 lg:order-2">
              <SectionLabel label="Live Cluster Scaling" icon={GitBranch} color="bg-violet-500/10 border-violet-500/25 text-violet-400" />
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-3 mb-3">
                Add Workers to Running Clusters
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Existing clusters can be scaled live — no teardown, no downtime.
                The bot guides through host selection, calls Heat to provision
                the new VM, updates the Kubespray inventory, and runs the scale
                playbook. Progress streams to the chat until kubectl confirms
                the node is Ready.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Interactive host assignment per worker node' },
                  { label: 'Heat provisions VM → SSH verified before Ansible runs' },
                  { label: 'Kubespray scale.yml adds node without disruption' },
                  { label: 'kubectl get nodes result sent back to confirm Ready state' },
                ].map((f, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <CheckCircle2 className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-[var(--color-text-secondary)]">{f.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            BLOCK 4 — AI RECOMMENDER
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left — description */}
            <div>
              <SectionLabel label="AI Recommender" icon={Cpu} color="bg-fuchsia-500/10 border-fuchsia-500/25 text-fuchsia-400" />
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-3 mb-3">
                Describe Your App, Get an Architecture
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                Tell the bot what your application does — traffic, stateful requirements, HA needs —
                and the AI designs a concrete OpenStack topology: node counts, flavors,
                networking strategy, and whether Kubernetes is warranted.
                Confirm and the bot deploys it immediately.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Sparkles,   label: 'Natural language input',           desc: 'No YAML, no sizing spreadsheets' },
                  { icon: Cpu,        label: 'AI topology design',               desc: 'Maps requirements to node counts and flavors' },
                  { icon: Zap,        label: 'One-confirm deployment',           desc: 'Approve the plan, bot provisions it' },
                ].map((f, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-fuchsia-500/15 border border-fuchsia-500/25 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-3.5 h-3.5 text-fuchsia-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">{f.label}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — single phone, centered, larger */}
            <div className="flex justify-center">
              <PhoneFrame src="/images/projects/openstack/telegram/ai_infra_recommender.PNG" label="AI Architecture Recommendation" size="lg" />
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════
            BLOCK 5 — GRAFANA ALERT BOT
        ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left — phone gallery */}
            <div className="flex justify-center order-2 lg:order-1">
              <div className="flex gap-5 items-end">
                <PhoneFrame src="/images/projects/openstack/telegram/graphana_bot.PNG" label="Node Health"      size="md" />
                <PhoneFrame src="/images/projects/openstack/telegram/alerts.PNG"       label="Alert Fired"      size="lg" />
                <PhoneFrame src="/images/projects/openstack/telegram/alerts-2.PNG"     label="Multi-Alert"      size="md" />
              </div>
            </div>

            {/* Right — description */}
            <div className="order-1 lg:order-2">
              <SectionLabel label="Monitoring Bot" icon={Activity} color="bg-orange-500/10 border-orange-500/25 text-orange-400" />
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mt-3 mb-3">
                Grafana Alerts to Your Phone
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6">
                A second bot listens to Grafana webhooks and pushes node-health snapshots
                and alerts directly to Telegram. When a node's CPU, memory, or disk
                crosses a threshold, the alert lands on the phone — no dashboard babysitting.
              </p>
              <div className="space-y-3">
                {[
                  { icon: BellRing,  label: 'Grafana webhook → Telegram push',   desc: 'Instant notification on threshold breach' },
                  { icon: Activity,  label: 'Per-node KPIs on demand',            desc: 'CPU, memory, disk, network per node' },
                  { icon: BarChart3, label: 'Alert deduplication',                desc: 'Grouped by severity — no notification spam' },
                ].map((f, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/15 border border-orange-500/25 flex items-center justify-center flex-shrink-0">
                      <f.icon className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)]">{f.label}</p>
                      <p className="text-xs text-[var(--color-text-secondary)]">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Phase 2 CTA bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="bg-gradient-to-br from-indigo-500/8 to-sky-500/8 border border-indigo-500/15">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">
                Full K8s Cluster — From One Telegram Message
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-xl mx-auto">
                Phase 2 turns a complex multi-step DevOps workflow into a chat interface.
                The engineering complexity lives in the automation; the user experience is a button press.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {['Kubespray', 'Ansible', 'Kubernetes v1.28', 'Calico', 'Telegram Bot API', 'Python', 'Heat IaC', 'Prometheus', 'Grafana'].map((t, i) => (
                  <span key={i} className="text-xs px-3 py-1 bg-indigo-500/12 text-indigo-400 border border-indigo-500/20 rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

      </div>
    </section>
  )
}
