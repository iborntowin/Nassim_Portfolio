import { DetailedProject } from '@/lib/projects-data'

interface PersonStructuredDataProps {
  className?: string
}

export function PersonStructuredData({ className }: PersonStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nassim Maaoui",
    "jobTitle": "Full-Stack Developer & AI Engineer",
    "description": "Experienced Full-Stack Developer and AI Engineer specializing in modern web technologies, machine learning, embedded systems, and productivity tools.",
    "url": "https://nassimmaaoui.dev",
    "sameAs": [
      "https://github.com/iborntowin",
      "https://www.linkedin.com/in/maaoui-nassim-1a5636279/",
      "https://twitter.com/nassimmaaoui"
    ],
    "knowsAbout": [
      "Full-Stack Development",
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Embedded Systems",
      "Web Development",
      "Software Engineering",
      "React",
      "Next.js",
      "Python",
      "TensorFlow",
      "Spring Boot",
      "Svelte",
      "JavaScript",
      "TypeScript",
      "C++",
      "Java",
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
        "Full-Stack Development",
        "AI/ML Engineering",
        "Computer Vision",
        "Embedded Systems",
        "DevOps"
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