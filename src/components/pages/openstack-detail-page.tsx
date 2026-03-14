"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft, Github, GitCommit, Calendar, User,
  Zap, Target, Lightbulb, CheckCircle,
  Shield, Network, Cloud, Server,
  Bot, Cpu, Layers, Activity,
  Database, HardDrive, BarChart3, Flame,
  Terminal, GitBranch, Wifi, Lock
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DetailedProject } from '@/lib/projects-data'
import { ProjectStructuredData } from '@/components/seo/structured-data'
import OpenStackAppJourney from '@/components/projects/openstack-app-journey'
import OpenStackPremiumShowcase from '@/components/projects/openstack-premium-showcase'
import OpenStackPhase2Showcase from '@/components/projects/openstack-phase2-showcase'

interface OpenStackDetailPageProps {
  project: DetailedProject
}

const techGroups = [
  {
    label: 'OpenStack Core',
    color: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-500/10',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/20',
    icon: Server,
    techs: [
      { name: 'Heat', desc: 'Infrastructure as Code — orchestrates the full stack from a single YAML template' },
      { name: 'Nova', desc: 'Compute engine — VM lifecycle, scheduling, and multi-hypervisor management' },
      { name: 'Neutron', desc: 'SDN layer — private networks, routers, floating IPs, and security groups' },
      { name: 'Glance', desc: 'Image service — stores and versions cloud-ready OS images (Ubuntu 22.04)' },
      { name: 'Cinder', desc: 'Block storage — persistent volumes attached at /dev/vdb surviving reboots' },
      { name: 'Swift', desc: 'Object storage — distributed, multi-replica store for unstructured data' },
    ]
  },
  {
    label: 'Kubernetes Layer',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-500/10',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/20',
    icon: Layers,
    techs: [
      { name: 'Kubernetes v1.28', desc: 'Container orchestration — production-grade cluster with full control plane' },
      { name: 'Kubespray', desc: 'Ansible-based K8s installer — automated, production-ready deployment pipeline' },
      { name: 'Calico', desc: 'CNI plugin — pod networking with IPIP tunneling and network policy enforcement' },
      { name: 'Ansible', desc: 'Configuration management — orchestrates Kubespray playbooks across nodes' },
    ]
  },
  {
    label: 'Observability',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/20',
    icon: BarChart3,
    techs: [
      { name: 'Prometheus', desc: 'Metrics collection — scrapes all services with 15-day retention and alerting rules' },
      { name: 'Node Exporter', desc: 'DaemonSet exporter — CPU, memory, disk, and network metrics per node' },
      { name: 'Grafana', desc: 'Visualization — custom dashboards for compute, network, storage, and K8s KPIs' },
    ]
  },
  {
    label: 'Automation & AI',
    color: 'from-sky-500 to-violet-500',
    bgColor: 'bg-sky-500/10',
    textColor: 'text-sky-400',
    borderColor: 'border-sky-500/20',
    icon: Bot,
    techs: [
      { name: 'Telegram Bot API', desc: 'Mobile control plane — full infrastructure lifecycle from a Telegram chat' },
      { name: 'Python', desc: 'Bot framework — state machine handling multi-step conversational workflows' },
      { name: 'AI Recommender', desc: 'Architecture designer — maps app requirements to concrete OpenStack topologies' },
    ]
  }
]

const phaseHighlights = [
  {
    phase: 'Phase 1',
    title: 'OpenStack Infrastructure',
    color: 'from-red-500 to-orange-500',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    text: 'text-red-400',
    points: [
      'Full private cloud: Nova, Neutron, Glance, Cinder, Swift, Heat',
      'Heat IaC deploys network, router, security group, volume, instance & floating IP in one command',
      'Prometheus + Grafana + Node Exporter observability stack'
    ]
  },
  {
    phase: 'Phase 2',
    title: 'K8s Automation + Mobile',
    color: 'from-sky-500 to-indigo-500',
    bg: 'bg-sky-500/10',
    border: 'border-sky-500/20',
    text: 'text-sky-400',
    points: [
      'Telegram bot: deploy instances, manage volumes & IPs from phone',
      'One-message K8s cluster provisioning via Kubespray + Ansible',
      'AI architecture recommender + Grafana health alert bot'
    ]
  }
]

