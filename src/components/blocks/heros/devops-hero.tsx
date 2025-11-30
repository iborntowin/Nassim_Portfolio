'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Terminal, ArrowDown } from 'lucide-react';

const TYPING_SPEED = 100;
const PAUSE_DURATION = 2000;

const roles = [
  "Full-Stack Developer",
  "AI/ML Engineer", 
  "Cloud Architect",
  "Software Engineer",
  "Innovation Builder"
];

// Code sections with IDs for scrolling
const codeSections = {
  ansible: {
    id: 'ansible-section',
    startLine: 0,
    code: `---
# ═══════════════════════════════════════════════════════
# 🚀 ANSIBLE - Infrastructure Automation Playbook
# ═══════════════════════════════════════════════════════
- name: Deploy Production Infrastructure
  hosts: production
  become: yes
  gather_facts: yes
  
  vars:
    app_name: "portfolio-app"
    app_version: "v3.0.0"
    environment: "production"
    
  pre_tasks:
    - name: Validate deployment environment
      assert:
        that:
          - environment is defined
          - app_version is defined
        fail_msg: "Required variables not set"`
  },
  docker: {
    id: 'docker-section',
    startLine: 20,
    code: `
# ═══════════════════════════════════════════════════════
# 🐳 DOCKER - Container Orchestration
# ═══════════════════════════════════════════════════════
  tasks:
    - name: Install Docker Engine
      apt:
        name:
          - docker.io
          - docker-compose
          - containerd
        state: present
        update_cache: yes
        
    - name: Start Docker service
      systemd:
        name: docker
        state: started
        enabled: yes
        
    - name: Pull application image
      docker_image:
        name: "ghcr.io/{{ app_name }}"
        tag: "{{ app_version }}"
        source: pull
        
    - name: Deploy application container
      docker_container:
        name: "{{ app_name }}"
        image: "ghcr.io/{{ app_name }}:{{ app_version }}"
        state: started
        restart_policy: always
        ports:
          - "3000:3000"
        env:
          NODE_ENV: "{{ environment }}"
          DATABASE_URL: "{{ vault_db_url }}"`
  },
  nginx: {
    id: 'nginx-section',
    startLine: 55,
    code: `
# ═══════════════════════════════════════════════════════
# 🌐 NGINX - Reverse Proxy & Load Balancer
# ═══════════════════════════════════════════════════════
    - name: Install Nginx
      apt:
        name: nginx
        state: present
        
    - name: Configure Nginx reverse proxy
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/sites-available/{{ app_name }}
      vars:
        upstream_port: 3000
        ssl_enabled: true
        http2_enabled: true
        gzip_compression: true
      notify: restart nginx
      
    - name: Enable Nginx site
      file:
        src: /etc/nginx/sites-available/{{ app_name }}
        dest: /etc/nginx/sites-enabled/{{ app_name }}
        state: link
      notify: restart nginx
      
    - name: Configure SSL certificate
      command: >
        certbot --nginx -d {{ domain }}
        --non-interactive --agree-tos
        --email admin@{{ domain }}`
  },
  linux: {
    id: 'linux-section',
    startLine: 85,
    code: `
# ═══════════════════════════════════════════════════════
# 🐧 LINUX - System Configuration & Hardening
# ═══════════════════════════════════════════════════════
    - name: Update system packages
      apt:
        update_cache: yes
        upgrade: dist
        autoremove: yes
        
    - name: Configure system limits
      pam_limits:
        domain: '*'
        limit_type: soft
        limit_item: nofile
        value: 65536
        
    - name: Optimize kernel parameters
      sysctl:
        name: "{{ item.key }}"
        value: "{{ item.value }}"
        state: present
        reload: yes
      loop:
        - { key: 'net.core.somaxconn', value: '65535' }
        - { key: 'vm.swappiness', value: '10' }
        - { key: 'fs.file-max', value: '2097152' }
        
  handlers:
    - name: restart nginx
      systemd:
        name: nginx
        state: restarted
        
    - name: restart docker
      systemd:
        name: docker
        state: restarted`
  }
};

