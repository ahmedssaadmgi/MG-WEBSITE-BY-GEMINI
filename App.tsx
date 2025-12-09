import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ProjectShowcase } from './components/ProjectShowcase';
import { Generator } from './components/Generator';
import { TechAdvisor } from './components/TechAdvisor';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { MonsterStyle } from './types';

const App: React.FC = () => {
  const scrollToLab = () => {
    const element = document.getElementById('lab');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageGenerated = (url: string, prompt: string, style: MonsterStyle) => {
    console.log("Generated:", prompt);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero onScrollToLab={scrollToLab} />
        <Services />
        <ProjectShowcase />
        <TechAdvisor />
        <Generator onImageGenerated={handleImageGenerated} />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default App;