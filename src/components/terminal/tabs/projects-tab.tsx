"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TerminalTabProps } from '../types/terminal.types'
import { TerminalSlideIn, TypewriterText } from '../shared/terminal-animations'
import { SyntaxHighlighter } from '../shared/syntax-highlighter'
import { 
  FolderOpen, 
  File, 
  Star, 
  GitFork, 
  GitCommit, 
  ExternalLink,
  Github,
  Play,
  Code,
  Database,
  Brain,
  Smartphone
} from 'lucide-react'

interface Project {
  id: string
  name: string
  description: string
  category: string
  stars: number
  forks: number
  commits: number
  language: string
  demo?: string
}

const projects: Project[] = [
  {
    id: 'cession-app',
    name: 'Cession App',
    description: 'Session & Contract Management Platform',
    category: 'Full-Stack',
    stars: 194,
    forks: 42,
    commits: 87,
    language: 'Java/Svelte',
    demo: 'https://cession-demo.nassimmaaoui.dev'
  },
  {
    id: 'board-ai',
    name: 'Board-AI',
    description: 'Electronic Component Detection with CNN',
    category: 'AI/ML',
    stars: 271,
    forks: 64,
    commits: 142,
    language: 'Python'
  },
  {
    id: 'nanosatellite-comm',
    name: 'Nanosatellite Communication',
    description: 'Optimized LoRaWAN Communication Module',
    category: 'Embedded',
    stars: 305,
    forks: 77,
    commits: 198,
    language: 'C++'
  },
  {
    id: 'goldentouch',
    name: 'GoldenTouch',
    description: 'AI Event Platform with Smart Analytics',
    category: 'Full-Stack',
    stars: 221,
    forks: 41,
    commits: 116,
    language: 'PHP/Java'
  }
]

const categoryIcons = {
  'Full-Stack': Code,
  'AI/ML': Brain,
  'Embedded': Database,
  'Mobile': Smartphone
}

const sampleCode = {
  'cession-app': `// Spring Boot REST Controller
@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "*")
public class SessionController {
    
    @Autowired
    private SessionService sessionService;
    
    @GetMapping
    public ResponseEntity<List<Session>> getAllSessions(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Session> sessions = sessionService.findAll(pageable);
        
        return ResponseEntity.ok()
            .header("X-Total-Count", String.valueOf(sessions.getTotalElements()))
            .body(sessions.getContent());
    }
    
    @PostMapping
    public ResponseEntity<Session> createSession(
        @Valid @RequestBody SessionDTO sessionDTO
    ) {
        Session session = sessionService.create(sessionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(session);
    }
}`,
  'board-ai': `# CNN Model for PCB Component Detection
import tensorflow as tf
from tensorflow.keras import layers, models

class ComponentDetectionCNN:
    def __init__(self, num_classes=50):
        self.model = self.build_model(num_classes)
        self.accuracy = 0.92  # 92% achieved
        
    def build_model(self, num_classes):
        model = models.Sequential([
            layers.Conv2D(32, (3, 3), activation='relu', 
                         input_shape=(224, 224, 3)),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(64, (3, 3), activation='relu'),
            layers.MaxPooling2D((2, 2)),
            layers.Conv2D(128, (3, 3), activation='relu'),
            layers.GlobalAveragePooling2D(),
            layers.Dense(128, activation='relu'),
            layers.Dropout(0.5),
            layers.Dense(num_classes, activation='softmax')
        ])
        
        model.compile(
            optimizer='adam',
            loss='categorical_crossentropy',
            metrics=['accuracy']
        )
        
        return model
        
    def predict_component(self, image):
        # Preprocess image
        processed = tf.image.resize(image, [224, 224])
        processed = tf.cast(processed, tf.float32) / 255.0
        processed = tf.expand_dims(processed, 0)
        
        # Run inference (120ms average)
        predictions = self.model.predict(processed)
        return predictions`
}

