import React, { useState } from 'react';
import { MonsterStyle } from '../types';
import { Sparkles, Loader2, Maximize2, Download, Wand2 } from 'lucide-react';
import { generateMonsterImage } from '../services/geminiService';

interface GeneratorProps {
  onImageGenerated: (url: string, prompt: string, style: MonsterStyle) => void;
}

export const Generator: React.FC<GeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<MonsterStyle>(MonsterStyle.SAAS_DASHBOARD);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGeneratedImage, setLastGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    
    try {
      const imageUrl = await generateMonsterImage(prompt, selectedStyle);
      setLastGeneratedImage(imageUrl);
      onImageGenerated(imageUrl, prompt, selectedStyle);
    } catch (err: any) {
      setError(err.message || "Prototyping failed. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div id="lab" className="py-24 bg-brand-900 text-white relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500 rounded-full blur-[128px]"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[128px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-200 text-xs font-medium mb-4">
                <Sparkles className="w-3 h-3" />
                Monsters Graphics R&D
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced R&D Division</h2>
              <p className="text-brand-100 text-lg leading-relaxed">
                Utilize our proprietary predictive modeling engine. Generate high-fidelity architectural visualizations and user experience concepts instantly to accelerate your product roadmap.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-300 mb-3">Project Specification</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Define your concept (e.g., A real-time fintech analytics dashboard with dark mode UI and high-frequency trading data visualizations...)"
                className="w-full h-32 bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-brand-400 focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all resize-none text-base"
              />
              
              <div className="mt-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-300 mb-3">Visualization Paradigm</label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(MonsterStyle).map((style) => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-3 py-2 text-left text-xs font-medium rounded-lg transition-all ${
                        selectedStyle === style
                          ? 'bg-brand-500 text-white shadow-lg'
                          : 'bg-white/5 text-brand-200 hover:bg-white/10'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {error}
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className={`w-full mt-6 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                  isGenerating || !prompt.trim()
                    ? 'bg-white/10 text-white/50 cursor-not-allowed'
                    : 'bg-white text-brand-900 hover:bg-brand-50 shadow-xl'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing Model...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Generate Visualization
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-black/40 border border-white/10 shadow-2xl relative group">
              {lastGeneratedImage ? (
                <>
                  <img 
                    src={lastGeneratedImage} 
                    alt="AI Prototype" 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <button 
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = lastGeneratedImage;
                        link.download = `prototype-${Date.now()}.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                      className="p-3 bg-white text-brand-900 rounded-full hover:scale-110 transition-transform"
                    >
                      <Download className="w-6 h-6" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-brand-300 p-8 text-center">
                  <Maximize2 className="w-12 h-12 mb-4 opacity-50" />
                  <p className="font-medium">Output Display</p>
                  <p className="text-sm opacity-60 mt-2">Your AI-generated visualization will appear here.</p>
                </div>
              )}
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl hidden md:block">
              <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-sm font-bold text-brand-900">System Online</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};