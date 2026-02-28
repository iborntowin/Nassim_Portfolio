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
  Database
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
  color: string
  gradient: string
  images: ModuleImage[]
  features: { icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; title: string; description: string }[]
  stats?: { label: string; value: string; trend?: string }[]
}

const modules: Module[] = [
  {
    id: 'compute',
    title: 'Compute & Orchestration',
    subtitle: 'Nova compute nodes with Heat infrastructure-as-code provisioning',
    icon: Server,
    color: 'from-red-500 to-orange-500',
    gradient: 'bg-gradient-to-br from-red-500/10 to-orange-500/10',
    images: [
      { src: '/images/projects/openstack/1770235637771.jpeg', label: 'Compute Dashboard', description: 'The OpenStack Horizon dashboard providing a unified view of compute resources. Nova manages VM lifecycle — from instance boot and live migration to resource scheduling across hypervisors. Heat orchestration templates enable one-command full-stack provisioning with deterministic, repeatable deployments.' }
    ],
    features: [
      { icon: Server, title: 'Nova Compute', description: 'Full VM lifecycle management with multi-hypervisor support' },
      { icon: Flame, title: 'Heat Orchestration', description: 'Infrastructure as Code with parameterized, reusable templates' },
      { icon: Layers, title: 'Stack Management', description: 'Automated stack creation, update, and teardown workflows' }
    ],
    stats: [
      { label: 'Provisioning', value: 'Automated', trend: 'Heat IaC' },
      { label: 'Validation', value: '100%', trend: 'All tests pass' }
    ]
  },
  {
    id: 'networking',
    title: 'Software-Defined Networking',
    subtitle: 'Neutron SDN with tenant isolation, floating IPs, and security groups',
    icon: Network,
    color: 'from-blue-500 to-cyan-500',
    gradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    images: [
      { src: '/images/projects/openstack/1770235639023.jpeg', label: 'Network Topology', description: 'Neutron provides the complete networking layer — provider networks for external connectivity, tenant networks for isolation, floating IPs for controlled public access, and routers connecting virtual subnets. Security Groups enforce fine-grained traffic rules at the port level, acting as a distributed firewall for every instance.' }
    ],
    features: [
      { icon: Network, title: 'Neutron SDN', description: 'Provider and tenant network separation with VXLAN overlays' },
      { icon: Globe, title: 'Floating IPs', description: 'Elastic public IP assignment for external connectivity' },
      { icon: Lock, title: 'Security Groups', description: 'Distributed firewall with least-privilege port-level rules' }
    ],
    stats: [
      { label: 'Isolation', value: 'Multi-tenant' },
      { label: 'Firewall', value: 'Per-port', trend: 'Security Groups' }
    ]
  },
  {
    id: 'storage',
    title: 'Block & Object Storage',
    subtitle: 'Cinder persistent volumes and Swift distributed object store',
    icon: HardDrive,
    color: 'from-amber-500 to-yellow-500',
    gradient: 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10',
    images: [
      { src: '/images/projects/openstack/1770235639246.jpeg', label: 'Storage Management', description: 'Cinder delivers persistent block storage volumes that survive instance termination — tested with attach, detach, and reattach workflows. Swift provides highly available object storage with multi-replica durability. Together they cover every storage pattern from boot volumes to large-scale unstructured data.' }
    ],
    features: [
      { icon: HardDrive, title: 'Cinder Block Storage', description: 'Persistent volumes with attach/detach lifecycle validation' },
      { icon: Database, title: 'Swift Object Storage', description: 'Distributed, multi-replica object store for durability' },
      { icon: Cloud, title: 'Glance Image Service', description: 'Cloud-ready OS images managed and versioned centrally' }
    ],
    stats: [
      { label: 'Block Storage', value: 'Cinder', trend: 'Persistent' },
      { label: 'Object Storage', value: 'Swift', trend: 'Multi-replica' }
    ]
  },
  {
    id: 'security',
    title: 'Security & Compliance',
    subtitle: 'Enterprise security with WAF, Security Groups, and access controls',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    gradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    images: [
      { src: '/images/projects/openstack/1770235639023.jpeg', label: 'Security Architecture', description: 'A defense-in-depth approach: Security Groups provide stateful port-level firewalling, WAF protects web-facing services at the application layer, Floating IPs control external exposure, and persistent volumes ensure data survives failures. SSH access is validated through security group rules allowing only authorized key-based connections.' }
    ],
    features: [
      { icon: Shield, title: 'Security Groups', description: 'Stateful firewalling with least-privilege ingress/egress rules' },
      { icon: Lock, title: 'WAF Protection', description: 'Web Application Firewall for application-layer defense' },
      { icon: Globe, title: 'Access Control', description: 'Key-based SSH with floating IP gating and audit trails' }
    ]
  },
  {
    id: 'monitoring',
    title: 'Monitoring & Observability',
    subtitle: 'Full-stack monitoring with Prometheus metrics and Grafana dashboards',
    icon: BarChart3,
    color: 'from-purple-500 to-violet-500',
    gradient: 'bg-gradient-to-br from-purple-500/10 to-violet-500/10',
    images: [
      { src: '/images/projects/openstack/1770235639020.jpeg', label: 'Monitoring Stack', description: 'Prometheus scrapes metrics from every OpenStack service — compute utilization, network throughput, storage IOPS, and API latency. Grafana dashboards provide real-time visualization with customizable panels for each infrastructure layer. Alerting rules trigger notifications when resource thresholds are breached, enabling proactive incident response.' }
    ],
    features: [
      { icon: Activity, title: 'Prometheus Metrics', description: 'Per-service metric collection with exporters across all nodes' },
      { icon: BarChart3, title: 'Grafana Dashboards', description: 'Real-time KPI visualization for compute, network, and storage' },
      { icon: Flame, title: 'Alerting', description: 'Threshold-based alerts for proactive incident response' }
    ],
    stats: [
      { label: 'Metrics', value: 'Real-time', trend: 'Prometheus' },
      { label: 'Dashboards', value: 'Custom', trend: 'Grafana' }
    ]
  }
]

