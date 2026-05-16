import React from 'react';
import { motion } from 'motion/react';
import { Zap } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  momentum: number; // -100 to 100
}

export function MomentumMeter({ momentum }: Props) {
  // -100 is Home (CSK), 100 is Away (RCB)
  const homeWidth = Math.max(0, -momentum);
  const awayWidth = Math.max(0, momentum);

  return (
    <div className="glass-panel p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
          <Zap size={14} className="text-brand-cyan" />
          Momentum Pulse
        </h3>
        <span className="text-[8px] font-bold text-brand-cyan uppercase tracking-widest">Live AI Sync</span>
      </div>

      <div className="relative h-24 flex items-end gap-1 px-2">
        {/* Bars to simulate the theme's momentum visual */}
        {[...Array(12)].map((_, i) => {
          const isHome = i < 6;
          const val = Math.random() * 80 + 20;
          return (
            <motion.div 
              key={i}
              className={cn(
                "flex-1 rounded-sm transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)]",
                isHome ? "bg-white/10" : "bg-brand-cyan"
              )}
              animate={{ height: `${val}%`, opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          );
        })}
      </div>
      
      <div className="flex justify-between mt-4">
         <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Home Dominance</span>
         <span className="text-[9px] font-bold text-brand-cyan uppercase tracking-widest">Away Attack</span>
      </div>
    </div>
  );
}
