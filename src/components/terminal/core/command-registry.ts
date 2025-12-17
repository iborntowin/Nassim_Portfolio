import { getAllProjects, getProjectById, type DetailedProject } from '../../../lib/projects-data'

export interface CommandResult {
  success: boolean
  output: string[]
  type: 'success' | 'error' | 'warning' | 'info' | 'system'
  data?: any
  animation?: 'typing' | 'matrix' | 'deploy' | 'scan'
}

export interface Command {
  name: string
  aliases?: string[]
  description: string
  usage: string
  category: 'system' | 'navigation' | 'projects' | 'devops' | 'ai' | 'cloud' | 'fun'
  handler: (args: string[], context: CommandContext) => Promise<CommandResult> | CommandResult
  hidden?: boolean
}

export interface CommandContext {
  currentPath: string
  user: string
  host: string
  environment: 'development' | 'staging' | 'production'
  variables: Record<string, string>
  history: string[]
  activeTab?: string
}

// ASCII Art Banners
export const ASCII_BANNERS = {
  welcome: `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║    ███╗   ██╗ █████╗ ███████╗███████╗██╗███╗   ███╗    ███╗   ███╗ █████╗     ║
║    ████╗  ██║██╔══██╗██╔════╝██╔════╝██║████╗ ████║    ████╗ ████║██╔══██╗    ║
║    ██╔██╗ ██║███████║███████╗███████╗██║██╔████╔██║    ██╔████╔██║███████║    ║
║    ██║╚██╗██║██╔══██║╚════██║╚════██║██║██║╚██╔╝██║    ██║╚██╔╝██║██╔══██║    ║
║    ██║ ╚████║██║  ██║███████║███████║██║██║ ╚═╝ ██║    ██║ ╚═╝ ██║██║  ██║    ║
║    ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝     ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝    ║
║                                                                               ║
║                    🚀 CLOUD ENGINEER COMMAND CONSOLE 🚀                      ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝`,
  
  projects: `
┌─────────────────────────────────────────────────────────────────────────────┐
│  ██████╗ ██████╗  ██████╗      ██╗███████╗ ██████╗████████╗███████╗        │
│  ██╔══██╗██╔══██╗██╔═══██╗     ██║██╔════╝██╔════╝╚══██╔══╝██╔════╝        │
│  ██████╔╝██████╔╝██║   ██║     ██║█████╗  ██║        ██║   ███████╗        │
│  ██╔═══╝ ██╔══██╗██║   ██║██   ██║██╔══╝  ██║        ██║   ╚════██║        │
│  ██║     ██║  ██║╚██████╔╝╚█████╔╝███████╗╚██████╗   ██║   ███████║        │
│  ╚═╝     ╚═╝  ╚═╝ ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝   ╚═╝   ╚══════╝        │
└─────────────────────────────────────────────────────────────────────────────┘`,

  devops: `
┌─────────────────────────────────────────────────────────────────────────────┐
│  ██████╗ ███████╗██╗   ██╗ ██████╗ ██████╗ ███████╗                        │
│  ██╔══██╗██╔════╝██║   ██║██╔═══██╗██╔══██╗██╔════╝                        │
│  ██║  ██║█████╗  ██║   ██║██║   ██║██████╔╝███████╗                        │
│  ██║  ██║██╔══╝  ╚██╗ ██╔╝██║   ██║██╔═══╝ ╚════██║                        │
│  ██████╔╝███████╗ ╚████╔╝ ╚██████╔╝██║     ███████║                        │
│  ╚═════╝ ╚══════╝  ╚═══╝   ╚═════╝ ╚═╝     ╚══════╝                        │
└─────────────────────────────────────────────────────────────────────────────┘`,

  cloud: `
┌─────────────────────────────────────────────────────────────────────────────┐
│   ██████╗██╗      ██████╗ ██╗   ██╗██████╗                                 │
│  ██╔════╝██║     ██╔═══██╗██║   ██║██╔══██╗                                │
│  ██║     ██║     ██║   ██║██║   ██║██║  ██║                                │
│  ██║     ██║     ██║   ██║██║   ██║██║  ██║                                │
│  ╚██████╗███████╗╚██████╔╝╚██████╔╝██████╔╝                                │
│   ╚═════╝╚══════╝ ╚═════╝  ╚═════╝ ╚═════╝                                 │
└─────────────────────────────────────────────────────────────────────────────┘`
}

// Project data for terminal commands
export const PROJECTS_DATA = [
  {
    id: 'cession-app',
    name: 'Cession App',
    description: 'Session & Contract Management Platform',
    tech: ['Spring Boot', 'Svelte', 'PostgreSQL', 'JWT'],
    status: 'deployed',
    stars: 194,
    deployments: 12,
    uptime: '99.9%'
  },
  {
    id: 'board-ai',
    name: 'Board-AI',
    description: 'CNN-based Electronic Component Detection',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'TensorRT'],
    status: 'deployed',
    stars: 271,
    accuracy: '92%',
    inference: '120ms'
  },
  {
    id: 'nanosatellite-comm',
    name: 'NanoSat Comm',
    description: 'Optimized LoRaWAN Communication Module',
    tech: ['C++', 'STM32', 'LoRaWAN', 'Embedded'],
    status: 'deployed',
    stars: 305,
    dataRate: '1.2 Mbps',
    platforms: 5
  },
  {
    id: 'goldentouch',
    name: 'GoldenTouch',
    description: 'AI-Powered Event Management Platform',
    tech: ['Symfony', 'JavaFX', 'Hugging Face', 'AI'],
    status: 'deployed',
    stars: 221,
    events: '500+',
    aiAccuracy: '94%'
  }
]

// Skills data
export const SKILLS_DATA = {
  'cloud': {
    name: 'Cloud & Infrastructure',
    skills: [
      { name: 'AWS', level: 90, experience: '3+ years', certifications: ['Solutions Architect'] },
      { name: 'Kubernetes', level: 85, experience: '2+ years', projects: 15 },
      { name: 'Docker', level: 88, experience: '3+ years', projects: 25 },
      { name: 'Terraform', level: 82, experience: '2+ years', infrastructure: 'Multi-cloud' }
    ]
  },
  'devops': {
    name: 'DevOps & Automation',
    skills: [
      { name: 'Ansible', level: 85, experience: '2+ years', playbooks: 50 },
      { name: 'Jenkins', level: 80, experience: '2+ years', pipelines: 30 },
      { name: 'GitLab CI/CD', level: 88, experience: '3+ years', deployments: 200 },
      { name: 'Monitoring', level: 85, experience: '2+ years', tools: ['Prometheus', 'Grafana'] }
    ]
  },
  'development': {
    name: 'Software Development',
    skills: [
      { name: 'Python', level: 92, experience: '5+ years', projects: 20 },
      { name: 'Java/Spring', level: 88, experience: '4+ years', projects: 15 },
      { name: 'TypeScript', level: 90, experience: '3+ years', projects: 18 },
      { name: 'React/Next.js', level: 92, experience: '3+ years', projects: 12 }
    ]
  },
  'ai': {
    name: 'AI & Machine Learning',
    skills: [
      { name: 'TensorFlow', level: 88, experience: '3+ years', models: 8 },
      { name: 'PyTorch', level: 82, experience: '2+ years', models: 5 },
      { name: 'OpenCV', level: 85, experience: '3+ years', projects: 6 },
      { name: 'Hugging Face', level: 80, experience: '1+ years', models: 4 }
    ]
  }
}

// About/Contact data
export const ABOUT_DATA = {
  name: 'Nassim Maaoui',
  title: 'Cloud Engineer & DevOps Architect',
  location: 'Tunisia',
  email: 'nassimmaaoui@outlook.com',
  github: 'https://github.com/iborntowin',
  linkedin: 'https://www.linkedin.com/in/maaoui-nassim-1a5636279/',
  bio: 'Passionate cloud engineer specializing in building scalable, cloud-native systems. Expert in DevOps automation, AI/ML integration, and modern web technologies.',
  experience: '5+ years',
  specializations: [
    'Cloud-Native Architecture',
    'DevOps & CI/CD Automation',
    'AI/ML System Integration',
    'Microservices & Containerization',
    'Infrastructure as Code'
  ],
  achievements: [
    '25+ Projects Deployed to Production',
    '99.9% System Uptime Achieved',
    '2.1k+ GitHub Stars Earned',
    'Multiple Cloud Certifications',
    'Open Source Contributor'
  ]
}

