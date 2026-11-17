import { DetailedProject } from '@/lib/projects-data'
import { FAQS } from '@/lib/faq-data'

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
    '@id': `${SITE_URL}/#person`,
    name: 'Nassim Maaoui',
    alternateName: ['Nassim Maoui', 'Nassim Maaoui Portfolio'],
    jobTitle: 'Cloud & Infrastructure Engineer',
    nationality: { '@type': 'Country', name: 'Tunisia' },
    description:
      'Final-year computer engineering student at ESPRIT specialising in cloud and network architecture. Built a private OpenStack cloud and an internal monitoring platform used at Huawei Technologies.',
    url: SITE_URL,
    email: 'mailto:nassimmaaoui@outlook.com',
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    sameAs: PERSON_LINKS,
    knowsLanguage: ['en', 'fr', 'ar'],
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
    seeks: {
      '@type': 'Demand',
      name: 'Six-month end-of-studies internship in cloud, infrastructure, platform or SRE engineering',
      availabilityStarts: '2026-12-01',
      availabilityEnds: '2027-05-31',
      areaServed: ['TN', 'EU', 'EEA', 'Remote'],
    },
    mainEntityOfPage: { '@type': 'ProfilePage', '@id': `${SITE_URL}/` },
  }

  const profilePage = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/`,
    url: SITE_URL,
    name: 'Nassim Maaoui — Cloud & Infrastructure Engineer',
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
    mainEntity: { '@type': 'Person', '@id': `${SITE_URL}/#person` },
    about: {
      '@type': 'Thing',
      name: 'Cloud infrastructure, platform and site reliability engineering',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        className={className}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
      />
    </>
  )
}

interface ProjectStructuredDataProps {
  project: DetailedProject
  className?: string
}

export function ProjectStructuredData({ project, className }: ProjectStructuredDataProps) {
  const projectUrl = `${SITE_URL}/projects/${project.id}`
  const imageUrls = project.images
    .slice(0, 6)
    .map((img) => encodeURI(`${SITE_URL}${img.src}`))

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${projectUrl}#software`,
    name: project.name,
    description: project.description,
    url: projectUrl,
    inLanguage: 'en',
    mainEntityOfPage: { '@type': 'WebPage', '@id': projectUrl },
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Nassim Maaoui',
      url: SITE_URL,
      sameAs: PERSON_LINKS,
    },
    programmingLanguage: project.techStack.map((tech) => tech.name),
    applicationCategory: project.category,
    applicationSubCategory: project.role,
    operatingSystem: 'Cross-platform',
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(project.liveUrl ? { installUrl: project.liveUrl } : {}),
    image: imageUrls,
    screenshot: project.images.slice(0, 6).map((img, index) => ({
      '@type': 'ImageObject',
      url: imageUrls[index],
      caption: img.caption || img.alt,
    })),
    creator: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Nassim Maaoui',
    },
    keywords: [
      project.name,
      ...project.techStack.map((tech) => tech.name),
      project.category,
      'Nassim Maaoui',
    ].join(', '),
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${SITE_URL}/#technical-portfolio`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.name,
        item: `${SITE_URL}/projects/${project.id}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        className={className}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </>
  )
}

interface ItemListStructuredDataProps {
  projects: Pick<DetailedProject, 'id' | 'name' | 'description'>[]
}

export function ItemListStructuredData({ projects }: ItemListStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Engineering projects by Nassim Maaoui',
    itemListElement: projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.name,
      description: project.description,
      url: `${SITE_URL}/projects/${project.id}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function FaqStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function WebsiteStructuredData({ className }: { className?: string }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Nassim Maaoui',
    alternateName: 'Nassim Maaoui — Cloud & Infrastructure Engineer',
    description:
      'Portfolio of Nassim Maaoui, cloud and infrastructure engineering student at ESPRIT.',
    url: SITE_URL,
    inLanguage: 'en',
    publisher: { '@type': 'Person', '@id': `${SITE_URL}/#person` },
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Nassim Maaoui',
      url: SITE_URL,
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
