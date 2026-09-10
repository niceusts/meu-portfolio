'use client';

import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ProjectSection from './components/ProjectSection';
import HabilitySection from './components/HabilitySection';
import ContactSection from './components/ContactSection';
import GitHub from './components/GitHub';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
  }, []);

  return (
    <div className="space-y-4">
      <HeroSection />
      <div className="mx-auto my-4 h-px max-w-6xl bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <ProjectSection />
      <HabilitySection />
      <GitHub />
      <ContactSection />
    </div>
  );
}
