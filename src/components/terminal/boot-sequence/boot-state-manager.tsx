'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Boot sequence state types
export interface BootState {
  isFirstVisit: boolean;
  hasSkipped: boolean;
  bootComplete: boolean;
  currentPhase: 'initializing' | 'booting' | 'loading' | 'complete';
  skipAvailable: boolean;
  showTerminalPrompt: boolean;
  lastVisit: string | null;
  bootPreference: 'always' | 'first-time-only' | 'never';
}

export type BootAction =
  | { type: 'START_BOOT' }
  | { type: 'SKIP_BOOT' }
  | { type: 'COMPLETE_BOOT' }
  | { type: 'SET_PHASE'; phase: BootState['currentPhase'] }
  | { type: 'ENABLE_SKIP' }
  | { type: 'SHOW_TERMINAL_PROMPT' }
  | { type: 'SET_BOOT_PREFERENCE'; preference: BootState['bootPreference'] }
  | { type: 'LOAD_SAVED_STATE'; state: Partial<BootState> };

// Local storage keys
const STORAGE_KEYS = {
  LAST_VISIT: 'nassim-portfolio-last-visit',
  BOOT_PREFERENCE: 'nassim-portfolio-boot-preference',
  SKIP_COUNT: 'nassim-portfolio-skip-count',
  TOTAL_VISITS: 'nassim-portfolio-total-visits'
} as const;

// Initial state
const initialBootState: BootState = {
  isFirstVisit: true,
  hasSkipped: false,
  bootComplete: false,
  currentPhase: 'initializing',
  skipAvailable: false,
  showTerminalPrompt: false,
  lastVisit: null,
  bootPreference: 'first-time-only'
};

// Boot state reducer
function bootStateReducer(state: BootState, action: BootAction): BootState {
  switch (action.type) {
    case 'START_BOOT':
      return {
        ...state,
        currentPhase: 'booting',
        bootComplete: false,
        hasSkipped: false
      };

    case 'SKIP_BOOT':
      // Save skip preference
      saveSkipPreference();
      return {
        ...state,
        hasSkipped: true,
        bootComplete: true,
        currentPhase: 'complete',
        showTerminalPrompt: true
      };

    case 'COMPLETE_BOOT':
      // Save completion
      saveBootCompletion();
      return {
        ...state,
        bootComplete: true,
        currentPhase: 'complete',
        showTerminalPrompt: true
      };

    case 'SET_PHASE':
      return {
        ...state,
        currentPhase: action.phase
      };

    case 'ENABLE_SKIP':
      return {
        ...state,
        skipAvailable: true
      };

    case 'SHOW_TERMINAL_PROMPT':
      return {
        ...state,
        showTerminalPrompt: true
      };

    case 'SET_BOOT_PREFERENCE':
      localStorage.setItem(STORAGE_KEYS.BOOT_PREFERENCE, action.preference);
      return {
        ...state,
        bootPreference: action.preference
      };

    case 'LOAD_SAVED_STATE':
      return {
        ...state,
        ...action.state
      };

    default:
      return state;
  }
}

// Helper functions for localStorage operations
function saveSkipPreference(): void {
  try {
    const skipCount = parseInt(localStorage.getItem(STORAGE_KEYS.SKIP_COUNT) || '0') + 1;
    localStorage.setItem(STORAGE_KEYS.SKIP_COUNT, skipCount.toString());
    
    // If user skips 3+ times, set preference to never show boot
    if (skipCount >= 3) {
      localStorage.setItem(STORAGE_KEYS.BOOT_PREFERENCE, 'never');
    }
  } catch (error) {
    console.warn('Failed to save skip preference:', error);
  }
}

function saveBootCompletion(): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LAST_VISIT, new Date().toISOString());
    const totalVisits = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_VISITS) || '0') + 1;
    localStorage.setItem(STORAGE_KEYS.TOTAL_VISITS, totalVisits.toString());
  } catch (error) {
    console.warn('Failed to save boot completion:', error);
  }
}

function loadSavedBootState(): Partial<BootState> {
  try {
    const lastVisit = localStorage.getItem(STORAGE_KEYS.LAST_VISIT);
    const bootPreference = localStorage.getItem(STORAGE_KEYS.BOOT_PREFERENCE) as BootState['bootPreference'] || 'first-time-only';
    const totalVisits = parseInt(localStorage.getItem(STORAGE_KEYS.TOTAL_VISITS) || '0');
    
    const isFirstVisit = !lastVisit || totalVisits === 0;
    
    return {
      isFirstVisit,
      lastVisit,
      bootPreference
    };
  } catch (error) {
    console.warn('Failed to load saved boot state:', error);
    return {};
  }
}

