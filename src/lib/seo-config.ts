export const seoConfig = {
  title: {
    default: 'Nassim Maaouia - Full-Stack Developer & AI Engineer',
    template: '%s | Nassim Maaouia Portfolio'
  },
  description: 'Experienced Full-Stack Developer and AI Engineer specializing in modern web technologies, machine learning, embedded systems, and productivity tools. Explore my portfolio of innovative projects.',
  url: 'https://nassimmaaouia.dev',
  siteName: 'Nassim Maaouia Portfolio',
  locale: 'en_US',
  type: 'website',
  
  // Social media handles
  social: {
    twitter: '@nassimmaaouia',
    github: 'iborntowin',
    linkedin: 'nassimmaaouia'
  },
  
  // Keywords for different sections
  keywords: {
    general: [
      'Nassim Maaouia',
      'Full-Stack Developer',
      'AI Engineer',
      'Machine Learning',
      'Software Engineer',
      'Portfolio',
      'Web Development',
      'Computer Vision',
      'Deep Learning',
      'Embedded Systems',
      'DevOps'
    ],
    technologies: [
      'React',
      'Next.js',
      'Python',
      'TensorFlow',
      'Spring Boot',
      'Svelte',
      'JavaScript',
      'TypeScript',
      'C++',
      'Java',
      'PostgreSQL',
      'Docker',
      'Kubernetes'
    ],
    specializations: [
      'AI/ML Development',
      'Computer Vision',
      'Signal Processing',
      'Embedded Programming',
      'Full-Stack Architecture',
      'Real-time Systems',
      'Data Science',
      'Neural Networks',
      'IoT Development'
    ]
  },
  
  // Project categories for SEO
  projectCategories: {
    'Full-Stack': {
      description: 'Full-stack web applications with modern frameworks',
      keywords: ['Full-Stack Development', 'Web Applications', 'React', 'Spring Boot', 'Database Design']
    },
    'AI/ML': {
      description: 'Artificial Intelligence and Machine Learning projects',
      keywords: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Neural Networks', 'TensorFlow']
    },
    'Embedded': {
      description: 'Embedded systems and IoT development',
      keywords: ['Embedded Systems', 'IoT', 'Microcontrollers', 'Real-time Systems', 'Hardware Programming']
    },
    'Productivity': {
      description: 'Productivity tools and desktop applications',
      keywords: ['Desktop Applications', 'Productivity Tools', 'Automation', 'User Interface Design']
    },
    'DevOps': {
      description: 'DevOps tools and infrastructure automation',
      keywords: ['DevOps', 'CI/CD', 'Docker', 'Kubernetes', 'Infrastructure as Code']
    }
  }
}

export function generateProjectKeywords(projectName: string, category: string, techStack: string[]): string[] {
  const baseKeywords = [
    projectName,
    `${projectName} project`,
    `${projectName} by Nassim Maaouia`,
    'Nassim Maaouia',
    'Software Project',
    'Programming Project'
  ]
  
  const categoryKeywords = seoConfig.projectCategories[category as keyof typeof seoConfig.projectCategories]?.keywords || []
  const techKeywords = techStack.flatMap(tech => [
    tech,
    `${tech} project`,
    `${tech} development`,
    `${tech} programming`
  ])
  
  return [...baseKeywords, ...categoryKeywords, ...techKeywords]
}

export function generateProjectDescription(projectName: string, category: string, description: string): string {
  const categoryDesc = seoConfig.projectCategories[category as keyof typeof seoConfig.projectCategories]?.description || 'Software project'
  return `${projectName} - ${categoryDesc} by Nassim Maaouia. ${description}`
}