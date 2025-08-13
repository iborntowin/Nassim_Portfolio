'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Rocket, Award, Code, Brain } from 'lucide-react';

interface TimelineItem {
  id: number;
  year: string;
  title: string;
  organization: string;
  type: 'education' | 'work' | 'project' | 'achievement';
  description: string;
  highlights: string[];
  icon: React.ComponentType<any>;
  color: string;
  image?: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    year: '2019',
    title: 'Computer Science Degree',
    organization: 'University of Technology',
    type: 'education',
    description: 'Bachelor\'s degree in Computer Science with focus on Software Engineering and AI',
    highlights: ['Graduated Magna Cum Laude', 'AI Research Project', 'Dean\'s List 4 semesters'],
    icon: GraduationCap,
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    year: '2020',
    title: 'Software Engineering Intern',
    organization: 'TechCorp Solutions',
    type: 'work',
    description: 'Full-stack development internship focusing on React and Node.js applications',
    highlights: ['Built 3 production features', 'Reduced load time by 40%', 'Mentored 2 junior interns'],
    icon: Briefcase,
    color: 'from-green-500 to-green-700'
  },
  {
    id: 3,
    year: '2021',
    title: 'NeuroVigil Launch',
    organization: 'Personal Project',
    type: 'project',
    description: 'Developed EEG-based driver fatigue detection system with 89% accuracy',
    highlights: ['89% detection precision', '<5% false positives', 'Published research paper'],
    icon: Brain,
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 4,
    year: '2022',
    title: 'AI/ML Engineer',
    organization: 'DataFlow Analytics',
    type: 'work',
    description: 'Led machine learning initiatives and computer vision projects',
    highlights: ['Board-AI: 92% accuracy', '120ms inference time', 'Team lead for 5 engineers'],
    icon: Code,
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 5,
    year: '2023',
    title: 'Cloud Architecture Certification',
    organization: 'AWS',
    type: 'achievement',
    description: 'AWS Solutions Architect Professional certification',
    highlights: ['Multi-region deployments', 'Cost optimization expert', 'Security best practices'],
    icon: Award,
    color: 'from-cyan-500 to-cyan-700'
  },
  {
    id: 6,
    year: '2024',
    title: 'Senior Full-Stack Engineer',
    organization: 'InnovateHub',
    type: 'work',
    description: 'Leading full-stack development and mentoring engineering teams',
    highlights: ['Cession App success', '150+ projects delivered', '50+ happy clients'],
    icon: Rocket,
    color: 'from-pink-500 to-pink-700'
  }
];

export default function ExperienceTimeline() {
  return (
    <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Journey of Innovation
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            From academic excellence to industry leadership, each milestone represents 
            growth, learning, and impactful contributions to technology
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <div className="relative overflow-x-auto pb-8 snap-x snap-mandatory">
          {/* Central horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full opacity-30 transform -translate-y-1/2"></div>

          {/* Timeline container */}
          <div className="flex items-center space-x-8 px-8 snap-x snap-mandatory overflow-x-auto hide-scrollbar" style={{scrollBehavior: 'smooth'}}>
            {timelineData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex flex-col items-center"
              >
                {/* Content Card */}
                <div className="w-80 mb-8 snap-center">
                  <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 shadow-xl hover:border-slate-600/50 transition-all duration-300 group">
                    {/* Year badge */}
                    <div className={`inline-block px-4 py-2 bg-gradient-to-r ${item.color} text-white text-sm font-bold rounded-full mb-4`}>
                      {item.year}
                    </div>

                    {/* Title and organization */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 font-medium mb-3 text-sm">{item.organization}</p>

                    {/* Description */}
                    <p className="text-slate-300 mb-4 leading-relaxed text-sm">{item.description}</p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {item.highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="flex items-center text-xs">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 flex-shrink-0"></div>
                          <span className="text-slate-300">{highlight}</span>
                        </div>
                      ))}
                      {item.highlights.length > 2 && (
                        <div className="text-xs text-slate-400">
                          +{item.highlights.length - 2} more achievements
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Central Icon */}
                <div className="relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25 hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Years Experience', value: '5+', color: 'text-blue-400' },
            { label: 'Major Milestones', value: '15+', color: 'text-green-400' },
            { label: 'Technologies Mastered', value: '25+', color: 'text-purple-400' },
            { label: 'Industry Recognition', value: '10+', color: 'text-cyan-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
              className="text-center bg-slate-900/40 backdrop-blur-sm border border-slate-700/30 rounded-2xl p-6 hover:border-slate-600/50 transition-all duration-300"
            >
              <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}