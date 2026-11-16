'use client'

import { motion } from 'framer-motion'

interface SkillGroup {
  title: string
  caption: string
  skills: string[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Private cloud & IaaS',
    caption: 'Deployed and operated, not just read about',
    skills: [
      'OpenStack (Nova, Neutron, Cinder, Swift, Glance, Heat)',
      'KVM/QEMU, libvirt',
      'Proxmox',
      'VMware ESXi',
    ],
  },
  {
    title: 'Containers & orchestration',
    caption: 'Multi-node clusters brought up with Kubespray',
    skills: ['Docker', 'Podman', 'Kubernetes', 'Kubespray', 'Calico CNI', 'Helm'],
  },
  {
    title: 'IaC & automation',
    caption: 'Every environment reproducible from the repository',
    skills: ['Ansible', 'Terraform', 'Heat', 'Bash', 'PowerShell', 'GitHub Actions', 'Jenkins'],
  },
  {
    title: 'Networking, security & observability',
    caption: 'Isolation, hardening and alerting that actually fires',
    skills: [
      'OVS, Linux bridges',
      'VLAN, VXLAN, SDN',
      'iptables, nftables',
      'DNS, SSH hardening',
      'PKI/TLS, fail2ban',
      'Prometheus, Grafana, Alertmanager',
    ],
  },
  {
    title: 'Storage & operating systems',
    caption: 'Day-two operations, not just installation',
    skills: ['LVM', 'NFS, iSCSI', 'RAID', 'Swift', 'Ceph (concepts)', 'Ubuntu Server', 'CentOS/RHEL', 'Windows Server', 'systemd'],
  },
  {
    title: 'Backend & databases',
    caption: 'Where the tooling and platforms run',
    skills: ['Python', 'Flask/FastAPI', 'Rust', 'C#', 'TypeScript / Node.js', 'Spring Boot', 'PostgreSQL', 'SQLite', 'Redis', 'MongoDB'],
  },
]

export default function AdvancedTechShowcase() {
  return (
    <section id="skills" className="bg-[var(--color-primary-background)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-secondary-accent)] mb-3">
            Technical skills
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            What I work with
          </h2>
          <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
            Grouped the way infrastructure work actually happens — from the hypervisor up to the
            observability layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillGroups.map((group, index) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="rounded-2xl border border-[var(--color-secondary-background)] bg-[var(--color-secondary-background)]/40 p-6"
            >
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1">
                {group.title}
              </h3>
              <p className="text-xs font-mono text-[var(--color-secondary-accent)] mb-4">
                {group.caption}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-xs px-2 py-1 rounded border border-[var(--color-text-secondary)]/20 text-[var(--color-text-secondary)]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-sm text-[var(--color-text-secondary)]">
          Languages: Arabic (native) · French (fluent) · English (professional). Based in Tunis,
          open to relocating across the EU/EEA with work-permit sponsorship.
        </p>
      </div>
    </section>
  )
}
