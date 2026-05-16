import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, X, Minimize2, Maximize2, Bot } from 'lucide-react';
import { cn } from '../../lib/utils';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hey! I'm your PulseAI Companion. Ask me anything about the match, stats, or that review drama! 🏏" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const getAI = () => {
    const key = typeof process !== 'undefined' ? process.env.GEMINI_API_KEY : undefined;
    if (!key) return null;
    return new GoogleGenAI({ apiKey: key });
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const ai = getAI();
    if (!ai) {
      setMessages(prev => [...prev, { role: 'assistant', content: "AI Companion is currently offline. Please check configuration." }]);
      return;
    }

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: `You are PulseAI, a high-energy, Gen-Z sports commentator and companion for a live match between CSK and RCB. 
          The current score is 172/4 in 18.4 overs. 
          Be witty, use emojis, and provide deep tactical insights mixed with "hot takes". 
          Keep responses concise and engaging.`,
        }
      });

      const response = await chat.sendMessage({ message: userMessage });
      const text = response.text || "Sorry, I lost my connection in the stands. Say again?";
      
      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: "My AI sensors are fuzzy! Check your connection." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel w-80 sm:w-96 mb-4 flex flex-col h-[500px] shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-brand-cyan/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple flex items-center justify-center">
                  <Bot size={16} className="text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-widest text-glow-cyan">PulseAI Companion</h4>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-pulse" />
                    <span className="text-[8px] text-brand-cyan uppercase font-black tracking-widest">Processing Live Feed</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 hover:bg-white/5 rounded-md text-white/40 transition-colors"
                >
                  <Minimize2 size={14} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/5 rounded-md text-white/40 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div key={i} className={cn(
                  "flex",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}>
                  <div className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-brand-cyan text-black font-black uppercase tracking-tight rounded-tr-none" 
                      : "bg-white/5 border border-white/10 text-white/90 rounded-tl-none font-medium"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/5 rounded-xl px-3 py-1 border border-white/5 focus-within:border-brand-cyan/50 transition-colors">
                <input 
                  type="text"
                  placeholder="Ask PulseAI..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-xs py-2 placeholder:text-white/10 font-bold uppercase tracking-widest"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="p-1.5 text-brand-cyan hover:scale-110 transition-transform disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        className={cn(
          "w-16 h-16 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple text-white shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center relative group border-4 border-white/10",
          isOpen && !isMinimized && "mt-auto opacity-0 pointer-events-none"
        )}
      >
        <div className="w-8 h-8 rounded-full border-2 border-white animate-pulse" />
        <div className="absolute -top-12 right-0 bg-black/80 backdrop-blur px-4 py-2 rounded-full border border-brand-cyan/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] font-black tracking-widest text-brand-cyan uppercase">AI Companion Ready</span>
        </div>
      </motion.button>
    </div>
  );
}
