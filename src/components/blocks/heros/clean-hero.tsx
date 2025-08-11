"'use client';"
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion' // Fixed import path
import { ChevronRight, Zap, Brain, Rocket, Star, ArrowDown } from 'lucide-react'

const TYPING_SPEED = 100
const PAUSE_DURATION = 2000

const roles = [
  "Full-Stack Engineer",
  "AI/ML Specialist",
  "Technical Architect",
  "Innovation Leader",
  "Problem Solver"
]

const codeSnippet = `---
# Ansible Infrastructure Automation
- name: Deploy Web Application
  hosts: production
  become: yes
  vars:
    app_name: "web-app"
    app_version: "v2.1.0"
    
  tasks:
    - name: Update system packages
      apt:
        update_cache: yes
        upgrade: dist
        
    - name: Install Docker
      apt:
        name: docker.io
        state: present
        
    - name: Deploy application
      docker_container:
        name: "{{ app_name }}"
        image: "registry.com/{{ app_name }}:{{ app_version }}"
        state: started
        ports:
          - "80:8080"
        env:
          NODE_ENV: production`

const achievements = [
  { number: "50+", label: "Projects Delivered", icon: Rocket },
  { number: "99.9%", label: "Uptime Achieved", icon: Zap },
  { number: "2.1k+", label: "GitHub Stars", icon: Star },
  { number: "15+", label: "Technologies Mastered", icon: Brain }
]

// Added proper type definition
interface CodeSnippet {
  language: string
  title: string
  code: string
}

function SyntaxHighlightedCode({ code }: { code: string }) {
  return (
    <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-6">
      {code}
    </pre>
  )
}

export default function CleanHero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)

  // Fix hydration by only showing dynamic content on client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Typing animation effect
  useEffect(() => {
    const currentRoleText = roles[currentRole]
    let timeoutId: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < currentRoleText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentRoleText.slice(0, displayText.length + 1))
        }, TYPING_SPEED)
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false)
        }, PAUSE_DURATION)
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1))
        }, TYPING_SPEED / 2)
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length)
        setIsTyping(true)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayText, isTyping, currentRole])



  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-[120vh] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Static background pattern for SSR, dynamic particles for client */}
        {!isClient ? (
          // Static dots for server-side rendering
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20"
                style={{
                  left: `${(i * 17 + 23) % 100}%`,
                  top: `${(i * 13 + 37) % 100}%`
                }}
              />
            ))}
          </div>
        ) : (
          // Dynamic particles for client-side
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[var(--color-primary-accent)] rounded-full opacity-20"
                animate={{
                  x: [0, (i * 7 - 35)],
                  y: [0, (i * 11 - 55)],
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.8, 0.2]
                }}
                transition={{
                  duration: i + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  left: `${(i * 17 + 23) % 100}%`,
                  top: `${(i * 13 + 37) % 100}%`
                }}
              />
            ))}

            {/* Interactive cursor glow */}
            <motion.div
              className="fixed w-96 h-96 bg-gradient-radial from-[#3b82f6]/10 to-transparent rounded-full pointer-events-none z-10"
              animate={{
                x: mousePosition.x - 192,
                y: mousePosition.y - 192
              }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
            />
          </>
        )}
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left side - Content */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center space-x-4 mb-8"
              >
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-[#3b82f6] rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-[#3b82f6] rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-[#3b82f6] font-semibold text-sm">Available for Projects</span>
                </div>
                <div className="h-4 w-px bg-[#334155]"></div>
                <span className="text-[#94a3b8] text-sm">Enterprise Solutions</span>
              </motion.div>

              {/* Name and title */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="mb-6"
              >
                <h1 className="text-6xl lg:text-7xl font-bold text-[#f1f5f9] mb-4">
                  Nassim
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6]">
                    Maaoui
                  </span>
                </h1>

                <div className="text-2xl lg:text-3xl font-semibold text-[#94a3b8] h-12 flex items-center">
                  <span className="mr-2">I'm a</span>
                  <span className="text-[#3b82f6] min-w-[300px]">
                    {displayText}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="ml-1"
                    >
                      |
                    </motion.span>
                  </span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-xl text-[#94a3b8] leading-relaxed mb-8 max-w-2xl"
              >
                Crafting next-generation digital experiences with cutting-edge technologies.
                Specialized in scalable architectures, AI integration, and performance optimization
                that drive measurable business impact.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 mb-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-semibold rounded-xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center">
                    <Rocket className="w-5 h-5 mr-2" />
                    Start Your Project
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-[#3b82f6] text-[#3b82f6] font-semibold rounded-xl hover:bg-[#3b82f6] hover:text-white transition-all duration-300"
                >
                  View Portfolio
                </motion.button>
              </motion.div>

              {/* Achievement stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                    className="text-center group"
                  >
                    <div className="flex justify-center mb-2">
                      <achievement.icon className="w-6 h-6 text-[#3b82f6] group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="text-2xl font-bold text-[#f1f5f9] mb-1">
                      {achievement.number}
                    </div>
                    <div className="text-sm text-[#94a3b8]">
                      {achievement.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Interactive Code Display */}
          <div className="lg:col-span-6 mt-16 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative"
            >
              {/* Code editor mockup */}
              <div className="bg-[#0d1117] rounded-2xl shadow-2xl border border-gray-700 overflow-hidden backdrop-blur-sm">
                {/* Editor header */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#161b22] border-b border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-gray-300 text-sm font-mono">
                      ansible-playbook.yaml
                    </span>
                  </div>


                </div>

                {/* Code content */}
                <div className="p-6 h-96 overflow-y-auto bg-[#0d1117] rounded-b-2xl">
                  <SyntaxHighlightedCode code={codeSnippet} />
                </div>
              </div>

              {/* Floating tech badges */}
              <div className="absolute -top-4 -right-4 space-y-2">
                {['Ansible', 'Docker', 'Nginx', 'Linux'].map((tech, index) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="bg-[#3b82f6]/10 backdrop-blur-sm border border-[#3b82f6]/20 px-3 py-1 rounded-full text-[#3b82f6] text-xs font-semibold"
                  >
                    {tech}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-[#94a3b8]"
          >
            <span className="text-sm mb-2">Explore My Work</span>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}