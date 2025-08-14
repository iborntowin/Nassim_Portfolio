'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBootSequence, TerminalPrompt } from './boot-state-manager';
import { TypewriterASCIIArt } from './ascii-art-renderer';

interface BootMessage {
  text: string;
  type: 'info' | 'success' | 'warning' | 'error';
  delay: number;
  showProgress?: boolean;
  progressDuration?: number;
}

interface BootSequenceHeroProps {
  onBootComplete: () => void;
  skipAnimation?: boolean;
}

const BOOT_MESSAGES: BootMessage[] = [
  { text: '[    0.000000] Initializing NassimOS v3.0...', type: 'info', delay: 500 },
  { text: '[    0.234567] Loading kernel modules...', type: 'info', delay: 300 },
  { text: '[    0.456789] Detecting hardware configuration...', type: 'info', delay: 400 },
  { text: '[    0.678901] CPU: Intel Core i9-13900K @ 3.0GHz', type: 'success', delay: 200 },
  { text: '[    0.789012] Memory: 32GB DDR5-5600', type: 'success', delay: 200 },
  { text: '[    0.890123] Storage: 2TB NVMe SSD', type: 'success', delay: 200 },
  { text: '[    1.123456] Initializing network interfaces...', type: 'info', delay: 300 },
  { text: '[    1.234567] [OK] Network interface eth0 up', type: 'success', delay: 200 },
  { text: '[    1.345678] Connecting to Cloud Infrastructure...', type: 'info', delay: 600, showProgress: true, progressDuration: 1500 },
  { text: '[    2.456789] [OK] AWS connection established', type: 'success', delay: 200 },
  { text: '[    2.567890] [OK] Kubernetes cluster online', type: 'success', delay: 200 },
  { text: '[    2.678901] Initializing GitHub Repositories...', type: 'info', delay: 400, showProgress: true, progressDuration: 1200 },
  { text: '[    3.123456] [OK] Repository sync complete', type: 'success', delay: 200 },
  { text: '[    3.234567] Deploying Projects to Portfolio...', type: 'info', delay: 500, showProgress: true, progressDuration: 1800 },
  { text: '[    4.345678] [OK] Cession App deployed', type: 'success', delay: 150 },
  { text: '[    4.456789] [OK] Board-AI deployed', type: 'success', delay: 150 },
  { text: '[    4.567890] [OK] NanoSat Comm deployed', type: 'success', delay: 150 },
  { text: '[    4.678901] [OK] GoldenTouch deployed', type: 'success', delay: 150 },
  { text: '[    4.789012] Starting system services...', type: 'info', delay: 300 },
  { text: '[    4.890123] [OK] Docker daemon started', type: 'success', delay: 100 },
  { text: '[    4.901234] [OK] Kubernetes API server ready', type: 'success', delay: 100 },
  { text: '[    4.912345] [OK] Monitoring stack initialized', type: 'success', delay: 100 },
  { text: '[    5.123456] [OK] CI/CD pipelines active', type: 'success', delay: 100 },
  { text: '[    5.234567] System Online - Welcome to NassimOS!', type: 'success', delay: 500 },
];

const ProgressBar: React.FC<{ duration: number; onComplete: () => void }> = ({ 
  duration, 
  onComplete 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 50));
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 100);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className="flex items-center space-x-2 ml-4 mt-1">
      <div className="w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <span className="text-green-400 text-sm font-mono">
        {Math.round(progress)}%
      </span>
    </div>
  );
};

