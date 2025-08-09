"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { UnifiedTerminal } from '@/components/terminal/core/unified-terminal'
import { Terminal, Maximize2, Minimize2, Code, Zap } from 'lucide-react'

export default function UnifiedTerminalSection() {
    const [isMaximized, setIsMaximized] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Terminal className="w-8 h-8 text-blue-400" />
                        <h2 className="text-4xl lg:text-5xl font-bold text-white">
                            Interactive Terminal Experience
                        </h2>
                    </div>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        Experience my portfolio through a fully interactive terminal interface.
                        Navigate between different sections using tabs, execute commands, and explore
                        projects just like in a real development environment.
                    </p>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
                >
                    {[
                        {
                            icon: Terminal,
                            title: 'Real Terminal Feel',
                            description: 'Authentic terminal experience with command history, tab completion, and keyboard shortcuts'
                        },
                        {
                            icon: Code,
                            title: 'Interactive Tabs',
                            description: 'Switch between different sections using Ctrl+1-5 or click on tabs for smooth navigation'
                        },
                        {
                            icon: Zap,
                            title: 'Live Demonstrations',
                            description: 'See real code, deployment simulations, and AI models in action through interactive demos'
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-blue-500/30 transition-all duration-300"
                        >
                            <feature.icon className="w-8 h-8 text-blue-400 mb-4" />
                            <h3 className="text-lg font-semibold text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Terminal Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className={`relative ${isMaximized ? 'fixed inset-4 z-50' : ''}`}
                >
                    {/* Terminal Controls */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                            <Terminal className="w-4 h-4" />
                            <span>Interactive Portfolio Terminal</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsMaximized(!isMaximized)}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                                title={isMaximized ? 'Minimize' : 'Maximize'}
                            >
                                {isMaximized ? (
                                    <Minimize2 className="w-4 h-4" />
                                ) : (
                                    <Maximize2 className="w-4 h-4" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Terminal */}
                    {isVisible && (
                        <UnifiedTerminal
                            className={`w-full transition-all duration-300 ${isMaximized ? 'h-[calc(100vh-8rem)]' : 'h-[600px]'
                                }`}
                            initialTab="hero"
                            onClose={() => setIsVisible(false)}
                        />
                    )}

                    {/* Restore Button (if closed) */}
                    {!isVisible && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-center h-32 bg-gray-800/50 border border-gray-700 rounded-lg"
                        >
                            <button
                                onClick={() => setIsVisible(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                <Terminal className="w-5 h-5" />
                                Restore Terminal
                            </button>
                        </motion.div>
                    )}
                </motion.div>

                {/* Keyboard Shortcuts Guide */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12 bg-gray-800/30 border border-gray-700 rounded-lg p-6"
                >
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <Code className="w-5 h-5 text-blue-400" />
                        Keyboard Shortcuts
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        {[
                            { shortcut: 'Ctrl + 1', description: 'Welcome Tab' },
                            { shortcut: 'Ctrl + 2', description: 'Projects Explorer' },
                            { shortcut: 'Ctrl + 3', description: 'DevOps Lab' },
                            { shortcut: 'Ctrl + 4', description: 'AI Demonstrations' },
                            { shortcut: 'Ctrl + 5', description: 'CLI Tutorial' },
                            { shortcut: 'Ctrl + 6', description: 'Technologies' },
                            { shortcut: 'Ctrl + 7', description: 'Portfolio Terminal' },
                            { shortcut: 'Tab', description: 'Auto-complete commands' },
                            { shortcut: '↑ / ↓', description: 'Command history' },
                            { shortcut: 'Esc', description: 'Close suggestions' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <kbd className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-xs font-mono text-gray-300">
                                    {item.shortcut}
                                </kbd>
                                <span className="text-gray-400 ml-3">{item.description}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12 text-center"
                >
                    <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-500/20 rounded-lg p-8">
                        <h3 className="text-2xl font-bold text-white mb-4">
                            Ready to Explore?
                        </h3>
                        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                            Start by typing "help" in the terminal above, or use Ctrl+1-7 to navigate
                            between different sections. Each tab offers a unique interactive experience
                            showcasing different aspects of my work and technical expertise.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <div className="flex items-center gap-2 text-blue-400">
                                <Terminal className="w-4 h-4" />
                                <span>Try: help, clear, tabs</span>
                            </div>
                            <div className="flex items-center gap-2 text-green-400">
                                <Code className="w-4 h-4" />
                                <span>Navigate: Ctrl+1-7</span>
                            </div>
                            <div className="flex items-center gap-2 text-purple-400">
                                <Zap className="w-4 h-4" />
                                <span>Explore: Tab completion</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}