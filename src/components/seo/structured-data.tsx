import { DetailedProject } from '@/lib/projects-data'

const SITE_URL = 'https://nassimmaaoui.vercel.app'

const PERSON_LINKS = [
  'https://github.com/iborntowin',
  'https://www.linkedin.com/in/maaoui-nassim',
]

interface PersonStructuredDataProps {
  className?: string
}

export function PersonStructuredData({ className }: PersonStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Nassim Maaoui',
    jobTitle: 'Cloud & Infrastructure Engineer',
    description:
      'Final-year computer engineering student at ESPRIT specialising in cloud and network architecture. Built a private OpenStack cloud and an internal monitoring platform used at Huawei Technologies.',
    url: SITE_URL,
    email: 'mailto:nassimmaaoui@outlook.com',
    image: `${SITE_URL}/images/og-image.jpg`,
    sameAs: PERSON_LINKS,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tunis',
      addressCountry: 'TN',
    },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'ESPRIT' },
      { '@type': 'CollegeOrUniversity', name: 'Faculté des Sciences de Bizerte' },
    ],
    knowsAbout: [
      'OpenStack',
      'Kubernetes',
      'Ansible',
      'Terraform',
      'Prometheus',
      'Grafana',
      'Linux',
      'Infrastructure as Code',
      'Networking',
      'Python',
      'CI/CD',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Cloud Infrastructure Engineer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Tunisia',
      },
      skills: [
        'OpenStack',
        'Kubernetes',
        'Ansible',
        'Terraform',
        'Infrastructure as Code',
        'Observability',
        'Linux administration',
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      className={className}
    />
  )
}

interface ProjectStructuredDataProps {
  project: DetailedProject
  className?: string
}

export function ProjectStructuredData({ project, className }: ProjectStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    url: `${SITE_URL}/projects/${project.id}`,
    author: {
      '@type': 'Person',
      name: 'Nassim Maaoui',
      url: SITE_URL,
    },
    programmingLanguage: project.techStack.map((tech) => tech.name),
    applicationCategory: project.category,
    operatingSystem: 'Cross-platform',
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    screenshot: project.images.map((img) => ({
      '@type': 'ImageObject',
      url: `${SITE_URL}${img.src}`,
      caption: img.caption || img.alt,
    })),
    creator: {
      '@type': 'Person',
      name: 'Nassim Maaoui',
    },
    keywords: [
      project.name,
      ...project.techStack.map((tech) => tech.name),
      project.category,
      'Nassim Maaoui',
    ].join(', '),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      className={className}
    />
  )
}

export function WebsiteStructuredData({ className }: { className?: string }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Nassim Maaoui',
    description:
      'Portfolio of Nassim Maaoui, cloud and infrastructure engineering student at ESPRIT.',
    url: SITE_URL,
    author: {
      '@type': 'Person',
      name: 'Nassim Maaoui',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      className={className}
    />
  )
}
