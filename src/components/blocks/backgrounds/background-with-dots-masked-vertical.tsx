"use client"
import { cn } from "@/lib/utils";
import React from "react";
export function BackgroundDotsMaskedVertical() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Background />
      <Content />
    </div>
  );
}
const Content = () => {
  const [selectedNode, setSelectedNode] = React.useState<string | null>(null);
  const [isDeploying, setIsDeploying] = React.useState(false);
  const [networkTraffic, setNetworkTraffic] = React.useState<Array<{id: string, from: string, to: string, active: boolean}>>([]);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  // Simulate network traffic
  React.useEffect(() => {
    const interval = setInterval(() => {
      const connections = [
        { id: '1', from: 'user', to: 'loadbalancer', active: Math.random() > 0.3 },
        { id: '2', from: 'loadbalancer', to: 'api-gateway', active: Math.random() > 0.4 },
        { id: '3', from: 'api-gateway', to: 'microservice-1', active: Math.random() > 0.5 },
        { id: '4', from: 'api-gateway', to: 'microservice-2', active: Math.random() > 0.6 },
        { id: '5', from: 'microservice-1', to: 'database', active: Math.random() > 0.7 },
        { id: '6', from: 'microservice-2', to: 'cache', active: Math.random() > 0.8 },
      ];
      setNetworkTraffic(connections);
    }, 800);
    return () => clearInterval(interval);
  }, []);
  // Track mouse for 3D effect
  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  const infrastructureNodes = [
    { id: 'user', name: 'Users', x: 10, y: 50, type: 'client', status: 'active', connections: 1247 },
    { id: 'cdn', name: 'CloudFront CDN', x: 25, y: 30, type: 'cdn', status: 'active', connections: 892 },
    { id: 'loadbalancer', name: 'Application Load Balancer', x: 40, y: 50, type: 'lb', status: 'active', connections: 1247 },
    { id: 'api-gateway', name: 'API Gateway', x: 60, y: 50, type: 'gateway', status: 'active', connections: 1156 },
    { id: 'microservice-1', name: 'User Service', x: 75, y: 30, type: 'service', status: 'active', connections: 423 },
    { id: 'microservice-2', name: 'Order Service', x: 75, y: 70, type: 'service', status: 'active', connections: 312 },
    { id: 'database', name: 'RDS PostgreSQL', x: 90, y: 40, type: 'database', status: 'active', connections: 156 },
    { id: 'cache', name: 'ElastiCache Redis', x: 90, y: 60, type: 'cache', status: 'active', connections: 89 },
  ];
  const getNodeColor = (type: string, status: string) => {
    if (status === 'deploying') return 'from-orange-400 to-red-500';
    switch (type) {
      case 'client': return 'from-green-400 to-emerald-500';
      case 'cdn': return 'from-purple-400 to-violet-500';
      case 'lb': return 'from-blue-400 to-cyan-500';
      case 'gateway': return 'from-indigo-400 to-blue-500';
      case 'service': return 'from-pink-400 to-rose-500';
      case 'database': return 'from-yellow-400 to-orange-500';
      case 'cache': return 'from-red-400 to-pink-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };
  const handleDeploy = () => {
    setIsDeploying(true);
    // Simulate deployment process
    setTimeout(() => setIsDeploying(false), 3000);
  };
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6">
      {/* Revolutionary Cloud Engineering Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-500/30 mb-8 backdrop-blur-sm">
          <div className="flex items-center space-x-2 mr-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
          </div>
          <span className="text-sm font-medium bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            CLOUD ARCHITECTURE REIMAGINED • NEXT-GENERATION INFRASTRUCTURE
          </span>
        </div>
        
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-none">
          <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent">
            ENGINEERING THE
          </span>
          <span className="block text-black dark:text-white">
            DIGITAL UNIVERSE
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-4xl mx-auto leading-relaxed mb-12">
          I design and build <strong>self-healing, autonomous cloud ecosystems</strong> that scale beyond imagination. 
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-semibold"> From quantum-ready infrastructures to AI-driven optimization</span>, I create solutions that don't just meet today's needs but anticipate tomorrow's demands.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10 flex items-center">
              Explore My Cloud Universe
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </span>
          </button>
          
          <button className="px-8 py-4 border-2 border-cyan-500 text-cyan-500 dark:text-cyan-400 font-bold rounded-xl hover:bg-cyan-500 hover:text-white transition-all duration-300">
            Revolutionize Your Infrastructure
          </button>
        </div>
      </div>

      {/* 3D Interactive Infrastructure Map */}
      <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl border border-blue-500/30 overflow-hidden mb-12 group">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="absolute inset-0 animate-grid-move"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>
        {/* Network connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {networkTraffic.map((connection) => {
            const fromNode = infrastructureNodes.find(n => n.id === connection.from);
            const toNode = infrastructureNodes.find(n => n.id === connection.to);
            if (!fromNode || !toNode) return null;
            
            return (
              <line
                key={connection.id}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={connection.active ? '#3b82f6' : '#1e293b'}
                strokeWidth="2"
                strokeDasharray={connection.active ? "5,5" : "none"}
                className={connection.active ? 'animate-pulse' : ''}
                style={{
                  filter: connection.active ? 'drop-shadow(0 0 4px #3b82f6)' : 'none'
                }}
              />
            );
          })}
        </svg>
        {/* Infrastructure nodes */}
        {infrastructureNodes.map((node, index) => (
          <div
            key={node.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              selectedNode === node.id ? 'scale-125 z-20' : 'hover:scale-110 z-10'
            }`}
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: `translate(-50%, -50%) perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight/2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth/2) * 0.01}deg)`
            }}
            onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
          >
            {/* Node glow effect */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getNodeColor(node.type, node.status)} opacity-30 blur-xl scale-150 animate-pulse`}></div>
            
            {/* Main node */}
            <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r ${getNodeColor(node.type, node.status)} shadow-2xl border-2 border-white/20 flex items-center justify-center`}>
              {/* Node icon based on type */}
              <div className="text-white text-xl md:text-2xl">
                {node.type === 'client' && '👥'}
                {node.type === 'cdn' && '🌐'}
                {node.type === 'lb' && '⚖️'}
                {node.type === 'gateway' && '🚪'}
                {node.type === 'service' && '⚙️'}
                {node.type === 'database' && '🗄️'}
                {node.type === 'cache' && '⚡'}
              </div>
              
              {/* Connection count indicator */}
              <div className="absolute -top-2 -right-2 bg-emerald-400 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
                {node.connections}
              </div>
            </div>
            
            {/* Node label */}
            <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <div className="bg-black/80 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full border border-white/20">
                {node.name}
              </div>
            </div>
            
            {/* Selected node details */}
            {selectedNode === node.id && (
              <div className="absolute top-full mt-8 left-1/2 transform -translate-x-1/2 w-64 bg-black/90 backdrop-blur-sm text-white p-4 rounded-xl border border-blue-500/30 shadow-2xl">
                <h3 className="font-bold text-lg mb-2">{node.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-emerald-400">● {node.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connections:</span>
                    <span className="text-blue-400">{node.connections}/sec</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="text-purple-400">{node.type}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all">
                      Scale Component
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {/* Deployment animation overlay */}
        {isDeploying && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <div className="text-white text-xl font-bold">Deploying Infrastructure...</div>
              <div className="text-blue-300 text-sm">Provisioning resources across 3 regions</div>
            </div>
          </div>
        )}
      </div>
      {/* Interactive Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20">
          <h3 className="text-xl font-bold text-black dark:text-white mb-4">🚀 Deploy New Service</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">Launch a new microservice with zero downtime</p>
          <button 
            onClick={handleDeploy}
            disabled={isDeploying}
            className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all disabled:opacity-50"
          >
            {isDeploying ? 'Deploying...' : 'Deploy Now'}
          </button>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20">
          <h3 className="text-xl font-bold text-black dark:text-white mb-4">📊 Real-time Metrics</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-neutral-600 dark:text-neutral-300">CPU Usage</span>
              <span className="text-blue-400 font-mono">23.4%</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full" style={{ width: '23.4%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-600 dark:text-neutral-300">Memory</span>
              <span className="text-purple-400 font-mono">67.8%</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" style={{ width: '67.8%' }}></div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-black dark:text-white mb-4">🌍 Global Reach</h3>
          <p className="text-neutral-600 dark:text-neutral-300 mb-4">Infrastructure spanning 12 AWS regions</p>
          <div className="flex flex-wrap gap-2">
            {['US-East', 'US-West', 'EU-Central', 'Asia-Pacific'].map((region) => (
              <div key={region} className="flex items-center gap-1 px-3 py-1 bg-purple-500/20 rounded-full text-xs">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                {region}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Revolutionary CTA */}
      <div className="text-center">
        <div className="inline-flex items-center gap-4">
          <button className="group relative px-12 py-6 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 rounded-2xl text-white font-bold text-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 flex items-center">
              🚀 Experience My Cloud Architecture
              <div className="ml-3 w-6 h-6 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
            </span>
          </button>
        </div>
        <p className="mt-6 text-neutral-600 dark:text-neutral-300 text-lg">
          Click any node above to explore • Watch real-time traffic • Deploy with one click
        </p>
      </div>
    </div>
  );
};
const Background = () => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full",
        "bg-[radial-gradient(circle_at_0.5px_0.5px,rgba(0,0,0,0.3)_0.5px,transparent_0)]",
        "dark:bg-[radial-gradient(circle_at_0.5px_0.5px,rgba(255,255,255,0.3)_0.5px,transparent_0)]",
        "[mask-image:linear-gradient(to_bottom,white,transparent)]",
        "bg-repeat",
        "[background-size:8px_8px]"
      )}
    />
  );
};