// Command implementations
export const COMMAND_REGISTRY: Record<string, Command> = {
  // System commands
  help: {
    name: 'help',
    aliases: ['h', '?'],
    description: 'Display available commands',
    usage: 'help [command]',
    category: 'system',
    handler: (args) => ({
      success: true,
      output: [
        '',
        '🚀 NASSIM\'S CLOUD ENGINEER CONSOLE - COMMAND REFERENCE',
        '═══════════════════════════════════════════════════════',
        '',
        '📁 NAVIGATION & SYSTEM:',
        '  help, h, ?           - Show this help message',
        '  clear, cls           - Clear terminal screen',
        '  whoami              - Display current user info',
        '  pwd                 - Show current directory',
        '  ls [path]           - List directory contents',
        '  cd <path>           - Change directory',
        '  history             - Show command history',
        '  exit, quit          - Exit terminal session',
        '',
        '👨‍💻 PORTFOLIO NAVIGATION:',
        '  about               - Display personal information',
        '  projects            - List all projects',
        '  skills [category]   - Show technical skills',
        '  contact [options]   - Contact form and information',
        '  view <project>      - View project details',
        '  deploy <project>    - Simulate project deployment',
        '  status <project>    - Check project status',
        '',
        '☁️  CLOUD & DEVOPS:',
        '  kubectl get pods    - Show Kubernetes pods',
        '  terraform plan      - Show infrastructure plan',
        '  ansible-playbook    - Run automation playbook',
        '  docker ps           - List running containers',
        '  monitor             - Show system monitoring',
        '  logs <service>      - View service logs',
        '',
        '🧠 AI & MACHINE LEARNING:',
        '  ai chat             - Start AI assistant',
        '  train <model>       - Simulate model training',
        '  inference <model>   - Run model inference',
        '',
        '🎮 FUN & EASTER EGGS:',
        '  sudo become-legend  - Activate legend mode',
        '  matrix              - Enter the matrix',
        '  hack-the-planet     - Elite hacker mode',
        '  coffee              - Brew some coffee',
        '  secret              - Reveal portfolio secrets',
        '  fortune             - Get random tech wisdom',
        '',
        '💡 TIP: Use Tab for auto-completion, ↑↓ for history',
        '💡 TIP: Try "sudo become-legend" for a surprise!',
        '🥚 HINT: There are hidden commands... try "secret easter_eggs"',
        '🎯 HINT: Movie quotes and famous commands might work...',
        ''
      ],
      type: 'info'
    })
  },

  clear: {
    name: 'clear',
    aliases: ['cls'],
    description: 'Clear the terminal screen',
    usage: 'clear',
    category: 'system',
    handler: () => ({
      success: true,
      output: [],
      type: 'system',
      data: { action: 'clear' }
    })
  },

  exit: {
    name: 'exit',
    aliases: ['quit', 'logout'],
    description: 'Exit terminal session',
    usage: 'exit',
    category: 'system',
    handler: () => ({
      success: true,
      output: ['Goodbye! 👋', 'Redirecting to portfolio...'],
      type: 'system',
      data: { 
        action: 'navigate',
        url: '/'
      }
    })
  },

  whoami: {
    name: 'whoami',
    description: 'Display current user information',
    usage: 'whoami',
    category: 'system',
    handler: (args, context) => ({
      success: true,
      output: [
        `${context.user}@${context.host}`,
        '',
        '👨‍💻 Nassim Maaoui - Cloud Engineer & DevOps Architect',
        '🌍 Location: Tunisia',
        '🚀 Specialization: Cloud-Native Systems, AI/ML, Automation',
        '⚡ Current Status: Building the future, one deployment at a time',
        '',
        '📊 Quick Stats:',
        '  • 25+ Projects Deployed',
        '  • 99.9% Uptime Achieved',
        '  • 2.1k+ GitHub Stars',
        '  • 5+ Years Experience',
        ''
      ],
      type: 'info'
    })
  },

  projects: {
    name: 'projects',
    aliases: ['ls-projects', 'portfolio'],
    description: 'List all projects',
    usage: 'projects [--detailed] [--category <category>]',
    category: 'navigation',
    handler: (args) => {
      const detailed = args.includes('--detailed') || args.includes('-d')
      const categoryIndex = args.indexOf('--category')
      const category = categoryIndex !== -1 && categoryIndex + 1 < args.length ? args[categoryIndex + 1] : null
      
      let projects = getAllProjects()
      
      // Filter by category if specified
      if (category) {
        projects = projects.filter(p => p.category.toLowerCase() === category.toLowerCase())
      }
      
      const output = [
        ASCII_BANNERS.projects,
        '',
        '📁 PORTFOLIO PROJECTS REPOSITORY',
        '═══════════════════════════════════════════════════════',
        ''
      ]

      if (projects.length === 0) {
        output.push(`No projects found${category ? ` in category "${category}"` : ''}`)
        output.push('')
        output.push('Available categories: Full-Stack, AI/ML, Embedded, Productivity, DevOps')
        return { success: false, output, type: 'warning' }
      }

      projects.forEach(project => {
        const status = project.featured ? 'FEATURED' : 'ACTIVE'
        output.push(`📦 ${project.name.padEnd(35)} ${status.padEnd(10)} ⭐ ${project.stats.stars}`)
        output.push(`   ${project.description}`)
        output.push(`   Category: ${project.category} | Timeline: ${project.timeline}`)
        
        if (detailed) {
          output.push(`   Tech Stack: ${project.techStack.map(t => t.name).join(', ')}`)
          output.push(`   GitHub: ${project.githubUrl}`)
          if (project.liveUrl) output.push(`   Live URL: ${project.liveUrl}`)
          output.push(`   Role: ${project.role}`)
        }
        output.push('')
      })

      output.push('💡 Commands:')
      output.push('   • view <project-id>     - View detailed project information')
      output.push('   • deploy <project-id>   - Simulate project deployment')
      output.push('   • projects --detailed   - Show detailed project list')
      output.push('   • projects --category <category> - Filter by category')
      output.push('')
      output.push('📂 Available categories: Full-Stack, AI/ML, Embedded, Productivity, DevOps')

      return {
        success: true,
        output,
        type: 'info'
      }
    }
  },

  view: {
    name: 'view',
    aliases: ['show', 'details'],
    description: 'View detailed project information',
    usage: 'view <project-id>',
    category: 'navigation',
    handler: (args) => {
      if (args.length === 0) {
        const projects = getAllProjects()
        return {
          success: false,
          output: [
            'Error: Please specify a project ID',
            'Usage: view <project-id>',
            '',
            'Available projects:',
            ...projects.map(p => `  • ${p.id} - ${p.name}`)
          ],
          type: 'error'
        }
      }

      const projectId = args[0]
      const project = getProjectById(projectId)

      if (!project) {
        const projects = getAllProjects()
        // Try to find by name or partial match
        const fuzzyMatch = projects.find(p => 
          p.name.toLowerCase().includes(projectId.toLowerCase()) ||
          p.id.toLowerCase().includes(projectId.toLowerCase())
        )

        if (fuzzyMatch) {
          return {
            success: false,
            output: [
              `Did you mean project "${fuzzyMatch.id}"?`,
              `Use: view ${fuzzyMatch.id}`,
              '',
              'Available projects:',
              ...projects.map(p => `  • ${p.id} - ${p.name}`)
            ],
            type: 'warning'
          }
        }

        return {
          success: false,
          output: [
            `Project "${projectId}" not found.`,
            '',
            'Available projects:',
            ...projects.map(p => `  • ${p.id} - ${p.name}`)
          ],
          type: 'error'
        }
      }

      return {
        success: true,
        output: [
          `╔═══════════════════════════════════════════════════════════════════════════════╗`,
          `║  📦 ${project.name.toUpperCase().padEnd(70)} ║`,
          `╚═══════════════════════════════════════════════════════════════════════════════╝`,
          '',
          `📋 Description: ${project.description}`,
          `🏷️  Project ID: ${project.id}`,
          `📂 Category: ${project.category}`,
          `⭐ GitHub Stars: ${project.stats.stars}`,
          `🍴 Forks: ${project.stats.forks}`,
          `📝 Commits: ${project.stats.commits}`,
          `⏱️  Timeline: ${project.timeline}`,
          `👤 Role: ${project.role}`,
          ...(project.teamSize ? [`👥 Team Size: ${project.teamSize}`] : []),
          '',
          '🛠️  Technology Stack:',
          ...project.techStack.map(tech => `   • ${tech.name}`),
          '',
          '🎯 Key Features:',
          ...project.keyFeatures.slice(0, 5).map(feature => `   • ${feature}`),
          ...(project.keyFeatures.length > 5 ? ['   • ... and more'] : []),
          '',
          '🏆 Impact & Results:',
          ...project.impact.map(impact => `   • ${impact}`),
          '',
          '🔗 Links:',
          `   • GitHub: ${project.githubUrl}`,
          ...(project.liveUrl ? [`   • Live Demo: ${project.liveUrl}`] : []),
          '',
          '💡 Commands:',
          `   • deploy ${project.id}     - Simulate deployment`,
          `   • open ${project.id}       - Open project page in browser`,
          `   • projects --category ${project.category} - View similar projects`,
          ''
        ],
        type: 'info'
      }
    }
  },

  open: {
    name: 'open',
    aliases: ['goto', 'navigate'],
    description: 'Open project page in browser',
    usage: 'open <project-id>',
    category: 'navigation',
    handler: (args) => {
      if (args.length === 0) {
        const projects = getAllProjects()
        return {
          success: false,
          output: [
            'Error: Please specify a project ID',
            'Usage: open <project-id>',
            '',
            'Available projects:',
            ...projects.map(p => `  • ${p.id} - ${p.name}`)
          ],
          type: 'error'
        }
      }

      const projectId = args[0]
      const project = getProjectById(projectId)

      if (!project) {
        const projects = getAllProjects()
        return {
          success: false,
          output: [
            `Project "${projectId}" not found.`,
            '',
            'Available projects:',
            ...projects.map(p => `  • ${p.id} - ${p.name}`)
          ],
          type: 'error'
        }
      }

      // Return special action to open project page
      return {
        success: true,
        output: [
          `🚀 Opening ${project.name}...`,
          `📂 Navigating to /projects/${project.id}`,
          '',
          '💡 Use browser back button or type "terminal" to return'
        ],
        type: 'success',
        data: {
          action: 'navigate',
          url: `/projects/${project.id}`
        }
      }
    }
  },

  deploy: {
    name: 'deploy',
    description: 'Simulate project deployment',
    usage: 'deploy <project-id>',
    category: 'devops',
    handler: async (args) => {
      if (args.length === 0) {
        const projects = getAllProjects()
        return {
          success: false,
          output: [
            'Error: Please specify a project ID',
            'Usage: deploy <project-id>',
            '',
            'Available projects:',
            ...projects.map(p => `  • ${p.id} - ${p.name}`)
          ],
          type: 'error'
        }
      }

      const projectId = args[0]
      const project = getProjectById(projectId)

      if (!project) {
        const projects = getAllProjects()
        return {
          success: false,
          output: [
            `Project "${projectId}" not found.`,
            '',
            'Available projects:',
            ...projects.map(p => `  • ${p.id} - ${p.name}`)
          ],
          type: 'error'
        }
      }

      // Generate deployment steps based on project tech stack
      const techStack = project.techStack.map(t => t.name)
      const hasDocker = techStack.some(t => t.toLowerCase().includes('docker'))
      const hasKubernetes = techStack.some(t => t.toLowerCase().includes('kubernetes') || t.toLowerCase().includes('k8s'))
      const hasCloud = techStack.some(t => ['AWS', 'Azure', 'GCP'].includes(t))

      return {
        success: true,
        output: [
          `🚀 INITIATING DEPLOYMENT: ${project.name.toUpperCase()}`,
          '═══════════════════════════════════════════════════════',
          '',
          '📋 Pre-deployment checks...',
          '✅ Code quality scan passed',
          '✅ Security vulnerability scan completed',
          '✅ Unit tests: 96% coverage',
          '✅ Integration tests passed',
          ...(hasDocker ? ['✅ Docker image built successfully'] : []),
          '',
          '☁️  Deployment process...',
          ...(hasDocker ? [`📦 Pushing image: registry.nassim.dev/${project.id}:latest`] : []),
          ...(hasKubernetes ? [
            '🔄 Applying Kubernetes manifests...',
            '⚖️  Load balancer configuration updated',
            '🔍 Health checks configured'
          ] : [
            '🌐 Deploying to cloud infrastructure...',
            '⚖️  Load balancer updated',
            '🔍 Health checks passing'
          ]),
          '',
          '✅ DEPLOYMENT SUCCESSFUL!',
          '',
          '📊 Deployment Summary:',
          `   • Project: ${project.name}`,
          `   • Category: ${project.category}`,
          `   • Environment: production`,
          `   • Tech Stack: ${techStack.slice(0, 3).join(', ')}${techStack.length > 3 ? '...' : ''}`,
          `   • Status: HEALTHY`,
          ...(project.liveUrl ? [`   • Live URL: ${project.liveUrl}`] : [`   • URL: https://${project.id}.nassim.dev`]),
          `   • GitHub: ${project.githubUrl}`,
          '',
          '🎉 Your application is now live and serving traffic!',
          '📈 Monitoring and logging are active',
          ''
        ],
        type: 'success',
        animation: 'deploy'
      }
    }
  },

  skills: {
    name: 'skills',
    aliases: ['abilities', 'tech'],
    description: 'Display technical skills and expertise',
    usage: 'skills [category]',
    category: 'navigation',
    handler: (args) => {
      const category = args[0]?.toLowerCase()
      
      if (category && SKILLS_DATA[category as keyof typeof SKILLS_DATA]) {
        const skillCategory = SKILLS_DATA[category as keyof typeof SKILLS_DATA]
        const output = [
          `╔═══════════════════════════════════════════════════════════════════════════════╗`,
          `║  🎯 ${skillCategory.name.toUpperCase().padEnd(70)} ║`,
          `╚═══════════════════════════════════════════════════════════════════════════════╝`,
          ''
        ]

        skillCategory.skills.forEach(skill => {
          const bar = '█'.repeat(Math.floor(skill.level / 10)) + '░'.repeat(10 - Math.floor(skill.level / 10))
          output.push(`${skill.name.padEnd(15)} [${bar}] ${skill.level}%`)
          output.push(`${''.padEnd(15)} Experience: ${skill.experience}`)
          if (skill.projects) output.push(`${''.padEnd(15)} Projects: ${skill.projects}`)
          if (skill.certifications) output.push(`${''.padEnd(15)} Certs: ${skill.certifications.join(', ')}`)
          output.push('')
        })

        return { success: true, output, type: 'info' }
      }

      // Show all categories
      return {
        success: true,
        output: [
          '🎯 TECHNICAL SKILLS OVERVIEW',
          '═══════════════════════════════════════════════════════',
          '',
          '📂 Available Categories:',
          '  • cloud      - Cloud & Infrastructure (AWS, K8s, Docker)',
          '  • devops     - DevOps & Automation (Ansible, CI/CD)',
          '  • development - Software Development (Python, Java, TS)',
          '  • ai         - AI & Machine Learning (TensorFlow, PyTorch)',
          '',
          '💡 Usage: skills <category> for detailed breakdown',
          '💡 Example: skills cloud',
          ''
        ],
        type: 'info'
      }
    }
  },

  // Portfolio Navigation Commands
  about: {
    name: 'about',
    aliases: ['info', 'bio'],
    description: 'Display personal information and background',
    usage: 'about',
    category: 'navigation',
    handler: () => ({
      success: true,
      output: [
        '',
        '╔═══════════════════════════════════════════════════════════════════════════════╗',
        '║                                 ABOUT ME                                      ║',
        '╚═══════════════════════════════════════════════════════════════════════════════╝',
        '',
        `👨‍💻 ${ABOUT_DATA.name}`,
        `🎯 ${ABOUT_DATA.title}`,
        `🌍 Location: ${ABOUT_DATA.location}`,
        `⚡ Experience: ${ABOUT_DATA.experience}`,
        '',
        '📝 Bio:',
        `   ${ABOUT_DATA.bio}`,
        '',
        '🎯 Specializations:',
        ...ABOUT_DATA.specializations.map(spec => `   • ${spec}`),
        '',
        '🏆 Key Achievements:',
        ...ABOUT_DATA.achievements.map(achievement => `   • ${achievement}`),
        '',
        '📞 Contact Information:',
        `   📧 Email: ${ABOUT_DATA.email}`,
        `   🐙 GitHub: ${ABOUT_DATA.github}`,
        `   💼 LinkedIn: ${ABOUT_DATA.linkedin}`,
        '',
        '💡 Use "contact" command for interactive contact form',
        '💡 Use "skills" to explore technical expertise',
        '💡 Use "projects" to view portfolio projects',
        ''
      ],
      type: 'info'
    })
  },

  contact: {
    name: 'contact',
    aliases: ['reach', 'email'],
    description: 'Display contact information and interactive form',
    usage: 'contact [--name "Name"] [--email "email"] [--message "message"] [--form]',
    category: 'navigation',
    handler: (args) => {
      // Check for inline form flag
      if (args.includes('--form') || args.includes('-f')) {
        return {
          success: true,
          output: [],
          type: 'info',
          data: { action: 'show-contact-form' }
        }
      }

      // Parse command line arguments
      const argString = args.join(' ')
      const nameMatch = argString.match(/--name\s+"([^"]+)"/)
      const emailMatch = argString.match(/--email\s+"([^"]+)"/)
      const messageMatch = argString.match(/--message\s+"([^"]+)"/)
      const projectMatch = argString.match(/--project\s+"([^"]+)"/)

      if (nameMatch || emailMatch || messageMatch || projectMatch) {
        // Command-style contact form submission
        const name = nameMatch?.[1] || 'Anonymous'
        const email = emailMatch?.[1] || 'Not provided'
        const message = messageMatch?.[1] || 'No message'
        const project = projectMatch?.[1] || ''

        return {
          success: true,
          output: [
            '',
            '📨 CONTACT FORM SUBMISSION',
            '═══════════════════════════════════════════════════════',
            '',
            '✅ Message received! Processing your request...',
            '',
            '📋 Submission Details:',
            `   Name: ${name}`,
            `   Email: ${email}`,
            ...(project ? [`   Project: ${project}`] : []),
            `   Message: ${message}`,
            '',
            '🚀 Your message has been queued for processing',
            '📧 You will receive a response within 24 hours',
            '🔄 Confirmation email sent to your address',
            '',
            '💡 Thank you for reaching out!',
            ''
          ],
          type: 'success',
          data: { action: 'contact-submit', name, email, message, project }
        }
      }

      // Default contact information display
      return {
        success: true,
        output: [
          '',
          '╔═══════════════════════════════════════════════════════════════════════════════╗',
          '║                              CONTACT INFORMATION                              ║',
          '╚═══════════════════════════════════════════════════════════════════════════════╝',
          '',
          '📞 Get in Touch:',
          `   📧 Email: ${ABOUT_DATA.email}`,
          `   🐙 GitHub: ${ABOUT_DATA.github}`,
          `   💼 LinkedIn: ${ABOUT_DATA.linkedin}`,
          `   🌍 Location: ${ABOUT_DATA.location}`,
          '',
          '💬 Contact Options:',
          '',
          '1️⃣  Interactive Form (Recommended):',
          '   contact --form',
          '   Opens an interactive terminal-style contact form',
          '',
          '2️⃣  Command-Line Style:',
          '   contact --name "Your Name" --email "your@email.com" --message "Your message"',
          '   Optional: --project "Project Type"',
          '',
          '   Example:',
          '   contact --name "John Doe" --email "john@example.com" \\',
          '           --project "Cloud Migration" --message "Need help with AWS migration"',
          '',
          '🚀 Available for:',
          '   • Cloud Architecture Consulting',
          '   • DevOps Implementation & Automation',
          '   • AI/ML System Integration',
          '   • Technical Mentoring & Training',
          '   • Open Source Collaboration',
          '   • Speaking Engagements',
          '',
          '⚡ Response Time: Usually within 24 hours',
          '🌐 Time Zone: GMT+1 (Tunisia)',
          '💡 Try "contact --form" for the best experience!',
          ''
        ],
        type: 'info'
      }
    }
  },

  // Fun commands and Easter eggs
  'sudo become-legend': {
    name: 'sudo become-legend',
    description: 'Activate legend mode with special effects',
    usage: 'sudo become-legend',
    category: 'fun',
    handler: () => ({
      success: true,
      output: [
        '',
        '🌟 LEGEND MODE ACTIVATED 🌟',
        '',
        '    ⚡ POWER LEVEL: OVER 9000! ⚡',
        '',
        '  🚀 You are now operating at maximum capacity',
        '  🧠 Neural networks optimized',
        '  ☁️  Cloud resources unlimited',
        '  🔥 Deployment speed: LUDICROUS',
        '',
        '  Welcome to the elite tier, Cloud Legend! 👑',
        '',
        '  💡 Pro tip: With great power comes great responsibility',
        '     Use your newfound abilities wisely...',
        '',
        '  🎮 Legend mode features unlocked:',
        '     • Matrix rain with cloud symbols',
        '     • Glitch effects on screen',
        '     • Enhanced terminal powers',
        '     • Access to secret commands',
        ''
      ],
      type: 'success',
      animation: 'matrix',
      data: { action: 'activate-legend-mode', triggerGlitch: true, triggerMatrix: true }
    })
  },

  'hack-the-planet': {
    name: 'hack-the-planet',
    aliases: ['hack', 'elite'],
    description: 'Elite hacker mode',
    usage: 'hack-the-planet',
    category: 'fun',
    hidden: true,
    handler: () => ({
      success: true,
      output: [
        '',
        '🌍 HACK THE PLANET! 🌍',
        '',
        '💀 ELITE HACKER MODE ENGAGED 💀',
        '',
        '  [████████████████████████████████] 100%',
        '  Bypassing firewalls...',
        '  Accessing mainframe...',
        '  Downloading the internet...',
        '',
        '  🎯 TARGET ACQUIRED: Planet Earth',
        '  🔓 ACCESS GRANTED: Root privileges',
        '  🌐 NETWORK STATUS: Pwned',
        '',
        '  "Mess with the best, die like the rest!" 😎',
        '',
        '  💡 Fun fact: This quote is from the 1995 movie "Hackers"',
        '  🎬 Starring Jonny Lee Miller and Angelina Jolie',
        ''
      ],
      type: 'success',
      animation: 'matrix'
    })
  },

  'konami': {
    name: 'konami',
    description: 'The legendary cheat code',
    usage: 'konami',
    category: 'fun',
    hidden: true,
    handler: () => ({
      success: true,
      output: [
        '',
        '🎮 KONAMI CODE ACTIVATED! 🎮',
        '',
        '  ↑ ↑ ↓ ↓ ← → ← → B A',
        '',
        '  🌟 30 EXTRA LIVES GRANTED! 🌟',
        '  🚀 UNLIMITED POWER MODE!',
        '  ⚡ ALL ACHIEVEMENTS UNLOCKED!',
        '',
        '  🏆 Secret achievements discovered:',
        '     • Code Archaeologist - Found ancient secrets',
        '     • Terminal Master - Mastered the command line',
        '     • Easter Egg Hunter - Discovered hidden features',
        '     • Retro Gamer - Remembered the classics',
        '',
        '  💡 The Konami Code: A gaming legend since 1986!',
        ''
      ],
      type: 'success',
      animation: 'matrix'
    })
  },

  'sudo rm -rf /': {
    name: 'sudo rm -rf /',
    description: 'The most dangerous command (safely simulated)',
    usage: 'sudo rm -rf /',
    category: 'fun',
    hidden: true,
    handler: () => ({
      success: false,
      output: [
        '',
        '🚨 CRITICAL WARNING! 🚨',
        '',
        '  ⚠️  ATTEMPTING TO DELETE EVERYTHING!',
        '  🛡️  SAFETY PROTOCOLS ENGAGED!',
        '',
        '  [████████████████████████████████] 100%',
        '  Deleting /home/nassim/portfolio...',
        '  Deleting /var/log/achievements...',
        '  Deleting /etc/skills/cloud-engineering...',
        '  Deleting /usr/bin/deploy-projects...',
        '',
        '  💥 SYSTEM MELTDOWN IMMINENT!',
        '  🔥 EVERYTHING IS ON FIRE!',
        '  😱 OH NO! WHAT HAVE YOU DONE?!',
        '',
        '  ...',
        '  ...',
        '  ...',
        '',
        '  😄 Just kidding! Everything is safe.',
        '  🛡️  This portfolio has built-in protection.',
        '  💡 Pro tip: Never run this command on a real system!',
        ''
      ],
      type: 'warning'
    })
  },

  'secret': {
    name: 'secret',
    aliases: ['secrets', 'hidden'],
    description: 'Reveal portfolio secrets and fun facts',
    usage: 'secret [category]',
    category: 'fun',
    hidden: true,
    handler: (args) => {
      const secrets = {
        personal: [
          '🎵 I code better with lo-fi hip-hop music',
          '☕ I drink exactly 4.2 cups of coffee per day',
          '🌙 My most productive coding hours are 10 PM - 2 AM',
          '🐧 I have 47 different Linux distros bookmarked',
          '🎮 I still play retro games for inspiration'
        ],
        technical: [
          '🚀 This portfolio was built with 15,000+ lines of code',
          '⚡ The terminal animation uses 60fps requestAnimationFrame',
          '🎨 ASCII art is generated using custom algorithms',
          '🔧 The command system supports 50+ different commands',
          '🌐 The site achieves 98+ Lighthouse performance score'
        ],
        achievements: [
          '🏆 Deployed 25+ projects to production with 99.9% uptime',
          '⭐ Earned 2,100+ GitHub stars across all repositories',
          '🎯 Completed 500+ successful deployments without rollback',
          '🧠 Trained 8 different AI models for production use',
          '☁️  Managed infrastructure serving 1M+ requests/month'
        ],
        easter_eggs: [
          '🥚 There are 12 hidden commands in this terminal',
          '🎭 Try typing movie quotes for special responses',
          '🎲 Some commands have random responses',
          '🌈 Certain key combinations trigger animations',
          '🔍 The help command has different responses based on time'
        ]
      }

      const category = args[0]?.toLowerCase()
      
      if (category && secrets[category as keyof typeof secrets]) {
        const categorySecrets = secrets[category as keyof typeof secrets]
        return {
          success: true,
          output: [
            '',
            `🤫 SECRET ${category.toUpperCase()} FACTS REVEALED!`,
            '═══════════════════════════════════════════════════════',
            '',
            ...categorySecrets.map(secret => `  ${secret}`),
            '',
            '💡 Use "secret" without arguments to see all categories',
            ''
          ],
          type: 'info'
        }
      }

      return {
        success: true,
        output: [
          '',
          '🤫 PORTFOLIO SECRETS & FUN FACTS',
          '═══════════════════════════════════════════════════════',
          '',
          '📂 Available secret categories:',
          '  • personal     - Personal quirks and habits',
          '  • technical    - Technical implementation details',
          '  • achievements - Hidden accomplishments',
          '  • easter_eggs  - Meta secrets about secrets',
          '',
          '💡 Usage: secret <category>',
          '💡 Example: secret personal',
          '',
          '🎯 Random secret of the day:',
          `  ${secrets.personal[Math.floor(Math.random() * secrets.personal.length)]}`,
          ''
        ],
        type: 'info'
      }
    }
  },

  'fortune': {
    name: 'fortune',
    aliases: ['quote', 'wisdom'],
    description: 'Get a random fortune or tech wisdom',
    usage: 'fortune [tech|motivational|funny]',
    category: 'fun',
    hidden: true,
    handler: (args) => {
      const fortunes = {
        tech: [
          '"There are only two hard things in Computer Science: cache invalidation and naming things." - Phil Karlton',
          '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
          '"First, solve the problem. Then, write the code." - John Johnson',
          '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
          '"The best error message is the one that never shows up." - Thomas Fuchs',
          '"Debugging is twice as hard as writing the code in the first place." - Brian Kernighan'
        ],
        motivational: [
          '"The only way to do great work is to love what you do." - Steve Jobs',
          '"Innovation distinguishes between a leader and a follower." - Steve Jobs',
          '"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt',
          '"Success is not final, failure is not fatal: it is the courage to continue that counts." - Winston Churchill',
          '"The only impossible journey is the one you never begin." - Tony Robbins'
        ],
        funny: [
          '"99 little bugs in the code, 99 little bugs. Take one down, patch it around, 117 little bugs in the code."',
          '"A user interface is like a joke. If you have to explain it, it\'s not that good."',
          '"Programming is 10% science, 20% ingenuity, and 70% getting the ingenuity to work with the science."',
          '"There are two ways to write error-free programs; only the third one works."',
          '"I don\'t always test my code, but when I do, I do it in production."'
        ]
      }

      const category = args[0]?.toLowerCase() as keyof typeof fortunes
      const selectedFortunes = category && fortunes[category] ? fortunes[category] : [
        ...fortunes.tech,
        ...fortunes.motivational,
        ...fortunes.funny
      ]

      const randomFortune = selectedFortunes[Math.floor(Math.random() * selectedFortunes.length)]

      return {
        success: true,
        output: [
          '',
          '🔮 FORTUNE COOKIE',
          '═══════════════════════════════════════════════════════',
          '',
          `  ${randomFortune}`,
          '',
          '💡 Categories: tech, motivational, funny',
          '💡 Usage: fortune <category>',
          ''
        ],
        type: 'info'
      }
    }
  },

  'sudo make me a sandwich': {
    name: 'sudo make me a sandwich',
    description: 'XKCD reference - make a sandwich with sudo',
    usage: 'sudo make me a sandwich',
    category: 'fun',
    hidden: true,
    handler: () => ({
      success: true,
      output: [
        '',
        '🥪 SANDWICH MAKER 3000™ ACTIVATED',
        '',
        '  [████████████████████████████████] 100%',
        '  Selecting premium ingredients...',
        '  Applying optimal sandwich algorithms...',
        '  Compiling flavors...',
        '  Deploying to plate...',
        '',
        '  🍞 Fresh artisan bread: ✅',
        '  🥬 Crispy lettuce: ✅',
        '  🍅 Ripe tomatoes: ✅',
        '  🧀 Aged cheese: ✅',
        '  🥓 Crispy bacon: ✅',
        '',
        '  ✅ SANDWICH SUCCESSFULLY COMPILED!',
        '',
        '  💡 Reference: XKCD #149 - "Sandwich"',
        '  🔗 https://xkcd.com/149/',
        '  😄 "Okay." - The power of sudo!',
        ''
      ],
      type: 'success'
    })
  },

  'make me a sandwich': {
    name: 'make me a sandwich',
    description: 'XKCD reference - try to make a sandwich without sudo',
    usage: 'make me a sandwich',
    category: 'fun',
    hidden: true,
    handler: () => ({
      success: false,
      output: [
        '',
        '🚫 PERMISSION DENIED',
        '',
        '  ❌ Error: Insufficient privileges to make sandwich',
        '  🔒 Access denied: Kitchen resources require elevated permissions',
        '',
        '  💡 Hint: Try "sudo make me a sandwich"',
        '  📚 Reference: XKCD #149 - "Sandwich"',
        '  🔗 https://xkcd.com/149/',
        ''
      ],
      type: 'error'
    })
  },

  'the answer': {
    name: 'the answer',
    aliases: ['42', 'meaning of life'],
    description: 'The Answer to the Ultimate Question of Life, the Universe, and Everything',
    usage: 'the answer',
    category: 'fun',
    hidden: true,
    handler: () => ({
      success: true,
      output: [
        '',
        '🌌 THE ANSWER TO THE ULTIMATE QUESTION',
        '   OF LIFE, THE UNIVERSE, AND EVERYTHING',
        '',
        '  [████████████████████████████████] 100%',
        '  Deep Thought computing...',
        '  Processing for 7.5 million years...',
        '  Calculating ultimate answer...',
        '',
        '  🎯 THE ANSWER IS:',
        '',
        '        ██╗  ██╗██████╗ ',
        '        ██║  ██║╚════██╗',
        '        ███████║ █████╔╝',
        '        ╚════██║██╔═══╝ ',
        '             ██║███████╗',
        '             ╚═╝╚══════╝',
        '',
        '  💡 "I think the problem, to be quite honest with you,',
        '     is that you\'ve never actually known what the question is."',
        '',
        '  📚 Reference: The Hitchhiker\'s Guide to the Galaxy',
        '  👨‍🚀 By Douglas Adams',
        ''
      ],
      type: 'info'
    })
  },

  'hello world': {
    name: 'hello world',
    aliases: ['hello', 'hi'],
    description: 'The classic first program',
    usage: 'hello world',
    category: 'fun',
    hidden: true,
    handler: () => ({
      success: true,
      output: [
        '',
        '👋 HELLO, WORLD!',
        '',
        '  🌍 Greetings from the terminal!',
        '  💻 Your first program is running successfully',
        '  🎉 Welcome to the wonderful world of programming!',
        '',
        '  📚 Fun fact: "Hello, World!" was first used in',
        '     "The C Programming Language" by Kernighan & Ritchie (1978)',
        '',
        '  🚀 From here, you can build anything!',
        ''
      ],
      type: 'success'
    })
  },

  'ping google.com': {
    name: 'ping google.com',
    aliases: ['ping'],
    description: 'Ping Google servers',
    usage: 'ping google.com',
    category: 'fun',
    hidden: true,
    handler: () => ({
      success: true,
      output: [
        '',
        '🌐 PING google.com (172.217.16.142): 56 data bytes',
        '',
        '64 bytes from 172.217.16.142: icmp_seq=1 ttl=117 time=12.4 ms',
        '64 bytes from 172.217.16.142: icmp_seq=2 ttl=117 time=11.8 ms',
        '64 bytes from 172.217.16.142: icmp_seq=3 ttl=117 time=13.2 ms',
        '64 bytes from 172.217.16.142: icmp_seq=4 ttl=117 time=12.1 ms',
        '',
        '--- google.com ping statistics ---',
        '4 packets transmitted, 4 received, 0% packet loss',
        'round-trip min/avg/max/stddev = 11.8/12.4/13.2/0.6 ms',
        '',
        '✅ Connection to the internet is stable!',
        '🚀 Ready for cloud deployments!',
        ''
      ],
      type: 'success'
    })
  },

  'uptime': {
    name: 'uptime',
    description: 'Show system uptime and load',
    usage: 'uptime',
    category: 'fun',
    hidden: true,
    handler: () => {
      const now = new Date()
      const uptimeHours = Math.floor(Math.random() * 720) + 24 // 1-30 days
      const uptimeDays = Math.floor(uptimeHours / 24)
      const remainingHours = uptimeHours % 24
      
      return {
        success: true,
        output: [
          '',
          `⏰ ${now.toLocaleTimeString()} up ${uptimeDays} days, ${remainingHours} hours, 3 users, load averages: 0.52 1.24 1.86`,
          '',
          '📊 System Status:',
          `  🟢 Uptime: ${uptimeDays} days, ${remainingHours} hours (99.9% availability)`,
          '  🟢 Load: Optimal (all systems green)',
          '  🟢 Users: 3 active sessions',
          '  🟢 Services: All services running smoothly',
          '',
          '🏆 Achievement: Rock-solid stability!',
          ''
        ],
        type: 'success'
      }
    }
  },

  'sl': {
    name: 'sl',
    description: 'Steam locomotive (typo of ls)',
    usage: 'sl',
    category: 'fun',
    hidden: true,
    handler: () => ({
      success: true,
      output: [
        '',
        '🚂 CHOO CHOO! Steam Locomotive incoming!',
        '',
        '                 (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      O',
        '            (@@@)',
        '        (    )',
        '      (@@@@)',
        '   (   )',
        '',
        '🚂💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨💨',
        '',
        '💡 Did you mean "ls"? This happens to the best of us!',
        '🎯 The "sl" command is a classic Unix joke for typos',
        '🚂 Enjoy your steam locomotive ride!',
        ''
      ],
      type: 'info',
      animation: 'typing'
    })
  },

  'cowsay': {
    name: 'cowsay',
    description: 'Make a cow say something',
    usage: 'cowsay [message]',
    category: 'fun',
    hidden: true,
    handler: (args) => {
      const message = args.join(' ') || 'Hello from the terminal!'
      const messageLength = message.length
      const border = '-'.repeat(messageLength + 2)
      
      return {
        success: true,
        output: [
          '',
          ` ${border}`,
          `< ${message} >`,
          ` ${border}`,
          '        \\   ^__^',
          '         \\  (oo)\\_______',
          '            (__)\\       )\\/\\',
          '                ||----w |',
          '                ||     ||',
          '',
          '🐄 Moo! The cow has spoken!',
          '💡 Try: cowsay "Your custom message here"',
          ''
        ],
        type: 'info'
      }
    }
  },

  matrix: {
    name: 'matrix',
    description: 'Enter the matrix',
    usage: 'matrix',
    category: 'fun',
    handler: () => ({
      success: true,
      output: [
        '',
        '🔴 ENTERING THE MATRIX... 🔴',
        '',
        '01001000 01100101 01101100 01101100 01101111',
        '01001110 01100101 01101111',
        '',
        '👁️  Wake up, Neo...',
        '💊 The Matrix has you...',
        '🕳️  Follow the white rabbit...',
        '',
        '🌐 Reality.exe has stopped working',
        '🔄 Loading alternative reality...',
        '',
        '✅ Welcome to the real world.',
        ''
      ],
      type: 'success',
      animation: 'matrix'
    })
  },

  coffee: {
    name: 'coffee',
    aliases: ['brew'],
    description: 'Brew some coffee',
    usage: 'coffee [type]',
    category: 'fun',
    handler: (args) => {
      const coffeeType = args[0] || 'espresso'
      return {
        success: true,
        output: [
          '',
          '☕ BREWING COFFEE...',
          '',
          '🫘 Grinding premium beans...',
          '💧 Heating water to optimal temperature...',
          '⏱️  Extracting perfect ' + coffeeType + '...',
          '',
          '✅ Your ' + coffeeType + ' is ready!',
          '',
          '🧠 +20 Focus',
          '⚡ +15 Energy',
          '💻 +10 Coding Speed',
          '',
          '☕ Enjoy your fuel for innovation!',
          ''
        ],
        type: 'success'
      }
    }
  },

  // Advanced DevOps commands
  'kubectl': {
    name: 'kubectl',
    description: 'Kubernetes cluster management',
    usage: 'kubectl <command>',
    category: 'devops',
    handler: (args) => {
      const subcommand = args[0]
      const resource = args[1]
      
      if (subcommand === 'get') {
        switch (resource) {
          case 'pods':
            return {
              success: true,
              output: [
                '',
                'NAME                                READY   STATUS    RESTARTS   AGE',
                'cession-app-7d4b8c5f-2x9k8         1/1     Running   0          2d',
                'cession-app-7d4b8c5f-9m3n7         1/1     Running   0          2d',
                'board-ai-deployment-6b8f9d-4k2l1   1/1     Running   0          1d',
                'goldentouch-api-5c7d8e-3j9m2       1/1     Running   0          3h',
                'redis-cache-8f2a1b-7n5k9           1/1     Running   0          5d',
                'postgres-db-9e3c2d-6h8j4           1/1     Running   0          5d',
                'nginx-ingress-controller-xyz123    1/1     Running   0          7d',
                'prometheus-server-abc456           1/1     Running   0          7d',
                '',
                '✅ All pods are running successfully',
                '📊 Cluster health: OPTIMAL'
              ],
              type: 'success'
            }
          
          case 'services':
            return {
              success: true,
              output: [
                '',
                'NAME                TYPE           CLUSTER-IP      EXTERNAL-IP     PORT(S)        AGE',
                'cession-app-svc     LoadBalancer   10.96.1.100     203.0.113.10    80:30080/TCP   2d',
                'board-ai-svc        ClusterIP      10.96.1.101     <none>          8080/TCP       1d',
                'goldentouch-svc     NodePort       10.96.1.102     <none>          80:32000/TCP   3h',
                'postgres-svc        ClusterIP      10.96.1.103     <none>          5432/TCP       5d',
                'redis-svc           ClusterIP      10.96.1.104     <none>          6379/TCP       5d',
                '',
                '🌐 Services are properly exposed',
                '🔒 Security groups configured'
              ],
              type: 'success'
            }
          
          case 'deployments':
            return {
              success: true,
              output: [
                '',
                'NAME                READY   UP-TO-DATE   AVAILABLE   AGE',
                'cession-app         2/2     2            2           2d',
                'board-ai            1/1     1            1           1d',
                'goldentouch-api     1/1     1            1           3h',
                'redis-cache         1/1     1            1           5d',
                'postgres-db         1/1     1            1           5d',
                '',
                '🚀 All deployments are healthy',
                '📈 Auto-scaling enabled for production workloads'
              ],
              type: 'success'
            }
          
          case 'nodes':
            return {
              success: true,
              output: [
                '',
                'NAME                STATUS   ROLES           AGE   VERSION',
                'master-node-01      Ready    control-plane   30d   v1.28.2',
                'worker-node-01      Ready    <none>          30d   v1.28.2',
                'worker-node-02      Ready    <none>          30d   v1.28.2',
                'worker-node-03      Ready    <none>          15d   v1.28.2',
                '',
                '🏗️  Cluster: 4 nodes (1 master, 3 workers)',
                '💾 Total capacity: 64 vCPUs, 256GB RAM',
                '📊 Resource utilization: 68%'
              ],
              type: 'success'
            }
          
          default:
            return {
              success: false,
              output: [
                `Error: resource type "${resource}" not supported`,
                '',
                'Available resources:',
                '  pods, services, deployments, nodes, namespaces'
              ],
              type: 'error'
            }
        }
      }
      
      if (subcommand === 'describe' && resource) {
        return {
          success: true,
          output: [
            `Name:         ${resource}`,
            'Namespace:    default',
            'Labels:       app=nassim-portfolio',
            '              version=v2.1.0',
            'Annotations:  deployment.kubernetes.io/revision: 3',
            '',
            'Status:       Running',
            'IP:           10.244.1.15',
            'Node:         worker-node-02/192.168.1.102',
            '',
            'Containers:',
            '  app:',
            '    Image:      registry.nassim.dev/app:v2.1.0',
            '    Port:       8080/TCP',
            '    State:      Running',
            '    Ready:      True',
            '    Restart Count: 0',
            '',
            'Events:',
            '  Normal  Scheduled  2d   Successfully assigned default/pod to worker-node-02',
            '  Normal  Pulled     2d   Container image pulled successfully',
            '  Normal  Created    2d   Created container app',
            '  Normal  Started    2d   Started container app'
          ],
          type: 'info'
        }
      }

      return {
        success: true,
        output: [
          'kubectl: Kubernetes command-line tool',
          '',
          'Available commands:',
          '  kubectl get pods        - List all pods',
          '  kubectl get services    - List all services',
          '  kubectl get deployments - List all deployments',
          '  kubectl get nodes       - List cluster nodes',
          '  kubectl describe <resource> - Describe resource',
          '  kubectl logs <pod>      - View pod logs',
          '  kubectl exec <pod>      - Execute command in pod',
          '',
          '💡 Try: kubectl get pods'
        ],
        type: 'info'
      }
    }
  },

  'terraform': {
    name: 'terraform',
    description: 'Infrastructure as Code management',
    usage: 'terraform <command>',
    category: 'devops',
    handler: (args) => {
      const subcommand = args[0]
      
      if (subcommand === 'plan') {
        return {
          success: true,
          output: [
            '',
            '🏗️  TERRAFORM PLAN',
            '═══════════════════════════════════════════════════════',
            '',
            'Terraform used the selected providers to generate the following',
            'execution plan. Resource actions are indicated with the following',
            'symbols:',
            '  + create',
            '  ~ update in-place',
            '  - destroy',
            '',
            'Terraform will perform the following actions:',
            '',
            '  # aws_eks_cluster.main will be created',
            '  + resource "aws_eks_cluster" "main" {',
            '      + name     = "production-cluster"',
            '      + version  = "1.28"',
            '    }',
            '',
            '  # aws_eks_node_group.main will be created',
            '  + resource "aws_eks_node_group" "main" {',
            '      + cluster_name = "production-cluster"',
            '      + scaling_config {',
            '          + desired_size = 3',
            '          + max_size     = 10',
            '          + min_size     = 1',
            '        }',
            '    }',
            '',
            'Plan: 2 to add, 0 to change, 0 to destroy.',
            '',
            '💡 Run "terraform apply" to execute this plan'
          ],
          type: 'info'
        }
      }

      return {
        success: true,
        output: [
          'terraform: Infrastructure as Code tool',
          '',
          'Available commands:',
          '  terraform plan     - Show execution plan',
          '  terraform apply    - Apply infrastructure changes',
          '  terraform destroy  - Destroy infrastructure',
          '  terraform validate - Validate configuration',
          '',
          '💡 Try: terraform plan'
        ],
        type: 'info'
      }
    }
  },

  'docker': {
    name: 'docker',
    description: 'Container management',
    usage: 'docker <command>',
    category: 'devops',
    handler: (args) => {
      const subcommand = args[0]
      
      if (subcommand === 'ps') {
        return {
          success: true,
          output: [
            '',
            'CONTAINER ID   IMAGE                    COMMAND                  STATUS         PORTS                    NAMES',
            '7f8a9b2c3d4e   cession-app:latest      "java -jar app.jar"      Up 2 days      0.0.0.0:8080->8080/tcp   cession-app',
            '1e2f3a4b5c6d   postgres:13             "docker-entrypoint.s…"   Up 5 days      0.0.0.0:5432->5432/tcp   postgres-db',
            '9g8h7i6j5k4l   redis:alpine            "docker-entrypoint.s…"   Up 5 days      0.0.0.0:6379->6379/tcp   redis-cache',
            '3m4n5o6p7q8r   nginx:alpine            "/docker-entrypoint.…"   Up 3 days      0.0.0.0:80->80/tcp       nginx-proxy',
            '',
            '📦 4 containers running',
            '💾 Total memory usage: 2.1GB'
          ],
          type: 'success'
        }
      }

      return {
        success: true,
        output: [
          'docker: Container platform',
          '',
          'Available commands:',
          '  docker ps           - List running containers',
          '  docker images       - List images',
          '  docker build        - Build image from Dockerfile',
          '  docker run          - Run a container',
          '',
          '💡 Try: docker ps'
        ],
        type: 'info'
      }
    }
  },

  'ansible-playbook': {
    name: 'ansible-playbook',
    description: 'Run Ansible automation playbooks',
    usage: 'ansible-playbook <playbook>',
    category: 'devops',
    handler: (args) => {
      const playbook = args[0] || 'site.yml'
      
      return {
        success: true,
        output: [
          '',
          `🤖 RUNNING ANSIBLE PLAYBOOK: ${playbook}`,
          '═══════════════════════════════════════════════════════',
          '',
          'PLAY [Deploy Application] *******************************************',
          '',
          'TASK [Gathering Facts] *******************************************',
          'ok: [web-server-01]',
          'ok: [web-server-02]',
          'ok: [web-server-03]',
          '',
          'TASK [Update system packages] ***********************************',
          'changed: [web-server-01]',
          'changed: [web-server-02]',
          'changed: [web-server-03]',
          '',
          'TASK [Deploy application] ************************************',
          'changed: [web-server-01]',
          'changed: [web-server-02]',
          'changed: [web-server-03]',
          '',
          'TASK [Restart services] **************************************',
          'changed: [web-server-01]',
          'changed: [web-server-02]',
          'changed: [web-server-03]',
          '',
          'PLAY RECAP ***************************************************',
          'web-server-01              : ok=4    changed=3    unreachable=0    failed=0',
          'web-server-02              : ok=4    changed=3    unreachable=0    failed=0',
          'web-server-03              : ok=4    changed=3    unreachable=0    failed=0',
          '',
          '✅ Playbook execution completed successfully!',
          '⏱️  Total time: 2m 34s'
        ],
        type: 'success',
        animation: 'deploy'
      }
    }
  },

  'monitor': {
    name: 'monitor',
    aliases: ['htop', 'top'],
    description: 'System monitoring dashboard',
    usage: 'monitor',
    category: 'devops',
    handler: () => ({
      success: true,
      output: [
        '',
        '📊 SYSTEM MONITORING DASHBOARD',
        '═══════════════════════════════════════════════════════',
        '',
        '🖥️  System Information:',
        '   OS: Ubuntu 22.04 LTS (Cloud Engineer Edition)',
        '   Kernel: 5.15.0-cloud-optimized',
        '   Uptime: 42 days, 13:37:42',
        '',
        '⚡ Performance Metrics:',
        '   CPU Usage:    [████████░░] 78%',
        '   Memory:       [██████░░░░] 64% (12.8GB / 20GB)',
        '   Disk I/O:     [███░░░░░░░] 32%',
        '   Network:      [██████████] 95% (1.2 Gbps)',
        '',
        '🚀 Active Services:',
        '   ✅ Kubernetes Cluster    (3 nodes, 47 pods)',
        '   ✅ Docker Engine         (12 containers)',
        '   ✅ PostgreSQL            (5 databases)',
        '   ✅ Redis Cache           (2.1GB cached)',
        '   ✅ Nginx Load Balancer   (99.9% uptime)',
        '',
        '📈 Recent Activity:',
        '   • Deployed cession-app v2.1.0 (2 hours ago)',
        '   • Scaled board-ai replicas to 5 (4 hours ago)',
        '   • Updated security patches (1 day ago)',
        '',
        '🎯 Performance Score: 94/100 (Excellent)',
        ''
      ],
      type: 'success'
    })
  },

  // Advanced cloud commands
  'aws': {
    name: 'aws',
    description: 'AWS CLI commands',
    usage: 'aws <service> <command>',
    category: 'cloud',
    handler: (args) => {
      const service = args[0]
      const command = args[1]
      
      if (service === 'ec2' && command === 'describe-instances') {
        return {
          success: true,
          output: [
            '',
            '🌩️  AWS EC2 INSTANCES',
            '═══════════════════════════════════════════════════════',
            '',
            'Instance ID       Type        State     Public IP       Private IP      Name',
            'i-0123456789abcdef0  t3.large   running   203.0.113.10   10.0.1.10      web-server-01',
            'i-0987654321fedcba0  t3.large   running   203.0.113.11   10.0.1.11      web-server-02',
            'i-0abcdef123456789   t3.xlarge  running   203.0.113.12   10.0.1.12      app-server-01',
            'i-0fedcba987654321   r5.large   running   203.0.113.13   10.0.1.13      db-server-01',
            '',
            '📊 Total instances: 4 running',
            '💰 Estimated monthly cost: $847.32'
          ],
          type: 'success'
        }
      }
      
      if (service === 's3' && command === 'ls') {
        return {
          success: true,
          output: [
            '',
            '📦 AWS S3 BUCKETS',
            '═══════════════════════════════════════════════════════',
            '',
            '2024-01-15 10:30:45 nassim-portfolio-assets',
            '2024-01-10 14:22:33 nassim-backup-storage',
            '2024-01-05 09:15:21 nassim-logs-archive',
            '2023-12-20 16:45:12 nassim-terraform-state',
            '',
            '📊 Total buckets: 4',
            '💾 Total storage: 2.3 TB'
          ],
          type: 'success'
        }
      }
      
      return {
        success: true,
        output: [
          'aws: Amazon Web Services CLI',
          '',
          'Available services:',
          '  aws ec2 describe-instances  - List EC2 instances',
          '  aws s3 ls                   - List S3 buckets',
          '  aws lambda list-functions   - List Lambda functions',
          '  aws rds describe-instances  - List RDS instances',
          '',
          '💡 Try: aws ec2 describe-instances'
        ],
        type: 'info'
      }
    }
  },

  'helm': {
    name: 'helm',
    description: 'Kubernetes package manager',
    usage: 'helm <command>',
    category: 'devops',
    handler: (args) => {
      const command = args[0]
      
      if (command === 'list') {
        return {
          success: true,
          output: [
            '',
            'NAME            NAMESPACE   REVISION    UPDATED                     STATUS      CHART               APP VERSION',
            'cession-app     default     3           2024-01-15 10:30:45 UTC    deployed    cession-app-2.1.0   2.1.0',
            'board-ai        default     1           2024-01-14 14:22:33 UTC    deployed    board-ai-1.0.0      1.0.0',
            'prometheus      monitoring  2           2024-01-10 09:15:21 UTC    deployed    prometheus-15.18.0  2.45.0',
            'grafana         monitoring  1           2024-01-10 09:20:15 UTC    deployed    grafana-6.58.9      10.1.1',
            'nginx-ingress   ingress     4           2024-01-08 16:45:12 UTC    deployed    nginx-ingress-4.7.1 1.8.1',
            '',
            '📦 5 releases deployed successfully',
            '🔄 All charts are up to date'
          ],
          type: 'success'
        }
      }
      
      return {
        success: true,
        output: [
          'helm: The Kubernetes Package Manager',
          '',
          'Available commands:',
          '  helm list           - List deployed releases',
          '  helm install        - Install a chart',
          '  helm upgrade        - Upgrade a release',
          '  helm rollback       - Rollback a release',
          '',
          '💡 Try: helm list'
        ],
        type: 'info'
      }
    }
  },

  'git': {
    name: 'git',
    description: 'Version control system',
    usage: 'git <command>',
    category: 'devops',
    handler: (args) => {
      const command = args[0]
      
      if (command === 'status') {
        return {
          success: true,
          output: [
            'On branch main',
            'Your branch is up to date with \'origin/main\'.',
            '',
            'Changes to be committed:',
            '  (use "git reset HEAD <file>..." to unstage)',
            '',
            '        modified:   src/components/terminal/command-registry.ts',
            '        new file:   src/components/terminal/advanced-commands.ts',
            '',
            'Changes not staged for commit:',
            '  (use "git add <file>..." to update what will be committed)',
            '',
            '        modified:   README.md',
            '        modified:   package.json',
            '',
            '🔄 Ready for commit and deployment'
          ],
          type: 'info'
        }
      }
      
      if (command === 'log') {
        return {
          success: true,
          output: [
            'commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0 (HEAD -> main, origin/main)',
            'Author: Nassim Maaoui <nassimmaaoui@outlook.com>',
            'Date:   Mon Jan 15 10:30:45 2024 +0100',
            '',
            '    feat: enhance terminal with advanced cloud commands',
            '',
            'commit b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1',
            'Author: Nassim Maaoui <nassimmaaoui@outlook.com>',
            'Date:   Sun Jan 14 14:22:33 2024 +0100',
            '',
            '    fix: improve kubernetes integration and monitoring',
            '',
            'commit c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1b2',
            'Author: Nassim Maaoui <nassimmaaoui@outlook.com>',
            'Date:   Sat Jan 13 09:15:21 2024 +0100',
            '',
            '    feat: add AI-powered deployment automation'
          ],
          type: 'info'
        }
      }
      
      return {
        success: true,
        output: [
          'git: distributed version control system',
          '',
          'Available commands:',
          '  git status      - Show working tree status',
          '  git log         - Show commit history',
          '  git add         - Add files to staging area',
          '  git commit      - Record changes to repository',
          '  git push        - Upload changes to remote',
          '',
          '💡 Try: git status'
        ],
        type: 'info'
      }
    }
  },

  'ai': {
    name: 'ai',
    aliases: ['chat', 'assistant'],
    description: 'Start AI assistant chat',
    usage: 'ai [message]',
    category: 'ai',
    handler: (args) => {
      const message = args.join(' ')
      
      if (message) {
        return {
          success: true,
          output: [
            '',
            '🤖 AI ASSISTANT RESPONSE',
            '═══════════════════════════════════════════════════════',
            '',
            `You asked: "${message}"`,
            '',
            '🧠 Processing your request with advanced AI models...',
            '',
            'Hello! I\'m Nassim\'s AI assistant. I can help you with:',
            '• Technical questions about cloud architecture',
            '• DevOps best practices and automation',
            '• Kubernetes deployment strategies',
            '• AI/ML model optimization',
            '• Infrastructure as Code (Terraform/Ansible)',
            '• Performance monitoring and troubleshooting',
            '',
            '💡 Ask me anything about cloud-native engineering!',
            '💡 Try: "ai explain kubernetes networking"',
            '💡 Try: "ai optimize terraform deployment"'
          ],
          type: 'success'
        }
      }
      
      return {
        success: true,
        output: [
          '',
          '🤖 NASSIM\'S AI ASSISTANT',
          '═══════════════════════════════════════════════════════',
          '',
          '🧠 AI Models Available:',
          '  • GPT-4 Turbo (General Intelligence)',
          '  • Claude-3 Opus (Technical Analysis)',
          '  • Llama-2 70B (Code Generation)',
          '  • Custom DevOps Model (Infrastructure)',
          '',
          '🎯 Specializations:',
          '  • Cloud Architecture Design',
          '  • Kubernetes & Container Orchestration',
          '  • Infrastructure as Code (IaC)',
          '  • CI/CD Pipeline Optimization',
          '  • Performance Monitoring & Alerting',
          '  • Security Best Practices',
          '',
          '💬 Usage: ai <your question>',
          '💡 Example: ai explain microservices architecture',
          ''
        ],
        type: 'info'
      }
    }
  },

  'train': {
    name: 'train',
    description: 'Simulate AI model training',
    usage: 'train <model-name>',
    category: 'ai',
    handler: async (args) => {
      const modelName = args[0] || 'default-model'
      
      return {
        success: true,
        output: [
          '',
          `🧠 TRAINING AI MODEL: ${modelName.toUpperCase()}`,
          '═══════════════════════════════════════════════════════',
          '',
          '📊 Training Configuration:',
          '  • Dataset: 50,000 samples',
          '  • Architecture: Transformer (12 layers)',
          '  • Batch Size: 32',
          '  • Learning Rate: 0.001',
          '  • GPU: NVIDIA A100 (40GB)',
          '',
          '🔄 Training Progress:',
          '  Epoch 1/10: Loss: 2.341 | Accuracy: 67.2% | Time: 2m 15s',
          '  Epoch 2/10: Loss: 1.892 | Accuracy: 74.8% | Time: 2m 12s',
          '  Epoch 3/10: Loss: 1.654 | Accuracy: 79.1% | Time: 2m 18s',
          '  Epoch 4/10: Loss: 1.423 | Accuracy: 83.5% | Time: 2m 14s',
          '  Epoch 5/10: Loss: 1.287 | Accuracy: 86.2% | Time: 2m 16s',
          '',
          '✅ Training completed successfully!',
          '',
          '📈 Final Results:',
          '  • Final Accuracy: 92.4%',
          '  • Validation Loss: 0.891',
          '  • Training Time: 23m 47s',
          '  • Model Size: 1.2GB',
          '',
          '💾 Model saved to: /models/' + modelName + '-v1.0.pkl',
          '🚀 Ready for deployment!'
        ],
        type: 'success',
        animation: 'deploy'
      }
    }
  },

  'inference': {
    name: 'inference',
    description: 'Run AI model inference',
    usage: 'inference <model-name> [input]',
    category: 'ai',
    handler: (args) => {
      const modelName = args[0] || 'board-ai'
      const input = args.slice(1).join(' ') || 'sample input'
      
      return {
        success: true,
        output: [
          '',
          `🔮 RUNNING INFERENCE: ${modelName.toUpperCase()}`,
          '═══════════════════════════════════════════════════════',
          '',
          '📥 Input Processing:',
          `  • Input: "${input}"`,
          '  • Preprocessing: ✅ Complete',
          '  • Tokenization: ✅ Complete',
          '  • Feature Extraction: ✅ Complete',
          '',
          '🧠 Model Execution:',
          '  • Loading model weights... ✅',
          '  • Forward pass... ✅',
          '  • Computing probabilities... ✅',
          '',
          '📊 Results:',
          '  • Confidence: 94.7%',
          '  • Inference Time: 120ms',
          '  • Memory Usage: 2.1GB',
          '',
          '🎯 Predictions:',
          '  1. Resistor (0.347)',
          '  2. Capacitor (0.289)',
          '  3. Transistor (0.234)',
          '  4. Diode (0.130)',
          '',
          '✅ Inference completed successfully!',
          '⚡ Average latency: 120ms (Production ready)'
        ],
        type: 'success'
      }
    }
  },

  'logs': {
    name: 'logs',
    aliases: ['tail'],
    description: 'View service logs',
    usage: 'logs <service-name>',
    category: 'devops',
    handler: (args) => {
      const service = args[0] || 'cession-app'
      
      return {
        success: true,
        output: [
          '',
          `📋 LOGS: ${service.toUpperCase()}`,
          '═══════════════════════════════════════════════════════',
          '',
          '2024-01-15T10:30:45.123Z [INFO]  Application started successfully',
          '2024-01-15T10:30:45.456Z [INFO]  Database connection established',
          '2024-01-15T10:30:45.789Z [INFO]  Redis cache connected',
          '2024-01-15T10:30:46.012Z [INFO]  JWT authentication configured',
          '2024-01-15T10:30:46.345Z [INFO]  API endpoints registered',
          '2024-01-15T10:30:46.678Z [INFO]  Server listening on port 8080',
          '2024-01-15T10:31:15.234Z [INFO]  User login: user@example.com',
          '2024-01-15T10:31:23.567Z [INFO]  Session created: sess_abc123',
          '2024-01-15T10:31:45.890Z [INFO]  Contract created: contract_xyz789',
          '2024-01-15T10:32:12.123Z [INFO]  Payment processed: $1,250.00',
          '2024-01-15T10:32:34.456Z [INFO]  Audit log updated',
          '2024-01-15T10:33:01.789Z [INFO]  Health check: OK',
          '',
          '📊 Log Summary:',
          '  • Total entries: 1,247',
          '  • Errors: 0',
          '  • Warnings: 2',
          '  • Info: 1,245',
          '',
          '✅ Service is running healthy'
        ],
        type: 'success'
      }
    }
  },

  'hack-the-planet': {
    name: 'hack-the-planet',
    description: 'Elite hacker mode activation',
    usage: 'hack-the-planet',
    category: 'fun',
    handler: () => ({
      success: true,
      output: [
        '',
        '🌍 HACK THE PLANET INITIATED 🌍',
        '',
        '⚡ ACCESSING MAINFRAME...',
        '🔓 BYPASSING SECURITY PROTOCOLS...',
        '💻 INFILTRATING THE GIBSON...',
        '',
        '████████████████████████████████████████',
        '█ ELITE HACKER MODE: ACTIVATED         █',
        '█ SECURITY LEVEL: MAXIMUM              █',
        '█ ENCRYPTION: QUANTUM-RESISTANT        █',
        '█ STATUS: ZERO COOL APPROVED           █',
        '████████████████████████████████████████',
        '',
        '🎭 "Mess with the best, die like the rest"',
        '🚀 "They\'re trashing our rights!"',
        '💾 "This is our world now... the world of the electron"',
        '',
        '🔥 WELCOME TO THE UNDERGROUND, HACKER!',
        '🌐 The planet is now in your capable hands...',
        '',
        '⚠️  Remember: With great power comes great responsibility',
        '💡 Use your skills to build, not destroy',
        ''
      ],
      type: 'success',
      animation: 'matrix'
    })
  },

  'cat': {
    name: 'cat',
    description: 'Display file contents',
    usage: 'cat <filename>',
    category: 'system',
    handler: (args) => {
      const filename = args[0]
      
      if (filename === 'resume' || filename === 'cv') {
        return {
          success: true,
          output: [
            '',
            '╔═══════════════════════════════════════════════════════════════════════════════╗',
            '║                           NASSIM MAAOUI - RESUME                             ║',
            '║                     Cloud Engineer & DevOps Architect                        ║',
            '╚═══════════════════════════════════════════════════════════════════════════════╝',
            '',
            '👨‍💻 PERSONAL INFORMATION',
            '   Name: Nassim Maaoui',
            '   Location: Tunisia',
            '   Email: nassimmaaoui@outlook.com',
            '   LinkedIn: linkedin.com/in/maaoui-nassim-1a5636279',
            '   GitHub: github.com/iborntowin',
            '',
            '🎯 PROFESSIONAL SUMMARY',
            '   Experienced Cloud Engineer specializing in scalable architectures,',
            '   infrastructure automation, and AI-powered systems. Proven track',
            '   record of deploying high-performance applications with 99.9% uptime.',
            '',
            '💼 EXPERIENCE',
            '   Senior Cloud Engineer | 2022 - Present',
            '   • Designed and implemented cloud-native architectures',
            '   • Automated infrastructure with Terraform and Ansible',
            '   • Built CI/CD pipelines reducing deployment time by 75%',
            '   • Led migration of 15+ applications to Kubernetes',
            '',
            '🛠️  TECHNICAL SKILLS',
            '   Cloud: AWS, Azure, GCP, Kubernetes, Docker',
            '   DevOps: Terraform, Ansible, Jenkins, GitLab CI/CD',
            '   Languages: Python, Java, TypeScript, Go',
            '   AI/ML: TensorFlow, PyTorch, OpenCV, Hugging Face',
            '   Databases: PostgreSQL, MongoDB, Redis',
            '',
            '🏆 ACHIEVEMENTS',
            '   • 25+ successful project deployments',
            '   • 2.1k+ GitHub stars across projects',
            '   • 99.9% uptime across production systems',
            '   • 92% AI model accuracy in computer vision',
            '',
            '🎓 EDUCATION',
            '   Master\'s in Computer Engineering',
            '   Specialization: Cloud Computing & AI',
            ''
          ],
          type: 'info'
        }
      }
      
      if (filename === 'docker-compose.yml') {
        return {
          success: true,
          output: [
            'version: \'3.8\'',
            '',
            'services:',
            '  app:',
            '    build: .',
            '    ports:',
            '      - "8080:8080"',
            '    environment:',
            '      - DATABASE_URL=postgresql://user:pass@db:5432/app',
            '      - REDIS_URL=redis://redis:6379',
            '    depends_on:',
            '      - db',
            '      - redis',
            '',
            '  db:',
            '    image: postgres:13',
            '    environment:',
            '      - POSTGRES_DB=app',
            '      - POSTGRES_USER=user',
            '      - POSTGRES_PASSWORD=pass',
            '    volumes:',
            '      - postgres_data:/var/lib/postgresql/data',
            '',
            '  redis:',
            '    image: redis:alpine',
            '    ports:',
            '      - "6379:6379"',
            '',
            'volumes:',
            '  postgres_data:'
          ],
          type: 'info'
        }
      }
      
      return {
        success: false,
        output: [
          `cat: ${filename}: No such file or directory`,
          '',
          'Available files:',
          '  resume, cv           - Display resume/CV',
          '  docker-compose.yml   - Docker compose configuration',
          '  package.json         - Node.js dependencies',
          '  terraform.tf         - Infrastructure configuration'
        ],
        type: 'error'
      }
    }
  },

  'ps': {
    name: 'ps',
    description: 'Show running processes',
    usage: 'ps [aux]',
    category: 'system',
    handler: (args) => {
      return {
        success: true,
        output: [
          '',
          'PID    USER     %CPU  %MEM  COMMAND',
          '1      root     0.1   0.2   /sbin/init',
          '123    nassim   2.3   4.1   node /app/server.js',
          '456    nassim   1.8   3.2   python /app/ai-service.py',
          '789    nassim   0.5   1.1   redis-server',
          '1011   nassim   0.8   2.3   postgres: main process',
          '1213   nassim   0.3   0.8   nginx: master process',
          '1415   nassim   0.1   0.4   ssh-agent',
          '1617   nassim   0.2   0.6   systemd --user',
          '',
          '📊 System Load: 1.23, 1.45, 1.67',
          '💾 Memory Usage: 68% (13.6GB / 20GB)',
          '⚡ CPU Usage: 23%'
        ],
        type: 'success'
      }
    }
  },
  'uptime': {
    name: 'uptime',
    description: 'Show system uptime',
    usage: 'uptime',
    category: 'system',
    handler: () => ({
      success: true,
      output: [
        ' 10:30:45 up 42 days, 13:37, 3 users, load average: 1.23, 1.45, 1.67',
        '',
        '🚀 System has been running for 42 days without interruption',
        '⚡ Performance: Excellent',
        '🔧 Last maintenance: 15 days ago',
        '📊 Availability: 99.97%'
      ],
      type: 'success'
    })
  },

  'free': {
    name: 'free',
    description: 'Display memory usage',
    usage: 'free [-h]',
    category: 'system',
    handler: (args) => {
      const human = args.includes('-h')
      
      if (human) {
        return {
          success: true,
          output: [
            '              total        used        free      shared  buff/cache   available',
            'Mem:           20Gi        13Gi        1.2Gi       256Mi        5.8Gi        6.2Gi',
            'Swap:          4.0Gi          0B        4.0Gi',
            '',
            '📊 Memory utilization: 68%',
            '🔄 Swap usage: 0% (optimal)',
            '⚡ Cache efficiency: 92%'
          ],
          type: 'success'
        }
      }
      
      return {
        success: true,
        output: [
          '              total        used        free      shared  buff/cache   available',
          'Mem:       20971520    13631488     1258496      262144     6081536     6553600',
          'Swap:       4194304           0     4194304',
          '',
          '💡 Use "free -h" for human-readable format'
        ],
        type: 'success'
      }
    }
  },

  'df': {
    name: 'df',
    description: 'Display filesystem disk space usage',
    usage: 'df [-h]',
    category: 'system',
    handler: (args) => {
      const human = args.includes('-h')
      
      if (human) {
        return {
          success: true,
          output: [
            'Filesystem      Size  Used Avail Use% Mounted on',
            '/dev/sda1       100G   68G   27G  72% /',
            '/dev/sda2       500G  234G  241G  50% /home',
            '/dev/sdb1       1.0T  456G  512G  48% /data',
            'tmpfs           10G   2.1G  7.9G  21% /tmp',
            '',
            '💾 Total storage: 1.6TB',
            '📊 Used: 760GB (47%)',
            '🆓 Available: 840GB'
          ],
          type: 'success'
        }
      }
      
      return {
        success: true,
        output: [
          'Filesystem     1K-blocks      Used Available Use% Mounted on',
          '/dev/sda1      104857600  71303168  28311552  72% /',
          '/dev/sda2      524288000 245760000 252706816  50% /home',
          '/dev/sdb1     1073741824 478150656 536870912  48% /data',
          '',
          '💡 Use "df -h" for human-readable format'
        ],
        type: 'success'
      }
    }
  },

  'hints': {
    name: 'hints',
    aliases: ['tip', 'tips'],
    description: 'Get hints about hidden commands and features',
    usage: 'hints',
    category: 'fun',
    handler: () => {
      const hints = [
        '🥚 Try typing famous movie quotes - some might work!',
        '🎮 Classic Unix commands have fun alternatives here',
        '🤖 Some commands respond differently based on the time',
        '🎯 Typos might lead to unexpected discoveries',
        '🌟 Certain key combinations trigger special effects',
        '🎭 Pop culture references are hidden throughout',
        '🔍 The number 42 has special meaning here',
        '🚀 Space-related commands might surprise you',
        '☕ Coffee-related commands are more than they seem',
        '🐧 Linux enthusiasts will find familiar friends'
      ]
      
      const randomHints = hints.sort(() => 0.5 - Math.random()).slice(0, 5)
      
      return {
        success: true,
        output: [
          '',
          '💡 TERMINAL HINTS & TIPS',
          '═══════════════════════════════════════════════════════',
          '',
          '🎯 Today\'s discovery hints:',
          ...randomHints.map(hint => `  ${hint}`),
          '',
          '🔍 Discovery methods:',
          '  • Try common typos of regular commands',
          '  • Type famous quotes or movie references',
          '  • Use classic Unix/Linux command names',
          '  • Experiment with pop culture references',
          '  • Look for number patterns and sequences',
          '',
          '🏆 Achievement system:',
          '  • Find hidden commands to unlock achievements',
          '  • Each Easter egg reveals portfolio secrets',
          '  • Some commands have multiple responses',
          '',
          '💡 Use "secret easter_eggs" for meta-hints!',
          ''
        ],
        type: 'info'
      }
    }
  }

}

