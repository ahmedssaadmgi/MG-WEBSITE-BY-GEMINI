import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-200">
              M
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-brand-900 leading-none">
                Monsters Graphics
              </span>
              <span className="text-[10px] uppercase tracking-widest text-brand-500 font-semibold">
                Software Inc.
              </span>
            </div>
          </div>
          
          <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600 items-center">
            <a href="#" className="hover:text-brand-600 transition-colors">Home</a>
            <a href="#about" className="hover:text-brand-600 transition-colors">About</a>
            <a href="#services" className="hover:text-brand-600 transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-brand-600 transition-colors">Portfolio</a>
            <a href="#lab" className="px-4 py-2 bg-brand-50 text-brand-700 rounded-full hover:bg-brand-100 transition-colors flex items-center gap-2">
              <Globe className="w-4 h-4" />
              AI Innovation Lab
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
             <button className="bg-brand-900 hover:bg-brand-800 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg">
               Contact Us
             </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 shadow-lg">
          <nav className="flex flex-col gap-4 text-base font-medium text-gray-600">
            <a href="#" onClick={() => setIsOpen(false)}>Home</a>
            <a href="#about" onClick={() => setIsOpen(false)}>About</a>
            <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#portfolio" onClick={() => setIsOpen(false)}>Portfolio</a>
            <a href="#lab" onClick={() => setIsOpen(false)} className="text-brand-600">AI Innovation Lab</a>
          </nav>
        </div>
      )}
    </header>
  );
};