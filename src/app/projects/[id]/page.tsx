import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProjectDetailPage from '@/components/pages/project-detail-page'
import CessionAppDetailPage from '@/components/pages/cession-app-detail-page'
import { getProjectById, getAllProjects } from '@/lib/projects-data'

interface ProjectPageProps {
  params: {
    id: string
  }
}

export async function generateStaticParams() {
  const projects = getAllProjects()
  return projects.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProjectById(params.id)
  
  if (!project) {
    return {
      title: 'Project Not Found - Nassim Maaouia',
    }
  }

  const keywords = [
    project.name,
    ...project.techStack.map(tech => tech.name),
    project.category,
    'Nassim Maaouia',
    'Software Engineer',
    'Portfolio',
    'Project',
    ...project.techStack.map(tech => `${tech.name} developer`),
    ...project.techStack.map(tech => `${tech.name} project`),
  ]

  return {
    title: `${project.name} - Nassim Maaouia | ${project.category} Project`,
    description: project.description,
    keywords: keywords.join(', '),
    authors: [{ name: 'Nassim Maaouia' }],
    creator: 'Nassim Maaouia',
    publisher: 'Nassim Maaouia',
    openGraph: {
      title: `${project.name} - Nassim Maaouia`,
      description: project.description,
      type: 'website',
      locale: 'en_US',
      url: `https://nassimmaaouia.dev/projects/${project.id}`,
      siteName: 'Nassim Maaouia Portfolio',
      images: [
        {
          url: `/images/projects/${project.id}/hero.jpg`,
          width: 1200,
          height: 630,
          alt: `${project.name} - ${project.category} Project by Nassim Maaouia`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.name} - Nassim Maaouia`,
      description: project.description,
      creator: '@nassimmaaouia',
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
      canonical: `https://nassimmaaouia.dev/projects/${project.id}`,
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectById(params.id)

  if (!project) {
    notFound()
  }

  // Use custom page for Cession App
  if (params.id === '1') {
    return <CessionAppDetailPage project={project} />
  }

  return <ProjectDetailPage project={project} />
}