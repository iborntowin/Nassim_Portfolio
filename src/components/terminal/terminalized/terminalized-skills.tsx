'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Skill {
  name: string
  level: number
  experience: string
  [key: string]: any // For additional properties like certifications, projects, etc.
}

interface SkillCategory {
  name: string
  skills: Skill[]
}

interface TerminalizedSkillsProps {
  skillsData: Record<string, SkillCategory>
  displayMode?: 'packages' | 'services' | 'containers'
  showInstallCommands?: boolean
  animateOnMount?: boolean
}

interface PackageInfo {
  name: string
  version: string
  status: 'installed' | 'updating' | 'latest'
  installDate: string
  size: string
  dependencies?: string[]
  repository: string
}

const TerminalizedSkills: React.FC<TerminalizedSkillsProps> = ({
  skillsData,
  displayMode = 'packages',
  showInstallCommands = true,
  animateOnMount = true
}) => {
  const [currentView, setCurrentView] = useState<'list' | 'install' | 'status'>('list')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [animationComplete, setAnimationComplete] = useState(!animateOnMount)

  // Convert skills to package format
  const convertSkillsToPackages = (): PackageInfo[] => {
    const packages: PackageInfo[] = []
    
    Object.entries(skillsData).forEach(([categoryKey, category]) => {
      category.skills.forEach((skill) => {
        const version = generateVersionFromLevel(skill.level)
        const installDate = generateInstallDate(skill.experience)
        const size = generatePackageSize(skill.level)
        
        packages.push({
          name: formatPackageName(skill.name, categoryKey),
          version,
          status: skill.level >= 85 ? 'latest' : 'installed',
          installDate,
          size,
          dependencies: generateDependencies(skill.name, categoryKey),
          repository: getRepository(categoryKey)
        })
      })
    })
    
    return packages.sort((a, b) => a.name.localeCompare(b.name))
  }

  const formatPackageName = (skillName: string, category: string): string => {
    const nameMap: Record<string, string> = {
      'AWS': 'aws-cli',
      'Kubernetes': 'kubectl',
      'Docker': 'docker-ce',
      'Terraform': 'terraform',
      'Ansible': 'ansible-core',
      'Jenkins': 'jenkins',
      'GitLab CI/CD': 'gitlab-runner',
      'Monitoring': 'prometheus-stack',
      'Python': 'python3-dev',
      'Java/Spring': 'openjdk-spring-boot',
      'TypeScript': 'typescript',
      'React/Next.js': 'nodejs-react-next',
      'TensorFlow': 'tensorflow-gpu',
      'PyTorch': 'pytorch-cuda',
      'OpenCV': 'opencv-contrib-python',
      'Hugging Face': 'transformers'
    }
    
    return nameMap[skillName] || skillName.toLowerCase().replace(/[^a-z0-9]/g, '-')
  }

  const generateVersionFromLevel = (level: number): string => {
    if (level >= 90) return `${Math.floor(level / 10)}.${level % 10}.0`
    if (level >= 80) return `${Math.floor(level / 10)}.${level % 10}.${Math.floor(Math.random() * 5)}`
    return `${Math.floor(level / 10)}.${level % 10}.${Math.floor(Math.random() * 10)}`
  }

  const generateInstallDate = (experience: string): string => {
    const yearsMatch = experience.match(/(\d+)\+?\s*years?/)
    if (yearsMatch) {
      const years = parseInt(yearsMatch[1])
      const date = new Date()
      date.setFullYear(date.getFullYear() - years)
      return date.toISOString().split('T')[0]
    }
    return new Date().toISOString().split('T')[0]
  }

  const generatePackageSize = (level: number): string => {
    const baseSizes = ['12.4MB', '8.7MB', '156MB', '45.2MB', '23.1MB', '67.8MB', '91.3MB']
    return baseSizes[Math.floor(Math.random() * baseSizes.length)]
  }

  const generateDependencies = (skillName: string, category: string): string[] => {
    const depMap: Record<string, string[]> = {
      'kubectl': ['docker-ce', 'containerd'],
      'terraform': ['aws-cli', 'azure-cli'],
      'ansible-core': ['python3-dev', 'openssh-client'],
      'jenkins': ['openjdk-11', 'docker-ce'],
      'tensorflow-gpu': ['python3-dev', 'cuda-toolkit'],
      'pytorch-cuda': ['python3-dev', 'cuda-toolkit'],
      'nodejs-react-next': ['nodejs', 'npm']
    }
    
    const packageName = formatPackageName(skillName, category)
    return depMap[packageName] || []
  }

  const getRepository = (category: string): string => {
    const repoMap: Record<string, string> = {
      'cloud': 'cloud-native/stable',
      'devops': 'devops-tools/stable', 
      'development': 'dev-stack/stable',
      'ai': 'ml-frameworks/stable'
    }
    return repoMap[category] || 'main/stable'
  }

  const packages = convertSkillsToPackages()

  const renderPackageList = () => (
    <div className="font-mono text-sm">
      <div className="text-green-400 mb-2">
        $ apt list --installed | grep -E "(aws|kubernetes|docker|terraform|ansible|python|java|tensorflow)"
      </div>
      
      <div className="text-gray-300 mb-2">
        Listing... Done
      </div>

      {/* Cloud Engineering Context */}
      <div className="bg-blue-900/20 border-l-4 border-blue-400 pl-3 py-2 mb-4 text-xs">
        <div className="text-blue-400 mb-1">☁️ CLOUD-NATIVE TECH STACK</div>
        <div className="text-gray-300">
          Production-grade tools for scalable, cloud-native applications and infrastructure automation
        </div>
      </div>

      <div className="space-y-1">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={animateOnMount ? { opacity: 0, x: -20 } : {}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between hover:bg-gray-800/30 px-2 py-1 rounded"
          >
            <div className="flex items-center space-x-4">
              <span className="text-cyan-400 w-32">{pkg.name}</span>
              <span className="text-yellow-400 w-16">{pkg.version}</span>
              <span className={`w-20 ${pkg.status === 'latest' ? 'text-green-400' : 'text-blue-400'}`}>
                [{pkg.status}]
              </span>
              <span className="text-gray-400 text-xs">{pkg.size}</span>
            </div>
            <div className="text-gray-500 text-xs">
              {pkg.repository}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-gray-400 text-xs">
        {packages.length} packages installed • Total size: ~2.1GB
      </div>

      {/* DevOps Pipeline Status */}
      <div className="mt-4 bg-gray-800/30 rounded p-2 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400">CI/CD Pipeline: ACTIVE</span>
          </div>
          <span className="text-gray-400">Last deployment: 2h ago</span>
        </div>
      </div>
    </div>
  )

  const renderInstallCommands = () => (
    <div className="font-mono text-sm space-y-3">
      <div className="text-green-400 mb-4">
        # Installation commands for current tech stack
      </div>

      {Object.entries(skillsData).map(([categoryKey, category]) => (
        <div key={categoryKey} className="mb-6">
          <div className="text-cyan-400 mb-2 text-base">
            # {category.name}
          </div>
          
          {category.skills.map((skill, index) => {
            const packageName = formatPackageName(skill.name, categoryKey)
            const installCommand = getInstallCommand(packageName, categoryKey)
            
            return (
              <motion.div
                key={skill.name}
                initial={animateOnMount ? { opacity: 0, y: 10 } : {}}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="mb-2"
              >
                <div className="text-yellow-400 mb-1">
                  {installCommand}
                </div>
                <div className="text-gray-400 text-xs ml-4">
                  # {skill.name} - {skill.experience} experience • Level: {skill.level}%
                </div>
              </motion.div>
            )
          })}
        </div>
      ))}
    </div>
  )

  const getInstallCommand = (packageName: string, category: string): string => {
    if (category === 'cloud') {
      if (packageName === 'kubectl') return 'curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"'
      if (packageName === 'aws-cli') return 'curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"'
      if (packageName === 'terraform') return 'wget https://releases.hashicorp.com/terraform/1.6.6/terraform_1.6.6_linux_amd64.zip'
    }
    
    if (category === 'ai') {
      if (packageName === 'tensorflow-gpu') return 'pip install tensorflow[and-cuda]'
      if (packageName === 'pytorch-cuda') return 'pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118'
    }

    return `apt-get install -y ${packageName}`
  }

  const renderServiceStatus = () => (
    <div className="font-mono text-sm">
      <div className="text-green-400 mb-2">
        $ systemctl status --type=service | grep -E "(aws|k8s|docker|terraform)"
      </div>
      
      <div className="space-y-2 mt-4">
        {packages.slice(0, 8).map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={animateOnMount ? { opacity: 0, x: -10 } : {}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center space-x-4"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 w-32">{pkg.name}.service</span>
            <span className="text-green-400">active (running)</span>
            <span className="text-gray-400 text-xs">since {pkg.installDate}</span>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-3 bg-gray-800/30 rounded border-l-4 border-green-400">
        <div className="text-green-400 text-xs mb-1">SYSTEM STATUS</div>
        <div className="text-gray-300 text-sm">
          All critical services operational • Uptime: 99.9% • Last deployment: 2 hours ago
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-black/90 border border-green-400/30 rounded-lg p-6 font-mono">
      {/* Terminal Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 ml-4">nassim@cloud-engineer: ~/skills</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentView('list')}
            className={`px-3 py-1 text-xs rounded ${
              currentView === 'list' 
                ? 'bg-green-400/20 text-green-400' 
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            packages
          </button>
          <button
            onClick={() => setCurrentView('install')}
            className={`px-3 py-1 text-xs rounded ${
              currentView === 'install' 
                ? 'bg-green-400/20 text-green-400' 
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            install
          </button>
          <button
            onClick={() => setCurrentView('status')}
            className={`px-3 py-1 text-xs rounded ${
              currentView === 'status' 
                ? 'bg-green-400/20 text-green-400' 
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            services
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentView}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentView === 'list' && renderPackageList()}
          {currentView === 'install' && renderInstallCommands()}
          {currentView === 'status' && renderServiceStatus()}
        </motion.div>
      </AnimatePresence>

      {/* Footer with system info */}
      <div className="mt-6 pt-4 border-t border-gray-700 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>Last updated: {new Date().toLocaleDateString()}</span>
          <span>Repository: cloud-native/stable</span>
        </div>
      </div>
    </div>
  )
}

export default TerminalizedSkills