// Context
const BootStateContext = createContext<{
  state: BootState;
  dispatch: React.Dispatch<BootAction>;
} | null>(null);

// Provider component
export const BootStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(bootStateReducer, initialBootState);

  // Load saved state on mount
  useEffect(() => {
    const savedState = loadSavedBootState();
    dispatch({ type: 'LOAD_SAVED_STATE', state: savedState });
  }, []);

  // Enable skip button after 2 seconds
  useEffect(() => {
    if (state.currentPhase === 'booting') {
      const timer = setTimeout(() => {
        dispatch({ type: 'ENABLE_SKIP' });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [state.currentPhase]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && state.skipAvailable && !state.bootComplete) {
        dispatch({ type: 'SKIP_BOOT' });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [state.skipAvailable, state.bootComplete]);

  return (
    <BootStateContext.Provider value={{ state, dispatch }}>
      {children}
    </BootStateContext.Provider>
  );
};

// Hook to use boot state
export const useBootState = () => {
  const context = useContext(BootStateContext);
  if (!context) {
    throw new Error('useBootState must be used within a BootStateProvider');
  }
  return context;
};

// Hook for boot sequence logic
export const useBootSequence = () => {
  const { state, dispatch } = useBootState();

  const shouldShowBoot = React.useMemo(() => {
    switch (state.bootPreference) {
      case 'always':
        return true;
      case 'never':
        return false;
      case 'first-time-only':
        return state.isFirstVisit;
      default:
        return state.isFirstVisit;
    }
  }, [state.bootPreference, state.isFirstVisit]);

  const startBoot = React.useCallback(() => {
    dispatch({ type: 'START_BOOT' });
  }, [dispatch]);

  const skipBoot = React.useCallback(() => {
    dispatch({ type: 'SKIP_BOOT' });
  }, [dispatch]);

  const completeBoot = React.useCallback(() => {
    dispatch({ type: 'COMPLETE_BOOT' });
  }, [dispatch]);

  const setPhase = React.useCallback((phase: BootState['currentPhase']) => {
    dispatch({ type: 'SET_PHASE', phase });
  }, [dispatch]);

  const setBootPreference = React.useCallback((preference: BootState['bootPreference']) => {
    dispatch({ type: 'SET_BOOT_PREFERENCE', preference });
  }, [dispatch]);

  return {
    ...state,
    shouldShowBoot,
    startBoot,
    skipBoot,
    completeBoot,
    setPhase,
    setBootPreference
  };
};

// Terminal prompt component
export const TerminalPrompt: React.FC<{
  className?: string;
  onCommand?: (command: string) => void;
}> = ({ className = '', onCommand }) => {
  const [input, setInput] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(true);

  // Blinking cursor effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand?.(input.trim());
      setInput('');
    }
  };

  return (
    <div className={`font-mono text-green-400 ${className}`}>
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-green-400 mr-2">nassim@cloud-engineer:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-transparent border-none outline-none text-green-400 flex-1"
          autoFocus
        />
        <span className={`w-2 h-4 bg-green-400 ml-1 ${isVisible ? 'opacity-100' : 'opacity-0'}`} />
      </form>
    </div>
  );
};

// Boot settings component
export const BootSettings: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const { bootPreference, setBootPreference } = useBootSequence();

  return (
    <div className={`font-mono text-sm ${className}`}>
      <h3 className="text-green-400 mb-2">Boot Sequence Settings</h3>
      <div className="space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="bootPreference"
            value="always"
            checked={bootPreference === 'always'}
            onChange={(e) => setBootPreference(e.target.value as BootState['bootPreference'])}
            className="text-green-400"
          />
          <span className="text-gray-300">Always show boot sequence</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="bootPreference"
            value="first-time-only"
            checked={bootPreference === 'first-time-only'}
            onChange={(e) => setBootPreference(e.target.value as BootState['bootPreference'])}
            className="text-green-400"
          />
          <span className="text-gray-300">Show only on first visit</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="bootPreference"
            value="never"
            checked={bootPreference === 'never'}
            onChange={(e) => setBootPreference(e.target.value as BootState['bootPreference'])}
            className="text-green-400"
          />
          <span className="text-gray-300">Never show boot sequence</span>
        </label>
      </div>
    </div>
  );
};