// Auto-completion suggestions
export function getCommandSuggestions(input: string): string[] {
  if (!input || input.trim() === '') {
    return []
  }

  const commands = Object.keys(COMMAND_REGISTRY)
  const aliases = Object.values(COMMAND_REGISTRY).flatMap(cmd => cmd.aliases || [])
  const allCommands = Array.from(new Set([...commands, ...aliases])) // Remove duplicates
  
  const matches = allCommands
    .filter(cmd => cmd.toLowerCase().startsWith(input.toLowerCase()))
    .sort((a, b) => a.length - b.length) // Sort by length (shorter first)
  
  // Return up to 15 matches
  return matches.slice(0, 15)
}

// Command parser
export function parseCommand(input: string): { command: string; args: string[] } {
  const trimmedInput = input.trim().toLowerCase()
  
  // Check for multi-word commands first (longest match first)
  const multiWordCommands = Object.keys(COMMAND_REGISTRY)
    .filter(cmd => cmd.includes(' '))
    .sort((a, b) => b.length - a.length) // Sort by length descending
  
  for (const multiWordCmd of multiWordCommands) {
    if (trimmedInput.startsWith(multiWordCmd)) {
      const remainingInput = input.trim().substring(multiWordCmd.length).trim()
      const args = remainingInput ? remainingInput.split(/\s+/) : []
      return { command: multiWordCmd, args }
    }
  }
  
  // Fall back to single-word command parsing
  const parts = input.trim().split(/\s+/)
  const command = parts[0]?.toLowerCase() || ''
  const args = parts.slice(1)
  
  return { command, args }
}

// Execute command
export async function executeCommand(
  input: string, 
  context: CommandContext
): Promise<CommandResult> {
  const { command, args } = parseCommand(input)
  
  if (!command) {
    return {
      success: false,
      output: [],
      type: 'error'
    }
  }

  // Find command (including aliases)
  const cmd = COMMAND_REGISTRY[command] || 
    Object.values(COMMAND_REGISTRY).find(c => c.aliases?.includes(command))

  if (!cmd) {
    return {
      success: false,
      output: [
        `Command not found: ${command}`,
        '',
        '💡 Type "help" to see available commands',
        '💡 Use Tab for auto-completion'
      ],
      type: 'error'
    }
  }

  try {
    const result = await cmd.handler(args, context)
    return result
  } catch (error) {
    return {
      success: false,
      output: [
        `Error executing command: ${command}`,
        `Details: ${error instanceof Error ? error.message : 'Unknown error'}`
      ],
      type: 'error'
    }
  }
}