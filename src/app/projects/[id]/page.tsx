import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import OptimizedProjectDetailWrapper from '@/components/pages/optimized-project-detail-wrapper'
import { getProjectById, getAllProjects } from '@/lib/projects-data'

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
      title: 'Project Not Found - Nassim Maaoui',
    }
  }

  const keywords = [
    project.name,
    ...project.techStack.map(tech => tech.name),
    project.category,
    'Nassim Maaoui',
    'Software Engineer',
    'Portfolio',
    'Project',
    ...project.techStack.map(tech => `${tech.name} developer`),
    ...project.techStack.map(tech => `${tech.name} project`),
  ]

  return {
    title: `${project.name} - Nassim Maaoui | ${project.category} Project`,
    description: project.description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Nassim Maaoui' }],
    creator: 'Nassim Maaoui',
    publisher: 'Nassim Maaoui',
    openGraph: {
      title: `${project.name} - Nassim Maaoui`,
      description: project.description,
      type: 'website',
      locale: 'en_US',
      url: `https://nassimmaaoui.dev/projects/${project.id}`,
      siteName: 'Nassim Maaoui Portfolio',
      images: [
        {
          url: `/images/projects/${project.id}/hero.jpg`,
          width: 1200,
          height: 630,
          alt: `${project.name} - ${project.category} Project by Nassim Maaoui`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} - Nassim Maaoui`,
      description: project.description,
      creator: '@nassimmaaoui',
      images: [`/images/projects/${project.id}/hero.jpg`],
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
      canonical: `https://nassimmaaoui.dev/projects/${project.id}`,
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