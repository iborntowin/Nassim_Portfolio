'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// ASCII art for "Nassim Maaouia"
const ASCII_ART_NAME = `
███╗   ██╗ █████╗ ███████╗███████╗██╗███╗   ███╗
████╗  ██║██╔══██╗██╔════╝██╔════╝██║████╗ ████║
██╔██╗ ██║███████║███████╗███████╗██║██╔████╔██║
██║╚██╗██║██╔══██║╚════██║╚════██║██║██║╚██╔╝██║
██║ ╚████║██║  ██║███████║███████║██║██║ ╚═╝ ██║
╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝     ╚═╝

███╗   ███╗ █████╗  █████╗  ██████╗ ██╗   ██╗██╗
████╗ ████║██╔══██╗██╔══██╗██╔═══██╗██║   ██║██║
██╔████╔██║███████║███████║██║   ██║██║   ██║██║
██║╚██╔╝██║██╔══██║██╔══██║██║   ██║██║   ██║██║
██║ ╚═╝ ██║██║  ██║██║  ██║╚██████╔╝╚██████╔╝██║
╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝`;

const ASCII_ART_COMPACT = `
 ███╗   ██╗ █████╗ ███████╗███████╗██╗███╗   ███╗    ███╗   ███╗
 ████╗  ██║██╔══██╗██╔════╝██╔════╝██║████╗ ████║    ████╗ ████║
 ██╔██╗ ██║███████║███████╗███████╗██║██╔████╔██║    ██╔████╔██║
 ██║╚██╗██║██╔══██║╚════██║╚════██║██║██║╚██╔╝██║    ██║╚██╔╝██║
 ██║ ╚████║██║  ██║███████║███████║██║██║ ╚═╝ ██║    ██║ ╚═╝ ██║
 ╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝     ╚═╝    ╚═╝     ╚═╝`;

// Simplified version without Three.js for better compatibility

interface ASCIIArtRendererProps {
  text?: string;
  shaderEffect?: 'gradient' | 'glow' | 'matrix' | 'glitch';
  animationType?: 'typewriter' | 'fade-in' | 'matrix-reveal';
  onComplete?: () => void;
  className?: string;
  use3D?: boolean;
}

export const ASCIIArtRenderer: React.FC<ASCIIArtRendererProps> = ({
  text = ASCII_ART_COMPACT,
  shaderEffect = 'glow',
  animationType = 'typewriter',
  onComplete,
  className = '',
  use3D = false
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Typewriter animation
  useEffect(() => {
    if (animationType === 'typewriter' && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 20); // Fast typing for ASCII art

      return () => clearTimeout(timeout);
    } else if (currentIndex >= text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, animationType, isComplete, onComplete]);

  // Immediate display for non-typewriter animations
  useEffect(() => {
    if (animationType !== 'typewriter') {
      setDisplayedText(text);
      setIsComplete(true);
      onComplete?.();
    }
  }, [text, animationType, onComplete]);

  const getShaderClass = () => {
    switch (shaderEffect) {
      case 'gradient':
        return 'bg-gradient-to-r from-green-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent';
      case 'glow':
        return 'text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]';
      case 'matrix':
        return 'text-green-400 animate-pulse drop-shadow-[0_0_15px_rgba(34,197,94,1)]';
      case 'glitch':
        return 'text-green-400 animate-pulse';
      default:
        return 'text-green-400';
    }
  };

  // 3D rendering disabled for compatibility - using CSS effects instead
  if (use3D) {
    return (
      <div className={`w-full h-64 ${className} flex items-center justify-center`}>
        <div className="text-green-400 font-mono text-2xl font-bold animate-pulse drop-shadow-[0_0_20px_rgba(34,197,94,1)]">
          NASSIM MAAOUIA
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`font-mono text-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <pre className={`text-xs sm:text-sm md:text-base lg:text-lg leading-tight ${getShaderClass()}`}>
        {animationType === 'typewriter' ? displayedText : text}
        {animationType === 'typewriter' && !isComplete && (
          <motion.span
            className="inline-block w-2 h-4 bg-green-400 ml-1"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </pre>
      
      {/* Additional glow effects */}
      {shaderEffect === 'glow' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-green-400/10 blur-xl rounded-lg" />
          <div className="absolute inset-0 bg-green-400/5 blur-2xl rounded-lg" />
        </div>
      )}
      
      {/* Matrix rain effect overlay */}
      {shaderEffect === 'matrix' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400/30 text-xs font-mono"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-20px',
              }}
              animate={{
                y: ['0vh', '120vh'],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {String.fromCharCode(0x30A0 + Math.random() * 96)}
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

// Typewriter ASCII Art Component
export const TypewriterASCIIArt: React.FC<{
  onComplete?: () => void;
  className?: string;
}> = ({ onComplete, className = '' }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const lines = ASCII_ART_COMPACT.split('\n').filter(line => line.trim());

  useEffect(() => {
    if (currentLineIndex < lines.length && !isComplete) {
      const currentLine = lines[currentLineIndex];
      
      if (currentCharIndex < currentLine.length) {
        const timeout = setTimeout(() => {
          setDisplayedLines(prev => {
            const newLines = [...prev];
            if (!newLines[currentLineIndex]) {
              newLines[currentLineIndex] = '';
            }
            newLines[currentLineIndex] += currentLine[currentCharIndex];
            return newLines;
          });
          setCurrentCharIndex(prev => prev + 1);
        }, 15); // Fast typing

        return () => clearTimeout(timeout);
      } else {
        // Move to next line
        setTimeout(() => {
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }, 100);
      }
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentLineIndex, currentCharIndex, lines, isComplete, onComplete]);

  return (
    <motion.div
      className={`font-mono text-center ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <pre className="text-xs sm:text-sm md:text-base lg:text-lg leading-tight text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">
        {displayedLines.map((line, index) => (
          <div key={index}>
            {line}
            {index === currentLineIndex && !isComplete && (
              <motion.span
                className="inline-block w-2 h-4 bg-green-400 ml-1"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
            )}
          </div>
        ))}
      </pre>
    </motion.div>
  );
};

export default ASCIIArtRenderer;