import React, { useEffect, useState } from 'react';
import { ArrowRight, MapPin, CheckCircle2, Download, TrendingUp } from 'lucide-react';

interface HeroProps {
  onScrollToLab: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToLab }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateParallax = (factor: number) => {
    const x = (mousePosition.x - window.innerWidth / 2) * factor;
    const y = (mousePosition.y - window.innerHeight / 2) * factor;
    return `translate(${x}px, ${y}px)`;
  };
  
  const handleDownloadPortfolio = () => {
    const content = `
MONSTERS GRAPHICS INC.
Global Software Solutions & AI Consultancy
==================================================

HEADQUARTERS: New York, USA
TECHNICAL HUB: Egypt
ESTABLISHED: 2021
WEB: https://monstersgraphics.com

ABOUT US
--------------------------------------------------
Introducing Monsters Graphics Inc., a distinguished software company operating with a technical powerhouse situated in Egypt, enabling us to deliver cutting-edge software services worldwide.

Our core competencies encompass bespoke website design, application development, and tailor-made software solutions meticulously crafted to align with your unique requirements.

CORE COMPETENCIES
--------------------------------------------------
* Bespoke Web Design (React, Modern HTML5)
* Application Development (React Native, iOS, Android)
* AI & Machine Learning (NLP, Automation)
* Custom Software Architecture (Node.js, Python, Java)
* Big Data Solutions & Analytics

FEATURED PROJECTS
--------------------------------------------------
1. Enterprise Legal AI (LegalTech)
   - Solution: Automated compliance review for law firms.

2. AtarCloud (SaaS)
   - Region: Saudi Arabia
   - Solution: Leading property management platform operating 24/7.

3. BookReadyPro (FinTech)
   - Solution: AI-driven tax preparation platform for accountants.

4. Eyedentify (HealthTech)
   - Region: Ghana/Global
   - Solution: Wearable device tracking for surgical campaigns.

--------------------------------------------------
© 2025 Monsters Graphics Inc. All rights reserved.
    `;
    
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Monsters_Graphics_Portfolio_2025.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 bg-slate-50 overflow-hidden">
      {/* Futuristic Background Elements - Animated Blobs with Parallax */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Animated Gradient Orbs */}
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 mix-blend-multiply transition-transform duration-100 ease-out"
        style={{ transform: calculateParallax(-0.02) }}
      ></div>
      <div 
        className="absolute top-0 right-20 w-[600px] h-[600px] bg-purple-300/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 mix-blend-multiply transition-transform duration-100 ease-out"
        style={{ transform: calculateParallax(-0.03) }}
      ></div>
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 mix-blend-multiply transition-transform duration-100 ease-out"
        style={{ transform: calculateParallax(0.02) }}
      ></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-brand-100 text-brand-700 font-bold text-xs uppercase tracking-widest mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
              </span>
              Global Tech Partner • Est. 2021
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]">
              Architecting Intelligent <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-brand-500 animate-pulse">
                Digital Ecosystems
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl font-light">
              <strong className="font-semibold text-slate-900">Monsters Graphics Inc.</strong> serves as a strategic technology partner, delivering scalable software architectures and advanced AI strategies to global market leaders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={handleDownloadPortfolio}
                className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-xl shadow-slate-900/20 hover:-translate-y-1 flex items-center justify-center gap-3 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <Download className="w-5 h-5 group-hover:animate-bounce relative z-10" />
                <span className="relative z-10">Download Corporate Profile</span>
              </button>
              <button 
                onClick={onScrollToLab}
                className="px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 hover:border-brand-300 text-slate-900 font-bold transition-all hover:bg-white hover:shadow-lg flex items-center justify-center gap-2"
              >
                Access R&D Division
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" /> USA HQ
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-600" /> Global Hubs
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-600" /> Market Leaders
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
             {/* Abstract Futuristic Graphic */}
             <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/50 bg-white/30 backdrop-blur-md p-3 transform rotate-2 hover:rotate-0 transition-all duration-700 hover:shadow-brand-500/20">
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/10 to-transparent"></div>
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                  alt="Global Network" 
                  className="rounded-xl w-full h-auto object-cover shadow-inner scale-100 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Floating Stats Card - Glassmorphism */}
                <div className="absolute -bottom-8 -left-8 bg-white/90 backdrop-blur-xl p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 max-w-xs z-20 hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-brand-50 rounded-xl">
                      <CheckCircle2 className="w-8 h-8 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-slate-900">Operational Excellence</p>
                      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Proven Delivery</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Client Retention Rate</span>
                      <span>99.9%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-brand-500 to-indigo-600 w-[99%] animate-pulse"></div>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-2">Verified by independent multinational audits.</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};