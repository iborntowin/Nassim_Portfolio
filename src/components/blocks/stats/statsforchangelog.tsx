"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";

export function StatsForChangelog() {
  const stats = [
    {
      title: "Q1 2025",
      content: (
        <div className="flex flex-col">
          <h2 className="mt-8 text-xl font-bold text-neutral-600 md:text-3xl dark:text-neutral-300">
            OpenStack Private Cloud — Production Ready
          </h2>
          <p className="mb-8 mt-4 text-neutral-600 dark:text-neutral-300">
            Deployed and validated a complete OpenStack private cloud: Nova compute,
            Neutron SDN, Cinder/Swift storage, Heat IaC, and Prometheus + Grafana
            observability stack. Full operational validation across all layers.
          </p>
          <Image
            src="/images/projects/openstack/1770235637771.jpeg"
            height="2000"
            width="2000"
            className="w-full rounded-xl object-cover object-left-top md:rounded-3xl"
            alt="OpenStack Horizon dashboard"
            fetchPriority="high"
          />
        </div>
      ),
    },
    {
      title: "Q4 2024",
      content: (
        <div className="flex flex-col">
          <h2 className="mt-8 text-xl font-bold text-neutral-600 md:text-3xl dark:text-neutral-300">
            InventoryERP — Tauri + Rust Desktop App
          </h2>
          <p className="mb-8 mt-4 text-neutral-600 dark:text-neutral-300">
            Shipped a 15MB native ERP desktop application built with Tauri 2.x and Rust.
            Features Quick Sell POS, RBAC with Argon2id, batch tracking, and
            full i18n — delivering millisecond response times offline.
          </p>
          <Image
            src="/images/projects/erp/dashboard.png"
            height="2000"
            width="2000"
            className="w-full rounded-xl object-cover object-left-top md:rounded-3xl"
            alt="InventoryERP Dashboard"
            fetchPriority="high"
          />
        </div>
      ),
    },
    {
      title: "Q3 2024",
      content: (
        <div className="flex flex-col">
          <h2 className="mt-8 text-xl font-bold text-neutral-600 md:text-3xl dark:text-neutral-300">
            Cession App — Session & Contract Platform
          </h2>
          <p className="mb-8 mt-4 text-neutral-600 dark:text-neutral-300">
            Launched a full-stack contract management platform with Spring Boot + Svelte.
            JWT authentication, role-based access, real-time WebSocket updates,
            and GDPR-compliant audit trails. Reduced contract processing time by 60%.
          </p>
          <Image
            src="/images/projects/1/dashboard.png"
            height="2000"
            width="2000"
            className="w-full rounded-xl object-cover object-left-top md:rounded-3xl"
            alt="Cession App Dashboard"
            fetchPriority="high"
          />
        </div>
      ),
    },
    {
      title: "Q2 2024",
      content: (
        <div className="flex flex-col">
          <h2 className="mt-8 text-xl font-bold text-neutral-600 md:text-3xl dark:text-neutral-300">
            Board-AI — 92% Accuracy PCB Detection
          </h2>
          <p className="mb-8 mt-4 text-neutral-600 dark:text-neutral-300">
            Trained a CNN on 50,000+ PCB images achieving 92% component detection accuracy
            with 120ms inference via TensorRT optimization. Reduced manual inspection time by 75%
            in electronics manufacturing QC pipelines.
          </p>
          <Image
            src="/images/projects/1/cession.png"
            height="2000"
            width="2000"
            className="w-full rounded-xl object-cover object-left-top md:rounded-3xl"
            alt="Board-AI detection system"
            fetchPriority="high"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <StatsForChangelogDesktop stats={stats} />
      <StatsForChangelogMobile stats={stats} />
    </div>
  );
}

type Stats = { title: string; content: React.ReactNode };

export const StatsForChangelogMobile = ({ stats }: { stats: Stats[] }) => {
  return (
    <div className="mx-auto block w-full max-w-7xl px-4 md:px-8 lg:hidden">
      {stats.map((stat, index) => (
        <div
          className="mb-10 flex flex-col gap-4"
          key={`stat-tab-mobile-${index}`}
        >
          <div
            className={cn(
              "flex items-center rounded-2xl hover:bg-neutral-100 dark:hover:bg-neutral-800"
            )}
          >
            <span className="mr-4 flex-shrink-0 font-medium text-neutral-700 dark:text-neutral-100">
              {stat.title}
            </span>
            <div className="flex w-full items-center gap-2">
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="h-px w-full bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
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

  const isActive = (stat: (typeof stats)[number]) =>
    stat.title === active.title;

  const handleSetActive = (stat: (typeof stats)[number]) => {
    const currentIndex = stats.findIndex((s) => s.title === active.title);
    const newIndex = stats.findIndex((s) => s.title === stat.title);
    direction.set(newIndex > currentIndex ? 1 : -1);
    setActive(stat);
  };

  return (
    <div className="mx-auto hidden w-full max-w-7xl px-4 md:px-8 lg:block">
      <div className="grid w-full grid-cols-4 gap-10">
        {stats.map((stat, index) => (
          <button
            key={`stat-tab-${index}`}
            onClick={() => handleSetActive(stat)}
            className={cn(
              "flex items-center rounded-2xl p-4 hover:bg-neutral-100 dark:hover:bg-neutral-800",

              isActive(stat) ? "bg-neutral-100 dark:bg-neutral-800" : ""
            )}
          >
            <span className="mr-4 flex-shrink-0 font-medium text-neutral-700 dark:text-neutral-100">
              {stat.title}
            </span>
            <div className="flex w-full items-center gap-2">
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="h-px w-full bg-neutral-300 dark:bg-neutral-700"></div>
              <div className="h-1 w-1 flex-shrink-0 rounded-full bg-neutral-300 dark:bg-neutral-700"></div>
            </div>
          </button>
        ))}
      </div>
      <div className="relative mt-4 w-full overflow-hidden px-10 [mask-image:linear-gradient(to_right,transparent,white_2%,white_98%,transparent)]">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={String(active.title)}
            initial={{ x: 1000, opacity: 0 }}
            exit={{ x: -1000, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ease: "easeOut" }}
            className="w-full"
          >
            {active.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
