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
        '🚀 PROJECTS & PORTFOLIO:',
        '  projects            - List all projects',
        '  view <project>      - View project details',
        '  deploy <project>    - Simulate project deployment',
        '  status <project>    - Check project status',
        '  cat resume          - Display resume/CV',
        '',
        '☁️  CLOUD & DEVOPS:',
        '  kubectl get pods    - Show Kubernetes pods',
        '  terraform plan      - Show infrastructure plan',
        '  ansible-playbook    - Run automation playbook',
        '  docker ps           - List running containers',
        '  monitor             - Show system monitoring',
        '  logs <service>      - View service logs',
        '',
        '🧠 AI & SKILLS:',
        '  skills [category]   - Show technical skills',
        '  ai chat             - Start AI assistant',
        '  train <model>       - Simulate model training',
        '  inference <model>   - Run model inference',
        '',
        '🎮 FUN & EASTER EGGS:',
        '  sudo become-legend  - Activate legend mode',
        '  matrix              - Enter the matrix',
        '  hack-the-planet     - Elite hacker mode',
        '  coffee              - Brew some coffee',
        '',
        '💡 TIP: Use Tab for auto-completion, ↑↓ for history',
        '💡 TIP: Try "sudo become-legend" for a surprise!',
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
    usage: 'projects [--detailed]',
    category: 'projects',
    handler: (args) => {
      const detailed = args.includes('--detailed') || args.includes('-d')
      
      const output = [
        ASCII_BANNERS.projects,
        '',
        '📁 ACTIVE PROJECTS REPOSITORY',
        '═══════════════════════════════════════════════════════',
        ''
      ]

      PROJECTS_DATA.forEach(project => {
        output.push(`📦 ${project.name.padEnd(20)} ${project.status.toUpperCase().padEnd(10)} ⭐ ${project.stars}`)
        output.push(`   ${project.description}`)
        if (detailed) {
          output.push(`   Tech: ${project.tech.join(', ')}`)
          if (project.uptime) output.push(`   Uptime: ${project.uptime}`)
          if (project.accuracy) output.push(`   Accuracy: ${project.accuracy}`)
          if (project.dataRate) output.push(`   Data Rate: ${project.dataRate}`)
        }
        output.push('')
      })

      output.push('💡 Use "view <project-name>" for detailed information')
      output.push('💡 Use "deploy <project-name>" to simulate deployment')

      return {
        success: true,
        output,
        type: 'info'
      }
    }
  },

  view: {
    name: 'view',
    aliases: ['show'],
    description: 'View detailed project information',
    usage: 'view <project-name>',
    category: 'projects',
    handler: (args) => {
      if (args.length === 0) {
        return {
          success: false,
          output: ['Error: Please specify a project name', 'Usage: view <project-name>'],
          type: 'error'
        }
      }

      const projectName = args[0].toLowerCase()
      const project = PROJECTS_DATA.find(p => 
        p.id.includes(projectName) || p.name.toLowerCase().includes(projectName)
      )

      if (!project) {
        return {
          success: false,
          output: [
            `Project "${projectName}" not found.`,
            '',
            'Available projects:',
            ...PROJECTS_DATA.map(p => `  • ${p.id}`)
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
          `⚡ Status: ${project.status.toUpperCase()}`,
          `⭐ GitHub Stars: ${project.stars}`,
          '',
          '🛠️  Technology Stack:',
          ...project.tech.map(tech => `   • ${tech}`),
          '',
          '📊 Key Metrics:',
          ...(project.uptime ? [`   • Uptime: ${project.uptime}`] : []),
          ...(project.accuracy ? [`   • AI Accuracy: ${project.accuracy}`] : []),
          ...(project.inference ? [`   • Inference Time: ${project.inference}`] : []),
          ...(project.dataRate ? [`   • Data Rate: ${project.dataRate}`] : []),
          ...(project.deployments ? [`   • Deployments: ${project.deployments}`] : []),
          ...(project.platforms ? [`   • Platforms: ${project.platforms}`] : []),
          '',
          '🔗 Actions:',
          `   • deploy ${project.id}     - Deploy this project`,
          `   • logs ${project.id}       - View deployment logs`,
          `   • status ${project.id}     - Check current status`,
          ''
        ],
        type: 'info'
      }
    }
  },

  deploy: {
    name: 'deploy',
    description: 'Simulate project deployment',
    usage: 'deploy <project-name>',
    category: 'devops',
    handler: async (args) => {
      if (args.length === 0) {
        return {
          success: false,
          output: ['Error: Please specify a project name', 'Usage: deploy <project-name>'],
          type: 'error'
        }
      }

      const projectName = args[0].toLowerCase()
      const project = PROJECTS_DATA.find(p => 
        p.id.includes(projectName) || p.name.toLowerCase().includes(projectName)
      )

      if (!project) {
        return {
          success: false,
          output: [`Project "${projectName}" not found.`],
          type: 'error'
        }
      }

      return {
        success: true,
        output: [
          `🚀 INITIATING DEPLOYMENT: ${project.name.toUpperCase()}`,
          '═══════════════════════════════════════════════════════',
          '',
          '📋 Pre-deployment checks...',
          '✅ Docker image built successfully',
          '✅ Security scan passed',
          '✅ Unit tests: 98% coverage',
          '✅ Integration tests passed',
          '',
          '☁️  Deploying to Kubernetes cluster...',
          '📦 Pulling image: registry.nassim.dev/' + project.id + ':latest',
          '🔄 Rolling update in progress...',
          '⚖️  Load balancer updated',
          '🔍 Health checks passing',
          '',
          '✅ DEPLOYMENT SUCCESSFUL!',
          '',
          '📊 Deployment Summary:',
          `   • Project: ${project.name}`,
          `   • Environment: production`,
          `   • Replicas: 3/3 ready`,
          `   • Status: HEALTHY`,
          `   • URL: https://${project.id}.nassim.dev`,
          '',
          '🎉 Your application is now live and serving traffic!',
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
    category: 'ai',
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

  // Fun commands
  'sudo become-legend': {
    name: 'sudo become-legend',
    description: 'Activate legend mode',
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
        ''
      ],
      type: 'success',
      animation: 'matrix'
    })
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
            'Author: Nassim Maaoui <nassim@example.com>',
            'Date:   Mon Jan 15 10:30:45 2024 +0100',
            '',
            '    feat: enhance terminal with advanced cloud commands',
            '',
            'commit b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1',
            'Author: Nassim Maaoui <nassim@example.com>',
            'Date:   Sun Jan 14 14:22:33 2024 +0100',
            '',
            '    fix: improve kubernetes integration and monitoring',
            '',
            'commit c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1b2',
            'Author: Nassim Maaoui <nassim@example.com>',
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
            '   Email: nassim@example.com',
            '   LinkedIn: linkedin.com/in/nassimmaaoui',
            '   GitHub: github.com/nassimmaaoui',
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
  }

}

// Auto-completion suggestions
export function getCommandSuggestions(input: string): string[] {
  const commands = Object.keys(COMMAND_REGISTRY)
  const aliases = Object.values(COMMAND_REGISTRY).flatMap(cmd => cmd.aliases || [])
  const allCommands = Array.from(new Set([...commands, ...aliases])) // Remove duplicates
  
  return allCommands
    .filter(cmd => cmd.toLowerCase().startsWith(input.toLowerCase()))
    .slice(0, 10)
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