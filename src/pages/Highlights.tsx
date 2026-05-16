import React from 'react';
import { motion } from 'motion/react';
import { Play, Heart, Share2, MessageCircle, Zap, Shield, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

export function Highlights() {
  const reels = [
    { id: 'r1', title: 'Dhoni Last Over Magic', team: 'CSK', time: '1min ago', thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800' },
    { id: 'r2', title: 'Siraj Triple Wicket Maiden', team: 'RCB', time: '5min ago', thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e3ad6466b9?auto=format&fit=crop&q=80&w=800' },
    { id: 'r3', title: 'Kohli Cover Drive Masterclass', team: 'RCB', time: '12min ago', thumbnail: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=800' },
    { id: 'r4', title: 'Sky High Catch by Jaddu', team: 'CSK', time: '20min ago', thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e3ad6466b9?auto=format&fit=crop&q=80&w=800' },
  ];

  const categories = ['All Feed', 'Top Dares', 'Crucial Wickets', 'Winning Moments', 'Fan Reactions'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16 pb-32">
      {/* Search & Categories Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pt-4">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat, i) => (
            <button 
              key={cat}
              className={cn(
                "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border",
                i === 0 ? "bg-brand-blue text-white border-brand-blue shadow-[0_0_20px_rgba(46,144,250,0.3)]" : "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="bg-bg-card border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-4 min-w-[300px]">
           <TrendingUp size={18} className="text-brand-blue" />
           <span className="text-xs font-bold text-white/40 uppercase tracking-widest">Trending in Chennai Arena</span>
        </div>
      </div>

      {/* Hero Highlight Reel (Horizontal) */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
           <h2 className="text-4xl font-black italic uppercase tracking-tighter">Broadcast Reels</h2>
           <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Scroll to Explore</span>
        </div>
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-10 -mx-6 px-6">
          {reels.map((reel) => (
            <motion.div 
              key={reel.id}
              whileHover={{ y: -10 }}
              className="min-w-[400px] aspect-[4/5] sport-card group cursor-pointer"
            >
              <div className="absolute inset-0 z-0">
                 <img src={reel.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-black/40" />
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                 <div className="flex justify-between items-start">
                    <div className="bg-brand-blue/90 backdrop-blur-md px-3 py-1 rounded-lg">
                       <span className="text-[10px] font-black uppercase text-white">{reel.team}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-center text-white">
                       <Play size={16} fill="currentColor" />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <p className="text-[10px] font-black text-brand-blue uppercase tracking-widest">{reel.time}</p>
                    <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none group-hover:text-glow-blue transition-all">{reel.title}</h3>
                    <div className="flex items-center gap-6 pt-4">
                       <div className="flex items-center gap-2 text-white/60">
                          <Heart size={16} /> <span className="text-xs font-bold">12.4k</span>
                       </div>
                       <div className="flex items-center gap-2 text-white/60">
                          <MessageCircle size={16} /> <span className="text-xs font-bold">2.1k</span>
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Grid Section: Viral Dares & Fan Moments */}
      <section className="space-y-8">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter">Arena Moments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[...Array(8)].map((_, i) => (
             <motion.div 
               key={i}
               whileHover={{ scale: 1.02 }}
               className="glass-panel overflow-hidden border-white/5 hover:border-brand-blue/20"
             >
               <div className="aspect-video bg-white/5 group relative overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1540747913346-19e3ad6466b9?auto=format&fit=crop&q=80&w=400&u=${i}`} className="w-full h-full object-cover grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500" alt="" />
                  <div className="absolute inset-0 flex flex-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-brand-blue flex flex-center text-black">
                       <Play fill="currentColor" size={20} />
                    </div>
                  </div>
               </div>
               <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                     <img src={`https://i.pravatar.cc/150?u=${i}`} className="w-6 h-6 rounded-lg" alt="" />
                     <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">@FanUser_{i+1}</span>
                  </div>
                  <p className="font-bold text-sm tracking-tight mb-4">Epic reaction to that {i % 2 === 0 ? 'Sixer' : 'Wicket'}! 🔥🔥</p>
                  <div className="flex justify-between items-center text-[10px] font-black uppercase text-white/20">
                     <div className="flex gap-4">
                        <span className="flex items-center gap-1"><Heart size={12} /> {i * 120}</span>
                        <span className="flex items-center gap-1"><Share2 size={12} /></span>
                     </div>
                     <span>2m ago</span>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>
      </section>
    </div>
  );
}
