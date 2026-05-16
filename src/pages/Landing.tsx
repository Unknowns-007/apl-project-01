import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Play, Trophy, Sparkles, Users, Zap, Search, ChevronRight, Activity, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';

export function Landing() {
  const trendingMatches = [
    { id: 'm1', home: 'CSK', away: 'RCB', status: 'LIVE', overs: '18.4', score: '172/4', venue: 'Chennai' },
    { id: 'm2', home: 'MI', away: 'GT', status: '8:30 PM', overs: 'OVERS', score: 'vs', venue: 'Mumbai' },
  ];

  return (
    <div className="bg-bg-base min-h-screen">
      {/* Hero Section - Broadcast Style */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-20 scale-105" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg-base/20 via-bg-base/80 to-bg-base" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-blue/10 border border-brand-blue/20 px-4 py-2 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue">PlayPulse Live Arena 2.0</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12vw] sm:text-[10rem] font-black italic tracking-tighter uppercase leading-[0.8] mb-8"
          >
            BEYOND <br />
            <span className="text-brand-blue italic text-glow-blue">THE BROADCAST.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-xl mx-auto space-y-8"
          >
            <p className="text-white/60 text-base sm:text-xl font-medium">
              The premium AI-powered sports companion built for the next generation of live fan engagement.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/match/m1" className="btn-primary flex items-center gap-3 py-5 px-10">
                <Play size={20} fill="currentColor" />
                Enter Arena
              </Link>
              <Link to="/match" className="btn-secondary py-5 px-10">
                Live Schedule
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Stat Bars (Decorative) */}
        <div className="absolute bottom-20 left-10 hidden xl:block">
          <div className="glass-panel p-4 flex items-center gap-4 rotate-[-3deg]">
            <div className="w-12 h-12 rounded-xl bg-brand-red/20 flex flex-center">
              <Activity className="text-brand-red" />
            </div>
            <div>
              <p className="text-[8px] font-black text-white/40 uppercase">Fan Intensity</p>
              <p className="text-lg font-black italic uppercase">Critical Peak</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Pulse Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-brand-green" size={18} />
              <span className="text-brand-green font-black uppercase tracking-widest text-[10px]">Active Arenas</span>
            </div>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter">Live Highlights</h2>
          </div>
          <Link to="/match" className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all pb-2 border-b border-white/5 hover:border-brand-blue">
            Global Hub <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {trendingMatches.map((m, i) => (
            <motion.div
              key={m.id}
              whileHover={{ y: -8 }}
              className="sport-card group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="p-10 relative z-10">
                <div className="flex justify-between items-center mb-16">
                  <div className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase border",
                    m.status === 'LIVE' 
                      ? "bg-brand-green/10 text-brand-green border-brand-green/20 animate-pulse" 
                      : "bg-white/5 text-white/40 border-white/10"
                  )}>
                    {m.status === 'LIVE' ? 'Broadcast Live' : m.status}
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={14} className="text-white/40" />
                    <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">
                      {i === 0 ? "14.2K" : "2.4K"} ACTIVE
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-12">
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-white/40 uppercase mb-2">Team Home</p>
                    <h3 className="text-6xl font-black italic uppercase tracking-tighter group-hover:text-brand-blue transition-colors">
                      {m.home}
                    </h3>
                  </div>
                  <div className="px-10 text-center">
                    <div className="text-3xl font-black text-white/20 mb-1 uppercase tracking-widest">VS</div>
                    {m.status === 'LIVE' && (
                      <p className="text-2xl font-black italic text-brand-blue text-glow-blue">{m.score}</p>
                    )}
                  </div>
                  <div className="flex-1 text-right">
                    <p className="text-[10px] font-black text-white/40 uppercase mb-2">Team Away</p>
                    <h3 className="text-6xl font-black italic uppercase tracking-tighter text-white/30 font-outline">
                      {m.away}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Global Arena • {m.venue}</p>
                  <Link to={`/match/${m.id}`} className="flex items-center gap-2 text-[10px] font-black text-brand-blue uppercase tracking-widest group-hover:gap-4 transition-all">
                    Join Studio <Zap size={14} fill="currentColor" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-bg-card/40 border-y border-white/5 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl sm:text-6xl font-black italic uppercase tracking-tighter leading-none">
                THE FUTURE OF <br />
                <span className="text-brand-blue">FAN ENGAGEMENT.</span>
              </h2>
              <p className="text-white/40 text-lg sm:text-xl font-medium max-w-lg">
                PlayPulse isn't just a stream. It's a real-time battleground for fans, driven by AI insights and social competition.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  { title: 'Live Dares', desc: 'Predict match turning points and win digital glory.' },
                  { title: 'Watch Parties', desc: 'Sync your stream with friends around the globe.' },
                  { title: 'Pulse AI', desc: 'Get tactical insights before the commentators.' },
                  { title: 'Moments', desc: 'Capture and share epic match fragments.' },
                ].map((f) => (
                  <div key={f.title} className="p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-blue/30 transition-all">
                    <h4 className="font-black italic uppercase tracking-tight text-white mb-2">{f.title}</h4>
                    <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-gradient-to-tr from-brand-blue/20 to-brand-purple/20 rounded-[4rem] flex flex-center p-8 border border-white/10 relative overflow-hidden">
                <Activity size={200} className="text-brand-blue opacity-20 absolute" />
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="z-10"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1540747913346-19e3ad6466b9?auto=format&fit=crop&q=80&w=800" 
                    alt="Experience" 
                    className="rounded-3xl shadow-2xl border-4 border-white/10" 
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Zap className="text-brand-blue" fill="currentColor" />
            <span className="text-2xl font-black italic uppercase tracking-tighter">PlayPulse</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20">
            Produced by Pulse Media Group • © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
