'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Cloud/DevOps' | 'Mobile' | 'Embedded';
  proficiency: number;
  projects: number;
  icon: string;
  color: string;
  funFact: string;
}

const technologies: TechItem[] = [
  // Frontend
  { name: 'React', category: 'Frontend', proficiency: 95, projects: 15, icon: '⚛️', color: 'from-blue-400 to-cyan-400', funFact: 'Built 15+ production apps with React' },
  { name: 'Next.js', category: 'Frontend', proficiency: 90, projects: 8, icon: '▲', color: 'from-gray-700 to-gray-900', funFact: 'SSR expert with 8 Next.js projects' },
  { name: 'Svelte', category: 'Frontend', proficiency: 85, projects: 3, icon: '🔥', color: 'from-orange-400 to-red-500', funFact: 'Cession App built with Svelte' },
  { name: 'TypeScript', category: 'Frontend', proficiency: 92, projects: 20, icon: '📘', color: 'from-blue-500 to-blue-700', funFact: 'Type-safe code in 20+ projects' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 88, projects: 12, icon: '🎨', color: 'from-teal-400 to-blue-500', funFact: 'Rapid UI development specialist' },

  // Backend
  { name: 'Spring Boot', category: 'Backend', proficiency: 90, projects: 6, icon: '🍃', color: 'from-green-400 to-green-600', funFact: 'Enterprise-grade Java applications' },
  { name: 'Node.js', category: 'Backend', proficiency: 88, projects: 18, icon: '🟢', color: 'from-green-500 to-green-700', funFact: 'Scalable server-side JavaScript' },
  { name: 'Python', category: 'Backend', proficiency: 92, projects: 25, icon: '🐍', color: 'from-yellow-400 to-yellow-600', funFact: 'AI/ML and backend development' },
  { name: 'PostgreSQL', category: 'Backend', proficiency: 85, projects: 10, icon: '🐘', color: 'from-blue-600 to-indigo-600', funFact: 'Complex query optimization expert' },
  { name: 'MongoDB', category: 'Backend', proficiency: 80, projects: 8, icon: '🍃', color: 'from-green-600 to-green-800', funFact: 'NoSQL document database pro' },

  // AI/ML
  { name: 'TensorFlow', category: 'AI/ML', proficiency: 88, projects: 5, icon: '🧠', color: 'from-orange-400 to-orange-600', funFact: 'Board-AI achieved 92% accuracy' },
  { name: 'PyTorch', category: 'AI/ML', proficiency: 82, projects: 4, icon: '🔥', color: 'from-red-500 to-red-700', funFact: 'Deep learning research projects' },
  { name: 'OpenCV', category: 'AI/ML', proficiency: 85, projects: 6, icon: '👁️', color: 'from-blue-500 to-purple-500', funFact: 'Computer vision applications' },
  { name: 'Hugging Face', category: 'AI/ML', proficiency: 78, projects: 3, icon: '🤗', color: 'from-yellow-400 to-orange-400', funFact: 'NLP and transformer models' },
  { name: 'TensorRT', category: 'AI/ML', proficiency: 75, projects: 2, icon: '⚡', color: 'from-green-400 to-green-600', funFact: '120ms inference optimization' },

  // Cloud/DevOps
  { name: 'AWS', category: 'Cloud/DevOps', proficiency: 85, projects: 12, icon: '☁️', color: 'from-orange-400 to-orange-600', funFact: 'Multi-region deployments' },
  { name: 'Docker', category: 'Cloud/DevOps', proficiency: 90, projects: 20, icon: '🐳', color: 'from-blue-400 to-blue-600', funFact: 'Containerization expert' },
  { name: 'Kubernetes', category: 'Cloud/DevOps', proficiency: 82, projects: 8, icon: '⚓', color: 'from-blue-500 to-indigo-500', funFact: 'Orchestration and scaling' },
  { name: 'Terraform', category: 'Cloud/DevOps', proficiency: 80, projects: 6, icon: '🏗️', color: 'from-purple-500 to-purple-700', funFact: 'Infrastructure as Code' },
  { name: 'Ansible', category: 'Cloud/DevOps', proficiency: 78, projects: 5, icon: '🔧', color: 'from-red-500 to-red-700', funFact: 'Configuration management' },

  // Mobile
  { name: 'React Native', category: 'Mobile', proficiency: 85, projects: 4, icon: '📱', color: 'from-blue-400 to-purple-400', funFact: 'Cross-platform mobile apps' },
  { name: 'Flutter', category: 'Mobile', proficiency: 75, projects: 2, icon: '🦋', color: 'from-blue-400 to-cyan-400', funFact: 'Dart-based mobile development' },

  // Embedded
  { name: 'C++', category: 'Embedded', proficiency: 88, projects: 8, icon: '⚙️', color: 'from-blue-600 to-blue-800', funFact: 'Nanosatellite communication' },
  { name: 'STM32', category: 'Embedded', proficiency: 82, projects: 5, icon: '🔌', color: 'from-green-500 to-green-700', funFact: 'Microcontroller programming' },
  { name: 'LoRaWAN', category: 'Embedded', proficiency: 80, projects: 3, icon: '📡', color: 'from-purple-500 to-purple-700', funFact: '1.2 Mbps data rate achieved' },
  { name: 'IoT Protocols', category: 'Embedded', proficiency: 78, projects: 6, icon: '🌐', color: 'from-teal-400 to-teal-600', funFact: 'Connected device specialist' }
];

const categories = ['All', 'Frontend', 'Backend', 'AI/ML', 'Cloud/DevOps', 'Mobile', 'Embedded'];

export default function AdvancedTechGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const filteredTechs = selectedCategory === 'All' 
    ? technologies 
    : technologies.filter(tech => tech.category === selectedCategory);

  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Technical Arsenal
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit spanning frontend elegance, backend robustness, 
            AI innovation, and cloud-native architecture
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Tech Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {filteredTechs.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="relative group"
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-blue-500/10">
                {/* Tech Icon */}
                <div className="text-4xl mb-4 text-center">{tech.icon}</div>
                
                {/* Tech Name */}
                <h3 className="text-white font-semibold text-center mb-3">{tech.name}</h3>
                
                {/* Proficiency Bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Proficiency</span>
                    <span>{tech.proficiency}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${tech.color} transition-all duration-1000`}
                      style={{ width: `${tech.proficiency}%` }}
                    />
                  </div>
                </div>
                
                {/* Projects Count */}
                <div className="text-center">
                  <span className="text-2xl font-bold text-cyan-400">{tech.projects}</span>
                  <div className="text-xs text-slate-400">Projects</div>
                </div>

                {/* Hover Tooltip */}
                {hoveredTech === tech.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 whitespace-nowrap z-10"
                  >
                    <div className="text-white text-sm font-medium">{tech.funFact}</div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Technologies Mastered', value: '25+', color: 'text-blue-400' },
            { label: 'Total Projects', value: '150+', color: 'text-green-400' },
            { label: 'Years Experience', value: '5+', color: 'text-purple-400' },
            { label: 'Success Rate', value: '98%', color: 'text-cyan-400' }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}