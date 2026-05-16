import React from 'react';
import { MatchEvent } from '../../types';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, AlertTriangle, Image as ImageIcon, Search, Activity, Trophy, Swords } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Props {
  events: MatchEvent[];
}

const getEventIcon = (type: string) => {
  switch (type) {
    case 'SIX': return <Zap className="text-brand-blue shadow-[0_0_10px_rgba(46,144,250,0.5)]" size={18} />;
    case 'FOUR': return <Zap className="text-brand-orange" size={18} />;
    case 'WICKET': return <AlertTriangle className="text-brand-red" size={18} />;
    case 'NOBALL': return <Activity className="text-brand-yellow" size={18} />;
    case 'MILESTONE': return <Trophy className="text-brand-yellow" size={18} />;
    case 'DARE': return <Swords className="text-brand-blue" size={18} />;
    default: return <Zap className="text-white/40" size={18} />;
  }
};

export function EventTimeline({ events }: Props) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        <AnimatePresence initial={false}>
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="group relative pl-8 border-l border-white/5"
            >
              <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-bg-base border-2 border-white/20 group-hover:border-brand-blue transition-colors" />
              
              <div className="flex items-start gap-3">
                <div className="mt-1">{getEventIcon(event.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-black italic text-brand-blue">{event.minute}'</span>
                    <span className="text-[8px] text-white/20 uppercase font-black tracking-widest">{event.type}</span>
                  </div>
                  <p className="font-black italic uppercase text-xs text-white group-hover:text-glow-blue transition-all leading-tight tracking-tight">{event.title}</p>
                  <p className="text-[10px] font-bold text-white/40 mt-1 line-clamp-1">{event.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {events.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
            <Zap size={48} className="mb-4" />
            <p className="text-sm font-bold uppercase tracking-widest">Waiting for the first ball...</p>
          </div>
        )}
      </div>
    </div>
  );
}
