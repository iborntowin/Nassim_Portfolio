"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'
import {
  Server,
  Network,
  HardDrive,
  Shield,
  BarChart3,
  Cloud,
  CheckCircle2,
  ArrowUpRight,
  Flame,
  Layers,
  Globe,
  Lock,
  Activity,
  Database,
  Terminal,
  Wifi,
  Cpu
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface ModuleImage {
  src: string
  label: string
  description: string
}

interface Module {
  id: string
  title: string
  subtitle: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  accentColor: string   // e.g. 'from-red-500 to-orange-500'
  gradient: string      // e.g. 'from-red-500/10 to-orange-500/10'
  badgeBg: string       // e.g. 'bg-red-500/15 text-red-300 border-red-500/25'
  images: ModuleImage[]
  features: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; title: string; description: string }[]
  stats?: { label: string; value: string; trend?: string }[]
  heatNote?: string     // optional callout for Heat template detail
}

const modules: Module[] = [
  {
    id: 'compute',
    title: 'Compute & Orchestration',
    subtitle: 'Nova VMs provisioned end-to-end by a single Heat YAML template',
    icon: Server,
    accentColor: 'from-red-500 to-orange-500',
    gradient: 'from-red-500/10 to-orange-500/10',
    badgeBg: 'bg-red-500/15 text-red-300 border border-red-500/25',
    heatNote: 'Heat template creates: private_net (172.16.20.0/24) → heat-router with provider external gateway → heat-sg (ICMP, TCP 22, TCP 80) → heat-server (Ubuntu 22.04, m1.medium) → heat-volume attached at /dev/vdb → floating IP from provider pool. One command, zero manual steps.',
    images: [
      {
        src: '/images/projects/openstack/1770235637771.jpeg',
        label: 'OpenStack Horizon Dashboard',
        description: 'The Horizon dashboard gives a unified view of all running compute resources. Nova schedules and manages VM instances across hypervisors — each instance in the dashboard maps directly to a resource declared in the Heat template. The template provisions the full stack deterministically: network → router → security group → instance → volume attachment → floating IP, in the correct dependency order every time.'
      }
    ],
    features: [
      { icon: Server, title: 'Nova Compute', description: 'VM lifecycle management with multi-hypervisor scheduling and live resource tracking' },
      { icon: Flame,  title: 'Heat IaC',     description: 'One YAML template deploys the full stack — network, router, SG, instance, volume, FIP' },
      { icon: Layers, title: 'Stack Lifecycle', description: 'Repeatable create/update/delete workflows with automatic dependency resolution' }
    ],
    stats: [
      { label: 'Provisioning', value: 'Automated', trend: 'Heat IaC' },
      { label: 'Flavor', value: 'm1.medium', trend: 'Ubuntu 22.04' }
    ]
  },
  {
    id: 'networking',
    title: 'Software-Defined Networking',
    subtitle: 'Neutron SDN — private subnet, router, floating IPs, and security groups',
    icon: Network,
    accentColor: 'from-blue-500 to-cyan-500',
    gradient: 'from-blue-500/10 to-cyan-500/10',
    badgeBg: 'bg-blue-500/15 text-blue-300 border border-blue-500/25',
    images: [
      {
        src: '/images/projects/openstack/1770235639023.jpeg',
        label: 'Neutron Network Topology',
        description: 'The Horizon network topology view shows the complete SDN setup deployed by Heat. The private subnet heat-net (172.16.20.0/24, GW 172.16.20.1, DNS 8.8.8.8/8.8.4.4) connects through heat-router to the provider (external) network. The router\'s external gateway provides outbound internet access, while floating IPs pulled from the provider pool give inbound reachability to specific instances. Security Group heat-sg enforces stateful rules at the port level — ICMP for diagnostics, TCP/22 for SSH, TCP/80 for web traffic.'
      }
    ],
    features: [
      { icon: Network, title: 'Neutron SDN',   description: 'Tenant network (172.16.20.0/24) with router and external provider gateway' },
      { icon: Globe,   title: 'Floating IPs',  description: 'Elastic public IP allocation from provider pool for controlled external access' },
      { icon: Lock,    title: 'Security Groups', description: 'Stateful per-port firewall — ICMP, SSH (22), HTTP (80) with least-privilege rules' }
    ],
    stats: [
      { label: 'Subnet', value: '172.16.20.0/24', trend: 'Tenant isolated' },
      { label: 'Firewall', value: 'Per-port SG', trend: 'Stateful' }
    ]
  },
  {
    id: 'storage',
    title: 'Block, Object & Image Storage',
    subtitle: 'Cinder persistent volumes, Swift object store, Glance image service',
    icon: HardDrive,
    accentColor: 'from-amber-500 to-yellow-500',
    gradient: 'from-amber-500/10 to-yellow-500/10',
    badgeBg: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
    images: [
      {
        src: '/images/projects/openstack/1770235639246.jpeg',
        label: 'Storage & Operational Validation',
        description: 'Cinder block storage is provisioned by the Heat template as heat-volume and automatically attached to the instance at /dev/vdb. The attachment is validated: volume attach, detach, and reattach workflows are tested to confirm persistence across instance reboots. Glance manages the base OS image (ubuntu-22.04-modified) that gets injected into every new instance. Swift provides distributed object storage with multi-replica durability for unstructured data — together covering every storage pattern from boot volumes to large-scale backups.'
      }
    ],
    features: [
      { icon: HardDrive, title: 'Cinder Block',  description: 'heat-volume provisioned and attached at /dev/vdb — persists across reboots' },
      { icon: Database,  title: 'Swift Object',  description: 'Distributed, multi-replica object store — validated for durability and availability' },
      { icon: Cloud,     title: 'Glance Images', description: 'Versioned OS image registry — ubuntu-22.04-modified served to all new instances' }
    ],
    stats: [
      { label: 'Block',  value: 'Cinder /dev/vdb', trend: 'Persistent' },
      { label: 'Object', value: 'Swift',            trend: 'Multi-replica' }
    ]
  },
  {
    id: 'security',
    title: 'Security & Hardening',
    subtitle: 'Defense-in-depth with security groups, WAF, and controlled SSH access',
    icon: Shield,
    accentColor: 'from-green-500 to-emerald-500',
    gradient: 'from-green-500/10 to-emerald-500/10',
    badgeBg: 'bg-green-500/15 text-green-300 border border-green-500/25',
    images: [
      {
        src: '/images/projects/openstack/1770235639023.jpeg',
        label: 'Security Architecture',
        description: 'The security model is layered: heat-sg applies stateful firewall rules at the Neutron port level (ICMP for diagnostics, TCP/22 for SSH, TCP/80 for HTTP — all other traffic is dropped by default). External access is gated through floating IPs, so instances remain private until a FIP is explicitly assigned. SSH access is validated with key-based authentication and confirmed through security groups. WAF adds application-layer protection for web-facing services, completing a defense-in-depth posture.'
      }
    ],
    features: [
      { icon: Shield, title: 'Security Groups', description: 'Stateful per-port firewall — heat-sg with ICMP, TCP 22, TCP 80 rules' },
      { icon: Lock,   title: 'WAF Protection',  description: 'Web Application Firewall for application-layer threat mitigation' },
      { icon: Globe,  title: 'Floating IP Gating', description: 'Instances are private by default — FIP assignment is explicit and auditable' }
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Observability',
    subtitle: 'Prometheus + Node Exporter + Grafana — full-stack metrics from every node',
    icon: BarChart3,
    accentColor: 'from-purple-500 to-violet-500',
    gradient: 'from-purple-500/10 to-violet-500/10',
    badgeBg: 'bg-purple-500/15 text-purple-300 border border-purple-500/25',
    images: [
      {
        src: '/images/projects/openstack/1770235639020.jpeg',
        label: 'Prometheus & Grafana Stack',
        description: 'The monitoring stack is deployed across the cluster: Node Exporter runs as a DaemonSet on every node, exporting CPU utilization per core, memory consumption, disk IOPS and usage, and network interface statistics directly to Prometheus. Prometheus scrapes all targets on a 15-second interval, stores time-series data with a 15-day retention window, and fires alerts when resource thresholds are breached. Grafana consumes the Prometheus datasource and renders live dashboards per-node and cluster-aggregate, giving immediate visibility without any manual configuration.'
      }
    ],
    features: [
      { icon: Activity,  title: 'Prometheus',     description: 'Metrics collection with 15s scrape interval, 15-day retention, and alerting rules' },
      { icon: Cpu,       title: 'Node Exporter',  description: 'DaemonSet per node — CPU, memory, disk, network exported to Prometheus' },
      { icon: BarChart3, title: 'Grafana',         description: 'Custom per-node and cluster dashboards auto-provisioned from Prometheus datasource' }
    ],
    stats: [
      { label: 'Scrape Interval', value: '15 s',        trend: 'Prometheus' },
      { label: 'Dashboards',      value: 'Per-node',     trend: 'Grafana' }
    ]
  }
]

function ModuleImageCard({
  image,
  module,
  reverse,
}: {
  image: ModuleImage
  module: Module
  reverse?: boolean
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] overflow-hidden hover:shadow-2xl transition-all duration-500 group col-span-full">
      <CardContent className="p-0">
        <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-stretch`}>
          {/* Image */}
          <div className="relative md:w-3/5 flex-shrink-0 overflow-hidden min-h-[240px]">
            {!loaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 animate-pulse" />
            )}
            <Image
              src={image.src}
              alt={image.label}
              width={900}
              height={640}
              className={`w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute bottom-4 left-4">
                <p className="text-white text-sm font-medium">{image.label}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-center">
            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mb-4 w-fit ${module.badgeBg}`}>
              <module.icon className="w-3 h-3" />
              {module.title}
            </span>
            <h5 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
              {image.label}
            </h5>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {image.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function OpenStackPremiumShowcase() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[var(--color-primary-background)]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 mb-5">
            <Server className="w-4 h-4 text-red-400" />
            <span className="text-sm font-bold text-red-400 tracking-wide uppercase">Phase 1 Deep Dive</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
            Infrastructure Deep Dive
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Every OpenStack service — compute, networking, storage, security, and monitoring —
            deployed, configured, and operationally validated.
          </p>
        </motion.div>

        {/* Modules */}
        <div className="space-y-28">
          {modules.map((module, mi) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative"
            >
              {/* Module header */}
              <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${module.accentColor} flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <module.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-1">
                    {module.title}
                  </h3>
                  <p className="text-[var(--color-text-secondary)]">{module.subtitle}</p>
                </div>
                {/* Stats inline */}
                {module.stats && (
                  <div className="flex gap-4 flex-shrink-0">
                    {module.stats.map((stat, si) => (
                      <div key={si} className={`px-4 py-3 rounded-xl bg-gradient-to-br ${module.gradient} text-center`}>
                        <p className="text-xs text-[var(--color-text-secondary)] mb-0.5">{stat.label}</p>
                        <p className="text-sm font-bold text-[var(--color-text-primary)]">{stat.value}</p>
                        {stat.trend && (
                          <p className="text-xs text-green-400 flex items-center justify-center gap-0.5 mt-0.5">
                            <ArrowUpRight className="w-3 h-3" />
                            {stat.trend}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Heat callout */}
              {module.heatNote && (
                <div className="mb-8 flex gap-3 p-4 rounded-xl bg-amber-500/8 border border-amber-500/20">
                  <Flame className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">Heat Template — What It Deploys</p>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{module.heatNote}</p>
                  </div>
                </div>
              )}

              {/* Content grid: features + image */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Features */}
                <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)]">
                  <CardContent className="p-7">
                    <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-5 flex items-center gap-2 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      Key Capabilities
                    </h4>
                    <div className="space-y-5">
                      {module.features.map((f, fi) => (
                        <motion.div
                          key={fi}
                          initial={{ opacity: 0, x: -16 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.45, delay: fi * 0.1 }}
                          className="flex gap-3"
                        >
                          <div className={`w-9 h-9 rounded-lg bg-gradient-to-r ${module.accentColor} flex items-center justify-center flex-shrink-0`}>
                            <f.icon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-0.5">{f.title}</p>
                            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{f.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Image + description -- spans 2 cols */}
                <div className="lg:col-span-2">
                  {module.images.map((img, ii) => (
                    <motion.div
                      key={ii}
                      initial={{ opacity: 0, scale: 0.97 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: ii * 0.1 }}
                    >
                      <ModuleImageCard
                        image={img}
                        module={module}
                        reverse={ii % 2 !== 0}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Phase 1 CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-28"
        >
          <Card className="bg-gradient-to-br from-red-500/8 to-orange-500/8 border border-red-500/15 p-10 text-center">
            <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3">
              Phase 1 — Production-Ready Private Cloud
            </h3>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8 text-sm leading-relaxed">
              Six OpenStack services, full IaC automation, and a complete observability stack —
              all operationally validated. Phase 2 adds Telegram control, Kubernetes automation, and AI recommendations.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Heat IaC', 'Nova', 'Neutron', 'Glance', 'Cinder', 'Swift', 'Prometheus', 'Node Exporter', 'Grafana'].map((tag, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="px-4 py-1.5 bg-red-500/15 text-red-400 border border-red-500/20 rounded-full text-xs font-semibold"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </Card>
        </motion.div>

      </div>
    </section>
  )
}
