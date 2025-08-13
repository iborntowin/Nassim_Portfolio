'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, GitFork, Activity, Filter, ChevronRight } from 'lucide-react';
import { getAllProjects, getProjectsByCategory, type DetailedProject } from '@/lib/projects-data';

const categories = ['All', 'Full-Stack', 'AI/ML', 'Cloud/DevOps', 'Embedded', 'Productivity'];

const categoryMap: { [key: string]: string } = {
  'Cloud/DevOps': 'DevOps',
  'Productivity': 'Productivity'
};

export default function CloudArchitectPortfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [projects, setProjects] = useState<DetailedProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<DetailedProject[]>([]);

  useEffect(() => {
    const allProjects = getAllProjects();
    setProjects(allProjects);
    setFilteredProjects(allProjects);
  }, []);

  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      const mappedCategory = categoryMap[activeCategory] || activeCategory;
      const filtered = getProjectsByCategory(mappedCategory);
      setFilteredProjects(filtered);
    }
  }, [activeCategory, projects]);

  const ProjectCard = ({ project }: { project: DetailedProject }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div 
        className="group relative bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Project image/preview */}
        <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
          {project.images && project.images[0] ? (
            <img 
              src={project.images[0].src} 
              alt={project.images[0].alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl opacity-20">
                {project.category === 'AI/ML' ? '🧠' : 
                 project.category === 'Full-Stack' ? '🚀' :
                 project.category === 'Embedded' ? '🔧' : '💻'}
              </div>
            </div>
          )}
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-400 text-xs font-semibold">
              {project.category}
            </span>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-4 right-4">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse shadow-lg shadow-yellow-500/50"></div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title and description */}
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, index) => (
              <span 
                key={index}
                className={`px-2 py-1 rounded-md text-xs font-medium border ${tech.color} border-current/20`}
              >
                {tech.name}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 rounded-md text-xs font-medium text-slate-500 border border-slate-600">
                +{project.techStack.length - 4} more
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3" />
                <span>{project.stats.stars}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitFork className="w-3 h-3" />
                <span>{project.stats.forks}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Activity className="w-3 h-3" />
                <span>{project.stats.commits}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center space-x-2">
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Hover overlay with "View More" */}
          <div className={`absolute inset-0 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:scale-105 transition-transform duration-200 flex items-center">
              View Details
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-24"></div>
            <div className="mx-4 px-4 py-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full">
              <span className="text-blue-400 text-sm font-semibold">TECHNICAL DEPLOYMENTS</span>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent w-24"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Engineering
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
              Excellence
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            A curated collection of production-grade systems spanning full-stack applications, 
            AI/ML solutions, cloud infrastructure, and embedded systems engineering.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-white border border-slate-700/50'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* View all projects CTA */}
        <div className="text-center mt-16">
          <button className="group px-8 py-4 bg-slate-800/50 border-2 border-blue-500/50 text-blue-400 font-semibold rounded-xl hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-300 hover:scale-105">
            <span className="flex items-center">
              Explore Full Architecture
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}