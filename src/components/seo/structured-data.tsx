import { DetailedProject } from '@/lib/projects-data'
import { FAQS } from '@/lib/faq-data'
import {
  GITHUB_URL,
  LINKEDIN_URL,
  OG_IMAGE,
  PERSON_ALTERNATE_NAMES,
  PERSON_ID,
  PROFILE_LINKS,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_NAME,
  SITE_ROLE,
  SITE_URL,
  WEBSITE_ID,
} from '@/lib/seo-config'

const PERSON_DESCRIPTION =
  'Nassim Maaoui is a cloud and infrastructure engineer from Tunis, Tunisia. Final-year computer engineering student at ESPRIT specialising in cloud and network architecture; built a private OpenStack cloud and an internal monitoring platform used at Huawei Technologies across 23 radio sites.'

const KNOWS_ABOUT = [
  'OpenStack',
  'Kubernetes',
  'Ansible',
  'Terraform',
  'Prometheus',
  'Grafana',
  'Linux administration',
  'Infrastructure as Code',
  'Computer networking',
  'Python',
  'CI/CD',
  'Observability',
  'Site reliability engineering',
  'Private cloud',
]

interface PersonStructuredDataProps {
  className?: string
}

export function PersonStructuredData({ className }: PersonStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE_NAME,
    givenName: 'Nassim',
    familyName: 'Maaoui',
    alternateName: PERSON_ALTERNATE_NAMES,
    jobTitle: SITE_ROLE,
    nationality: { '@type': 'Country', name: 'Tunisia' },
    description: PERSON_DESCRIPTION,
    url: SITE_URL,
    email: `mailto:${SITE_EMAIL}`,
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${OG_IMAGE}`,
      width: 1200,
      height: 630,
    },
    sameAs: PROFILE_LINKS,
    knowsLanguage: ['en', 'fr', 'ar'],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tunis',
      addressCountry: 'TN',
    },
    alumniOf: [
      {
        '@type': 'CollegeOrUniversity',
        name: 'ESPRIT',
        alternateName:
          'École Supérieure Privée d’Ingénierie et de Technologies, Tunis',
      },
      { '@type': 'CollegeOrUniversity', name: 'Faculté des Sciences de Bizerte' },
    ],
    knowsAbout: KNOWS_ABOUT,
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
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'recruiting',
        email: SITE_EMAIL,
        availableLanguage: ['English', 'French', 'Arabic'],
        areaServed: ['TN', 'EU', 'EEA', 'Remote'],
      },
    ],
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
    name: `${SITE_NAME} — ${SITE_ROLE}`,
    description: SITE_DESCRIPTION,
    inLanguage: 'en',
    dateModified: '2026-11-18',
    isPartOf: { '@type': 'WebSite', '@id': WEBSITE_ID },
    mainEntity: { '@type': 'Person', '@id': PERSON_ID },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${OG_IMAGE}`,
    },
    about: {
      '@type': 'Thing',
      name: 'Cloud infrastructure, platform and site reliability engineering',
    },
    significantLink: [GITHUB_URL, LINKEDIN_URL],
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
    isPartOf: { '@type': 'WebSite', '@id': WEBSITE_ID },
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: PROFILE_LINKS,
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
      '@id': PERSON_ID,
      name: SITE_NAME,
    },
    keywords: [
      project.name,
      ...project.techStack.map((tech) => tech.name),
      project.category,
      SITE_NAME,
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
    name: `Engineering projects by ${SITE_NAME}`,
    numberOfItems: projects.length,
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
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    alternateName: `${SITE_NAME} — ${SITE_ROLE}`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    inLanguage: 'en',
    publisher: { '@type': 'Person', '@id': PERSON_ID },
    author: {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE_NAME,
      url: SITE_URL,
    },
    copyrightHolder: { '@type': 'Person', '@id': PERSON_ID },
    hasPart: [
      {
        '@type': 'WebPage',
        name: 'Interactive terminal',
        url: `${SITE_URL}/terminal`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      className={className}
    />
  )
}
