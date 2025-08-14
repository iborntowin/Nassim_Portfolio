"use client"

import { UnifiedTerminalLayout } from './unified-terminal-layout'

export function TerminalLayoutDemo() {
  return (
    <div className="min-h-screen bg-gray-900 p-4 flex items-center justify-center">
      <UnifiedTerminalLayout
        title="Demo Terminal"
        showSystemMetrics={true}
        enableRealTimeElements={true}
        className="mx-auto"
      >
        <div className="p-4 space-y-2">
          <div className="text-terminal-green">
            <span className="text-terminal-cyan">nassim@cloud-engineer</span>
            <span className="text-gray-500">:</span>
            <span className="text-terminal-blue">~</span>
            <span className="text-white">$ </span>
            <span className="terminal-cursor">█</span>
          </div>
          
          <div className="space-y-1 text-sm">
            <div className="text-terminal-green">Welcome to the Unified Terminal Layout!</div>
            <div className="text-gray-400">This layout provides:</div>
            <div className="text-terminal-cyan">• Consistent terminal styling across all pages</div>
            <div className="text-terminal-magenta">• Real-time system metrics display</div>
            <div className="text-terminal-yellow">• Responsive design for mobile, tablet, and desktop</div>
            <div className="text-terminal-green">• Terminal window chrome with realistic header</div>
            <div className="text-gray-400">• Touch-friendly interactions on mobile devices</div>
          </div>
          
          <div className="mt-4 p-3 bg-gray-800/50 rounded border border-terminal-green/30">
            <div className="text-terminal-yellow text-sm font-semibold mb-2">System Status:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>CPU: <span className="text-terminal-cyan">25%</span></div>
              <div>Memory: <span className="text-terminal-magenta">68%</span></div>
              <div>Network: <span className="text-terminal-yellow">15%</span></div>
              <div>Pods: <span className="text-terminal-green">14</span></div>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-gray-500">
            Try resizing your browser window to see the responsive behavior!
          </div>
        </div>
      </UnifiedTerminalLayout>
    </div>
  )
}