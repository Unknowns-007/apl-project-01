import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Crown, TrendingUp, Users, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export function Leaderboard() {
  const leaders = [
    { rank: 1, name: 'SamyG', points: 12450, accuracy: '94%', streaks: 12, avatar: 'https://i.pravatar.cc/150?u=samy' },
    { rank: 2, name: 'CricketBoss', points: 10200, accuracy: '88%', streaks: 8, avatar: 'https://i.pravatar.cc/150?u=boss' },
    { rank: 3, name: 'DhoniFan07', points: 9800, accuracy: '91%', streaks: 15, avatar: 'https://i.pravatar.cc/150?u=dhoni' },
    { rank: 4, name: 'AlexPredicts', points: 8500, accuracy: '82%', streaks: 5, avatar: 'https://i.pravatar.cc/150?u=alex' },
    { rank: 5, name: 'StatsMaster', points: 7200, accuracy: '79%', streaks: 4, avatar: 'https://i.pravatar.cc/150?u=stats' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12 pb-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="text-brand-yellow" size={24} />
            <span className="text-brand-yellow font-black uppercase tracking-widest text-xs">Hall of Global Fame</span>
          </div>
          <h1 className="text-6xl font-black italic uppercase tracking-tighter">Season Rankings</h1>
          <p className="text-white/40 text-lg mt-4 max-w-xl">
            Real-time standings of the most accurate sports predictors in the PlayPulse global network.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="glass-panel p-6 text-center min-w-[160px]">
             <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Your Rank</p>
             <p className="text-3xl font-black italic">#1,424</p>
          </div>
          <div className="glass-panel p-6 text-center min-w-[160px]">
             <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total Points</p>
             <p className="text-3xl font-black italic text-brand-blue">1,240</p>
          </div>
        </div>
      </div>

      {/* Podium */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end pt-12">
         {/* 2nd Place */}
         <div className="order-2 md:order-1 h-full flex flex-col justify-end">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-bg-card/40 border border-white/5 rounded-3xl p-8 text-center relative"
            >
               <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <div className="w-20 h-20 rounded-full border-4 border-[#C0C0C0] overflow-hidden">
                     <img src={leaders[1].avatar} alt="" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#C0C0C0] text-black flex flex-center font-black">2</div>
               </div>
               <div className="mt-12">
                  <h3 className="text-xl font-black uppercase italic">{leaders[1].name}</h3>
                  <p className="text-brand-blue font-black text-2xl mt-1">{leaders[1].points.toLocaleString()} PTS</p>
               </div>
            </motion.div>
         </div>

         {/* 1st Place */}
         <div className="order-1 md:order-2 h-full">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-b from-brand-yellow/20 to-bg-card/40 border border-brand-yellow/30 rounded-[3rem] p-12 text-center relative shadow-[0_0_50px_rgba(250,204,21,0.1)]"
            >
               <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                  <div className="w-24 h-24 rounded-full border-4 border-brand-yellow p-1 bg-brand-yellow">
                     <img src={leaders[0].avatar} className="rounded-full w-full h-full object-cover" alt="" />
                  </div>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <Crown className="text-brand-yellow w-10 h-10 fill-current" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-brand-yellow text-black flex flex-center font-black text-xl">1</div>
               </div>
               <div className="mt-16">
                  <h3 className="text-3xl font-black uppercase italic tracking-tighter">{leaders[0].name}</h3>
                  <p className="text-brand-yellow font-black text-4xl mt-2">{leaders[0].points.toLocaleString()} PTS</p>
                  <div className="flex items-center justify-center gap-4 mt-6">
                     <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Accuracy: <span className="text-white">{leaders[0].accuracy}</span></div>
                     <div className="w-1 h-1 rounded-full bg-white/20" />
                     <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Streak: <span className="text-white">{leaders[0].streaks} 🔥</span></div>
                  </div>
               </div>
            </motion.div>
         </div>

         {/* 3rd Place */}
         <div className="order-3 md:order-3 h-full flex flex-col justify-end">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-bg-card/40 border border-white/5 rounded-3xl p-8 text-center relative"
            >
               <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <div className="w-20 h-20 rounded-full border-4 border-[#CD7F32] overflow-hidden">
                     <img src={leaders[2].avatar} alt="" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#CD7F32] text-black flex flex-center font-black">3</div>
               </div>
               <div className="mt-12">
                  <h3 className="text-xl font-black uppercase italic">{leaders[2].name}</h3>
                  <p className="text-brand-blue font-black text-2xl mt-1">{leaders[2].points.toLocaleString()} PTS</p>
               </div>
            </motion.div>
         </div>
      </div>

      {/* List Table */}
      <div className="glass-panel overflow-hidden">
         <div className="grid grid-cols-6 gap-4 p-6 border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/20">
            <div className="col-span-1">Rank</div>
            <div className="col-span-2">Predictor</div>
            <div className="col-span-1">Points</div>
            <div className="col-span-1">Accuracy</div>
            <div className="col-span-1 text-right">Activity</div>
         </div>
         <div className="divide-y divide-white/5">
            {leaders.map((leader, i) => (
              <motion.div 
                key={leader.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-6 gap-4 p-6 items-center hover:bg-white/[0.02] transition-colors group"
              >
                 <div className="text-2xl font-black italic text-white/20 group-hover:text-brand-blue transition-colors">
                   #{leader.rank < 10 ? `0${leader.rank}` : leader.rank}
                 </div>
                 <div className="col-span-2 flex items-center gap-4">
                    <img src={leader.avatar} className="w-10 h-10 rounded-xl" alt="" />
                    <span className="font-black uppercase italic tracking-tight">{leader.name}</span>
                 </div>
                 <div className="font-black text-brand-blue">{leader.points.toLocaleString()}</div>
                 <div className="text-white/60 font-bold">{leader.accuracy}</div>
                 <div className="text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-green bg-brand-green/10 px-3 py-1 rounded-full border border-brand-green/20">Active</span>
                 </div>
              </motion.div>
            ))}
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4 p-6 items-center opacity-40">
                 <div className="text-2xl font-black italic text-white/10">#{i + 6 < 10 ? `0${i + 6}` : i + 6}</div>
                 <div className="col-span-2 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5" />
                    <div className="w-24 h-4 bg-white/5 rounded" />
                 </div>
                 <div className="w-16 h-4 bg-white/5 rounded" />
                 <div className="w-12 h-4 bg-white/5 rounded" />
                 <div className="text-right">
                    <div className="w-12 h-4 bg-white/5 rounded ml-auto" />
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
}