const fullCodeSnippet = Object.values(codeSections).map(s => s.code).join('');

interface CodeHighlighterProps {
  code: string;
  highlightSection?: string | null;
  sectionRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
}

function CodeHighlighter({ code, highlightSection, sectionRefs }: CodeHighlighterProps) {
  const lines = code.split('\n');
  
  // Find which section each line belongs to
  const getSectionForLine = (lineIndex: number): string | null => {
    const sections = Object.entries(codeSections);
    for (let i = sections.length - 1; i >= 0; i--) {
      if (lineIndex >= sections[i][1].startLine) {
        return sections[i][0];
      }
    }
    return 'ansible';
  };

  return (
    <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-6">
      {lines.map((line, lineIndex) => {
        const section = getSectionForLine(lineIndex);
        const isHighlighted = highlightSection && section === highlightSection;
        const isSectionStart = line.includes('═══════════════');
        
        return (
          <div 
            key={lineIndex} 
            ref={isSectionStart && section ? (el) => { sectionRefs.current[section] = el; } : undefined}
            data-section={section}
            className={`min-h-[1.5rem] transition-all duration-300 ${
              isHighlighted 
                ? 'bg-blue-500/10 border-l-2 border-blue-500 pl-2 -ml-2' 
                : ''
            }`}
          >
            {line.split(/(\b(?:apiVersion|kind|metadata|spec|containers|image|resources|kubectl|aws|terraform|resource|provider|name|hosts|become|vars|tasks|apt|systemd|docker_image|docker_container|template|file|handlers|pre_tasks|assert|pam_limits|sysctl|command|gather_facts|loop)\b|\b(?:true|false|null|yes|no)\b|\b\d+\.?\d*[a-zA-Z]*\b|["'][^"']*["']|#.*$)/).map((part, partIndex) => {
              if (!part) return null;

              // Section headers (emoji lines)
              if (/[🚀🐳🌐🐧]/.test(part)) {
                return <span key={partIndex} className="text-yellow-400 font-bold">{part}</span>;
              }
              // Separator lines
              if (/═+/.test(part)) {
                return <span key={partIndex} className="text-slate-500">{part}</span>;
              }
              if (/\b(apiVersion|kind|metadata|spec|containers|image|resources|kubectl|aws|terraform|resource|provider|name|hosts|become|vars|tasks|apt|systemd|docker_image|docker_container|template|file|handlers|pre_tasks|assert|pam_limits|sysctl|command|gather_facts|loop)\b/.test(part)) {
                return <span key={partIndex} className="text-blue-400 font-semibold">{part}</span>;
              }
              if (/\b(true|false|null|yes|no)\b/.test(part)) {
                return <span key={partIndex} className="text-orange-400">{part}</span>;
              }
              if (/\b\d+\.?\d*[a-zA-Z]*\b/.test(part)) {
                return <span key={partIndex} className="text-green-400">{part}</span>;
              }
              if (/["'][^"']*["']/.test(part)) {
                return <span key={partIndex} className="text-green-300">{part}</span>;
              }
              if (/#.*$/.test(part)) {
                return <span key={partIndex} className="text-gray-400 italic">{part}</span>;
              }

              return <span key={partIndex}>{part}</span>;
            })}
          </div>
        );
      })}
    </pre>
  );
}

const techBadges = [
  { name: 'Ansible', section: 'ansible', color: 'from-red-500 to-red-600', icon: '🚀' },
  { name: 'Docker', section: 'docker', color: 'from-blue-500 to-blue-600', icon: '🐳' },
  { name: 'Nginx', section: 'nginx', color: 'from-green-500 to-green-600', icon: '🌐' },
  { name: 'Linux', section: 'linux', color: 'from-yellow-500 to-orange-500', icon: '🐧' }
];

