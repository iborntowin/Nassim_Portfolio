'use client';

import React from 'react';
import { BootStateProvider } from './boot-state-manager';
import BootSequenceHero from './boot-sequence-hero';

export const BootSequenceDemo: React.FC = () => {
  const handleBootComplete = () => {
    console.log('Boot sequence completed!');
  };

  return (
    <BootStateProvider>
      <div className="min-h-screen bg-black">
        <BootSequenceHero onBootComplete={handleBootComplete} />
      </div>
    </BootStateProvider>
  );
};

export default BootSequenceDemo;