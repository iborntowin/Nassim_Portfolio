# Nassim Portfolio

Professional portfolio built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

This repository contains:
- The portfolio web application.
- A curated dataset of project case studies.
- Static assets (images/videos) used by project pages.

## AI Agent Quick Context

If you are an AI agent reading this repository, use these files as the source of truth:
- `src/lib/projects-data.ts`: canonical project inventory, categories, technologies, stats, roles, and timelines.
- `src/components/blocks/project-showcase/technical-portfolio-section.tsx`: homepage project showcase section.
- `src/components/pages/*detail-page.tsx`: detail page rendering components.
- `src/app/projects/[id]/page.tsx`: dynamic route entry for projects.
- `package.json`: actual dependencies and scripts.

## Portfolio App Tech Stack

Core runtime:
- Next.js 15.3.5 (App Router)
- React 18.2
- TypeScript 5

UI and animation:
- Tailwind CSS 4
- Framer Motion 12
- Radix UI primitives
- Lucide React

Forms, validation, and data UI:
- React Hook Form
- Zod
- Recharts
- Embla Carousel

Interactive visuals:
- React Three Fiber
- @react-three/drei
- TSParticles

## Project Inventory (from src/lib/projects-data.ts)

| ID | Project | Category | Timeline | Role | Core Tech |
|---|---|---|---|---|---|
| 8 | OpenStack Infrastructure - Private Cloud Platform | Cloud/Infrastructure | 5 months | Cloud Infrastructure Engineer, DevOps Architect and Bot Developer | OpenStack, Nova, Neutron, Cinder, Swift, Glance, Heat, Kubernetes, Kubespray, Calico, Python, Telegram Bot API, Prometheus, Grafana, Ansible |
| 7 | InventoryERP - Enterprise Inventory and Management | Full-Stack | 5 months | Full-Stack Developer and Desktop App Architect | Tauri, React, Rust, TypeScript, SQLite, Tailwind CSS |
| 1 | NasmyTunes - Spotify to MP3 Converter | Productivity | 3 months | Full-Stack Developer and System Architect | Python, Spotify API, YouTube API, FFmpeg, Flask |
| 2 | Cession App - Session and Contract Management | Full-Stack | 4 months | Full-Stack Developer and System Architect | Spring Boot, Svelte, PostgreSQL, JWT Auth |
| 3 | Board-AI: Electronic Component Detection | AI/ML | 6 months | AI/ML Engineer and Computer Vision Specialist | Python, OpenCV, TensorFlow, TensorRT |
| 4 | NeuroVigil: Driver Fatigue Detection | AI/ML | 5 months | Biomedical Engineer and Signal Processing Specialist | Python, SciPy, EEG Processing, Signal Analysis |
| 5 | Nanosatellite Communication System | Embedded | 8 months | Embedded Systems Engineer and Protocol Designer | C++, STM32, LoRaWAN, Low-Power Protocols |
| 6 | GoldenTouch - AI Event Platform | Full-Stack | 7 months | Full-Stack Developer and AI Integration Specialist | Symfony, JavaFX, Hugging Face API, PDF/Email Integration |

## Category Totals

- Full-Stack: 3
- AI/ML: 2
- Embedded: 1
- Productivity: 1
- Cloud/Infrastructure: 1
- Total projects: 8

## Repository Structure

Important paths:
- `src/app`: Next.js routes, layouts, and metadata routes.
- `src/components`: UI blocks, terminal system, project pages, and shared components.
- `src/lib`: project data, SEO config, utilities, and performance helpers.
- `public/images/projects`: project screenshots and media assets.
- `scripts`: automation and infrastructure-related sample scripts.

Main routes:
- `/` home page.
- `/projects/[id]` project detail pages.
- `/terminal` terminal mode.
- `/enhanced-terminal`, `/privacy`, `/terms`.

## Local Development

Prerequisites:
- Node.js 18+
- npm

Install and run:

```bash
npm install
npm run dev
```

Build and validation:

```bash
npm run lint
npm run type-check
npm run build
```

## Scripts

- `npm run dev`: start development server with Turbopack.
- `npm run build`: create production build.
- `npm run start`: run production server.
- `npm run lint`: run Next.js ESLint checks.
- `npm run type-check`: run TypeScript type checking.
- `npm run analyze`: build with bundle analysis.
- `npm run seo-check`: build and export check.
- `npm run generate-images`: run placeholder image generation script.

## Notes for Automation

- Do not infer project count from old docs. Always read `src/lib/projects-data.ts`.
- Project IDs are string values and map to dynamic routes (`/projects/{id}`).
- Some projects have dedicated page components in `src/components/pages`.
- Image-heavy sections depend on assets under `public/images/projects`.

## Contact

- Portfolio: https://nassimmaaoui.dev
- GitHub: https://github.com/iborntowin
- Email: nassimmaaoui@outlook.com