export default function DevOpsHero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("Full-Stack Developer");
  const [isTyping, setIsTyping] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const router = useRouter();
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle section click - scroll to section and highlight
  const handleSectionClick = (sectionKey: string) => {
    setActiveSection(sectionKey);
    
    // Scroll to section in code container
    const sectionElement = sectionRefs.current[sectionKey];
    if (sectionElement && codeContainerRef.current) {
      const container = codeContainerRef.current;
      const elementTop = sectionElement.offsetTop;
      container.scrollTo({
        top: elementTop - 20,
        behavior: 'smooth'
      });
    }
    
    // Remove highlight after 3 seconds
    setTimeout(() => {
      setActiveSection(null);
    }, 3000);
  };

  // Set mounted on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Typing animation - only run on client
  useEffect(() => {
    if (!mounted) return;

    const currentRoleText = roles[currentRole];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentRoleText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentRoleText.slice(0, displayText.length + 1));
        }, TYPING_SPEED);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, PAUSE_DURATION);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, TYPING_SPEED / 2);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentRole, mounted]);

  // Static particles for consistent rendering
  const staticParticles = [];
  for (let i = 0; i < 20; i++) {
    staticParticles.push(
      <div
        key={i}
        className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-20"
        style={{
          left: `${(i * 17 + 23) % 100}%`,
          top: `${(i * 13 + 37) % 100}%`
        }}
      />
    );
  }

  return (
    <div className="relative min-h-[120vh] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          {staticParticles}
        </div>
      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left side - Content */}
          <div>
            <div>
              {/* Status badge */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <span className="text-blue-500 font-semibold text-sm">Available for Projects</span>
                </div>
                <div className="h-4 w-px bg-slate-600"></div>
                <span className="text-slate-400 text-sm">Cloud Solutions</span>
              </div>

              {/* Name and title */}
              <div className="mb-6">
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4">
                  Nassim
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                    Maaoui
                  </span>
                </h1>

                <div className="text-2xl lg:text-3xl font-semibold text-slate-400 h-12 flex items-center">
                  <span className="mr-2">I'm a</span>
                  <span className="text-blue-500 min-w-[300px]">
                    {displayText}
                    <span className="ml-1 animate-pulse">|</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-2xl">
                Full-stack engineer passionate about creating innovative solutions that bridge technology and real-world impact. 
                From AI-powered applications to scalable cloud infrastructure, I build systems that matter.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => router.push('/terminal')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl overflow-hidden hover:scale-105 transition-transform"
                >
                  <span className="relative flex items-center">
                    <Terminal className="w-5 h-5 mr-2" />
                    Launch Terminal Mode
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right side - Code Display */}
          <div>
            <div className="relative">
              {/* Code editor */}
              <div className="bg-slate-900 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-gray-700">
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
                  {activeSection && (
                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full animate-pulse">
                      📍 {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
                    </span>
                  )}
                </div>

                {/* Code content */}
                <div 
                  ref={codeContainerRef}
                  className="p-6 h-96 overflow-y-auto bg-slate-900 scroll-smooth"
                >
                  <CodeHighlighter 
                    code={fullCodeSnippet} 
                    highlightSection={activeSection}
                    sectionRefs={sectionRefs}
                  />
                </div>
              </div>

              {/* Tech badges - Now clickable */}
              <div className="absolute -top-4 -right-4 space-y-2">
                {techBadges.map((tech, index) => (
                  <button
                    key={tech.name}
                    onClick={() => handleSectionClick(tech.section)}
                    className={`group flex items-center gap-2 backdrop-blur-sm border px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer
                      ${activeSection === tech.section 
                        ? `bg-gradient-to-r ${tech.color} text-white border-transparent shadow-lg scale-110` 
                        : 'bg-blue-500/10 border-blue-500/20 text-blue-500 hover:scale-110 hover:bg-blue-500/20'
                      }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="group-hover:animate-bounce">{tech.icon}</span>
                    {tech.name}
                  </button>
                ))}
              </div>

              {/* Click hint */}
              <div className="absolute -bottom-8 right-0 text-xs text-slate-500 flex items-center gap-1">
                <span>👆 Click badges to navigate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-slate-400 animate-bounce">
            <span className="text-sm mb-2">Explore My Work</span>
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}