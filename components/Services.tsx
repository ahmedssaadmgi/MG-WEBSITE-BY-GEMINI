import React from 'react';
import { Layout, Smartphone, Database, Brain, Code2, LineChart, Layers, ShieldCheck } from 'lucide-react';

const SERVICES = [
  {
    icon: Layout,
    title: "Enterprise Web Architecture",
    desc: "Scalable, secure, and high-performance web platforms utilizing React and modern distributed frameworks."
  },
  {
    icon: Smartphone,
    title: "Omnichannel Mobile Solutions",
    desc: "Native-quality experiences across iOS and Android ecosystems leveraging React Native architecture."
  },
  {
    icon: Brain,
    title: "Applied AI & Automation",
    desc: "Deploying advanced NLP models and machine learning pipelines to drive operational intelligence."
  },
  {
    icon: Code2,
    title: "Cloud Infrastructure",
    desc: "Robust, scalable backend systems engineered with Node.js, Java, and Python on AWS/GCP."
  },
  {
    icon: Database,
    title: "Big Data Analytics",
    desc: "Designing complex data pipelines for massive scale processing and real-time business insights."
  },
  {
    icon: LineChart,
    title: "Digital Strategy Consulting",
    desc: "Comprehensive digital transformation roadmaps for organizations expanding into global markets."
  }
];

const TECH_STACK = ["Node.js", "React", "React Native", "Java", "Python", "Firebase", "AWS", "PostgreSQL", "Laravel"];

export const Services: React.FC = () => {
  return (
    <div id="services" className="py-24 bg-slate-900 text-white relative overflow-hidden group">
      {/* Dark Tech Background with Scanning Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Scanning Line Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/5 to-transparent h-[200%] w-full animate-scan pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <span className="text-brand-400 font-bold uppercase tracking-widest text-sm">Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-2">Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-indigo-400">Digital Engineering</span></h2>
            <p className="text-slate-400 mt-6 text-lg font-light leading-relaxed">
              We combine technical precision with strategic foresight. Our core competencies cover the entire digital spectrum, enabling us to engineer scalable, sustainable, and future-proof solutions.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm shadow-lg shadow-brand-900/20">
             <ShieldCheck className="w-5 h-5 text-green-400" />
             <span className="text-sm font-medium text-slate-300">ISO/SOC2 Compliant Standards</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {SERVICES.map((service, idx) => (
            <div key={idx} className="group/card bg-slate-800/50 hover:bg-slate-800 p-8 rounded-2xl border border-white/5 hover:border-brand-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-900/50">
              <div className="w-14 h-14 bg-gradient-to-br from-brand-600 to-indigo-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg shadow-brand-900/50 group-hover/card:scale-110 group-hover/card:rotate-3 transition-all duration-300">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover/card:text-brand-300 transition-colors">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-12">
          <p className="text-center text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Leveraging Best-in-Class Technologies</p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {TECH_STACK.map((tech) => (
              <span key={tech} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-slate-300 font-medium hover:bg-white/10 hover:text-white hover:border-brand-500/50 transition-all cursor-default hover:scale-105">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};