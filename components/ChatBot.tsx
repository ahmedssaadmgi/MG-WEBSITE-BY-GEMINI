import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am the Monsters Graphics AI Assistant. How can I help you with our software services today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const aiRef = useRef<any>(null);
  const chatSessionRef = useRef<any>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const getApiKey = () => {
    try {
      if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
        return process.env.API_KEY;
      }
    } catch (e) {}
    return undefined;
  };

  const initChat = () => {
    if (!aiRef.current) {
      const apiKey = getApiKey();
      if (!apiKey) {
         setMessages(prev => [...prev, { role: 'model', text: "SYSTEM ERROR: API Key missing. Please set API_KEY in your environment." }]);
         return;
      }

      const ai = new GoogleGenAI({ apiKey });
      aiRef.current = ai;
      
      const systemInstruction = `
        You are the AI Assistant for Monsters Graphics Inc., a global software company.
        
        Company Info:
        - HQ: New York, USA.
        - Tech Hub: Egypt.
        - Established: 2021.
        - Contact: hello@monstersgraphics.com
        - Website: monstersgraphics.com
        
        Services:
        - Bespoke Web Design (React, Modern HTML5)
        - Mobile Apps (React Native, iOS, Android)
        - AI & Machine Learning (NLP, Automation)
        - Custom Architecture (Node.js, Python, Java)
        
        Key Projects:
        - Enterprise Legal AI (LegalTech automation)
        - AtarCloud (SaaS Property Management in Saudi Arabia)
        - BookReadyPro (FinTech Tax AI)
        - Eyedentify (HealthTech Wearables)

        Tone: Professional, helpful, concise, and technically competent.
        Goal: Help users understand services and encourage them to contact us for projects.
        Do not make up facts. If unsure, ask them to email hello@monstersgraphics.com.
      `;

      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction }
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    initChat();
    if (!aiRef.current) return;
    if (!chatSessionRef.current) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const result = await chatSessionRef.current.sendMessage({ message: userMsg });
      const responseText = result.text;
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      console.error("Chat Error", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the mainframe. Please try emailing us at hello@monstersgraphics.com." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-brand-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-gradient-to-r from-brand-900 to-brand-800 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Monsters Assistant</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-brand-200">Online</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-brand-600 text-white rounded-br-none' 
                      : 'bg-white border border-gray-200 text-slate-700 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="flex items-center gap-1 mb-1 text-[10px] text-brand-500 font-bold uppercase tracking-wider opacity-70">
                      <Sparkles className="w-3 h-3" /> AI System
                    </div>
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-brand-500 animate-spin" />
                  <span className="text-xs text-slate-400">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask about our services..."
                className="flex-1 bg-slate-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 transition-all text-slate-700 placeholder:text-slate-400"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-brand-600 hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="text-[10px] text-center text-slate-400 mt-2">
              Powered by Google Gemini AI
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) initChat();
        }}
        className={`${isOpen ? 'scale-0' : 'scale-100'} transition-transform duration-300 group flex items-center justify-center w-14 h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg hover:shadow-brand-500/40 shadow-brand-500/20`}
      >
        <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        {!isOpen && messages.length === 1 && (
            <span className="absolute top-0 right-0 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-white"></span>
            </span>
        )}
      </button>
    </div>
  );
};