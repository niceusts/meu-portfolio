import React from 'react';
import HeroSection from './components/HeroSection';
import ProjectSection from './components/ProjectSection';
import HabilitySection from './components/HabilitySection';
import ContactSection from './components/ContactSection';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProjectSection />
      <HabilitySection />
      <ContactSection />
    </div>
  );
}
