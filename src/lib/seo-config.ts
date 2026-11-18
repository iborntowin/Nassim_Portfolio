/**
 * Single source of truth for site identity and SEO values.
 *
 * Every metadata route (layout, sitemap, robots, structured data, project
 * pages) imports from here so a domain or title change only happens once.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://nassimmaaoui.vercel.app'
).replace(/\/$/, '')

export const SITE_NAME = 'Nassim Maaoui'
export const SITE_TITLE = 'Nassim Maaoui — Cloud & Infrastructure Engineer'
export const SITE_ROLE = 'Cloud & Infrastructure Engineer'

export const SITE_DESCRIPTION =
  'Nassim Maaoui is a cloud and infrastructure engineer from Tunis, Tunisia — final-year computer engineering student at ESPRIT. OpenStack, Kubernetes, Ansible, Terraform, Prometheus and Linux, with an internal monitoring platform shipped at Huawei Technologies and used across 23 radio sites.'

export const SITE_EMAIL = 'nassimmaaoui@outlook.com'
export const CV_PATH = '/cv/Nassim-Maaoui-CV.pdf'
export const OG_IMAGE = '/images/og-image.jpg'

export const GITHUB_URL = 'https://github.com/iborntowin'
export const LINKEDIN_URL = 'https://www.linkedin.com/in/maaoui-nassim'

/** Profiles that confirm this site belongs to the same person. */
export const PROFILE_LINKS = [GITHUB_URL, LINKEDIN_URL]

/** Spelling and naming variants people actually search for. */
export const PERSON_ALTERNATE_NAMES = [
  'Nassim Maoui',
  'Maaoui Nassim',
  'Nassim Maaoui Portfolio',
  'Nassim Maaoui Cloud Engineer',
]

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const CORE_KEYWORDS = [
  'Nassim Maaoui',
  'Nassim Maoui',
  'Nassim Maaoui portfolio',
  'Nassim Maaoui cloud engineer',
  'Nassim Maaoui infrastructure engineer',
  'Nassim Maaoui ESPRIT',
  'Nassim Maaoui Huawei',
  'Nassim Maaoui CV',
  'cloud engineer Tunisia',
  'cloud engineer Tunis',
  'infrastructure engineer Tunisia',
  'DevOps engineer Tunisia',
  'platform engineer Tunisia',
  'OpenStack engineer',
  'Kubernetes engineer',
  'Ansible',
  'Terraform',
  'Prometheus',
  'Grafana',
  'Linux administration',
  'Infrastructure as Code',
  'private cloud',
  'Site Reliability Engineering',
  'cloud engineering internship 2027',
  'ESPRIT',
  'Tunisia',
]

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).toString()
}

// Project categories for SEO
export const PROJECT_CATEGORIES: Record<string, { description: string; keywords: string[] }> = {
  'Full-Stack': {
    description: 'Full-stack web applications with modern frameworks',
    keywords: ['Full-Stack Development', 'Web Applications', 'React', 'Spring Boot', 'Database Design'],
  },
  'AI/ML': {
    description: 'Artificial Intelligence and Machine Learning projects',
    keywords: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Neural Networks', 'TensorFlow'],
  },
  Embedded: {
    description: 'Embedded systems and IoT development',
    keywords: ['Embedded Systems', 'IoT', 'Microcontrollers', 'Real-time Systems', 'Hardware Programming'],
  },
  Productivity: {
    description: 'Productivity tools and desktop applications',
    keywords: ['Desktop Applications', 'Productivity Tools', 'Automation', 'User Interface Design'],
  },
  'Cloud/Infrastructure': {
    description: 'Cloud platforms, infrastructure automation and observability',
    keywords: ['Cloud Infrastructure', 'OpenStack', 'Kubernetes', 'Ansible', 'Terraform', 'Prometheus', 'DevOps'],
  },
  DevOps: {
    description: 'DevOps tools and infrastructure automation',
    keywords: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Infrastructure as Code'],
  },
}

export function generateProjectKeywords(
  projectName: string,
  category: string,
  techStack: string[]
): string[] {
  const baseKeywords = [
    projectName,
    `${projectName} project`,
    `${projectName} by Nassim Maaoui`,
    'Nassim Maaoui',
    'Software Project',
    'Programming Project',
  ]

  const categoryKeywords = PROJECT_CATEGORIES[category]?.keywords || []
  const techKeywords = techStack.flatMap((tech) => [
    tech,
    `${tech} project`,
    `${tech} development`,
    `${tech} programming`,
  ])

  return [...baseKeywords, ...categoryKeywords, ...techKeywords]
}

export function generateProjectDescription(
  projectName: string,
  category: string,
  description: string
): string {
  const categoryDesc = PROJECT_CATEGORIES[category]?.description || 'Software project'
  return `${projectName} - ${categoryDesc} by Nassim Maaoui. ${description}`
}