const TypingText: React.FC<{ 
  text: string; 
  speed?: number; 
  onComplete: () => void;
  className?: string;
}> = ({ text, speed = 30, onComplete, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayedText}
      {currentIndex < text.length && (
        <motion.span
          className="inline-block w-2 h-4 bg-green-400 ml-1"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
};

export default function BootSequenceHero({ onBootComplete, skipAnimation = false }: BootSequenceHeroProps) {
  const bootState = useBootSequence();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<string[]>([]);
  const [showProgress, setShowProgress] = useState(false);
  const [progressDuration, setProgressDuration] = useState(1000);
  const [showASCIIArt, setShowASCIIArt] = useState(false);
  const [asciiComplete, setAsciiComplete] = useState(false);

  const handleSkip = useCallback(() => {
    bootState.skipBoot();
    onBootComplete();
  }, [bootState, onBootComplete]);

  const handleMessageComplete = useCallback(() => {
    const currentMessage = BOOT_MESSAGES[currentMessageIndex];
    
    if (currentMessage.showProgress) {
      setShowProgress(true);
      setProgressDuration(currentMessage.progressDuration || 1000);
    } else {
      // Move to next message after delay
      setTimeout(() => {
        if (currentMessageIndex < BOOT_MESSAGES.length - 1) {
          setCurrentMessageIndex(prev => prev + 1);
        } else {
          // Show ASCII art after boot messages
          setTimeout(() => {
            setShowASCIIArt(true);
            bootState.setPhase('loading');
          }, 500);
        }
      }, currentMessage.delay);
    }
  }, [currentMessageIndex, bootState]);

  const handleProgressComplete = useCallback(() => {
    setShowProgress(false);
    const currentMessage = BOOT_MESSAGES[currentMessageIndex];
    
    setTimeout(() => {
      if (currentMessageIndex < BOOT_MESSAGES.length - 1) {
        setCurrentMessageIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
          setShowASCIIArt(true);
          bootState.setPhase('loading');
        }, 500);
      }
    }, currentMessage.delay);
  }, [currentMessageIndex, bootState]);

  const handleASCIIComplete = useCallback(() => {
    setAsciiComplete(true);
    setTimeout(() => {
      bootState.completeBoot();
      onBootComplete();
    }, 1000);
  }, [bootState, onBootComplete]);

  // Skip animation if requested or if boot state indicates skip
  useEffect(() => {
    if (skipAnimation || !bootState.shouldShowBoot) {
      handleSkip();
    }
  }, [skipAnimation, bootState.shouldShowBoot, handleSkip]);

  // Start boot sequence
  useEffect(() => {
    if (bootState.shouldShowBoot && bootState.currentPhase === 'initializing') {
      bootState.startBoot();
    }
  }, [bootState]);

  // Add completed messages to display
  useEffect(() => {
    if (currentMessageIndex > 0) {
      const newMessages = BOOT_MESSAGES.slice(0, currentMessageIndex).map(msg => msg.text);
      setDisplayedMessages(newMessages);
    }
  }, [currentMessageIndex]);

  const getMessageColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-300';
    }
  };

  if (bootState.bootComplete) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-start p-8 font-mono text-sm overflow-hidden">
      {/* Skip button */}
      <AnimatePresence>
        {bootState.skipAvailable && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={handleSkip}
            className="fixed top-4 right-4 z-50 px-4 py-2 bg-gray-800 text-green-400 border border-green-400 rounded hover:bg-green-400 hover:text-black transition-colors duration-200"
          >
            Skip Animation [ESC]
          </motion.button>
        )}
      </AnimatePresence>

      {/* Boot messages container */}
      <div className="w-full max-w-4xl space-y-1">
        {/* Previously displayed messages */}
        {displayedMessages.map((message, index) => {
          const messageData = BOOT_MESSAGES[index];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`${getMessageColor(messageData.type)} leading-relaxed`}
            >
              {message}
            </motion.div>
          );
        })}

        {/* Current typing message */}
        {currentMessageIndex < BOOT_MESSAGES.length && (
          <div className="space-y-2">
            <TypingText
              text={BOOT_MESSAGES[currentMessageIndex].text}
              onComplete={handleMessageComplete}
              className={getMessageColor(BOOT_MESSAGES[currentMessageIndex].type)}
              speed={25}
            />
            
            {/* Progress bar */}
            {showProgress && (
              <ProgressBar
                duration={progressDuration}
                onComplete={handleProgressComplete}
              />
            )}
          </div>
        )}

        {/* ASCII Art Display */}
        {showASCIIArt && !asciiComplete && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TypewriterASCIIArt
              onComplete={handleASCIIComplete}
              className="mb-4"
            />
          </motion.div>
        )}

        {/* Terminal prompt after ASCII art */}
        {asciiComplete && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-center mb-4">
              <div className="text-green-400 text-lg mb-2">
                Cloud-native engineer | DevOps architect | Problem solver
              </div>
              <div className="text-gray-400 text-sm">
                System initialized successfully. Welcome to NassimOS v3.0
              </div>
            </div>
            <TerminalPrompt
              className="mt-4"
              onCommand={(cmd) => console.log('Command:', cmd)}
            />
          </motion.div>
        )}
      </div>

      {/* ESC key handler */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="w-full h-full"
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              handleSkip();
            }
          }}
          tabIndex={-1}
        />
      </div>
    </div>
  );
}