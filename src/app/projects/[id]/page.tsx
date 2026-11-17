import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import OptimizedProjectDetailWrapper from '@/components/pages/optimized-project-detail-wrapper'
import { getProjectById, getAllProjects } from '@/lib/projects-data'

const SITE_URL = 'https://nassimmaaoui.vercel.app'

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    return {
      title: 'Project not found',
    }
  }

  const image = project.images[0]?.src ?? '/images/og-image.jpg'

  return {
    title: project.name,
    description: project.description,
    keywords: [
      project.name,
      ...project.techStack.map((tech) => tech.name),
      project.category,
      'Nassim Maaoui',
    ],
    authors: [{ name: 'Nassim Maaoui', url: SITE_URL }],
    creator: 'Nassim Maaoui',
    openGraph: {
      title: `${project.name} — Nassim Maaoui`,
      description: project.description,
      type: 'article',
      locale: 'en_US',
      url: `${SITE_URL}/projects/${project.id}`,
      siteName: 'Nassim Maaoui',
      images: [
        {
          url: image,
          alt: `${project.name} by Nassim Maaoui`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} — Nassim Maaoui`,
      description: project.description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `${SITE_URL}/projects/${project.id}`,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = getProjectById(id)

  if (!project) {
    notFound()
  }

  const projects = getAllProjects()
  const index = projects.findIndex((item) => item.id === project.id)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]

  return (
    <>
      {/* Use optimized wrapper for all projects with performance enhancements */}
      <OptimizedProjectDetailWrapper project={project} />

      <nav
        aria-label="More case studies"
        className="border-t border-[var(--color-secondary-background)] bg-[var(--color-primary-background)]"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <Link
            href={`/projects/${previous.id}`}
            className="group flex items-start gap-3 text-left"
          >
            <ArrowLeft className="mt-1 h-4 w-4 shrink-0 text-[var(--color-text-secondary)] transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                Previous
              </span>
              <span className="mt-1 block max-w-[16rem] text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-secondary-accent)] transition-colors">
                {previous.name}
              </span>
            </span>
          </Link>

          <Link
            href="/#technical-portfolio"
            className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-secondary-accent)]"
          >
            All projects
          </Link>

          <Link
            href={`/projects/${next.id}`}
            className="group flex items-start justify-end gap-3 text-right"
          >
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-secondary)]">
                Next
              </span>
              <span className="mt-1 block max-w-[16rem] text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-secondary-accent)] transition-colors">
                {next.name}
              </span>
            </span>
            <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-[var(--color-text-secondary)] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>
    </>
  )
}
