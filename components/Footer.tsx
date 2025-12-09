import React, { useState } from 'react';
import { Mail, MapPin, Linkedin, Twitter, Globe, Code, Loader2 } from 'lucide-react';
import { downloadSourceCode } from '../utils/downloader';

export const Footer: React.FC = () => {
  const [isZipping, setIsZipping] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-600 rounded flex items-center justify-center text-white font-bold">M</div>
              <span className="text-lg font-bold text-brand-900">Monsters Graphics</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Synthesizing technical innovation with strategic execution.
            </p>
            <div className="flex gap-4 text-slate-400">
               <Linkedin className="w-5 h-5 hover:text-brand-600 cursor-pointer" />
               <Twitter className="w-5 h-5 hover:text-brand-600 cursor-pointer" />
               <Globe className="w-5 h-5 hover:text-brand-600 cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-brand-900 mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><a href="#" className="hover:text-brand-600">About Us</a></li>
              <li><a href="#portfolio" className="hover:text-brand-600">Portfolio</a></li>
              <li><a href="#services" className="hover:text-brand-600">Services</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-900 mb-6">Capabilities</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li>Web & Mobile Development</li>
              <li>AI & Machine Learning</li>
              <li>Big Data Analytics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-brand-900 mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
                <span>New York, USA</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <a href="mailto:hello@monstersgraphics.com" className="hover:text-brand-600">hello@monstersgraphics.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Monsters Graphics Inc.
          </div>
          <div className="flex gap-6 items-center">
            <button 
              onClick={() => downloadSourceCode(setIsZipping)}
              disabled={isZipping}
              className="flex items-center gap-2 hover:text-brand-600 transition-colors disabled:opacity-50"
            >
              {isZipping ? <Loader2 className="w-3 h-3 animate-spin" /> : <Code className="w-3 h-3" />}
              {isZipping ? 'Bundling...' : 'Download Dev Source'}
            </button>
            <a href="#" className="hover:text-brand-600">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};