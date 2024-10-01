'use client'; // Adicione esta linha para marcar o componente como Client Component

import React, { useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ProjectSection from './components/ProjectSection';
import HabilitySection from './components/HabilitySection';
import ContactSection from './components/ContactSection';
import AOS from 'aos'; // Importar AOS
import 'aos/dist/aos.css'; // Importar os estilos AOS

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      <HeroSection />
      <ProjectSection />
      <HabilitySection />
      <ContactSection />
    </div>
  );
}