export default function OpenStackPremiumShowcase() {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src))
  }

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
          <h2 className="text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-6">
            Infrastructure Deep Dive
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
            Explore every layer of the OpenStack deployment — from Nova compute and Neutron networking 
            to Prometheus monitoring, each component is production-hardened and operationally validated.
          </p>
        </motion.div>

        {/* Modules */}
        <div className="space-y-32">
          {modules.map((module) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Module Header */}
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${module.color} flex items-center justify-center shadow-xl`}>
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-4xl font-bold text-[var(--color-text-primary)] mb-2">
                      {module.title}
                    </h3>
                    <p className="text-lg text-[var(--color-text-secondary)]">
                      {module.subtitle}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                {module.stats && (
                  <div className="flex gap-6 mt-8">
                    {module.stats.map((stat, index) => (
                      <Card key={index} className={`${module.gradient} border-none`}>
                        <CardContent className="p-6">
                          <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                            {stat.label}
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-[var(--color-text-primary)]">
                              {stat.value}
                            </span>
                            {stat.trend && (
                              <span className="text-sm font-medium text-green-500 flex items-center gap-1">
                                <ArrowUpRight className="w-3 h-3" />
                                {stat.trend}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Content Grid */}
              <div className={`grid grid-cols-1 ${module.images.length > 2 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'} gap-8`}>
                {/* Features Card */}
                <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] h-full">
                  <CardContent className="p-8">
                    <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[var(--color-success-energy)]" />
                      Key Capabilities
                    </h4>
                    <div className="space-y-6">
                      {module.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="flex gap-4"
                        >
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${module.color} flex items-center justify-center flex-shrink-0`}>
                            <feature.icon className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h5 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
                              {feature.title}
                            </h5>
                            <p className="text-sm text-[var(--color-text-secondary)]">
                              {feature.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Images with Side-by-Side Descriptions */}
                {module.images.map((image, imgIndex) => (
                  <motion.div
                    key={imgIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: imgIndex * 0.1 }}
                    className="relative group col-span-full"
                  >
                    <Card className="bg-[var(--color-secondary-background)] border-[var(--color-border)] overflow-hidden hover:shadow-2xl transition-all duration-500">
                      <CardContent className="p-0">
                        <div className={`flex flex-col ${imgIndex % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch`}>
                          {/* Image Side */}
                          <div className="relative md:w-3/5 flex-shrink-0 overflow-hidden">
                            {!loadedImages.has(image.src) && (
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
                            )}

                            <div className={`transition-opacity duration-500 ${loadedImages.has(image.src) ? 'opacity-100' : 'opacity-0'}`}>
                              <Image
                                src={image.src}
                                alt={image.label}
                                width={800}
                                height={600}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                onLoad={() => handleImageLoad(image.src)}
                              />
                            </div>

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              <div className="absolute bottom-4 left-4 right-4">
                                <p className="text-white font-medium text-sm">
                                  {image.label}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Description Side */}
                          <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-center">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 w-fit bg-gradient-to-r ${module.gradient} text-white`}>
                              <module.icon className="w-3 h-3" />
                              {module.title}
                            </div>
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
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-32"
        >
          <Card className="bg-gradient-to-r from-red-500/10 to-blue-500/10 border-red-500/20 p-12">
            <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              A Production-Ready Private Cloud
            </h3>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
              From compute orchestration to storage durability, from network isolation to full observability — 
              this OpenStack deployment delivers enterprise-grade infrastructure built with automation and operational rigor.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Nova Compute', 'Neutron SDN', 'Heat IaC', 'Cinder + Swift', 'Prometheus', 'Grafana'].map((tag, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="px-6 py-3 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold"
                >
                  {tag}
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
