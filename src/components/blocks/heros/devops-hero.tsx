"use client"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Rocket, ArrowDown } from 'lucide-react'

const TYPING_SPEED = 100
const PAUSE_DURATION = 2000

const roles = [
    "Full-Stack Developer",
    "AI/ML Engineer", 
    "Cloud Architect",
    "Software Engineer",
    "Innovation Builder"
]

const codeSnippets = [
    {
        language: "yaml",
        title: "ansible-playbook",
        code: `---
# Ansible Infrastructure Automation Playbook
- name: Deploy Web Application Infrastructure
  hosts: production
  become: yes
  vars:
    app_name: "web-app"
    app_version: "v2.1.0"
    docker_registry: "registry.company.com"
    
  tasks:
    - name: Update system packages
      apt:
        update_cache: yes
        upgrade: dist
        
    - name: Install Docker
      apt:
        name: docker.io
        state: present
        
    - name: Start Docker service
      systemd:
        name: docker
        state: started
        enabled: yes
        
    - name: Pull application image
      docker_image:
        name: "{{ docker_registry }}/{{ app_name }}"
        tag: "{{ app_version }}"
        source: pull
        
    - name: Deploy application container
      docker_container:
        name: "{{ app_name }}"
        image: "{{ docker_registry }}/{{ app_name }}:{{ app_version }}"
        state: started
        restart_policy: always
        ports:
          - "80:8080"
        env:
          NODE_ENV: production
          DATABASE_URL: "{{ vault_database_url }}"
          
    - name: Configure nginx reverse proxy
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/sites-available/{{ app_name }}
      notify: restart nginx
      
    - name: Enable nginx site
      file:
        src: /etc/nginx/sites-available/{{ app_name }}
        dest: /etc/nginx/sites-enabled/{{ app_name }}
        state: link
      notify: restart nginx
      
  handlers:
    - name: restart nginx
      systemd:
        name: nginx
        state: restarted`
    }
]

// Removed achievements section as requested

function CodeHighlighter({ code }: { code: string }) {
    const lines = code.split('\n')

    return (
        <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-6">
            {lines.map((line, lineIndex) => (
                <div key={lineIndex} className="min-h-[1.5rem]">
                    {line.split(/(\b(?:apiVersion|kind|metadata|spec|containers|image|resources|kubectl|aws|terraform|resource|provider)\b|\b(?:true|false|null)\b|\b\d+\.?\d*[a-zA-Z]*\b|["'][^"']*["']|#.*$)/).map((part, partIndex) => {
                        if (!part) return null

                        if (/\b(apiVersion|kind|metadata|spec|containers|image|resources|kubectl|aws|terraform|resource|provider)\b/.test(part)) {
                            return <span key={partIndex} className="text-blue-400 font-semibold">{part}</span>
                        }
                        if (/\b(true|false|null)\b/.test(part)) {
                            return <span key={partIndex} className="text-orange-400">{part}</span>
                        }
                        if (/\b\d+\.?\d*[a-zA-Z]*\b/.test(part)) {
                            return <span key={partIndex} className="text-green-400">{part}</span>
                        }
                        if (/["'][^"']*["']/.test(part)) {
                            return <span key={partIndex} className="text-green-300">{part}</span>
                        }
                        if (/#.*$/.test(part)) {
                            return <span key={partIndex} className="text-gray-400">{part}</span>
                        }

                        return <span key={partIndex}>{part}</span>
                    })}
                </div>
            ))}
        </pre>
    )
}

export default function DevOpsHero() {
    const [currentRole, setCurrentRole] = useState(0)
    const [displayText, setDisplayText] = useState("")
    const [isTyping, setIsTyping] = useState(true)
    // Removed unused state variables
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    // Typing animation
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

    // Removed code rotation since we only have one snippet

    const staticParticles = []
    for (let i = 0; i < 20; i++) {
        staticParticles.push(
            <div
                key={i}
                className="absolute w-1 h-1 bg-[#3b82f6] rounded-full opacity-20"
                style={{
                    left: `${(i * 17 + 23) % 100}%`,
                    top: `${(i * 13 + 37) % 100}%`
                }}
            />
        )
    }

    const animatedParticles = []
    for (let i = 0; i < 20; i++) {
        animatedParticles.push(
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#3b82f6] rounded-full opacity-20"
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
        )
    }

    return (
        <div className="relative min-h-[120vh] bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
            {/* Background particles */}
            <div className="absolute inset-0">
                {!isClient ? (
                    <div className="absolute inset-0 opacity-20">
                        {staticParticles}
                    </div>
                ) : (
                    <div className="absolute inset-0">
                        {animatedParticles}
                    </div>
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
                                <span className="text-[#94a3b8] text-sm">Cloud Solutions</span>
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
                                Full-stack engineer passionate about creating innovative solutions that bridge technology and real-world impact. 
                                From AI-powered applications to scalable cloud infrastructure, I build systems that matter.
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8 }}
                                className="flex flex-col sm:flex-row gap-4 mb-12"
                            >
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group relative px-8 py-4 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] text-white font-semibold rounded-xl overflow-hidden"
                                >
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

                            {/* Removed achievement stats section as requested */}
                        </motion.div>
                    </div>

                    {/* Right side - Code Display */}
                    <div className="lg:col-span-6 mt-16 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="relative"
                        >
                            {/* Code editor */}
                            <div className="bg-[#0d1117] rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                                {/* Header */}
                                <div className="flex items-center justify-between px-6 py-4 bg-[#161b22] border-b border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        </div>
                                        <span className="text-gray-300 text-sm font-mono">
                                            {codeSnippets[0].title}.{codeSnippets[0].language}
                                        </span>
                                    </div>

                                    {/* Removed controls since we only have one snippet */}
                                </div>

                                {/* Code content */}
                                <div className="p-6 h-96 overflow-y-auto bg-[#0d1117]">
                                    <CodeHighlighter code={codeSnippets[0].code} />
                                </div>
                            </div>

                            {/* Tech badges */}
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