import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { ExternalLink, Shield, Building2, BookOpen, Eye, Globe2, Phone, ArrowUpRight, Search, Sparkles, Loader2 } from 'lucide-react';

const REAL_PROJECTS: Project[] = [
  {
    title: "Enterprise Legal AI",
    category: "AI/ML",
    description: "Enterprise-grade automated compliance infrastructure for the legal sector. Leveraging advanced NLP to drastically reduce manual review latency while maximizing accuracy.",
    tags: ["LegalTech", "Process Automation", "Compliance"],
    region: "USA (New York)"
  },
  {
    title: "AtarCloud",
    category: "SaaS",
    link: "https://www.atarcloud.com",
    description: "Market-leading property management ecosystem in Saudi Arabia. Delivers 24/7 operational continuity, tenant portals, and robust analytics via a scalable cloud architecture.",
    tags: ["Cloud Infrastructure", "SaaS", "PropTech"],
    region: "Saudi Arabia"
  },
  {
    title: "BookReadyPro",
    category: "Platform",
    link: "https://www.bookreadypro.com",
    description: "AI-driven financial intelligence platform. Utilizes microservices and predictive modeling to streamline tax preparation for accounting professionals.",
    tags: ["FinTech", "Predictive AI", "Microservices"],
    region: "Global"
  },
  {
    title: "Eyedentify",
    category: "HealthTech",
    link: "https://extreme.stanford.edu/projects/eye-dentify/",
    description: "Mission-critical wearable data system for surgical campaigns. Optimized for low-connectivity environments to streamline patient intake and surgical tracking.",
    tags: ["IoT / Wearables", "Health Data", "React Native"],
    region: "Ghana/Global"
  },
  {
    title: "Callvita",
    category: "Platform",
    link: "https://callvita.com",
    description: "Integrated communication marketplace connecting service professionals with end-users through a secure, high-concurrency real-time interaction layer.",
    tags: ["Real-time Systems", "Digital Marketplace"],
    region: "Global"
  },
  {
    title: "Ebn-Batota",
    category: "Platform",
    description: "Double-sided tourism marketplace architecture. Facilitates seamless transactions between agencies and travelers using a high-availability AWS infrastructure.",
    tags: ["TravelTech", "Marketplace", "AWS"],
    region: "Middle East"
  }
];

// 3D Tilt Card Component
const TiltCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
};

export const ProjectShowcase: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filteredProjects, setFilteredProjects] = useState(REAL_PROJECTS);

  const getIcon = (title: string) => {
    if (title.includes("Legal") || title.includes("Faith")) return Shield;
    if (title.includes("Atar")) return Building2;
    if (title.includes("Book")) return BookOpen;
    if (title.includes("Eye")) return Eye;
    if (title.includes("Ebn")) return Globe2;
    return Phone;
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    
    // Simulate AI Processing Delay
    setIsSearching(true);
    setTimeout(() => {
      if (!val.trim()) {
        setFilteredProjects(REAL_PROJECTS);
      } else {
        const lowerVal = val.toLowerCase();
        const matches = REAL_PROJECTS.filter(p => 
          p.title.toLowerCase().includes(lowerVal) || 
          p.description.toLowerCase().includes(lowerVal) ||
          p.tags.some(t => t.toLowerCase().includes(lowerVal)) ||
          p.category.toLowerCase().includes(lowerVal)
        );
        setFilteredProjects(matches);
      }
      setIsSearching(false);
    }, 600);
  };

  return (
    <div id="portfolio" className="py-24 bg-slate-50 relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="flex-1">
            <span className="text-brand-600 font-bold uppercase tracking-widest text-sm">Case Studies</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mt-2">Strategic <span className="text-brand-600">Portfolio</span></h2>
            <p className="text-slate-500 mt-4 max-w-xl text-lg font-light">
              Partnering with multinational corporations and high-growth ventures to drive digital transformation across the USA, EMEA, and APAC regions.
            </p>
          </div>
          
          {/* AI Search Bar */}
          <div className="w-full md:w-auto min-w-[300px]">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-600 to-indigo-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-white rounded-xl p-1">
                <div className="pl-3 text-brand-500">
                  {isSearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                </div>
                <input 
                  type="text" 
                  value={query}
                  onChange={handleSearch}
                  placeholder="AI Semantic Search (e.g., 'Fintech')"
                  className="w-full bg-transparent border-none focus:ring-0 text-slate-800 placeholder-slate-400 text-sm font-medium py-3 px-3"
                />
              </div>
            </div>
            {query && (
              <div className="text-xs text-brand-600 font-semibold mt-2 text-right flex justify-end gap-1">
                <Sparkles className="w-3 h-3" /> AI filtering active
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {filteredProjects.map((project, idx) => {
            const Icon = getIcon(project.title);
            return (
              <TiltCard key={idx} className="h-full">
                <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:border-brand-200 flex flex-col h-full overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
                    <Icon className="w-24 h-24 text-brand-900" />
                  </div>
                  
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="p-4 bg-slate-50 text-slate-600 rounded-xl group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{project.title}</h3>
                      <span className="text-xs font-bold text-brand-500 uppercase tracking-wider">{project.category}</span>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-grow relative z-10">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-200 group-hover:border-brand-200 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto border-t border-slate-100 pt-5 flex justify-between items-center relative z-10">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1">
                      <Globe2 className="w-3 h-3" /> {project.region}
                    </span>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-600 text-xs font-bold uppercase tracking-wide hover:text-brand-800 hover:translate-x-1 transition-all">
                        View Case Study <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <Search className="w-12 h-12 mx-auto mb-4 text-slate-300" />
            <p className="text-lg text-slate-500">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};