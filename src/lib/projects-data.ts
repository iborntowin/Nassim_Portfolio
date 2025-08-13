export interface TechStackItem {
  name: string
  color: string
}

export interface ProjectStats {
  stars: number
  forks: number
  commits: number
}

export interface ProjectImage {
  src: string
  alt: string
  caption?: string
}

export interface WorkflowStep {
  title: string
  description: string
  icon: string
  details: string[]
}

export interface DetailedProject {
  id: string
  name: string
  description: string
  longDescription: string
  category: 'Full-Stack' | 'AI/ML' | 'Embedded' | 'Productivity' | 'DevOps'
  techStack: TechStackItem[]
  stats: ProjectStats
  githubUrl: string
  liveUrl?: string
  featured?: boolean
  images: ProjectImage[]
  workflow: WorkflowStep[]
  challenges: string[]
  solutions: string[]
  impact: string[]
  keyFeatures: string[]
  architecture?: string
  timeline: string
  teamSize?: string
  role: string
}

const projectsData: DetailedProject[] = [
  {
    id: '1',
    name: 'NasmyTunes – Spotify to MP3 Converter',
    description: 'Convert Spotify playlists to high-quality MP3 files with CLI and web interfaces. Features advanced YouTube bypass techniques, real-time progress tracking, and professional glassmorphism UI.',
    longDescription: 'NasmyTunes is a comprehensive Spotify playlist converter that transforms your favorite playlists into high-quality MP3 files. The application features both a CLI interface for local use and a modern web application with glassmorphism design. Built with advanced bypass techniques to handle YouTube\'s bot detection, it offers real-time progress tracking, batch processing, and professional-grade audio conversion at 192kbps quality.',
    category: 'Productivity',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'Spotify API', color: 'text-green-400 bg-green-400/10' },
      { name: 'YouTube API', color: 'text-red-400 bg-red-400/10' },
      { name: 'FFmpeg', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'Flask', color: 'text-gray-400 bg-gray-400/10' }
    ],
    stats: { stars: 0, forks: 0, commits: 45 },
    githubUrl: 'https://github.com/iborntowin/NasmyTunes',
    liveUrl: 'https://nasmytunes.onrender.com',
    featured: true,
    images: [
      { src: '/images/projects/1/hero.jpg', alt: 'NasmyTunes Interface', caption: 'Modern glassmorphism UI with real-time conversion progress' },
      { src: '/images/projects/1/cli.jpg', alt: 'CLI Interface', caption: 'Easy-to-use command line interface for batch processing' },
      { src: '/images/projects/1/architecture.jpg', alt: 'System Architecture', caption: 'Multi-layer bypass system with advanced YouTube handling' },
      { src: '/images/projects/1/demo.jpg', alt: 'Live Demo', caption: 'Professional web interface with responsive design' }
    ],
    workflow: [
      {
        title: 'API Integration & Research',
        description: 'Integrated Spotify API and researched YouTube bypass techniques',
        icon: '🔗',
        details: [
          'Implemented Spotify Web API for playlist analysis',
          'Researched YouTube\'s bot detection mechanisms',
          'Developed authentication simulation techniques',
          'Created fallback systems for API limitations'
        ]
      },
      {
        title: 'Core Engine Development',
        description: 'Built the conversion engine with advanced bypass methods',
        icon: '⚙️',
        details: [
          'Developed multi-client YouTube access system',
          'Implemented rate limiting and human-like patterns',
          'Created high-quality audio extraction pipeline',
          'Built FFmpeg integration for MP3 conversion'
        ]
      },
      {
        title: 'CLI Interface Design',
        description: 'Created user-friendly command line interface',
        icon: '💻',
        details: [
          'Designed intuitive CLI menu system',
          'Added real-time progress tracking',
          'Implemented batch processing capabilities',
          'Created cross-platform launcher scripts'
        ]
      },
      {
        title: 'Web Application Development',
        description: 'Built modern web interface with glassmorphism design',
        icon: '🌐',
        details: [
          'Designed responsive glassmorphism UI',
          'Implemented real-time progress updates',
          'Added ZIP file download functionality',
          'Created mobile-responsive interface'
        ]
      },
      {
        title: 'Deployment & Optimization',
        description: 'Deployed to cloud platforms with performance optimization',
        icon: '🚀',
        details: [
          'Deployed to Render with automatic scaling',
          'Optimized for cloud resource constraints',
          'Implemented graceful degradation for demos',
          'Added comprehensive error handling'
        ]
      }
    ],
    challenges: [
      'YouTube\'s sophisticated bot detection and rate limiting',
      'Maintaining high-quality audio conversion at scale',
      'Creating seamless user experience across CLI and web interfaces',
      'Handling cloud platform resource limitations for audio processing'
    ],
    solutions: [
      'Implemented multi-layer bypass system with browser simulation and proxy support',
      'Used FFmpeg with optimized settings for 192kbps quality conversion',
      'Designed unified architecture supporting both CLI and web interfaces',
      'Created intelligent fallback systems and demo modes for cloud constraints'
    ],
    impact: [
      'Successful conversion of Spotify playlists to high-quality MP3s',
      'Professional web interface deployed on Render platform',
      'Advanced bypass techniques handling YouTube restrictions',
      'Cross-platform compatibility with Windows, Mac, and Linux support'
    ],
    keyFeatures: [
      'Spotify playlist analysis and track extraction',
      'Advanced YouTube bypass techniques',
      'High-quality MP3 conversion (192kbps)',
      'Real-time progress tracking',
      'Batch processing capabilities',
      'Modern glassmorphism web UI',
      'Cross-platform CLI interface',
      'ZIP file downloads',
      'Mobile responsive design',
      'Cloud deployment ready'
    ],
    architecture: 'Python-based conversion engine with Spotify API integration, YouTube bypass system, FFmpeg audio processing, and dual CLI/web interfaces',
    timeline: '3 months',
    teamSize: 'Solo project',
    role: 'Full-Stack Developer & System Architect'
  },
  {
    id: '2',
    name: 'Cession App – Session & Contract Management',
    description: 'A smart platform for managing session-based contracts with secure authentication, dynamic user roles, and audit trails. Designed for clean UX and cross-device compatibility.',
    longDescription: 'Cession App is a comprehensive session and contract management platform built to streamline business operations. The application features a robust authentication system with JWT tokens, dynamic role-based access control, and comprehensive audit trails for compliance. The platform was designed with a mobile-first approach, ensuring seamless functionality across all devices while maintaining enterprise-grade security standards.',
    category: 'Full-Stack',
    techStack: [
      { name: 'Spring Boot', color: 'text-green-400 bg-green-400/10' },
      { name: 'Svelte', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'PostgreSQL', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'JWT Auth', color: 'text-purple-400 bg-purple-400/10' }
    ],
    stats: { stars: 194, forks: 42, commits: 87 },
    githubUrl: 'https://github.com/nassimmaaoui/cession-app',
    featured: true,
    images: [
      { src: '/images/projects/1/dashboard.png', alt: 'Cession App Dashboard', caption: 'Main dashboard with session overview' },
      { src: '/images/projects/1/signup.png', alt: 'User Registration', caption: 'Secure user registration process' },
      { src: '/images/projects/1/login.png', alt: 'Authentication System', caption: 'Secure login with JWT authentication' },
      { src: '/images/projects/1/clients.png', alt: 'Client Management', caption: 'Comprehensive client management interface' },
      { src: '/images/projects/1/create_new_client.png', alt: 'Create New Client', caption: 'Intuitive client creation workflow' },
      { src: '/images/projects/1/cession.png', alt: 'Cession Management', caption: 'Advanced cession creation and management' },
      { src: '/images/projects/1/Détails_Cession.png', alt: 'Cession Details', caption: 'Detailed cession information and management' },
      { src: '/images/projects/1/Intelligence_des_Paiements.png', alt: 'Payment Intelligence', caption: 'AI-powered payment analytics and insights' },
      { src: '/images/projects/1/Mobile Data Export & Sync.png', alt: 'Mobile Data Export', caption: 'Mobile data synchronization and export features' },
      { src: '/images/projects/1/Settings.png', alt: 'Application Settings', caption: 'Comprehensive settings and configuration panel' }
    ],
    workflow: [
      {
        title: 'Requirements Analysis',
        description: 'Analyzed business needs and user requirements',
        icon: '📋',
        details: [
          'Conducted stakeholder interviews',
          'Defined user personas and use cases',
          'Created detailed functional requirements',
          'Established security and compliance requirements'
        ]
      },
      {
        title: 'System Architecture',
        description: 'Designed scalable microservices architecture',
        icon: '🏗️',
        details: [
          'Designed RESTful API architecture',
          'Planned database schema with PostgreSQL',
          'Implemented JWT-based authentication',
          'Created role-based access control system'
        ]
      },
      {
        title: 'Frontend Development',
        description: 'Built responsive UI with Svelte',
        icon: '🎨',
        details: [
          'Developed component-based architecture',
          'Implemented responsive design patterns',
          'Created intuitive user workflows',
          'Added real-time updates and notifications'
        ]
      },
      {
        title: 'Backend Implementation',
        description: 'Developed robust Spring Boot backend',
        icon: '⚙️',
        details: [
          'Built RESTful APIs with Spring Boot',
          'Implemented business logic and validation',
          'Created audit trail system',
          'Added comprehensive error handling'
        ]
      },
      {
        title: 'Testing & Deployment',
        description: 'Comprehensive testing and production deployment',
        icon: '🚀',
        details: [
          'Unit and integration testing',
          'Security penetration testing',
          'Performance optimization',
          'Production deployment and monitoring'
        ]
      }
    ],
    challenges: [
      'Complex role-based permission system with dynamic access control',
      'Real-time synchronization across multiple user sessions',
      'Ensuring GDPR compliance for audit trails and data retention',
      'Optimizing database queries for large-scale contract data'
    ],
    solutions: [
      'Implemented hierarchical role system with granular permissions',
      'Used WebSocket connections for real-time updates',
      'Built automated data retention and anonymization system',
      'Optimized queries with database indexing and caching strategies'
    ],
    impact: [
      'Reduced contract processing time by 60%',
      'Improved user satisfaction with intuitive interface',
      'Enhanced security with zero security incidents post-launch',
      'Achieved 99.9% uptime in production environment'
    ],
    keyFeatures: [
      'JWT-based secure authentication',
      'Dynamic role-based access control',
      'Comprehensive audit trail system',
      'Real-time session management',
      'Cross-device compatibility',
      'Automated contract workflows',
      'Advanced reporting and analytics',
      'GDPR-compliant data handling'
    ],
    architecture: 'Microservices architecture with Spring Boot backend, Svelte frontend, PostgreSQL database, and JWT authentication',
    timeline: '4 months',
    teamSize: 'Solo project',
    role: 'Full-Stack Developer & System Architect'
  },
  {
    id: '3',
    name: 'Board-AI: Electronic Component Detection',
    description: 'Trained a CNN model (92% accuracy) on 50,000+ PCB component images to identify parts in real-time, reducing inference time to 120ms using TensorRT.',
    longDescription: 'Board-AI revolutionizes electronic component identification through advanced computer vision and deep learning. The system processes PCB images in real-time, identifying components with 92% accuracy while maintaining ultra-low latency of 120ms. Built with a robust CNN architecture and optimized using TensorRT, this solution addresses critical needs in electronics manufacturing and repair industries.',
    category: 'AI/ML',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'OpenCV', color: 'text-green-400 bg-green-400/10' },
      { name: 'TensorFlow', color: 'text-orange-400 bg-orange-400/10' },
      { name: 'TensorRT', color: 'text-green-500 bg-green-500/10' }
    ],
    stats: { stars: 271, forks: 64, commits: 142 },
    githubUrl: 'https://github.com/nassimmaaoui/board-ai',
    featured: true,
    images: [
      { src: '/images/projects/2/hero.jpg', alt: 'Board-AI Detection Interface', caption: 'Real-time component detection in action' },
      { src: '/images/projects/2/training.jpg', alt: 'Model Training Process', caption: 'CNN training on 50,000+ PCB images' },
      { src: '/images/projects/2/results.jpg', alt: 'Detection Results', caption: '92% accuracy with 120ms inference time' },
      { src: '/images/projects/2/architecture.jpg', alt: 'System Architecture', caption: 'TensorRT optimized inference pipeline' }
    ],
    workflow: [
      {
        title: 'Data Collection & Preparation',
        description: 'Curated and preprocessed 50,000+ PCB component images',
        icon: '📊',
        details: [
          'Collected diverse PCB component dataset',
          'Implemented data augmentation techniques',
          'Created annotation pipeline for component labeling',
          'Balanced dataset across component categories'
        ]
      },
      {
        title: 'Model Architecture Design',
        description: 'Designed and optimized CNN architecture',
        icon: '🧠',
        details: [
          'Designed custom CNN architecture for component detection',
          'Implemented transfer learning with pre-trained models',
          'Optimized model for accuracy and inference speed',
          'Added multi-scale feature extraction layers'
        ]
      },
      {
        title: 'Training & Validation',
        description: 'Trained model with advanced optimization techniques',
        icon: '🎯',
        details: [
          'Implemented advanced training strategies',
          'Used cross-validation for robust evaluation',
          'Applied regularization techniques to prevent overfitting',
          'Achieved 92% accuracy on validation set'
        ]
      },
      {
        title: 'TensorRT Optimization',
        description: 'Optimized model for real-time inference',
        icon: '⚡',
        details: [
          'Converted TensorFlow model to TensorRT format',
          'Applied quantization and pruning techniques',
          'Optimized inference pipeline for GPU acceleration',
          'Reduced inference time to 120ms'
        ]
      },
      {
        title: 'Integration & Testing',
        description: 'Built complete detection system with UI',
        icon: '🔧',
        details: [
          'Developed real-time detection interface',
          'Integrated OpenCV for image preprocessing',
          'Created comprehensive testing suite',
          'Deployed system for production use'
        ]
      }
    ],
    challenges: [
      'Achieving high accuracy with diverse PCB component variations',
      'Optimizing inference speed for real-time applications',
      'Handling varying lighting conditions and image quality',
      'Balancing model complexity with deployment constraints'
    ],
    solutions: [
      'Implemented robust data augmentation and transfer learning',
      'Used TensorRT optimization for GPU acceleration',
      'Applied advanced preprocessing and normalization techniques',
      'Designed efficient model architecture with optimal complexity'
    ],
    impact: [
      '92% component detection accuracy achieved',
      '120ms inference time for real-time applications',
      'Reduced manual inspection time by 75%',
      'Improved quality control in electronics manufacturing'
    ],
    keyFeatures: [
      'Real-time component detection',
      'High accuracy CNN model (92%)',
      'Ultra-fast inference (120ms)',
      'TensorRT GPU optimization',
      'Robust image preprocessing',
      'Multi-component classification',
      'Scalable detection pipeline',
      'Production-ready deployment'
    ],
    architecture: 'CNN-based detection system with TensorFlow training pipeline, TensorRT inference optimization, and OpenCV preprocessing',
    timeline: '6 months',
    teamSize: 'Solo project with academic supervision',
    role: 'AI/ML Engineer & Computer Vision Specialist'
  },
  {
    id: '4',
    name: 'NeuroVigil: Driver Fatigue Detection',
    description: 'Developed an EEG-based alert system detecting drowsiness with 89% precision. Early warning algorithm reduced false positives to under 5%.',
    longDescription: 'NeuroVigil is an innovative wearable technology solution that monitors driver alertness through EEG signal analysis. The system processes brainwave patterns in real-time to detect early signs of fatigue and drowsiness, providing timely alerts to prevent accidents. With 89% precision and less than 5% false positives, this solution represents a significant advancement in road safety technology.',
    category: 'AI/ML',
    techStack: [
      { name: 'Python', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'SciPy', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'EEG Processing', color: 'text-purple-400 bg-purple-400/10' },
      { name: 'Signal Analysis', color: 'text-pink-400 bg-pink-400/10' }
    ],
    stats: { stars: 198, forks: 49, commits: 91 },
    githubUrl: 'https://github.com/nassimmaaoui/neurovigil',
    images: [
      { src: '/images/projects/3/hero.jpg', alt: 'NeuroVigil System', caption: 'EEG-based fatigue detection system' }
    ],
    workflow: [
      {
        title: 'Signal Processing Research',
        description: 'Researched EEG signal patterns for fatigue detection',
        icon: '🧠',
        details: ['Studied brainwave patterns', 'Analyzed fatigue indicators', 'Designed signal processing pipeline']
      },
      {
        title: 'Algorithm Development',
        description: 'Developed machine learning algorithms for detection',
        icon: '⚡',
        details: ['Built classification models', 'Optimized for real-time processing', 'Reduced false positives']
      },
      {
        title: 'Hardware Integration',
        description: 'Integrated with EEG hardware sensors',
        icon: '🔧',
        details: ['Connected EEG sensors', 'Real-time data acquisition', 'Alert system implementation']
      }
    ],
    challenges: ['Complex EEG signal processing', 'Real-time performance requirements', 'Minimizing false positives'],
    solutions: ['Advanced signal filtering techniques', 'Optimized algorithms for speed', 'Machine learning model fine-tuning'],
    impact: ['89% detection precision achieved', 'False positives reduced to under 5%', 'Potential to prevent road accidents'],
    keyFeatures: ['Real-time EEG monitoring', 'Advanced signal processing', 'Low false positive rate', 'Wearable technology integration'],
    timeline: '5 months',
    role: 'Biomedical Engineer & Signal Processing Specialist'
  },
  {
    id: '5',
    name: 'Nanosatellite Communication System',
    description: 'Built an optimized LoRaWAN communication module achieving 1.2 Mbps and 40% performance gain across 5 hardware platforms.',
    longDescription: 'This project involved designing and implementing a high-performance communication system for nanosatellites using LoRaWAN technology. The system achieved significant performance improvements through optimization techniques, reaching 1.2 Mbps data rates with 40% better performance compared to existing solutions across multiple hardware platforms.',
    category: 'Embedded',
    techStack: [
      { name: 'C++', color: 'text-blue-400 bg-blue-400/10' },
      { name: 'STM32', color: 'text-green-400 bg-green-400/10' },
      { name: 'LoRaWAN', color: 'text-purple-400 bg-purple-400/10' },
      { name: 'Low-Power Protocols', color: 'text-cyan-400 bg-cyan-400/10' }
    ],
    stats: { stars: 305, forks: 77, commits: 198 },
    githubUrl: 'https://github.com/nassimmaaoui/nanosatellite-comm',
    featured: true,
    images: [
      { src: '/images/projects/4/hero.jpg', alt: 'Nanosatellite Communication', caption: 'LoRaWAN communication module' }
    ],
    workflow: [
      {
        title: 'System Architecture',
        description: 'Designed communication protocol architecture',
        icon: '🛰️',
        details: ['Protocol stack design', 'Hardware abstraction layer', 'Multi-platform compatibility']
      },
      {
        title: 'Optimization',
        description: 'Optimized for performance and power efficiency',
        icon: '⚡',
        details: ['Algorithm optimization', 'Power consumption reduction', 'Data rate improvements']
      },
      {
        title: 'Testing & Validation',
        description: 'Comprehensive testing across platforms',
        icon: '🔬',
        details: ['Multi-platform testing', 'Performance benchmarking', 'Reliability validation']
      }
    ],
    challenges: ['Multi-platform compatibility', 'Power consumption constraints', 'Data rate optimization'],
    solutions: ['Modular architecture design', 'Advanced power management', 'Protocol optimization techniques'],
    impact: ['1.2 Mbps data rate achieved', '40% performance improvement', 'Cross-platform compatibility'],
    keyFeatures: ['High-speed LoRaWAN communication', 'Multi-platform support', 'Low power consumption', 'Optimized protocols'],
    timeline: '8 months',
    teamSize: '3 engineers',
    role: 'Embedded Systems Engineer & Protocol Designer'
  },
  {
    id: '6',
    name: 'GoldenTouch – AI Event Platform',
    description: 'Smart platform for event pack management with admin dashboards, AI-powered feedback analysis, Telegram/email notifications, and booking logic.',
    longDescription: 'GoldenTouch is a comprehensive event management platform that leverages AI to enhance user experience and streamline operations. The platform features intelligent feedback analysis, automated notifications, and sophisticated booking management, making it ideal for event organizers and attendees alike.',
    category: 'Full-Stack',
    techStack: [
      { name: 'Symfony', color: 'text-black bg-black/10' },
      { name: 'JavaFX', color: 'text-red-400 bg-red-400/10' },
      { name: 'Hugging Face API', color: 'text-yellow-400 bg-yellow-400/10' },
      { name: 'PDF/Email Integration', color: 'text-blue-400 bg-blue-400/10' }
    ],
    stats: { stars: 221, forks: 41, commits: 116 },
    githubUrl: 'https://github.com/nassimmaaoui/goldentouch',
    featured: true,
    images: [
      { src: '/images/projects/5/hero.jpg', alt: 'GoldenTouch Platform', caption: 'AI-powered event management dashboard' }
    ],
    workflow: [
      {
        title: 'Platform Design',
        description: 'Designed comprehensive event management system',
        icon: '🎯',
        details: ['User experience design', 'Admin dashboard creation', 'Booking system architecture']
      },
      {
        title: 'AI Integration',
        description: 'Integrated AI for feedback analysis',
        icon: '🤖',
        details: ['Hugging Face API integration', 'Sentiment analysis', 'Automated insights generation']
      },
      {
        title: 'Notification System',
        description: 'Built multi-channel notification system',
        icon: '📱',
        details: ['Telegram bot integration', 'Email automation', 'Real-time notifications']
      }
    ],
    challenges: ['Complex booking logic', 'AI model integration', 'Multi-channel notifications'],
    solutions: ['Modular booking system', 'API-based AI integration', 'Unified notification service'],
    impact: ['Streamlined event management', 'AI-powered insights', 'Improved user engagement'],
    keyFeatures: ['AI feedback analysis', 'Multi-channel notifications', 'Advanced booking system', 'Admin dashboards'],
    timeline: '7 months',
    teamSize: '2 developers',
    role: 'Full-Stack Developer & AI Integration Specialist'
  }
]

export function getAllProjects(): DetailedProject[] {
  return projectsData
}

export function getProjectById(id: string): DetailedProject | undefined {
  return projectsData.find(project => project.id === id)
}

export function getProjectsByCategory(category: string): DetailedProject[] {
  if (category === 'All') return projectsData
  return projectsData.filter(project => project.category === category)
}

export function getFeaturedProjects(): DetailedProject[] {
  return projectsData.filter(project => project.featured)
}