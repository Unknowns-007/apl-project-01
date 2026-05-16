import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Flame, Zap, Trophy, MessageCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Reaction {
  id: string;
  emoji: React.ReactNode;
  color: string;
}

export function FanPulse() {
  const [activeReactions, setActiveReactions] = useState<{ id: number; type: string; x: number }[]>([]);
  const [pulseCount, setPulseCount] = useState(1240);

  const reactions = [
    { type: 'fire', icon: Flame, color: 'text-brand-red', bg: 'bg-brand-red/10' },
    { type: 'heart', icon: Heart, color: 'text-brand-pink', bg: 'bg-brand-pink/10' },
    { type: 'zap', icon: Zap, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
    { type: 'trophy', icon: Trophy, color: 'text-brand-yellow', bg: 'bg-brand-yellow/10' },
  ];

  const handlePulse = (type: string) => {
    const id = Date.now();
    const x = Math.random() * 80 + 10; // 10% to 90%
    setActiveReactions(prev => [...prev, { id, type, x }]);
    setPulseCount(prev => prev + 1);
    
    setTimeout(() => {
      setActiveReactions(prev => prev.filter(r => r.id !== id));
    }, 2000);
  };

  return (
    <div className="relative h-full flex flex-col">
      {/* Reaction Particles Layer (to be rendered higher up in DOM or relative here) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        <AnimatePresence>
          {activeReactions.map((r) => {
            const ReactionIcon = reactions.find(react => react.type === r.type)?.icon || Heart;
            const reactionColor = reactions.find(react => react.type === r.type)?.color || 'text-white';
            
            return (
              <motion.div
                key={r.id}
                initial={{ y: '100%', x: `${r.x}%`, opacity: 0, scale: 0.5 }}
                animate={{ y: '-100%', opacity: [0, 1, 0.5, 0], scale: [0.5, 1.2, 1, 0.8] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className={cn("absolute", reactionColor)}
              >
                <ReactionIcon size={32} className="drop-shadow-[0_0_10px_currentColor]" />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Control Panel */}
      <div className="glass-panel p-6 mt-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-white font-black italic uppercase tracking-tighter text-xl">Fan Pulse</h3>
            <p className="text-white/40 text-[10px] font-black tracking-widest uppercase">Cheer with the crowd</p>
          </div>
          <div className="text-right">
            <span className="text-brand-cyan font-mono font-bold text-2xl">{pulseCount.toLocaleString()}</span>
            <p className="text-white/20 text-[8px] font-black uppercase">Active Cheers</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {reactions.map((r) => (
            <button
              key={r.type}
              onClick={() => handlePulse(r.type)}
              className={cn(
                "group relative aspect-square flex flex-center rounded-2xl border border-white/5 transition-all active:scale-95 hover:border-white/20",
                r.bg
              )}
            >
              <div className="flex flex-col items-center gap-1">
                <r.icon className={cn("w-6 h-6 transition-transform group-hover:scale-110", r.color)} />
                <span className="text-[8px] font-black text-white/40 uppercase group-hover:text-white transition-colors">{r.type}</span>
              </div>
              
              {/* Interaction Ring */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-brand-purple/20 border border-brand-purple flex flex-center">
            <MessageCircle className="text-brand-purple" size={18} />
          </div>
          <div>
            <p className="text-white text-xs font-bold font-sans">Fans are reacting!</p>
            <p className="text-white/40 text-[9px] uppercase tracking-wider">Join the watch party</p>
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="ml-auto w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_10px_#06b6d4]" 
          />
        </div>
      </div>
    </div>
  );
}
