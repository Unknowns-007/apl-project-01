import React from 'react';
import { MatchData } from '../../types';
import { motion } from 'motion/react';

interface Props {
  match: MatchData;
}

export function MatchHeader({ match }: Props) {
  return (
    <div className="bg-bg-card border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl relative">
      {/* Top Banner: Match Meta */}
      <div className="bg-white/5 px-8 py-3 flex justify-between items-center border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-brand-green/20 px-3 py-1 rounded-full border border-brand-green/30">
            <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-green">Live Broadcast</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Indian Premier League • Match 24 • Chennai</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase text-white/40">Stadium Noise</span>
            <div className="flex gap-0.5 items-end h-3">
              {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                <motion.div 
                  key={i} 
                  className="w-0.5 bg-brand-blue" 
                  animate={{ height: `${h * 100}%` }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse', delay: i * 0.1 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 md:p-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12">
          {/* Home Team */}
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex flex-center text-3xl font-black italic shadow-inner">
               {match.homeTeam.substring(0, 1)}
             </div>
             <div>
               <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white">{match.homeTeam}</h2>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mt-1">Currently Batting</p>
             </div>
          </div>

          {/* Center Scoreboard */}
          <div className="flex flex-col items-center justify-center p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] shadow-inner relative group">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-blue/30 to-transparent" />
            <div className="flex items-baseline gap-1">
              <span className="text-8xl font-black italic tracking-tighter leading-none text-white transition-all transform group-hover:scale-105">
                {match.homeScore}
              </span>
              <span className="text-4xl font-black italic text-white/40 decoration-brand-blue decoration-4">/</span >
              <span className="text-5xl font-black italic text-white/60">
                {match.homeWickets}
              </span>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-sm font-bold text-white/40 uppercase tracking-widest">Overs {match.homeOvers}</span>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-sm font-black text-brand-blue uppercase tracking-widest italic">CRR {match.homeCRR || '9.4'}</span>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex items-center gap-6 lg:flex-row-reverse text-right">
             <div className="w-20 h-20 rounded-3xl bg-white/2 border border-white/5 flex flex-center text-3xl font-black italic opacity-30">
               {match.awayTeam.substring(0, 1)}
             </div>
             <div>
               <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white/20 whitespace-nowrap">{match.awayTeam}</h2>
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/10 mt-1">Yet to Bat</p>
             </div>
          </div>
        </div>

        {/* Dynamic Stats Row */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-bg-base/40 p-5 rounded-2xl border border-white/5 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer group">
             <div>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">On Strike</p>
                <p className="text-base font-black italic uppercase text-white group-hover:text-brand-blue transition-colors">MS Dhoni*</p>
             </div>
             <div className="text-right">
                <p className="text-2xl font-black text-white leading-none">42</p>
                <p className="text-[10px] font-bold text-white/40 mt-1">18 balls</p>
             </div>
          </div>
          
          <div className="bg-bg-base/40 p-5 rounded-2xl border border-white/5 flex justify-between items-center opacity-70">
             <div>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Non-Strike</p>
                <p className="text-base font-bold uppercase text-white/80">Ravindra Jadeja</p>
             </div>
             <div className="text-right">
                <p className="text-xl font-bold text-white/60 leading-none">12</p>
                <p className="text-[10px] font-bold text-white/30 mt-1">7 balls</p>
             </div>
          </div>

          <div className="bg-brand-blue/5 p-5 rounded-2xl border border-brand-blue/10 flex justify-between items-center">
             <div>
                <p className="text-[9px] font-black text-brand-blue uppercase tracking-widest mb-1">Bowler</p>
                <p className="text-base font-black italic uppercase text-white">Mohammed Siraj</p>
             </div>
             <div className="text-right">
                <p className="text-2xl font-black text-brand-blue leading-none">2-34</p>
                <p className="text-[10px] font-bold text-white/40 mt-1">3.4 overs</p>
             </div>
          </div>
        </div>
      </div>

      {/* Win Probability Bar */}
      <div className="bg-white/2 px-8 py-4 flex flex-col gap-2 border-t border-white/5">
        <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
          <span className="text-white/40">PlayPulse Analytics: Win Probability</span>
          <span className="text-brand-blue">74.2% Chance for {match.homeTeam} Victory</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '74.2%' }}
            className="h-full bg-brand-blue shadow-[0_0_15px_rgba(46,144,250,0.6)]"
          />
        </div>
      </div>
    </div>
  );
}
