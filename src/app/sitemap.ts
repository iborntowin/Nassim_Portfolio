import { MetadataRoute } from 'next'
import { getAllProjects } from '@/lib/projects-data'
import { CV_PATH, SITE_URL } from '@/lib/seo-config'

// Bumped when the site content actually changes, so crawlers see a real signal.
const LAST_UPDATED = new Date('2026-11-18')

export default function sitemap(): MetadataRoute.Sitemap {
  const projects = getAllProjects()

  const projectUrls = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified: LAST_UPDATED,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/terminal`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/enhanced-terminal`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}${CV_PATH}`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: LAST_UPDATED,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...projectUrls,
  ]
}
