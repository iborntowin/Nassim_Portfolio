'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ExternalLink, Heart } from 'lucide-react';

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' }
];

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/iborntowin', icon: Github, color: 'hover:text-gray-400' },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/nassimmaaouia', icon: Linkedin, color: 'hover:text-blue-400' },
  { name: 'Twitter', href: 'https://twitter.com/nassimmaaouia', icon: Twitter, color: 'hover:text-cyan-400' },
  { name: 'Email', href: 'mailto:nassim.maaouia@example.com', icon: Mail, color: 'hover:text-green-400' }
];

const services = [
  'Full-Stack Development',
  'AI/ML Solutions',
  'Cloud Architecture',
  'DevOps & Automation',
  'Mobile Development',
  'IoT Systems'
];

export default function EnhancedFooter() {
  return (
    <footer className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">
                Nassim
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Maaoui
                </span>
              </h3>
              <p className="text-slate-400 text-sm">
                Engineering intelligent systems for a connected world
              </p>
            </div>
            
            <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
              Full-stack engineer passionate about creating innovative solutions that bridge 
              technology and real-world impact. From AI-powered applications to scalable 
              cloud infrastructure, I build systems that matter.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 transition-all duration-300 hover:scale-110 hover:bg-slate-700 ${social.color}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span>{link.name}</span>
                    <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 mb-12"
        >
          <div className="text-center mb-6">
            <h4 className="text-xl font-semibold text-white mb-2">
              Stay Updated
            </h4>
            <p className="text-slate-400">
              Get notified about new projects, insights, and tech innovations
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your.email@company.com"
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25">
              Subscribe
            </button>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Nassim Maaouia. All rights reserved.
            </div>

            {/* Built by signature */}
            <div className="flex items-center text-slate-400 text-sm">
              <span>Built with</span>
              <Heart className="w-4 h-4 mx-2 text-red-400 fill-current" />
              <span>by</span>
              <span className="ml-2 text-white font-semibold">Nassim Maaouia</span>
            </div>
          </div>

          {/* Tech Stack Badge */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-xs text-slate-400">
              <span>Built with Next.js, TypeScript, Tailwind CSS & Framer Motion</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}