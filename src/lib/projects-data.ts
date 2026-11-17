import { isProjectPublic } from './visibility'

export interface TechStackItem {
  name: string
  color: string
}

export interface ProjectStats {
  stars: number
  forks: number
  commits: number
}

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

export interface WorkflowStep {
  title: string
  description: string
  icon: string
  details: string[]
}

export interface DetailedProject {
  id: string
  name: string
  description: string
  longDescription: string
  category: 'Full-Stack' | 'AI/ML' | 'Embedded' | 'Productivity' | 'DevOps' | 'Cloud/Infrastructure'
  techStack: TechStackItem[]
  stats: ProjectStats
  /** Public repository. Omit when the code is internal or private. */
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
  images: ProjectImage[]
  workflow: WorkflowStep[]
  challenges: string[]
  solutions: string[]
  impact: string[]
  keyFeatures: string[]
  architecture?: string
  timeline: string
  teamSize?: string
  role: string
}

const projectsData: DetailedProject[] = [
  {
    id: '9',
    name: 'HuaweiHelper — RAN Health Monitoring Platform',
    description:
      'Internal Flask/htmx platform that automates radio-network health monitoring across 23 sites, replacing a 30–60 minute manual comparison with a 4-second diff.',
    longDescription:
      'Built during my internship at Huawei Technologies and now used by the network operations team to check radio access network health every day. HuaweiHelper ingests raw MML console dumps, native U2000/M2000 alarm exports, inventory CSVs and nationwide 2G/3G/4G/5G exports, normalises them into a daily per-site snapshot, and produces a git-style diff that flags operationally significant changes — cells down, antennas offline, network elements disappearing. It ships with an idempotent offline installer for Windows Server 2022 so it can run on isolated operator networks with no internet access and no manual steps.',
    category: 'Cloud/Infrastructure',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'Flask', color: 'text-slate-300 bg-slate-300/10' },
      { name: 'htmx', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'Jinja2', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'PowerShell', color: 'text-sky-400 bg-sky-400/10' },
      { name: 'Windows Server 2022', color: 'text-cyan-400 bg-cyan-400/10' },
      { name: 'pywin32', color: 'text-emerald-400 bg-emerald-400/10' }
    ],
    stats: { stars: 0, forks: 0, commits: 0 },
    featured: true,
    images: [
      {
        src: '/images/projects/huaweihelper/full-services-annotated.png',
        alt: 'HuaweiHelper service overview',
        caption: 'Service overview — every monitoring component running on the Windows Server host'
      },
      {
        src: '/images/projects/huaweihelper/dashboard-missing-cells-panel.png',
        alt: 'Missing cells dashboard',
        caption: 'Dashboard surfacing cells that disappeared between two daily snapshots'
      },
      {
        src: '/images/projects/huaweihelper/diff-result.png',
        alt: 'Diff result',
        caption: 'Git-style diff of two snapshots, matched by network element and identity key'
      },
      {
        src: '/images/projects/huaweihelper/architecture-diagram.png',
        alt: 'Architecture diagram',
        caption: 'Detect → extract → compare → notify pipeline'
      },
      {
        src: '/images/projects/huaweihelper/ftp-settings.png',
        alt: 'Data source configuration',
        caption: 'Configurable data sources, so new report formats are added without code changes'
      }
    ],
    workflow: [
      {
        title: 'Parsing heterogeneous report formats',
        description: 'Turned four unrelated export formats into one comparable data model',
        icon: '📥',
        details: [
          'Fixed-width MML console output parsed field by field',
          '50,000-row U2000/M2000 alarm exports',
          'Inventory CSVs and nationwide 2G/3G/4G/5G exports',
          '19 report types mapped onto a single normalised schema'
        ]
      },
      {
        title: 'Snapshot + diff engine',
        description: 'Compares each day against the previous baseline instead of eyeballing spreadsheets',
        icon: '🧮',
        details: [
          'Rows matched by network element and identity key rather than position',
          'Duplicate identity keys surfaced as warnings instead of being silently collapsed',
          'Diff rendered as readable added / removed / changed sections',
          'A 30–60 minute manual check becomes a 4-second result'
        ]
      },
      {
        title: 'Offline deployment',
        description: 'One idempotent installer that works on an isolated operator network',
        icon: '📦',
        details: [
          'Vendored Python runtime and wheels — no internet, no pip at install time',
          '9-stage idempotent installer, safe to re-run',
          'pywin32 service registration, firewall rules and configuration generated automatically',
          'Installed and validated on a clean Windows Server 2022 machine'
        ]
      },
      {
        title: 'Operational reliability',
        description: 'Built so the service recovers without anyone logging in',
        icon: '🛡️',
        details: [
          'Service Control Manager supervision — a killed process is back in ~2 seconds',
          'Survives a full VM reboot unattended',
          '32/32 health checks passing on the validation machine',
          'Logs and health endpoints for the operations team'
        ]
      }
    ],
    challenges: [
      'Heterogeneous input formats with no shared schema or stable ordering',
      'Running on an air-gapped Windows Server with no package manager',
      'Distinguishing a genuine network outage from a missing report file',
      'Making the tool trustworthy enough that operators stop double-checking it by hand'
    ],
    solutions: [
      'Built a normalisation layer with per-format extractors feeding one snapshot model',
      'Vendored every dependency and wrote an idempotent installer with health validation',
      'Surfaced parse problems and duplicate keys as explicit warnings in the UI',
      'Kept a full run history so any diff can be traced back to its source files'
    ],
    impact: [
      'Used by the network operations team across 23 radio sites',
      'Manual comparison reduced from 30–60 minutes to 4 seconds',
      '19 report types and 4 input formats handled by one pipeline',
      '32/32 health checks passing; service recovers from failure in ~2 seconds'
    ],
    keyFeatures: [
      'Automated daily RAN health snapshots per site',
      'Git-style diff of network state between two days',
      'Duplicate identity keys flagged as warnings',
      'Configurable data sources and report types',
      'Offline, idempotent Windows Server installer',
      'SCM-supervised service with automatic respawn',
      'Health-check suite for post-deployment validation'
    ],
    architecture:
      'Flask + htmx application on Windows Server 2022. Extractors per input format feed a normalisation layer, which writes a daily snapshot; a diff engine matches rows by network element and identity key and renders the result through Jinja templates. Deployment is a vendored, idempotent PowerShell installer that registers the app as an SCM service.',
    timeline: 'Jun – Aug 2026',
    teamSize: 'Solo project (Huawei internship)',
    role: 'Developer — design, implementation and deployment'
  },
  {
    id: '8',
    name: 'OpenStack Private Cloud — Bare-Metal IaaS',
    description:
      'A complete OpenStack private cloud deployed from bare metal — compute, SDN, block and object storage, orchestration and monitoring — plus a Telegram control plane and Kubernetes provisioning on top.',
    longDescription:
      'A two-phase private cloud platform. Phase 1 is the infrastructure itself: Nova compute on KVM/QEMU, Neutron with OVS/VXLAN tenant networks, floating IPs and security groups, Cinder block storage, Swift object storage, Glance images and Heat orchestration, all provisioned with role-based Ansible playbooks and monitored with Prometheus, Grafana and Alertmanager. Phase 2 adds a Telegram control plane: deploy instances, provision a full Kubespray Kubernetes cluster, or add a worker to a running cluster from a phone, stream Grafana alerts into chat, and get an architecture recommendation from a short description of an application.',
    category: 'Cloud/Infrastructure',
    techStack: [
      { name: 'OpenStack', color: 'text-red-400 bg-red-400/10' },
      { name: 'Nova', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'Neutron', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'Cinder', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'Swift', color: 'text-cyan-400 bg-cyan-400/10' },
      { name: 'Glance', color: 'text-pink-400 bg-pink-400/10' },
      { name: 'Heat', color: 'text-amber-400 bg-amber-400/10' },
      { name: 'Kubernetes', color: 'text-blue-500 bg-blue-500/10' },
      { name: 'Kubespray', color: 'text-indigo-400 bg-indigo-400/10' },
      { name: 'Calico', color: 'text-purple-400 bg-purple-400/10' },
      { name: 'Ansible', color: 'text-red-500 bg-red-500/10' },
      { name: 'Prometheus', color: 'text-orange-500 bg-orange-500/10' },
      { name: 'Grafana', color: 'text-green-400 bg-green-400/10' }
    ],
    stats: { stars: 0, forks: 0, commits: 0 },
    featured: true,
    images: [
      { src: '/images/projects/openstack/1770235637771.jpeg', alt: 'OpenStack Horizon dashboard', caption: 'Horizon dashboard with compute and network overview' },
      { src: '/images/projects/openstack/1770235639020.jpeg', alt: 'Infrastructure monitoring', caption: 'Prometheus and Grafana monitoring stack' },
      { src: '/images/projects/openstack/1770235639023.jpeg', alt: 'Network topology', caption: 'Neutron topology with floating IPs and security groups' },
      { src: '/images/projects/openstack/1770235639246.jpeg', alt: 'Operational validation', caption: 'Instance boot, volume attach and SSH access validated' },
      { src: '/images/projects/openstack/telegram/main-menu.PNG', alt: 'Telegram bot main menu', caption: 'Control menu for the whole cloud, from a phone' },
      { src: '/images/projects/openstack/telegram/list-instances.PNG', alt: 'Instance listing', caption: 'Live instance listing directly in Telegram' },
      { src: '/images/projects/openstack/telegram/add_worker-final.PNG', alt: 'Worker node added', caption: 'Worker node added to a running Kubernetes cluster' },
      { src: '/images/projects/openstack/telegram/graphana_bot.PNG', alt: 'Grafana alert bot', caption: 'Node health alerts streamed to Telegram' }
    ],
    workflow: [
      {
        title: 'Topology and network design',
        description: 'Designed the controller/compute split and the overlay network before installing anything',
        icon: '🏗️',
        details: [
          'Controller/compute node split with a separate storage role',
          'Flat/VLAN provider networks plus a VXLAN tenant overlay',
          'NAT for external access, floating IP pools per tenant',
          'Security groups as the primary isolation boundary'
        ]
      },
      {
        title: 'Core services',
        description: 'Deployed and validated every OpenStack service in the stack',
        icon: '⚙️',
        details: [
          'Nova with KVM/QEMU compute',
          'Neutron with OVS, tenant networks and floating IPs',
          'Cinder block storage and Swift object storage',
          'Glance image registry and Heat orchestration'
        ]
      },
      {
        title: 'Automation and hardening',
        description: 'Made the whole environment reproducible from the repository',
        icon: '📜',
        details: [
          'Role-based Ansible playbooks for every node type',
          'Heat templates for repeatable stack creation',
          'iptables, SSH hardening, fail2ban and systemd units on every node',
          'Kubespray + Calico to bring up a multi-node Kubernetes cluster'
        ]
      },
      {
        title: 'Observability',
        description: 'Built the monitoring stack before it was needed',
        icon: '📊',
        details: [
          'Prometheus with node exporters per host',
          'Grafana dashboards for compute, network and storage',
          'Alertmanager rules for resource thresholds',
          'Python alerting bot for incidents outside the dashboard'
        ]
      },
      {
        title: 'Telegram control plane',
        description: 'Moved daily operations off the terminal',
        icon: '📱',
        details: [
          'Conversation state machine with per-user deployment locks',
          'Instance lifecycle and volume management from chat',
          'Kubespray runs triggered from the bot with live log streaming',
          'Grafana webhook routing for targeted alert delivery'
        ]
      }
    ],
    challenges: [
      'Bringing up a multi-service OpenStack deployment with tight inter-service dependencies',
      'Designing tenant isolation and floating-IP access that still works with NAT',
      'Running long Kubespray jobs from an asynchronous chat interface without race conditions',
      'Keeping monitoring useful without drowning operators in alerts'
    ],
    solutions: [
      'Ordered service bring-up with Heat so dependencies are explicit and repeatable',
      'Separated provider and tenant networks with security groups and per-tenant floating IPs',
      'Per-user locks plus streamed run logs so a second deployment cannot start mid-run',
      'Alert rules grouped by severity with webhook routing into the right chat'
    ],
    impact: [
      'Full OpenStack cloud deployed and validated from bare metal',
      'Every node reproducible from Ansible playbooks instead of manual setup',
      'Kubernetes cluster and worker scaling driven from a phone',
      'Observability stack covering compute, network and storage'
    ],
    keyFeatures: [
      'OpenStack: Nova, Neutron, Cinder, Swift, Glance and Heat',
      'Software-defined networking with OVS/VXLAN tenant overlays',
      'Block and object storage with floating IP access',
      'Prometheus, Grafana and Alertmanager observability',
      'Telegram bot for instance and volume management',
      'Kubespray Kubernetes provisioning from chat',
      'Grafana alert streaming to Telegram'
    ],
    architecture:
      'Multi-node OpenStack (Nova, Neutron, Cinder, Swift, Glance, Heat) with Prometheus and Grafana, provisioned by role-based Ansible. A Python Telegram bot drives Heat and Ansible for instance lifecycle and Kubespray cluster provisioning, and receives Grafana webhook alerts.',
    timeline: 'Q1 2025 – 2026',
    teamSize: 'Solo project',
    role: 'Cloud infrastructure engineer and automation developer'
  },
  {
    id: '11',
    name: 'Ansible Studio — Desktop IDE for Ansible',
    description:
      'A native desktop IDE for Ansible infrastructure: it parses playbooks, inventories and roles into an interactive architecture map and runs playbooks against the live inventory with streamed output.',
    longDescription:
      'Ansible Studio treats infrastructure code as a navigable structure instead of a folder of YAML. It parses playbooks, INI/YAML inventories and roles into a three-tier architecture map, so you can see which plays touch which hosts and which roles they pull in. Editing happens in a CodeMirror 6 editor with a custom Ansible YAML highlighter, and the map stays in sync with the code. Playbooks run against the real inventory with ansible-playbook output streamed over WebSockets; every run is persisted to SQLite so check, diff and verbose runs can be compared afterwards.',
    category: 'DevOps',
    techStack: [
      { name: 'Tauri 2', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'Rust', color: 'text-red-400 bg-red-400/10' },
      { name: 'SvelteKit', color: 'text-orange-500 bg-orange-500/10' },
      { name: 'FastAPI', color: 'text-teal-400 bg-teal-400/10' },
      { name: 'WebSockets', color: 'text-purple-400 bg-purple-400/10' },
      { name: 'SQLite', color: 'text-green-400 bg-green-400/10' },
      { name: 'CodeMirror 6', color: 'text-blue-400 bg-blue-400/10' }
    ],
    stats: { stars: 0, forks: 0, commits: 0 },
    featured: true,
    images: [
      {
        src: '/images/projects/ansible-studio/workbench.png',
        alt: 'Ansible Studio editor showing the Kubespray playbook, the project tree and the live host inventory',
        caption: 'The editor with a five-playbook project open — inventory groups and all six target hosts stay pinned in the sidebar'
      },
      {
        src: '/images/projects/ansible-studio/new-project.png',
        alt: 'New Ansible Project modal listing project templates',
        caption: 'New project — scaffold a real structure from a template, or start from scratch'
      },
      {
        src: '/images/projects/ansible-studio/docs.png',
        alt: 'Ansible Studio Docs and Vision page listing core features and roadmap ideas',
        caption: 'Docs & Vision — the feature map and roadmap that ship inside the app'
      },
      {
        src: '/images/projects/ansible-studio/cover.png',
        alt: 'Ansible Studio',
        caption: 'Desktop IDE for Ansible playbooks, inventories and roles'
      }
    ],
    workflow: [
      {
        title: 'Parsing infrastructure as a graph',
        description: 'Read playbooks, inventories and roles into a three-tier map',
        icon: '🗺️',
        details: [
          'Playbooks and plays parsed into their task structure',
          'INI and YAML inventories resolved to hosts and groups',
          'Roles linked to the plays that include them',
          'Three-tier interactive map instead of a file tree'
        ]
      },
      {
        title: 'Editor with language support',
        description: 'Ansible YAML deserves its own highlighting, not generic YAML',
        icon: '⌨️',
        details: [
          'CodeMirror 6 editor',
          'Custom Ansible YAML syntax highlighter',
          'Two-way sync between the map and the code',
          'Safe edits that preserve file structure'
        ]
      },
      {
        title: 'Live execution',
        description: 'Run playbooks against the real inventory from the IDE',
        icon: '▶️',
        details: [
          'ansible-playbook executed against the selected inventory',
          'Output streamed over WebSockets as it happens',
          'Check, diff and verbose modes exposed in the run panel',
          'Every run persisted to SQLite for later comparison'
        ]
      }
    ],
    challenges: [
      'Keeping a structured map and raw YAML files in sync without corrupting either',
      'Streaming long-running playbook output without blocking the UI',
      'Effective YAML highlighting where keywords depend on Ansible semantics, not just syntax',
      'Shipping a native desktop app rather than another web tab'
    ],
    solutions: [
      'Round-trip parsing that models structure while preserving the original file layout',
      'WebSocket channel from the Rust backend to the UI with incremental rendering',
      'Custom CodeMirror tokenizer built around Ansible keywords and module names',
      'Tauri 2 for a small native binary with a local SQLite store'
    ],
    impact: [
      'Infrastructure maps generated from existing repositories, not hand-drawn',
      'Playbook runs and their output kept locally and searchable',
      'Check and diff modes make dry runs the default habit'
    ],
    keyFeatures: [
      'Three-tier interactive architecture map',
      'INI/YAML inventory parsing',
      'Role and play relationship graph',
      'CodeMirror 6 editor with Ansible YAML highlighting',
      'Live ansible-playbook execution with streamed output',
      'Check, diff and verbose run modes',
      'Run history persisted in SQLite',
      'Native desktop app via Tauri 2'
    ],
    architecture:
      'Tauri 2 shell with a SvelteKit frontend. A Rust/FastAPI backend parses playbooks, inventories and roles into a graph, executes ansible-playbook against the live inventory and streams output over WebSockets. Runs are stored in SQLite.',
    timeline: '2025 – present',
    teamSize: 'Solo project',
    role: 'Desktop application and backend developer'
  },
  {
    id: '10',
    name: 'Hackership — Internship Platform for Felcloud',
    description:
      'The first version of Felcloud’s summer-2026 internship platform: missions, leaderboard, XP, badges, activity feed and chat — built on Flask and HTMX, and deployed on OpenStack infrastructure I administered.',
    longDescription:
      'Hackership is Felcloud’s internship programme platform. I built the first version end to end: missions with completion tracking, a leaderboard driven by earned XP, badges, an activity feed and chat, all as a server-rendered Flask + HTMX application on PostgreSQL and Redis, containerised with Docker. I also provisioned and ran the OpenStack infrastructure it lives on — virtual machines, bastion hosts, tenant networks, floating IPs and security groups — with Ansible playbooks so environments are rebuilt from the repository rather than by hand.',
    category: 'Full-Stack',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'Flask', color: 'text-slate-300 bg-slate-300/10' },
      { name: 'HTMX', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'PostgreSQL', color: 'text-indigo-400 bg-indigo-400/10' },
      { name: 'Redis', color: 'text-red-400 bg-red-400/10' },
      { name: 'Docker', color: 'text-sky-400 bg-sky-400/10' },
      { name: 'OpenStack', color: 'text-red-300 bg-red-300/10' },
      { name: 'Ansible', color: 'text-rose-400 bg-rose-400/10' }
    ],
    stats: { stars: 0, forks: 0, commits: 0 },
    liveUrl: 'https://hackership.felcloud.io',
    images: [
      {
        src: '/images/projects/hackership/cover.png',
        alt: 'Hackership',
        caption: 'Felcloud summer-2026 internship platform'
      }
    ],
    workflow: [
      {
        title: 'Product and data model',
        description: 'Shaped missions, XP and badges into a schema that could grow',
        icon: '🧩',
        details: [
          'Missions with completion state and validation',
          'XP ledger driving the leaderboard',
          'Badge rules evaluated from awarded XP',
          'Activity feed as an append-only event stream'
        ]
      },
      {
        title: 'Server-rendered application',
        description: 'Flask + HTMX instead of a SPA for fast, simple pages',
        icon: '🧱',
        details: [
          'Jinja templates with HTMX partial updates',
          'PostgreSQL for durable data, Redis for sessions and hot counters',
          'Chat and feed updates without full page reloads',
          'Docker Compose for local and server parity'
        ]
      },
      {
        title: 'Infrastructure',
        description: 'Ran the platform on OpenStack I administered myself',
        icon: '☁️',
        details: [
          'Instances, bastion host and tenant networking',
          'Floating IPs, security groups and key-based SSH through the bastion',
          'Ansible playbooks for provisioning and configuration',
          'Every environment reproducible from the repository'
        ]
      }
    ],
    challenges: [
      'Leaderboard correctness when XP arrives from concurrent requests',
      'Keeping the UI responsive with server-rendered partials',
      'Running a public app on self-managed OpenStack with no managed platform underneath',
      'Bootstrapping the first version fast enough to launch the programme'
    ],
    solutions: [
      'XP as an append-only ledger with aggregates recomputed from facts, not counters',
      'HTMX partials with Redis-backed caching for the hot lists',
      'Bastion-based access plus Ansible roles for repeatable provisioning',
      'Kept the scope to the features the programme needed on day one'
    ],
    impact: [
      'First version of Felcloud’s summer-2026 internship platform',
      'Missions, leaderboard, XP, badges, feed and chat in one application',
      'Deployed on OpenStack infrastructure provisioned with Ansible'
    ],
    keyFeatures: [
      'Missions with completion tracking',
      'XP-driven leaderboard',
      'Badges and achievements',
      'Activity feed',
      'Chat',
      'PostgreSQL + Redis backend',
      'Docker-based deployment',
      'OpenStack infrastructure provisioned with Ansible'
    ],
    architecture:
      'Flask application with Jinja templates and HTMX partial updates, PostgreSQL for durable data and Redis for sessions and caching, containerised with Docker and deployed on OpenStack VMs accessed through a bastion host, provisioned by Ansible.',
    timeline: '2026',
    role: 'Full-stack developer and infrastructure administrator'
  },
  {
    id: '7',
    name: 'InventoryERP — Desktop Inventory & Management',
    description:
      'A native desktop ERP built with Tauri, React and Rust: inventory, Quick Sell POS, invoicing, batch tracking and role-based access in a ~15 MB offline executable.',
    longDescription:
      'InventoryERP is an enterprise resource planning application for small and medium businesses, built as a native desktop app with Tauri (Rust backend) and React + TypeScript. It covers inventory with SKU/barcode and stock alerts, a keyboard-driven Quick Sell POS, purchases with partial receiving, invoice generation, customer and supplier management, batch/lot tracking with expiry monitoring, and financial dashboards. Security is handled with Argon2id password hashing, hierarchical role-based access control, session management and audit logging. Everything runs offline on SQLite, with English and French localisation and light/dark/system themes.',
    category: 'Full-Stack',
    techStack: [
      { name: 'Tauri 2', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'React', color: 'text-cyan-400 bg-cyan-400/10' },
      { name: 'Rust', color: 'text-red-400 bg-red-400/10' },
      { name: 'TypeScript', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'SQLite', color: 'text-green-400 bg-green-400/10' },
      { name: 'Tailwind CSS', color: 'text-sky-400 bg-sky-400/10' }
    ],
    stats: { stars: 0, forks: 0, commits: 0 },
    featured: true,
    images: [
      { src: '/images/projects/erp/dashboard.png', alt: 'Dashboard', caption: 'KPI widgets, charts, top-selling products and low-stock alerts' },
      { src: '/images/projects/erp/login.png', alt: 'Login', caption: 'Argon2id password hashing with session management' },
      { src: '/images/projects/erp/quick_sell.png', alt: 'Quick Sell', caption: 'Keyboard-driven POS with category shortcuts' },
      { src: '/images/projects/erp/factures.png', alt: 'Invoices', caption: 'Invoice management with payment tracking' },
      { src: '/images/projects/erp/users.png', alt: 'Users', caption: 'User management with RBAC, account locking and audit logs' },
      { src: '/images/projects/erp/database_maintainense.png', alt: 'Database maintenance', caption: 'Backup, optimisation and integrity checks' },
      { src: '/images/projects/erp/archived_data.png', alt: 'Archived data', caption: 'Archived records kept for compliance' },
      { src: '/images/projects/erp/theme.png', alt: 'Theme', caption: 'Light, dark and system themes' },
      { src: '/images/projects/erp/languge.png', alt: 'Language', caption: 'Full English and French localisation' }
    ],
    workflow: [
      {
        title: 'Stack selection',
        description: 'Chose Tauri + Rust so the app could run offline on modest hardware',
        icon: '🏗️',
        details: [
          'Tauri 2 for a small native binary (~15 MB)',
          'Rust backend for memory safety and fast queries',
          'SQLite for a zero-configuration local database',
          'React + TypeScript frontend with a modular structure'
        ]
      },
      {
        title: 'Security and access control',
        description: 'The data is a business’s inventory and invoices, so access had to be real',
        icon: '🔒',
        details: [
          'Argon2id password hashing',
          'Hierarchical roles: admin, manager, cashier',
          'Session timeouts and account locking',
          'Audit logging on sensitive operations'
        ]
      },
      {
        title: 'Core modules',
        description: 'Inventory, sales, purchases, invoicing and batch tracking',
        icon: '⚙️',
        details: [
          'Products with SKU/barcode, categories and stock alerts',
          'Quick Sell POS with F-key and number shortcuts',
          'Purchase orders with partial receiving',
          'Batch/lot tracking with manufacturing and expiry dates'
        ]
      },
      {
        title: 'UI and localisation',
        description: 'Used daily by cashiers, so speed and clarity came first',
        icon: '🎨',
        details: [
          'Keyboard-first flows for the POS',
          'Light, dark and system themes',
          'Complete English and French translation',
          'Backup and database maintenance tools in-app'
        ]
      }
    ],
    challenges: [
      'Bridging React and Rust through the Tauri IPC layer without adding latency',
      'Keeping SQLite consistent under concurrent access',
      'Making a keyboard-driven POS feel faster than a paper process',
      'Modelling permissions across ten modules without a per-module mess'
    ],
    solutions: [
      'Typed Tauri commands with serde serialisation',
      'Mutex-guarded SQLite connections in WAL mode',
      'F-key and category shortcuts with sub-100 ms feedback',
      'A single hierarchical permission model enforced on both frontend and backend'
    ],
    impact: [
      'One ~15 MB executable replaces a cloud ERP subscription',
      'Works fully offline — suitable for shops with unreliable connectivity',
      'Millisecond responses from the Rust + SQLite backend',
      'Audit trail covering stock, invoices and user actions'
    ],
    keyFeatures: [
      'Native desktop app (Windows, macOS, Linux)',
      'Rust backend with SQLite',
      'Keyboard-driven Quick Sell POS',
      'Inventory, sales, purchases and invoicing',
      'Batch/lot tracking with expiry monitoring',
      'Role-based access control',
      'Audit logging',
      'Light, dark and system themes',
      'English and French localisation',
      'In-app backup and maintenance'
    ],
    architecture:
      'Tauri 2 desktop shell with a React + TypeScript frontend, a Rust backend over SQLite (WAL mode) and typed IPC commands with TanStack Query caching on the frontend.',
    timeline: '2025',
    teamSize: 'Solo project',
    role: 'Full-stack developer and desktop app architect'
  },
  {
    id: '2',
    name: 'Cession App — Wage-Garnishment Management',
    description:
      'A desktop-first cession (wage garnishment) platform: client files, repayment schedules, payment tracking, inventory, bank reports and a phone handover — Spring Boot behind a SvelteKit interface.',
    longDescription:
      'Cession App runs wage-garnishment (cession sur salaire) files from the first instalment to the last. It covers the client directory, cession records with repayment schedules and projected payoff dates, payment tracking with collection analytics, inventory and selling for the same business, expenses, and the monthly nominal report the banks receive. The backend is Spring Boot with JWT authentication, role-based access and an H2 database that ships as a single file; the frontend is a SvelteKit interface that also builds as a Tauri desktop app. A sync vault exports the database as JSON snapshots and hands them to a phone over local Wi-Fi, so field work does not depend on connectivity.',
    category: 'Full-Stack',
    techStack: [
      { name: 'Spring Boot', color: 'text-green-400 bg-green-400/10' },
      { name: 'SvelteKit', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'Tauri', color: 'text-amber-400 bg-amber-400/10' },
      { name: 'H2 / SQL', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'JWT Auth', color: 'text-purple-400 bg-purple-400/10' }
    ],
    stats: { stars: 0, forks: 0, commits: 0 },
    githubUrl: 'https://github.com/iborntowin/cession-frontend',
    featured: true,
    images: [
      {
        src: '/images/projects/1/shots/dashboard.png',
        alt: 'Cession App dashboard with active cessions, monthly revenue, portfolio health and a six-month cession chart',
        caption: 'Dashboard — active cessions, portfolio health and cessions versus payments over six months'
      },
      {
        src: '/images/projects/1/shots/dashboard-payments-analysis.png',
        alt: 'The same dashboard chart switched to payments analysis mode',
        caption: 'The monthly chart in its payments-analysis mode, isolating what was actually collected'
      },
      {
        src: '/images/projects/1/shots/cessions.png',
        alt: 'Cession list with status filters, client names, monthly payment and repayment progress',
        caption: 'Cessions — filtered by status, with monthly payment and progress on every file'
      },
      {
        src: '/images/projects/1/shots/cession-detail.png',
        alt: 'Cession detail with repayment progress, remaining balance and projected payoff date',
        caption: 'Cession detail — amount repaid, months remaining and the projected payoff date'
      },
      {
        src: '/images/projects/1/shots/clients.png',
        alt: 'Client directory with search, cession counts and workplace',
        caption: 'Clients — every profile with its cession count, workplace and bank agency'
      },
      {
        src: '/images/projects/1/shots/client-new.png',
        alt: 'New client form with CIN, worker number, workplace and job fields',
        caption: 'Client creation with 8-digit CIN and 10-digit worker-number validation'
      },
      {
        src: '/images/projects/1/shots/payments.png',
        alt: 'Payment table with total collected, payment count and row-level filters',
        caption: 'Payments — the full ledger, 3,761 records and 515 144 TND collected'
      },
      {
        src: '/images/projects/1/shots/payments-analytics.png',
        alt: 'Payment intelligence analytics with collection trends, monthly performance and business health',
        caption: 'Payment intelligence — collected versus outstanding, month by month'
      },
      {
        src: '/images/projects/1/shots/inventory.png',
        alt: 'Inventory grid with stock state, selling price, purchase price and margin per product',
        caption: 'Inventory — stock state, cost, selling price and margin on every product'
      },
      {
        src: '/images/projects/1/shots/selling.png',
        alt: 'Selling view listing sellable products with quick-sell and invoice actions',
        caption: 'Selling — the sellable subset of inventory, with quick-sell and invoicing'
      },
      {
        src: '/images/projects/1/shots/reports.png',
        alt: 'Monthly nominal list of salary cessions with totals per client and bank agency',
        caption: 'Nominal report — the monthly salary-cession list sent to the banks, exportable to CSV'
      },
      {
        src: '/images/projects/1/shots/mobile.png',
        alt: 'Mobile sync vault with export files, scheduled export and QR handoff to a phone',
        caption: 'Mobile sync vault — JSON snapshots handed to the phone over local Wi-Fi, no internet needed'
      },
      {
        src: '/images/projects/1/shots/settings.png',
        alt: 'Settings page with language, appearance, mobile sync vault and database backup options',
        caption: 'Settings — language, appearance, mobile sync and full database backups'
      },
      {
        src: '/images/projects/1/shots/login.png',
        alt: 'Login screen with an API and database health panel',
        caption: 'Login — the app checks API and database health before letting anyone in'
      }
    ],
    workflow: [
      {
        title: 'Requirements and data model',
        description: 'Modelled clients, cessions and payments before writing UI',
        icon: '📋',
        details: [
          'Defined the cession lifecycle and its states',
          'Modelled payments against cession records',
          'Set the permission model per role',
          'Agreed on what the audit trail had to capture'
        ]
      },
      {
        title: 'Backend',
        description: 'Spring Boot REST API with JWT and role checks',
        icon: '🧱',
        details: [
          'REST endpoints with validation',
          'JWT authentication and refresh handling',
          'Dynamic role-based access control',
          'Audit entries written on mutation'
        ]
      },
      {
        title: 'Frontend',
        description: 'Svelte UI designed mobile-first',
        icon: '🎨',
        details: [
          'Component-based Svelte application',
          'Responsive layouts for phone and desktop',
          'Client and cession workflows with inline validation',
          'Reporting and analytics views'
        ]
      }
    ],
    challenges: [
      'A permission model that changes per role without duplicating logic',
      'Keeping contract history auditable across every mutation',
      'Usable data entry on a phone',
      'Coordinating a Spring Boot API and a Svelte frontend as a team'
    ],
    solutions: [
      'Hierarchical roles with granular permissions checked server-side',
      'Audit records written in one place, at the service layer',
      'Mobile-first layouts with large touch targets for data entry',
      'A shared API contract agreed up front'
    ],
    impact: [
      'Contract tracking replaced spreadsheet workflows',
      'Every change attributable to a user in the audit trail',
      'Works on mobile for field use'
    ],
    keyFeatures: [
      'JWT authentication with role-based access',
      'Client directory and cession files',
      'Repayment schedules with payoff forecasting',
      'Payment ledger and collection analytics',
      'Inventory and selling surface',
      'Monthly nominal bank report (CSV and print)',
      'Mobile sync vault with QR handoff over local Wi-Fi',
      'Tauri desktop build alongside the web UI'
    ],
    architecture:
      'Spring Boot REST API on an embedded H2 database with JWT authentication, consumed by a SvelteKit frontend that is also packaged as a Tauri desktop application. A sync service exports JSON snapshots for the mobile client.',
    timeline: '2025 – 2026',
    teamSize: 'Team project',
    role: 'Full-stack developer'
  },
  {
    id: '3',
    name: 'Board-AI — PCB Component Detection',
    description:
      'A CNN trained on PCB component images to identify parts in real time, with an inference pipeline aimed at electronics inspection.',
    longDescription:
      'Board-AI applies computer vision to electronics inspection: given an image of a PCB, it detects and classifies components. The work covered dataset preparation and augmentation, CNN training and evaluation, and turning the trained model into a pipeline that can run on a live image feed rather than a notebook. It started as an academic machine-learning project and was kept as an exercise in the unglamorous parts of ML — data quality, labelling and evaluation.',
    category: 'AI/ML',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'OpenCV', color: 'text-green-400 bg-green-400/10' },
      { name: 'TensorFlow', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'Jupyter', color: 'text-orange-300 bg-orange-300/10' }
    ],
    stats: { stars: 0, forks: 0, commits: 0 },
    githubUrl: 'https://github.com/iborntowin/Board-Ai-detection',
    images: [
      { src: '/images/projects/2/hero.jpg', alt: 'Board-AI detection interface', caption: 'Component detection on a PCB image' },
      { src: '/images/projects/2/training.jpg', alt: 'Training process', caption: 'CNN training run' },
      { src: '/images/projects/2/results.jpg', alt: 'Results', caption: 'Detection results' },
      { src: '/images/projects/2/architecture.jpg', alt: 'Pipeline architecture', caption: 'Inference pipeline' }
    ],
    workflow: [
      {
        title: 'Dataset preparation',
        description: 'The model is only as good as its labels',
        icon: '📊',
        details: [
          'Collected and cleaned PCB component images',
          'Data augmentation for lighting and rotation variation',
          'Annotation pipeline for component labelling',
          'Class balance checked before training'
        ]
      },
      {
        title: 'Model and training',
        description: 'CNN designed for component detection, with transfer learning',
        icon: '🧠',
        details: [
          'Custom CNN with transfer learning from a pre-trained backbone',
          'Cross-validation for evaluation',
          'Regularisation to limit overfitting on a small dataset',
          'Accuracy and per-class error reviewed, not just aggregate accuracy'
        ]
      },
      {
        title: 'Inference pipeline',
        description: 'Made the model usable outside the notebook',
        icon: '⚡',
        details: [
          'OpenCV preprocessing for live images',
          'Model export for faster inference',
          'Simple detection interface for testing',
          'Benchmarked inference time on real images'
        ]
      }
    ],
    challenges: [
      'Component variety and visual similarity between classes',
      'Limited labelled data for some component types',
      'Varying lighting and image quality in captures',
      'Getting inference fast enough to be interactive'
    ],
    solutions: [
      'Augmentation and transfer learning instead of training from scratch',
      'Per-class error analysis to find the weak categories',
      'Preprocessing and normalisation before inference',
      'Model export and benchmarking rather than assuming nominal speeds'
    ],
    impact: [
      'Working component detection pipeline from raw images',
      'Documented accuracy and per-class weaknesses',
      'Reproducible training notebook in the repository'
    ],
    keyFeatures: [
      'CNN-based component detection',
      'Transfer learning',
      'Augmented training set',
      'OpenCV preprocessing',
      'Interactive detection interface',
      'Reproducible notebook'
    ],
    timeline: '2024',
    teamSize: 'Academic project',
    role: 'Machine learning engineer'
  },
  {
    id: '1',
    name: 'NasmyTunes — Playlist Converter',
    description:
      'Convert Spotify playlists into MP3 files, with a command-line interface for batch work and a web UI for everything else.',
    longDescription:
      'NasmyTunes takes a Spotify playlist, resolves each track, fetches the audio and converts it to MP3 with FFmpeg. It ships two interfaces: a CLI for batch conversion on your own machine and a Flask web app with progress tracking so you can queue a playlist and watch it complete. Most of the engineering was in robustness — API rate limits, unreliable sources, partial failures — because a converter is only useful if it finishes.',
    category: 'Productivity',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'Spotify API', color: 'text-green-400 bg-green-400/10' },
      { name: 'FFmpeg', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'Flask', color: 'text-slate-300 bg-slate-300/10' }
    ],
    stats: { stars: 2, forks: 0, commits: 0 },
    githubUrl: 'https://github.com/iborntowin/NasmyTunes',
    liveUrl: 'https://nasmytunes.onrender.com',
    featured: true,
    images: [
      { src: '/images/projects/6/Modern Web UI.png', alt: 'NasmyTunes interface', caption: 'Web UI with real-time conversion progress' },
      { src: '/images/projects/6/Playlist Analysis.png', alt: 'Playlist analysis', caption: 'Playlist analysis before conversion' },
      { src: '/images/projects/6/CLI Interface.png', alt: 'CLI interface', caption: 'Command-line interface for batch processing' }
    ],
    workflow: [
      {
        title: 'Playlist resolution',
        description: 'Spotify API integration and track matching',
        icon: '🔗',
        details: [
          'Spotify Web API for playlist and track metadata',
          'Track matching when metadata is incomplete',
          'Rate limiting with backoff',
          'Fallbacks for tracks that cannot be resolved'
        ]
      },
      {
        title: 'Conversion engine',
        description: 'Fetch, convert and package audio',
        icon: '⚙️',
        details: [
          'Audio retrieval with retry on failure',
          'FFmpeg conversion to 192 kbps MP3',
          'Per-track error isolation so one failure does not abort a playlist',
          'ZIP packaging of finished playlists'
        ]
      },
      {
        title: 'Two interfaces',
        description: 'CLI for batch work, web UI for everything else',
        icon: '💻',
        details: [
          'Interactive CLI menu with progress output',
          'Flask web app with live progress updates',
          'Cross-platform launcher scripts',
          'Graceful degradation on constrained hosts'
        ]
      }
    ],
    challenges: [
      'Third-party rate limits and bot detection breaking long runs',
      'Maintaining audio quality while converting at scale',
      'Partial failures in the middle of a 100-track playlist',
      'Cloud hosts with limited CPU for audio processing'
    ],
    solutions: [
      'Retries with backoff and multiple retrieval paths per track',
      'FFmpeg settings tuned for 192 kbps output',
      'Per-track error isolation with a summary at the end',
      'Progress reporting that survives slow conversion'
    ],
    impact: [
      'Batch playlist conversion with a usable progress model',
      'Deployed web version on Render',
      'Works on Windows, macOS and Linux'
    ],
    keyFeatures: [
      'Spotify playlist analysis',
      'MP3 conversion at 192 kbps',
      'Real-time progress tracking',
      'Batch processing',
      'Web UI and CLI',
      'ZIP download of finished playlists',
      'Per-track error isolation'
    ],
    timeline: '2024',
    teamSize: 'Solo project',
    role: 'Developer'
  }
]

export function getAllProjects(): DetailedProject[] {
  return projectsData.filter(project => isProjectPublic(project.id))
}

/** Every project, including the ones hidden from the public site. */
export function getAllProjectsIncludingHidden(): DetailedProject[] {
  return projectsData
}

/** Uses only public projects, so hidden ids behave like missing ones. */
export function getProjectById(id: string): DetailedProject | undefined {
  const project = projectsData.find(item => item.id === id)
  return project && isProjectPublic(project.id) ? project : undefined
}

/** Look up a project even when it is hidden from the public site. */
export function getProjectByIdIncludingHidden(id: string): DetailedProject | undefined {
  return projectsData.find(project => project.id === id)
}

export function getProjectsByCategory(category: string): DetailedProject[] {
  const projects = getAllProjects()
  if (category === 'All') return projects
  return projects.filter(project => project.category === category)
}

export function getFeaturedProjects(): DetailedProject[] {
  return getAllProjects().filter(project => project.featured)
}
