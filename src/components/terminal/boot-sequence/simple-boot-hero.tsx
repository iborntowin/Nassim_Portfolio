'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SimpleBootHeroProps {
  onBootComplete: () => void;
  skipAnimation?: boolean;
}

const BOOT_MESSAGES = [
  '[    0.000000] Initializing NassimOS v3.0...',
  '[    0.234567] Loading kernel modules...',
  '[    0.456789] Detecting hardware configuration...',
  '[    0.678901] CPU: Intel Core i9-13900K @ 3.0GHz',
  '[    0.789012] Memory: 32GB DDR5-5600',
  '[    0.890123] Storage: 2TB NVMe SSD',
  '[    1.123456] Initializing network interfaces...',
  '[    1.234567] [OK] Network interface eth0 up',
  '[    1.345678] Connecting to Cloud Infrastructure...',
  '[    2.456789] [OK] AWS connection established',
  '[    2.567890] [OK] Kubernetes cluster online',
  '[    2.678901] Initializing GitHub Repositories...',
  '[    3.123456] [OK] Repository sync complete',
  '[    3.234567] Deploying Projects to Portfolio...',
  '[    4.345678] [OK] Cession App deployed',
  '[    4.456789] [OK] Board-AI deployed',
  '[    4.567890] [OK] NanoSat Comm deployed',
  '[    4.678901] [OK] GoldenTouch deployed',
  '[    4.789012] Starting system services...',
  '[    4.890123] [OK] Docker daemon started',
  '[    4.901234] [OK] Kubernetes API server ready',
  '[    4.912345] [OK] Monitoring stack initialized',
  '[    5.123456] [OK] CI/CD pipelines active',
  '[    5.234567] System Online - Welcome to NassimOS!',
];

const ASCII_ART = `
 ███╗   ██╗ █████╗ ███████╗███████╗██╗███╗   ███╗
 ████╗  ██║██╔══██╗██╔════╝██╔════╝██║████╗ ████║
 ██╔██╗ ██║███████║███████╗███████╗██║██╔████╔██║
 ██║╚██╗██║██╔══██║╚════██║╚════██║██║██║╚██╔╝██║
 ██║ ╚████║██║  ██║███████║███████║██║██║ ╚═╝ ██║
 ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝     ╚═╝`;

export default function SimpleBootHero({ onBootComplete, skipAnimation = false }: SimpleBootHeroProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showASCII, setShowASCII] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);

  useEffect(() => {
    if (skipAnimation) {
      onBootComplete();
      return;
    }

    if (currentMessageIndex < BOOT_MESSAGES.length) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else if (!showASCII) {
      const timer = setTimeout(() => {
        setShowASCII(true);
      }, 500);
      return () => clearTimeout(timer);
    } else if (!bootComplete) {
      const timer = setTimeout(() => {
        setBootComplete(true);
        onBootComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentMessageIndex, showASCII, bootComplete, skipAnimation, onBootComplete]);

  if (skipAnimation || bootComplete) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-start p-8 font-mono text-sm overflow-hidden">
      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={() => onBootComplete()}
        className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-green-400 border border-green-400 rounded hover:bg-green-400 hover:text-black transition-colors duration-200"
      >
        Skip Animation [ESC]
      </motion.button>

      {/* Boot messages */}
      <div className="w-full max-w-4xl space-y-1">
        {BOOT_MESSAGES.slice(0, currentMessageIndex).map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-400 leading-relaxed"
          >
            {message}
          </motion.div>
        ))}

        {/* ASCII Art */}
        {showASCII && (
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <pre className="text-green-400 text-xs sm:text-sm drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
              {ASCII_ART}
            </pre>
            <div className="mt-4 text-green-400 text-lg">
              Cloud-native engineer | DevOps architect | Problem solver
            </div>
            <div className="mt-2 text-gray-400 text-sm">
              System initialized successfully. Welcome to NassimOS v3.0
            </div>
          </motion.div>
        )}
      </div>

      {/* ESC key handler */}
      <div 
        className="fixed inset-0 pointer-events-none"
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onBootComplete();
          }
        }}
        tabIndex={-1}
      />
    </div>
  );
}