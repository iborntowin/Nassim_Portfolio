"use client"

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Keyboard, 
  X, 
  Command, 
  Search, 
  Save, 
  RefreshCw, 
  Plus, 
  UserPlus,
  Download,
  BarChart3,
  HelpCircle
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Shortcut {
  icon: React.ComponentType<any>
  label: string
  keys: string[]
  color: string
}

const globalShortcuts: Shortcut[] = [
  {
    icon: Command,
    label: 'Open Command Palette',
    keys: ['Ctrl', 'K'],
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: HelpCircle,
    label: 'Show this help',
    keys: ['?'],
    color: 'from-red-500 to-orange-500'
  },
  {
    icon: X,
    label: 'Close dialogs/modals',
    keys: ['Esc'],
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: Search,
    label: 'Focus search',
    keys: ['Ctrl', '/'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Save,
    label: 'Save current form',
    keys: ['Ctrl', 'S'],
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: RefreshCw,
    label: 'Refresh data',
    keys: ['Ctrl', 'R'],
    color: 'from-purple-500 to-violet-500'
  }
]

const dashboardShortcuts: Shortcut[] = [
  {
    icon: Plus,
    label: 'New cession',
    keys: ['Ctrl', 'N'],
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: UserPlus,
    label: 'New client',
    keys: ['Ctrl', 'C'],
    color: 'from-indigo-500 to-purple-500'
  },
  {
    icon: Download,
    label: 'Export dashboard',
    keys: ['Ctrl', 'E'],
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: BarChart3,
    label: 'Go to stats',
    keys: ['Ctrl', '1'],
    color: 'from-blue-500 to-indigo-500'
  }
]

export default function CessionKeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Shortcut Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl flex items-center justify-center group"
          aria-label="View keyboard shortcuts"
        >
          <Keyboard className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </Button>
      </motion.div>

      {/* Shortcuts Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-8 rounded-t-3xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Keyboard className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-1">
                      Keyboard Shortcuts
                    </h2>
                    <p className="text-purple-100">
                      Master these shortcuts to work faster
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              {/* Global Shortcuts */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Command className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Global Shortcuts (Work Everywhere)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {globalShortcuts.map((shortcut, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                      <Card className="bg-white border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${shortcut.color} flex items-center justify-center`}>
                                <shortcut.icon className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-gray-800 font-medium">
                                {shortcut.label}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              {shortcut.keys.map((key, keyIndex) => (
                                <kbd
                                  key={keyIndex}
                                  className="px-3 py-1.5 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
                                >
                                  {key}
                                </kbd>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Dashboard Shortcuts */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    Current Page (Dashboard)
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {dashboardShortcuts.map((shortcut, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: (globalShortcuts.length + index) * 0.05 }}
                    >
                      <Card className="bg-white border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${shortcut.color} flex items-center justify-center`}>
                                <shortcut.icon className="w-5 h-5 text-white" />
                              </div>
                              <span className="text-gray-800 font-medium">
                                {shortcut.label}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              {shortcut.keys.map((key, keyIndex) => (
                                <kbd
                                  key={keyIndex}
                                  className="px-3 py-1.5 text-sm font-semibold text-gray-700 bg-gray-100 border border-gray-300 rounded-lg shadow-sm"
                                >
                                  {key}
                                </kbd>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
