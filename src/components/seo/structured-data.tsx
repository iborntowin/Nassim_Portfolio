import { DetailedProject } from '@/lib/projects-data'

interface PersonStructuredDataProps {
  className?: string
}

export function PersonStructuredData({ className }: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nassim Maaoui",
    "jobTitle": "Cloud Engineer & DevOps Architect",
    "description": "Cloud Engineer & DevOps Architect specializing in AWS, OpenStack, Kubernetes, Terraform, and CI/CD automation. Building production-grade infrastructure at scale.",
    "url": "https://nassimmaaoui.dev",
    "sameAs": [
      "https://github.com/iborntowin",
      "https://www.linkedin.com/in/maaoui-nassim-1a5636279/",
      "https://twitter.com/nassimmaaoui"
    ],
    "knowsAbout": [
      "Cloud Engineering",
      "DevOps Architecture",
      "AWS",
      "OpenStack",
      "Kubernetes",
      "Terraform",
      "Docker",
      "CI/CD Automation",
      "Infrastructure as Code",
      "Prometheus & Grafana",
      "Ansible",
      "Linux Administration",
      "Site Reliability Engineering",
      "Full-Stack Development",
      "Python",
      "TypeScript",
      "React",
      "Next.js",
      "Machine Learning",
      "PostgreSQL"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Software Engineer",
      "occupationLocation": {
        "@type": "Country",
        "name": "Tunisia"
      },
      "skills": [
        "Cloud Engineering",
        "DevOps Architecture",
        "Infrastructure as Code",
        "Container Orchestration",
        "Site Reliability Engineering",
        "Full-Stack Development"
      ]
    }
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
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.name,
    "description": project.description,
    "url": `https://nassimmaaoui.dev/projects/${project.id}`,
    "author": {
      "@type": "Person",
      "name": "Nassim Maaoui",
      "url": "https://nassimmaaoui.dev"
    },
    "programmingLanguage": project.techStack.map(tech => tech.name),
    "applicationCategory": project.category,
    "operatingSystem": "Cross-platform",
    "codeRepository": project.githubUrl,
    "screenshot": project.images.map(img => ({
      "@type": "ImageObject",
      "url": `https://nassimmaaoui.dev${img.src}`,
      "caption": img.caption || img.alt
    })),
    "dateCreated": "2024",
    "creator": {
      "@type": "Person",
      "name": "Nassim Maaoui"
    },
    "keywords": [
      project.name,
      ...project.techStack.map(tech => tech.name),
      project.category,
      "Software Development",
      "Programming",
      "Nassim Maaoui"
    ].join(", ")
  }

  if (project.liveUrl) {
    structuredData["url"] = project.liveUrl
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
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nassim Maaoui Portfolio",
    "description": "Portfolio website of Nassim Maaoui, Full-Stack Developer and AI Engineer",
    "url": "https://nassimmaaoui.dev",
    "author": {
      "@type": "Person",
      "name": "Nassim Maaoui"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://nassimmaaoui.dev/projects?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      className={className}
    />
  )
}