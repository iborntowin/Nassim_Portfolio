'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const BRAIN_STATES = [
  'Deep Learning Mode',
  'Creative Problem Solving',
  'System Architecture Design',
  'Performance Optimization',
  'Innovation Processing'
];

const NEURAL_ACTIVITIES = [
  '🧠 Processing 847 API requests/sec',
  '⚡ Neural pathways: 99.7% efficiency',
  '🔄 Auto-scaling thoughts based on complexity',
  '📊 Pattern recognition: 15 new insights found',
  '🚀 Deploying creative solutions to production',
  '🎯 Optimizing decision trees in real-time'
];

const THOUGHT_PROCESSES = [
  { thought: 'Optimizing React component rendering...', intensity: 85 },
  { thought: 'Training neural network on new dataset...', intensity: 92 },
  { thought: 'Scaling microservices architecture...', intensity: 78 },
  { thought: 'Analyzing user behavior patterns...', intensity: 88 },
  { thought: 'Deploying to production cluster...', intensity: 95 },
  { thought: 'Refactoring legacy codebase...', intensity: 72 },
];

// Static hero component for SSR
function StaticHero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/10 to-pink-500/5" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          <div className="space-y-8">
            <div>
              <div className="relative">
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight relative">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Nassim Maaouia
                  </span>
                </h1>
              </div>
              
              <div className="text-2xl lg:text-3xl mb-6 h-12 relative">
                <div className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                  🧠 Deep Learning Mode
                </div>
              </div>

              <p className="text-lg text-gray-300 mb-8 font-medium">
                <span className="text-cyan-400">Neural Architecture:</span> Transforming ideas into intelligent systems
              </p>

              <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full" />
                  <span className="text-purple-300 text-sm font-medium">Active Thought Process</span>
                </div>
                <div className="text-white font-mono text-sm">
                  Optimizing React component rendering...
                  <div className="mt-2 bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      style={{ width: '85%' }}
                      className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 border border-cyan-400/50">
                🚀 Access Neural Network
              </button>
              
              <button className="px-8 py-4 bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold rounded-lg transition-all duration-300">
                🧠 Connect with AI
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 font-mono text-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full" />
                <span className="text-purple-300">Neural Activity Monitor</span>
              </div>
              <div className="text-cyan-300">
                🧠 Processing 847 API requests/sec
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">94.7%</div>
                <div className="text-xs text-gray-400">Brain Activity</div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">847</div>
                <div className="text-xs text-gray-400">Active Neurons</div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-pink-400">1247</div>
                <div className="text-xs text-gray-400">Thoughts/min</div>
              </div>
              
              <div className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">98.3%</div>
                <div className="text-xs text-gray-400">Innovation Index</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Dynamic animated hero component for client-side only
function AnimatedHero() {
  const [currentBrainState, setCurrentBrainState] = useState(0);
  const [currentActivity, setCurrentActivity] = useState(0);
  const [currentThought, setCurrentThought] = useState(0);

  useEffect(() => {
    const timer1 = setInterval(() => {
      setCurrentBrainState((prev) => (prev + 1) % BRAIN_STATES.length);
    }, 3500);

    const timer2 = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % NEURAL_ACTIVITIES.length);
    }, 2800);

    const timer3 = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % THOUGHT_PROCESSES.length);
    }, 4200);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/10 to-pink-500/5">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-blue-400/5 to-purple-600/10" />
        </div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative"
              >
                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight relative">
                  <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Nassim Maaouia
                  </span>
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-xl -z-10"
                  />
                </h1>
              </motion.div>
              
              <div className="text-2xl lg:text-3xl mb-6 h-12 relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBrainState}
                    initial={{ opacity: 0, y: 20, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, y: -20, rotateX: 90 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="block bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent font-semibold"
                  >
                    🧠 {BRAIN_STATES[currentBrainState]}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-gray-300 mb-8 font-medium"
              >
                <span className="text-cyan-400">Neural Architecture:</span> Transforming ideas into intelligent systems
              </motion.p>

              <div className="bg-black/30 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-3 h-3 bg-purple-400 rounded-full"
                  />
                  <span className="text-purple-300 text-sm font-medium">Active Thought Process</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentThought}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="text-white font-mono text-sm"
                  >
                    {THOUGHT_PROCESSES[currentThought].thought}
                    <div className="mt-2 bg-gray-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${THOUGHT_PROCESSES[currentThought].intensity}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-purple-400"
                      />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white font-semibold rounded-lg transition-all duration-300 border border-cyan-400/50"
              >
                🚀 Access Neural Network
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold rounded-lg transition-all duration-300"
              >
                🧠 Connect with AI
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            
            <div className="bg-black/60 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 font-mono text-sm relative overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: ['0 0 0 0 rgba(168, 85, 247, 0.7)', '0 0 0 10px rgba(168, 85, 247, 0)', '0 0 0 0 rgba(168, 85, 247, 0)']
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-purple-400 rounded-full" 
                />
                <span className="text-purple-300">Neural Activity Monitor</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentActivity}
                  initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                  transition={{ duration: 0.4 }}
                  className="text-cyan-300"
                >
                  {NEURAL_ACTIVITIES[currentActivity]}
                </motion.div>
              </AnimatePresence>
              
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center relative overflow-hidden"
              >
                <div className="text-2xl font-bold text-cyan-400">94.7%</div>
                <div className="text-xs text-gray-400">Brain Activity</div>
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent"
                />
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center relative overflow-hidden"
              >
                <div className="text-2xl font-bold text-purple-400">847</div>
                <div className="text-xs text-gray-400">Active Neurons</div>
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent"
                />
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center relative overflow-hidden"
              >
                <div className="text-2xl font-bold text-pink-400">1247</div>
                <div className="text-xs text-gray-400">Thoughts/min</div>
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent"
                />
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-black/40 backdrop-blur-sm border border-purple-500/30 rounded-lg p-4 text-center relative overflow-hidden"
              >
                <div className="text-2xl font-bold text-yellow-400">98.3%</div>
                <div className="text-xs text-gray-400">Innovation Index</div>
                <motion.div
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 to-transparent"
                />
              </motion.div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Use dynamic import to prevent SSR for animated version
const DynamicAnimatedHero = dynamic(() => Promise.resolve(AnimatedHero), {
  ssr: false,
  loading: () => <StaticHero />
});

export default function CloudCommandLiveHero() {
  return <DynamicAnimatedHero />;
}