'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DetailedProject } from '@/lib/projects-data'

interface TerminalizedProjectsProps {
  projects: DetailedProject[]
  viewMode?: 'tree' | 'list' | 'detailed'
  showStats?: boolean
  animateOnMount?: boolean
  onProjectSelect?: (project: DetailedProject) => void
}

interface FileSystemEntry {
  name: string
  type: 'directory' | 'file' | 'executable' | 'readme' | 'config'
  size: string
  lastModified: string
  permissions: string
  project?: DetailedProject
  description?: string
  extension?: string
}

const TerminalizedProjects: React.FC<TerminalizedProjectsProps> = ({
  projects,
  viewMode = 'list',
  showStats = true,
  animateOnMount = true,
  onProjectSelect
}) => {
  const [currentView, setCurrentView] = useState<'ls' | 'tree' | 'find' | 'git'>('ls')
  const [selectedPath, setSelectedPath] = useState<string>('~/projects')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  // Convert projects to filesystem entries
  const convertProjectsToFileSystem = (): FileSystemEntry[] => {
    const entries: FileSystemEntry[] = []
    
    // Add directory entries for each project
    projects.forEach((project) => {
      const projectDir: FileSystemEntry = {
        name: formatProjectName(project.name),
        type: 'directory',
        size: calculateProjectSize(project),
        lastModified: generateLastModified(project.timeline),
        permissions: 'drwxr-xr-x',
        project,
        description: project.description
      }
      entries.push(projectDir)

      // Add project files
      const projectFiles = generateProjectFiles(project)
      entries.push(...projectFiles)
    })

    // Add some general files
    entries.push(
      {
        name: 'README.md',
        type: 'readme',
        size: '4.2K',
        lastModified: new Date().toISOString().split('T')[0],
        permissions: '-rw-r--r--',
        description: 'Portfolio projects overview and setup instructions'
      },
      {
        name: '.gitignore',
        type: 'config',
        size: '1.1K',
        lastModified: '2024-01-10',
        permissions: '-rw-r--r--',
        description: 'Git ignore patterns for all projects'
      },
      {
        name: 'deploy.sh',
        type: 'executable',
        size: '2.8K',
        lastModified: '2024-01-12',
        permissions: '-rwxr-xr-x',
        description: 'Automated deployment script for all projects'
      }
    )

    return entries.sort((a, b) => {
      // Directories first, then files
      if (a.type === 'directory' && b.type !== 'directory') return -1
      if (a.type !== 'directory' && b.type === 'directory') return 1
      return a.name.localeCompare(b.name)
    })
  }

  const formatProjectName = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const calculateProjectSize = (project: DetailedProject): string => {
    const baseSizes = ['156MB', '89MB', '234MB', '67MB', '145MB', '78MB', '198MB']
    return baseSizes[Math.floor(Math.random() * baseSizes.length)]
  }

  const generateLastModified = (timeline: string): string => {
    const months = timeline.includes('month') ? parseInt(timeline) : 3
    const date = new Date()
    date.setMonth(date.getMonth() - months)
    return date.toISOString().split('T')[0]
  }

  const generateProjectFiles = (project: DetailedProject): FileSystemEntry[] => {
    const files: FileSystemEntry[] = []
    const projectName = formatProjectName(project.name)
    
    // Common project files
    const commonFiles = [
      { name: 'README.md', size: '8.4K', type: 'readme' as const },
      { name: 'package.json', size: '2.1K', type: 'config' as const },
      { name: '.env.example', size: '0.8K', type: 'config' as const },
      { name: 'docker-compose.yml', size: '1.5K', type: 'config' as const }
    ]

    // Technology-specific files
    if (project.techStack.some(tech => tech.name.includes('Python'))) {
      commonFiles.push(
        { name: 'requirements.txt', size: '1.2K', type: 'config' as const },
        { name: 'main.py', size: '15.6K', type: 'file' as const }
      )
    }

    if (project.techStack.some(tech => tech.name.includes('Spring'))) {
      commonFiles.push(
        { name: 'pom.xml', size: '3.4K', type: 'config' as const },
        { name: 'Application.java', size: '12.8K', type: 'file' as const }
      )
    }

    if (project.techStack.some(tech => tech.name.includes('React') || tech.name.includes('Next'))) {
      commonFiles.push(
        { name: 'next.config.js', size: '1.8K', type: 'config' as const },
        { name: 'tsconfig.json', size: '0.9K', type: 'config' as const }
      )
    }

    commonFiles.forEach(file => {
      files.push({
        ...file,
        name: `${projectName}/${file.name}`,
        lastModified: generateLastModified(project.timeline),
        permissions: file.type === 'executable' ? '-rwxr-xr-x' : '-rw-r--r--',
        project,
        description: `${project.name} - ${file.name}`
      })
    })

    return files
  }

  const getFileIcon = (entry: FileSystemEntry): string => {
    switch (entry.type) {
      case 'directory': return '📁'
      case 'executable': return '🚀'
      case 'readme': return '📖'
      case 'config': return '⚙️'
      default: return '📄'
    }
  }

  const getFileColor = (entry: FileSystemEntry): string => {
    switch (entry.type) {
      case 'directory': return 'text-blue-400'
      case 'executable': return 'text-green-400'
      case 'readme': return 'text-yellow-400'
      case 'config': return 'text-purple-400'
      default: return 'text-gray-300'
    }
  }

  const entries = convertProjectsToFileSystem()
  const filteredEntries = filterCategory === 'all' 
    ? entries 
    : entries.filter(entry => 
        !entry.project || entry.project.category === filterCategory
      )

  const renderLsView = () => (
    <div className="font-mono text-sm">
      <div className="text-green-400 mb-2">
        $ ls -la ~/projects/
      </div>
      
      <div className="text-gray-400 text-xs mb-2">
        total {filteredEntries.length} items
      </div>

      {/* Cloud Engineering Context */}
      <div className="bg-purple-900/20 border-l-4 border-purple-400 pl-3 py-2 mb-4 text-xs">
        <div className="text-purple-400 mb-1">🚀 PRODUCTION REPOSITORIES</div>
        <div className="text-gray-300">
          Containerized applications deployed across multi-cloud Kubernetes clusters
        </div>
      </div>

      <div className="space-y-1">
        {filteredEntries.map((entry, index) => (
          <motion.div
            key={`${entry.name}-${index}`}
            initial={animateOnMount ? { opacity: 0, x: -20 } : {}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`flex items-center hover:bg-gray-800/30 px-2 py-1 rounded cursor-pointer ${
              entry.project ? 'hover:bg-blue-900/20' : ''
            }`}
            onClick={() => entry.project && onProjectSelect?.(entry.project)}
          >
            <div className="flex items-center space-x-3 flex-1">
              <span className="text-gray-400 w-24 text-xs font-mono">
                {entry.permissions}
              </span>
              <span className="text-gray-500 w-16 text-xs">
                nassim
              </span>
              <span className="text-gray-500 w-16 text-xs">
                cloud-eng
              </span>
              <span className="text-gray-400 w-16 text-xs text-right">
                {entry.size}
              </span>
              <span className="text-gray-400 w-24 text-xs">
                {entry.lastModified}
              </span>
              <div className="flex items-center space-x-2 flex-1">
                <span className="text-lg">{getFileIcon(entry)}</span>
                <span className={`${getFileColor(entry)} ${entry.project ? 'font-semibold' : ''}`}>
                  {entry.name}
                </span>
                {entry.project && (
                  <div className="flex space-x-1 ml-2">
                    {entry.project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className={`text-xs px-1 rounded ${tech.color}`}>
                        {tech.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            {entry.project && showStats && (
              <div className="text-xs text-gray-500 flex space-x-3">
                <span>⭐ {entry.project.stats.stars}</span>
                <span>🍴 {entry.project.stats.forks}</span>
                <span>📝 {entry.project.stats.commits}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )

  const renderTreeView = () => (
    <div className="font-mono text-sm">
      <div className="text-green-400 mb-2">
        $ tree ~/projects/ -L 2
      </div>
      
      <div className="space-y-1">
        <div className="text-blue-400">~/projects/</div>
        {projects.map((project, index) => {
          const projectName = formatProjectName(project.name)
          const isLast = index === projects.length - 1
          
          return (
            <motion.div
              key={project.id}
              initial={animateOnMount ? { opacity: 0, x: -10 } : {}}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-1"
            >
              <div 
                className="flex items-center space-x-2 hover:bg-gray-800/30 px-2 py-1 rounded cursor-pointer"
                onClick={() => onProjectSelect?.(project)}
              >
                <span className="text-gray-400">
                  {isLast ? '└──' : '├──'}
                </span>
                <span className="text-lg">📁</span>
                <span className="text-blue-400 font-semibold">{projectName}/</span>
                <span className="text-gray-400 text-xs">({project.category})</span>
              </div>
              
              {/* Show some files for each project */}
              <div className="ml-8 space-y-1">
                {['README.md', 'package.json', 'src/'].map((file, fileIndex) => (
                  <div key={fileIndex} className="flex items-center space-x-2 text-xs">
                    <span className="text-gray-400">
                      {fileIndex === 2 ? '└──' : '├──'}
                    </span>
                    <span>{file.endsWith('/') ? '📁' : '📄'}</span>
                    <span className={file.endsWith('/') ? 'text-blue-400' : 'text-gray-300'}>
                      {file}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
      
      <div className="mt-4 text-gray-400 text-xs">
        {projects.length} directories, {entries.length - projects.length} files
      </div>
    </div>
  )

  const renderFindView = () => (
    <div className="font-mono text-sm">
      <div className="text-green-400 mb-2">
        $ find ~/projects/ -name "*.md" -o -name "*.json" -o -name "*.py" | head -20
      </div>
      
      <div className="space-y-1 mt-4">
        {projects.slice(0, 6).map((project, index) => {
          const projectName = formatProjectName(project.name)
          const files = [
            `~/projects/${projectName}/README.md`,
            `~/projects/${projectName}/package.json`,
            ...(project.techStack.some(t => t.name.includes('Python')) 
              ? [`~/projects/${projectName}/main.py`, `~/projects/${projectName}/requirements.txt`]
              : []
            )
          ]
          
          return files.map((file, fileIndex) => (
            <motion.div
              key={`${project.id}-${fileIndex}`}
              initial={animateOnMount ? { opacity: 0, y: 5 } : {}}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (index * files.length + fileIndex) * 0.05 }}
              className="text-cyan-400 hover:text-cyan-300 cursor-pointer"
            >
              {file}
            </motion.div>
          ))
        })}
      </div>
    </div>
  )

  const renderGitView = () => (
    <div className="font-mono text-sm">
      <div className="text-green-400 mb-2">
        $ git log --oneline --graph --all | head -15
      </div>
      
      <div className="space-y-1 mt-4">
        {projects.slice(0, 8).map((project, index) => (
          <motion.div
            key={project.id}
            initial={animateOnMount ? { opacity: 0, x: -10 } : {}}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08 }}
            className="flex items-center space-x-3 hover:bg-gray-800/30 px-2 py-1 rounded"
          >
            <span className="text-gray-400">*</span>
            <span className="text-yellow-400 w-16 text-xs">
              {Math.random().toString(36).substr(2, 7)}
            </span>
            <span className="text-gray-300 flex-1">
              feat: {project.name.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')} - {project.keyFeatures?.[0] || 'initial implementation'}
            </span>
            <span className="text-gray-500 text-xs">
              {generateLastModified(project.timeline)}
            </span>
          </motion.div>
        ))}
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
          <span className="text-gray-400 ml-4">nassim@cloud-engineer: {selectedPath}</span>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentView('ls')}
            className={`px-3 py-1 text-xs rounded ${
              currentView === 'ls' 
                ? 'bg-green-400/20 text-green-400' 
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            ls -la
          </button>
          <button
            onClick={() => setCurrentView('tree')}
            className={`px-3 py-1 text-xs rounded ${
              currentView === 'tree' 
                ? 'bg-green-400/20 text-green-400' 
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            tree
          </button>
          <button
            onClick={() => setCurrentView('find')}
            className={`px-3 py-1 text-xs rounded ${
              currentView === 'find' 
                ? 'bg-green-400/20 text-green-400' 
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            find
          </button>
          <button
            onClick={() => setCurrentView('git')}
            className={`px-3 py-1 text-xs rounded ${
              currentView === 'git' 
                ? 'bg-green-400/20 text-green-400' 
                : 'text-gray-400 hover:text-green-400'
            }`}
          >
            git log
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-4 flex items-center space-x-2">
        <span className="text-gray-400 text-xs">Filter:</span>
        {['all', 'Full-Stack', 'AI/ML', 'Embedded', 'Productivity', 'DevOps'].map((category) => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-2 py-1 text-xs rounded ${
              filterCategory === category
                ? 'bg-cyan-400/20 text-cyan-400'
                : 'text-gray-500 hover:text-cyan-400'
            }`}
          >
            {category}
          </button>
        ))}
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
          {currentView === 'ls' && renderLsView()}
          {currentView === 'tree' && renderTreeView()}
          {currentView === 'find' && renderFindView()}
          {currentView === 'git' && renderGitView()}
        </motion.div>
      </AnimatePresence>

      {/* Footer with stats */}
      <div className="mt-6 pt-4 border-t border-gray-700 text-xs text-gray-500">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Total projects: {projects.length}</span>
            <span>⎈ K8s deployments: {Math.floor(projects.length * 0.8)}</span>
            <span>🐳 Docker images: {projects.length * 2}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>All services healthy</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerminalizedProjects