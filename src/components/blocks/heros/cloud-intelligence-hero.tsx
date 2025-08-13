'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Terminal, Globe, Zap, Activity } from 'lucide-react';

const roles = [
  "Full-Stack Developer",
  "AI/ML Engineer", 
  "DevOps & Cloud Architect",
  "IoT Innovator"
];

const commands = [
  "kubectl apply -f production-deployment.yaml",
  "terraform apply -auto-approve",
  "helm upgrade app-stack ./charts/app",
  "ansible-playbook deploy.yml -i production",
  "aws ecs update-service --cluster prod",
  "docker build -t app:v2.1.0 .",
  "kubectl scale deployment app --replicas=5"
];

const projects = [
  { name: "Cession App", tech: "Spring Boot + Svelte", location: "EU-West-1" },
  { name: "Board-AI", tech: "TensorFlow + TensorRT", location: "US-East-1" },
  { name: "NeuroVigil", tech: "Python + EEG", location: "AP-South-1" },
  { name: "GoldenTouch", tech: "Symfony + AI", location: "EU-Central-1" }
];

export default function CloudIntelligenceHero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("Full-Stack Developer");
  const [isTyping, setIsTyping] = useState(true);
  const [currentCommand, setCurrentCommand] = useState(0);
  const [metrics, setMetrics] = useState({
    uptime: 99.7,
    deployedServices: 47,
    aiModels: 12,
    dataProcessed: 2.4
  });

  // Role typing animation - client-side only
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const currentRoleText = roles[currentRole];
    const typingSpeed = 100; // Consistent typing speed
    const pauseDuration = 2000; // Consistent pause duration
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (displayText.length < currentRoleText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentRoleText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeoutId = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, typingSpeed / 2); // Faster deletion
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isTyping, currentRole]);

  // Command rotation - client-side only
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const commandRotationInterval = 3000; // Consistent interval
    const interval = setInterval(() => {
      setCurrentCommand((prev) => (prev + 1) % commands.length);
    }, commandRotationInterval);
    
    return () => clearInterval(interval);
  }, []);

  // Metrics animation with client-side only updates
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      setMetrics(prev => ({
        uptime: Math.min(99.9, prev.uptime + 0.01),
        deployedServices: prev.deployedServices + (counter % 3 === 0 ? 1 : 0),
        aiModels: prev.aiModels + (counter % 5 === 0 ? 1 : 0),
        dataProcessed: prev.dataProcessed + 0.1
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => {
          // Use deterministic positioning based on index to avoid hydration mismatch
          const seed = i * 17 + 23; // Simple seed based on index
          const left = (seed * 7) % 100;
          const top = (seed * 13) % 100;
          const delay = (seed * 3) % 3000;
          const duration = 2000 + (seed * 5) % 3000;
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30 animate-pulse-safe"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}ms`,
                animationDuration: `${duration}ms`
              }}
            />
          );
        })}
      </div>

      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 backdrop-blur-sm" />

      <div className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left side - Content */}
          <div>
            {/* Status badge */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-safe"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping-safe opacity-75"></div>
                </div>
                <span className="text-green-400 font-semibold text-sm">System Online</span>
              </div>
              <div className="h-4 w-px bg-slate-600"></div>
              <span className="text-slate-400 text-sm">Cloud Intelligence Command</span>
            </div>

            {/* Name and title */}
            <div className="mb-6">
              <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
                Nassim
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
                  Maaoui
                </span>
              </h1>

              <div className="text-2xl lg:text-3xl font-semibold text-slate-300 h-12 flex items-center">
                <span className="text-blue-400 min-w-[400px]">
                  {displayText}
                  <span className="ml-1 animate-pulse text-cyan-400">|</span>
                </span>
              </div>
            </div>

            {/* Signature tagline */}
            <p className="text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl font-light">
              Engineering intelligent systems for a connected world
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-xl overflow-hidden               hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                <span className="relative flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  View Deployments
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-semibold rounded-xl hover:bg-cyan-400 hover:text-slate-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/25">
                Initiate Contact
              </button>
            </div>
          </div>

          {/* Right side - Interactive Cloud Map & Terminal */}
          <div className="space-y-6">
            {/* Command Terminal */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden">
              <div className="flex items-center justify-between px-6 py-3 bg-slate-800/80 border-b border-slate-700/50">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <Terminal className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300 text-sm font-mono">cloud-command</span>
                </div>
                <div className="text-green-400 text-xs font-mono">LIVE</div>
              </div>
              <div className="p-4 h-24 bg-slate-900/90">
                <div className="font-mono text-sm">
                  <span className="text-green-400">nassim@cloud-ops</span>
                  <span className="text-slate-400">:</span>
                  <span className="text-blue-400">~/deployments</span>
                  <span className="text-slate-400">$ </span>
                  <span className="text-slate-200">{commands[currentCommand]}</span>
                  <div className="text-green-400 text-xs mt-1">✓ Command executed successfully</div>
                </div>
              </div>
            </div>

            {/* Interactive Global Cloud Map */}
            <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Global Infrastructure</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">All Systems Operational</span>
                </div>
              </div>
              
              {/* Simplified world map with project nodes */}
              <div className="relative h-56 bg-slate-800/50 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
                
                {/* Project nodes */}
                {projects.map((project, index) => (
                  <div
                    key={project.name}
                    className="absolute group cursor-pointer"
                    style={{
                      // Use deterministic positioning based on index
                      left: `${15 + (index * 25)}%`,
                      top: `${25 + ((index * 17) % 3) * 20}%`
                    }}
                  >
                    <div className="relative">
                      <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse-safe shadow-lg shadow-cyan-400/50"></div>
                      <div className="absolute inset-0 w-4 h-4 bg-cyan-400 rounded-full animate-ping-safe opacity-30"></div>
                      
                      {/* Always visible project name */}
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                        <div className="text-cyan-400 font-semibold text-xs whitespace-nowrap">{project.name}</div>
                      </div>
                    </div>
                    
                    {/* Enhanced tooltip on hover */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm border border-slate-600 rounded-lg p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-xl">
                      <div className="text-white font-semibold text-sm">{project.name}</div>
                      <div className="text-slate-300 text-xs">{project.tech}</div>
                      <div className="text-cyan-400 text-xs">{project.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Metrics Strip */}
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: "Uptime", value: `${metrics.uptime.toFixed(1)}%`, icon: Activity, color: "text-green-400" },
                { label: "Services", value: metrics.deployedServices.toString(), icon: Globe, color: "text-blue-400" },
                { label: "AI Models", value: metrics.aiModels.toString(), icon: Zap, color: "text-purple-400" },
                { label: "Data (TB)", value: metrics.dataProcessed.toFixed(1), icon: Terminal, color: "text-cyan-400" }
              ].map((metric) => (
                <div key={metric.label} className="bg-slate-900/60 backdrop-blur-sm rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <metric.icon className={`w-4 h-4 ${metric.color}`} />
                    <span className={`text-lg font-bold ${metric.color}`}>{metric.value}</span>
                  </div>
                  <div className="text-slate-400 text-xs">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}