export default function OpenStackDetailPage({ project }: OpenStackDetailPageProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <>
      <ProjectStructuredData project={project} />
      <div className="min-h-screen bg-[var(--color-primary-background)]">

        {/* ─── Hero ─── */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-[var(--color-primary-accent)]/3 to-sky-500/5" />
          <div className="max-w-7xl mx-auto relative">

            {/* Back */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/#technical-portfolio"
                className="inline-flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-primary-accent)] transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left — text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Badges */}
                <div className="flex items-center gap-3 mb-5">
                  <Badge className="bg-gradient-to-r from-red-500 to-sky-500 text-white border-none px-3 py-1">
                    Flagship
                  </Badge>
                  <Badge className="bg-[var(--color-primary-accent)]/10 text-[var(--color-primary-accent)] border-[var(--color-primary-accent)]/20">
                    {project.category}
                  </Badge>
                  <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                    2 Phases
                  </Badge>
                </div>

                <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-text-primary)] mb-6 leading-tight">
                  {project.name}
                </h1>

                {/* Phase snapshot pills */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  {phaseHighlights.map((p, i) => (
                    <div key={i} className={`flex-1 rounded-xl p-4 ${p.bg} border ${p.border}`}>
                      <div className={`text-xs font-bold uppercase tracking-wider ${p.text} mb-1`}>{p.phase}</div>
                      <div className="text-sm font-semibold text-[var(--color-text-primary)]">{p.title}</div>
                    </div>
                  ))}
                </div>

                {/* Commit count */}
                <div className="flex items-center gap-3 mb-7 text-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-4 h-4" />
                    <span>{project.stats.commits} commits</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{project.timeline}</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Solo</span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  <Button
                    className="bg-gradient-to-r from-red-500 to-sky-500 hover:from-red-400 hover:to-sky-400 text-white px-6 py-3 shadow-lg"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Right — image */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-red-500/20">
                  <Image
                    src="/images/projects/openstack/1770235637771.jpeg"
                    alt="OpenStack Horizon Dashboard"
                    width={700}
                    height={460}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-white/80 font-medium bg-black/40 px-3 py-1 rounded-full">
                      OpenStack Horizon — Live Infrastructure Dashboard
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ─── Full Technology Stack ─── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-secondary-background)]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">
                Technology Stack
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                Every technology across both phases — from bare-metal OpenStack services
                to Kubernetes automation, observability, and Telegram-based mobile control.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techGroups.map((group, gi) => {
                const GroupIcon = group.icon
                return (
                  <motion.div
                    key={gi}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: gi * 0.1 }}
                  >
                    <Card className={`${group.bgColor} border ${group.borderColor} h-full`}>
                      <CardContent className="p-6">
                        {/* Group header */}
                        <div className="flex items-center gap-3 mb-5">
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-r ${group.color} flex items-center justify-center`}>
                            <GroupIcon className="w-4 h-4 text-white" />
                          </div>
                          <span className={`text-sm font-bold uppercase tracking-wider ${group.textColor}`}>
                            {group.label}
                          </span>
                        </div>
                        {/* Tech rows */}
                        <div className="space-y-3">
                          {group.techs.map((tech, ti) => (
                            <div key={ti} className="flex gap-3 items-start">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${group.bgColor} ${group.textColor} border ${group.borderColor} mt-0.5 whitespace-nowrap flex-shrink-0`}>
                                {tech.name}
                              </span>
                              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                                {tech.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ─── Full Journey ─── */}
        <OpenStackAppJourney />

        {/* ─── Phase 1 Deep Dive ─── */}
        <OpenStackPremiumShowcase />

        {/* ─── Phase 2 Divider ─── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-background)]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-6 mb-16"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
              <div className="flex items-center gap-3 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500/15 to-violet-500/15 border border-indigo-500/25">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span className="text-base font-bold text-[var(--color-text-primary)] tracking-wide">Phase 2</span>
                <span className="text-sm text-[var(--color-text-secondary)]">—</span>
                <span className="text-sm font-medium text-indigo-400">K8s Automation + Mobile Control</span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-14"
            >
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                Kubernetes Cluster Deployment Automation
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                A fully automated pipeline that provisions VMs, verifies SSH, generates Ansible
                inventory, runs Kubespray, and deploys Prometheus + Grafana — all triggered
                by a single Telegram message, with no manual steps.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Layers,   title: 'K8s Automation Pipeline',  desc: 'Heat → SSH verify → Kubespray → Calico + Grafana — full cluster from one command', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
                { icon: Bot,      title: 'Telegram Control Interface', desc: 'Deploy clusters, scale workers, manage instances and volumes — all from a phone chat', color: 'text-sky-400',    bg: 'bg-sky-500/10',    border: 'border-sky-500/20' },
                { icon: Cpu,      title: 'AI Architecture Recommender', desc: 'Describe your app → AI returns an optimal OpenStack topology → confirm to deploy', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20' },
                { icon: Activity, title: 'Grafana Alert Bot',          desc: 'Node health KPIs and threshold alerts pushed to Telegram in real time via webhooks', color: 'text-orange-400', bg: 'bg-orange-500/10',  border: 'border-orange-500/20' }
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <Card className={`${f.bg} border ${f.border} h-full group hover:scale-[1.02] transition-transform duration-300`}>
                    <CardContent className="p-6 text-center">
                      <f.icon className={`w-10 h-10 ${f.color} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-2">{f.title}</h3>
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{f.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Phase 2 Deep Dive ─── */}
        <OpenStackPhase2Showcase />

        {/* ─── Technical Details ─── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
            >
              {/* Challenges */}
              <motion.div variants={itemVariants}>
                <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] h-full">
                  <CardHeader>
                    <CardTitle className="text-[var(--color-text-primary)] flex items-center gap-2">
                      <Target className="w-5 h-5 text-[var(--color-error-energy)]" />
                      Challenges
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.challenges.map((c, i) => (
                        <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-[var(--color-error-energy)] rounded-full mt-2 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Solutions */}
              <motion.div variants={itemVariants}>
                <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] h-full">
                  <CardHeader>
                    <CardTitle className="text-[var(--color-text-primary)] flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-[var(--color-warning-energy)]" />
                      Solutions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {project.solutions.map((s, i) => (
                        <li key={i} className="text-sm text-[var(--color-text-secondary)] flex items-start gap-3">
                          <span className="w-1.5 h-1.5 bg-[var(--color-warning-energy)] rounded-full mt-2 flex-shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Impact */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-8 text-center">
                Impact & Results
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {project.impact.map((impact, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                  >
                    <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] p-5 text-center hover:border-green-500/30 transition-colors duration-300">
                      <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{impact}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[var(--color-secondary-background)]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                Interested in This Project?
              </h2>
              <p className="text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
                Explore the infrastructure code, the Telegram bot automation, or the K8s deployment pipeline — or get in touch to discuss cloud and DevOps projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-gradient-to-r from-red-500 to-sky-500 hover:from-red-400 hover:to-sky-400 text-white px-8 py-3 shadow-lg"
                  asChild
                >
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View Source Code
                  </a>
                </Button>
                <Button
                  className="bg-transparent hover:bg-[var(--color-border)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-8 py-3"
                  asChild
                >
                  <Link href="/#contact">
                    Get In Touch
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  )
}
