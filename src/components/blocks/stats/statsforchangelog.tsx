"use client";

import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatsForChangelog() {
  const stats = [
    {
      title: "2026 · Huawei",
      content: (
        <div className="flex flex-col">
          <h2 className="mt-6 text-xl font-bold text-[var(--color-text-primary)] md:text-3xl">
            HuaweiHelper — radio network monitoring across 23 sites
          </h2>
          <p className="mb-6 mt-4 text-[var(--color-text-secondary)] leading-relaxed">
            Built and deployed an internal Flask/htmx platform during my internship at Huawei
            Technologies. It normalises 19 report types across four input formats, snapshots RAN
            state daily and produces a diff that flags cells down, antennas offline and network
            elements that disappeared — turning a 30–60 minute manual comparison into 4 seconds.
            Installed on an air-gapped Windows Server 2022 host with an idempotent offline installer.
          </p>
          <Image
            src="/images/projects/huaweihelper/dashboard-missing-cells-panel.png"
            height="1200"
            width="2000"
            className="w-full rounded-xl border border-[var(--color-secondary-background)] object-cover object-left-top md:rounded-2xl"
            alt="HuaweiHelper dashboard showing missing cells"
            fetchPriority="high"
          />
        </div>
      ),
    },
    {
      title: "2026 · Hackership",
      content: (
        <div className="flex flex-col">
          <h2 className="mt-6 text-xl font-bold text-[var(--color-text-primary)] md:text-3xl">
            Hackership — Felcloud’s internship platform
          </h2>
          <p className="mb-6 mt-4 text-[var(--color-text-secondary)] leading-relaxed">
            Built the first version of Felcloud’s summer-2026 internship platform: missions,
            leaderboard, XP, badges, activity feed and chat, as a server-rendered Flask + HTMX
            application on PostgreSQL and Redis. Provisioned and administered the OpenStack
            infrastructure it runs on, with Ansible playbooks so environments are reproducible
            from the repository.
          </p>
          <Image
            src="/images/projects/hackership/cover.png"
            height="630"
            width="1200"
            className="w-full rounded-xl border border-[var(--color-secondary-background)] object-cover md:rounded-2xl"
            alt="Hackership internship platform"
          />
        </div>
      ),
    },
    {
      title: "2025 · OpenStack",
      content: (
        <div className="flex flex-col">
          <h2 className="mt-6 text-xl font-bold text-[var(--color-text-primary)] md:text-3xl">
            An OpenStack cloud, from bare metal
          </h2>
          <p className="mb-6 mt-4 text-[var(--color-text-secondary)] leading-relaxed">
            Deployed and validated a complete OpenStack private cloud: Nova compute on KVM/QEMU,
            Neutron with OVS/VXLAN tenant networks, Cinder and Swift storage, Glance and Heat,
            provisioned with role-based Ansible playbooks and monitored with Prometheus, Grafana
            and Alertmanager. A Kubespray Kubernetes cluster runs on top, with a Telegram control
            plane for instance and cluster management.
          </p>
          <Image
            src="/images/projects/openstack/1770235637771.jpeg"
            height="1200"
            width="2000"
            className="w-full rounded-xl border border-[var(--color-secondary-background)] object-cover object-left-top md:rounded-2xl"
            alt="OpenStack Horizon dashboard"
            fetchPriority="high"
          />
        </div>
      ),
    },
    {
      title: "2025 · Ansible Studio",
      content: (
        <div className="flex flex-col">
          <h2 className="mt-6 text-xl font-bold text-[var(--color-text-primary)] md:text-3xl">
            Ansible Studio — a desktop IDE for infrastructure
          </h2>
          <p className="mb-6 mt-4 text-[var(--color-text-secondary)] leading-relaxed">
            A native desktop IDE for Ansible infrastructure. It parses playbooks, INI/YAML
            inventories and roles into a three-tier architecture map behind a CodeMirror 6 editor,
            then executes playbooks against the live inventory and streams ansible-playbook output
            over WebSockets, persisting every run to SQLite with check, diff and verbose modes.
          </p>
          <Image
            src="/images/projects/ansible-studio/cover.png"
            height="630"
            width="1200"
            className="w-full rounded-xl border border-[var(--color-secondary-background)] object-cover md:rounded-2xl"
            alt="Ansible Studio"
          />
        </div>
      ),
    },
  ];

  return (
    <section className="bg-[var(--color-primary-background)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-[var(--color-secondary-accent)] mb-3">
            Timeline
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            What I have shipped, year by year
          </h2>
          <p className="text-base leading-relaxed text-[var(--color-text-secondary)]">
            A short history of the work that mattered most — each entry links to a full write-up.
          </p>
        </div>
        <StatsForChangelogDesktop stats={stats} />
        <StatsForChangelogMobile stats={stats} />
      </div>
    </section>
  );
}

type Stats = { title: string; content: React.ReactNode };

export const StatsForChangelogMobile = ({ stats }: { stats: Stats[] }) => {
  return (
    <div className="mx-auto block w-full max-w-6xl lg:hidden">
      {stats.map((stat, index) => (
        <div className="mb-12 flex flex-col gap-4" key={`stat-tab-mobile-${index}`}>
          <div className="flex items-center">
            <span className="mr-4 flex-shrink-0 font-mono text-sm text-[var(--color-text-primary)]">
              {stat.title}
            </span>
            <div className="flex w-full items-center gap-2">
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-text-secondary)]/40" />
              <div className="h-px w-full bg-[var(--color-text-secondary)]/20" />
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-text-secondary)]/40" />
            </div>
          </div>
          {stat.content}
        </div>
      ))}
    </div>
  );
};

export const StatsForChangelogDesktop = ({ stats }: { stats: Stats[] }) => {
  const [active, setActive] = useState(stats[0]);
  const direction = useMotionValue(0);

  const isActive = (stat: (typeof stats)[number]) => stat.title === active.title;

  const handleSetActive = (stat: (typeof stats)[number]) => {
    const currentIndex = stats.findIndex((s) => s.title === active.title);
    const newIndex = stats.findIndex((s) => s.title === stat.title);
    direction.set(newIndex > currentIndex ? 1 : -1);
    setActive(stat);
  };

  return (
    <div className="mx-auto hidden w-full max-w-6xl lg:block">
      <div className="grid w-full grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <button
            key={`stat-tab-${index}`}
            onClick={() => handleSetActive(stat)}
            className={cn(
              "flex items-center rounded-xl border p-4 text-left transition-colors",
              isActive(stat)
                ? "border-[var(--color-secondary-accent)]/50 bg-[var(--color-secondary-background)]/60"
                : "border-transparent hover:bg-[var(--color-secondary-background)]/30"
            )}
          >
            <span className="mr-3 flex-shrink-0 font-mono text-sm text-[var(--color-text-primary)]">
              {stat.title}
            </span>
            <div className="flex w-full items-center gap-2">
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-text-secondary)]/40" />
              <div className="h-px w-full bg-[var(--color-text-secondary)]/20" />
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-[var(--color-text-secondary)]/40" />
            </div>
          </button>
        ))}
      </div>
      <div className="relative mt-8 w-full overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={String(active.title)}
            initial={{ opacity: 0, x: 40 }}
            exit={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeOut", duration: 0.35 }}
            className="w-full"
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
