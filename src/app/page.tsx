import React from 'react';
import HeroSection from './components/HeroSection';
import ProjectSection from './components/ProjectSection';
import HabilitySection from './components/HabilitySection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProjectSection />
      <HabilitySection />
    </div>
  );
}