export function ProjectsTab({ isActive }: TerminalTabProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showCode, setShowCode] = useState(false)
  const [filter, setFilter] = useState('all')

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  if (!isActive) return null

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Project Explorer</h3>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2">
            {['all', 'Full-Stack', 'AI/ML', 'Embedded'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  filter === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        {!selectedProject ? (
          /* Project List */
          <div className="h-full overflow-y-auto p-4">
            <TerminalSlideIn delay={0.1}>
              <div className="mb-4">
                <TypewriterText 
                  text={`Found ${filteredProjects.length} projects matching filter: ${filter}`}
                  speed={20}
                  className="text-green-400 text-sm"
                />
              </div>
            </TerminalSlideIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project, index) => {
                const CategoryIcon = categoryIcons[project.category as keyof typeof categoryIcons] || Code
                
                return (
                  <TerminalSlideIn key={project.id} delay={0.2 + index * 0.1}>
                    <motion.div
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-blue-500/50 cursor-pointer transition-all duration-300"
                      onClick={() => setSelectedProject(project)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <CategoryIcon className="w-5 h-5 text-blue-400" />
                          <h4 className="font-semibold text-white">{project.name}</h4>
                        </div>
                        <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                          {project.category}
                        </span>
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            <span>{project.stars}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            <span>{project.forks}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitCommit className="w-3 h-3" />
                            <span>{project.commits}</span>
                          </div>
                        </div>
                        <span className="text-blue-400">{project.language}</span>
                      </div>
                    </motion.div>
                  </TerminalSlideIn>
                )
              })}
            </div>
          </div>
        ) : (
          /* Project Detail */
          <div className="h-full overflow-y-auto">
            {/* Project Header */}
            <div className="p-4 border-b border-gray-700 bg-gray-800/30">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                >
                  ← Back to projects
                </button>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowCode(!showCode)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                  >
                    <Code className="w-3 h-3" />
                    {showCode ? 'Hide Code' : 'View Code'}
                  </button>
                  
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                    >
                      <Play className="w-3 h-3" />
                      Live Demo
                    </a>
                  )}
                  
                  <a
                    href={`https://github.com/iborntowin/${selectedProject.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                  >
                    <Github className="w-3 h-3" />
                    GitHub
                  </a>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{selectedProject.name}</h3>
              <p className="text-gray-400">{selectedProject.description}</p>
            </div>

            {/* Project Content */}
            <div className="p-4">
              <AnimatePresence mode="wait">
                {showCode && sampleCode[selectedProject.id as keyof typeof sampleCode] ? (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                      <span className="text-sm text-gray-300 font-mono">
                        {selectedProject.id}/src/main.{selectedProject.language.split('/')[0].toLowerCase()}
                      </span>
                      <File className="w-4 h-4 text-gray-400" />
                    </div>
                    <div className="p-4 max-h-96 overflow-y-auto">
                      <SyntaxHighlighter 
                        code={sampleCode[selectedProject.id as keyof typeof sampleCode]}
                        language={selectedProject.language.includes('Java') ? 'java' : 'python'}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="info"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                  >
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                        <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                        <div className="text-xl font-bold text-white">{selectedProject.stars}</div>
                        <div className="text-xs text-gray-400">Stars</div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                        <GitFork className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                        <div className="text-xl font-bold text-white">{selectedProject.forks}</div>
                        <div className="text-xs text-gray-400">Forks</div>
                      </div>
                      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center">
                        <GitCommit className="w-6 h-6 text-green-400 mx-auto mb-2" />
                        <div className="text-xl font-bold text-white">{selectedProject.commits}</div>
                        <div className="text-xs text-gray-400">Commits</div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Project Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="text-white">{selectedProject.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Language:</span>
                          <span className="text-white">{selectedProject.language}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Repository:</span>
                          <a 
                            href={`https://github.com/iborntowin/${selectedProject.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                          >
                            View on GitHub
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}