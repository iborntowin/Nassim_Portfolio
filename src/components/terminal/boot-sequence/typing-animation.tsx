'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

export interface TypingAnimationProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
  cursorClassName?: string;
  startDelay?: number;
}

export const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  speed = 30,
  onComplete,
  className = '',
  showCursor = true,
  cursorClassName = 'inline-block w-2 h-4 bg-green-400 ml-1',
  startDelay = 0
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(startDelay === 0);

  // Handle start delay
  useEffect(() => {
    if (startDelay > 0) {
      const timer = setTimeout(() => {
        setHasStarted(true);
      }, startDelay);

      return () => clearTimeout(timer);
    }
  }, [startDelay]);

  // Typing animation logic
  useEffect(() => {
    if (!hasStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, onComplete, isComplete, hasStarted]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && !isComplete && (
        <motion.span
          className={cursorClassName}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        />
      )}
    </span>
  );
};

export interface SequentialTypingProps {
  messages: Array<{
    text: string;
    delay?: number;
    className?: string;
    speed?: number;
  }>;
  onComplete?: () => void;
  onMessageComplete?: (index: number) => void;
}

export const SequentialTyping: React.FC<SequentialTypingProps> = ({
  messages,
  onComplete,
  onMessageComplete
}) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [completedMessages, setCompletedMessages] = useState<string[]>([]);

  const handleMessageComplete = useCallback(() => {
    const currentMessage = messages[currentMessageIndex];
    
    // Add current message to completed list
    setCompletedMessages(prev => [...prev, currentMessage.text]);
    
    // Notify parent
    onMessageComplete?.(currentMessageIndex);

    // Move to next message or complete
    if (currentMessageIndex < messages.length - 1) {
      setTimeout(() => {
        setCurrentMessageIndex(prev => prev + 1);
      }, currentMessage.delay || 500);
    } else {
      onComplete?.();
    }
  }, [currentMessageIndex, messages, onComplete, onMessageComplete]);

  return (
    <div className="space-y-1">
      {/* Completed messages */}
      {completedMessages.map((message, index) => (
        <div key={index} className={messages[index].className || 'text-gray-300'}>
          {message}
        </div>
      ))}

      {/* Current typing message */}
      {currentMessageIndex < messages.length && (
        <TypingAnimation
          text={messages[currentMessageIndex].text}
          speed={messages[currentMessageIndex].speed}
          onComplete={handleMessageComplete}
          className={messages[currentMessageIndex].className || 'text-gray-300'}
        />
      )}
    </div>
  );
};

export interface BootProgressBarProps {
  duration: number;
  onComplete: () => void;
  label?: string;
  className?: string;
  barClassName?: string;
  textClassName?: string;
}

export const BootProgressBar: React.FC<BootProgressBarProps> = ({
  duration,
  onComplete,
  label = 'Loading',
  className = 'flex items-center space-x-2 ml-4 mt-1',
  barClassName = 'w-32 h-1 bg-gray-700 rounded-full overflow-hidden',
  textClassName = 'text-green-400 text-sm font-mono'
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const increment = 100 / (duration / 50);
        const newProgress = prev + increment;
        
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
    <div className={className}>
      <div className={barClassName}>
        <motion.div
          className="h-full bg-green-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <span className={textClassName}>
        {Math.round(progress)}%
      </span>
      {label && (
        <span className="text-gray-400 text-sm font-mono ml-2">
          {label}
        </span>
      )}
    </div>
  );
};

// Utility hook for managing boot sequence state
export const useBootSequence = (
  messages: Array<{
    text: string;
    type?: 'info' | 'success' | 'warning' | 'error';
    delay?: number;
    showProgress?: boolean;
    progressDuration?: number;
  }>,
  onComplete?: () => void
) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  const nextMessage = useCallback(() => {
    if (currentIndex < messages.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, messages.length, onComplete]);

  const handleMessageComplete = useCallback(() => {
    const currentMessage = messages[currentIndex];
    
    if (currentMessage.showProgress) {
      setShowProgress(true);
    } else {
      setTimeout(nextMessage, currentMessage.delay || 500);
    }
  }, [currentIndex, messages, nextMessage]);

  const handleProgressComplete = useCallback(() => {
    setShowProgress(false);
    const currentMessage = messages[currentIndex];
    setTimeout(nextMessage, currentMessage.delay || 500);
  }, [currentIndex, messages, nextMessage]);

  const skip = useCallback(() => {
    setIsComplete(true);
    onComplete?.();
  }, [onComplete]);

  return {
    currentIndex,
    isComplete,
    showProgress,
    currentMessage: messages[currentIndex],
    completedMessages: messages.slice(0, currentIndex),
    handleMessageComplete,
    handleProgressComplete,
    skip
  };
};