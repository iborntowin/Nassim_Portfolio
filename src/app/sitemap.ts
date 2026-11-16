import { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/projects-data'

const baseUrl = 'https://nassimmaaoui.vercel.app'
// Bumped when the site content actually changes, so crawlers see a real signal.
const LAST_UPDATED = new Date('2026-11-16')

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects()

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/terminal`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...projectUrls,
  ]
}
