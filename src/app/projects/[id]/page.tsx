import { Metadata } from 'next'
import { notFound } from 'next/navigation'
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
    authors: [{ name: 'Nassim Maaoui' }],
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

  // Use optimized wrapper for all projects with performance enhancements
  return <OptimizedProjectDetailWrapper project={project} />
}
