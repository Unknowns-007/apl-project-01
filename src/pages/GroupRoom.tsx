import React from 'react';
import { motion } from 'motion/react';
import { Users, Video, Mic, Share2, Plus, MessageCircle, Zap } from 'lucide-react';
import { MatchHeader } from '../components/match/MatchHeader';
import { useLiveMatchData } from '../hooks/useLiveMatchData';
import { FanPulse } from '../components/match/FanPulse';
import { cn } from '../lib/utils';

export function GroupRoom() {
  const { match } = useLiveMatchData();

  if (!match) return null;

  return (
    <div className="h-full flex flex-col p-6 lg:p-10 gap-10 max-w-[1800px] mx-auto pb-32">
      {/* Top Banner */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-brand-blue rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(46,144,250,0.3)]">
            <Users className="text-black" size={28} strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">Whistle Podu Squad</h1>
            <div className="text-[10px] text-white/40 font-black uppercase tracking-[0.3em] flex items-center gap-3 mt-1">
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-5 h-5 rounded-full border-2 border-bg-base bg-white/10" />
                 ))}
              </div>
              <span>12 Members Shredding the Arena</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="px-8 py-3 bg-white/5 text-white/40 font-black uppercase tracking-widest text-[10px] rounded-2xl border border-white/10 hover:border-white/20 transition-all">
              Room Settings
           </button>
           <button className="px-8 py-3 bg-brand-blue text-black font-black uppercase tracking-widest text-[10px] rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-[0_20px_40px_rgba(46,144,250,0.2)]">
             <Share2 size={16} />
             Invite Squad
           </button>
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 xl:grid-cols-4 gap-10 min-h-0">
        {/* Main Content Area */}
        <div className="xl:col-span-3 flex flex-col gap-10 overflow-y-auto scrollbar-hide">
          <MatchHeader match={match} />
          
          {/* Main Stage: Sync Broadcast */}
          <div className="flex-1 bg-bg-card rounded-[3rem] border border-white/10 relative overflow-hidden min-h-[400px] shadow-2xl group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 transition-transform duration-1000 group-hover:scale-105"
              alt="stadium"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent" />
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-12 text-center">
              <motion.div 
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-24 h-24 bg-brand-blue/20 rounded-full flex items-center justify-center border-4 border-brand-blue animate-pulse mb-8"
              >
                <Video className="text-brand-blue w-10 h-10" />
              </motion.div>
              <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Synchronizing Broadcast</h2>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Waiting for Squad Lead to cast</p>
              
              <div className="mt-12 flex gap-4">
                 <div className="px-6 py-4 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md flex flex-col items-center min-w-[120px]">
                    <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Latency</p>
                    <p className="text-xl font-black italic text-brand-green">12ms</p>
                 </div>
                 <div className="px-6 py-4 rounded-3xl bg-white/5 border border-white/5 backdrop-blur-md flex flex-col items-center min-w-[120px]">
                    <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-1">Quality</p>
                    <p className="text-xl font-black italic text-brand-blue">4K UHD</p>
                 </div>
              </div>
            </div>
          </div>

          {/* Members Audio Hub */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="aspect-square bg-bg-card rounded-[2.5rem] border border-white/5 p-2 group hover:border-brand-blue/30 transition-all">
                <div className="w-full h-full rounded-[2rem] bg-white/2 relative overflow-hidden flex flex-col items-center justify-center gap-3">
                   <img src={`https://i.pravatar.cc/150?u=${i+20}`} className="w-12 h-12 rounded-2xl object-cover relative z-10 border-2 border-white/10" alt="member" />
                   <p className="text-[10px] font-black uppercase text-white/40 z-10">User_{i}</p>
                   
                   {i < 3 && (
                     <div className="absolute top-2 right-2">
                        <motion.div 
                          animate={{ opacity: [1, 0.4, 1] }} 
                          transition={{ repeat: Infinity, duration: 1 }}
                          className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_10px_#10B981]" 
                        />
                     </div>
                   )}

                   {/* Waveform effect if talking */}
                   {i === 1 && (
                     <div className="flex gap-0.5 mt-2 h-4 items-center">
                        {[0.4, 0.9, 0.6, 0.8, 0.5].map((h, j) => (
                           <motion.div 
                             key={j} 
                             className="w-0.5 bg-brand-blue rounded-full" 
                             animate={{ height: `${h * 100}%` }}
                             transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse', delay: j * 0.1 }}
                           />
                        ))}
                     </div>
                   )}
                </div>
              </div>
            ))}
            <button className="aspect-square bg-white/2 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-center text-white/20 hover:text-brand-blue hover:border-brand-blue/30 hover:bg-white/5 transition-all">
               <Plus size={32} />
            </button>
          </div>
        </div>

        {/* Right: Interaction Engine */}
        <div className="xl:col-span-1 flex flex-col gap-10">
          <div className="bg-bg-card border border-white/5 rounded-[2.5rem] p-4 flex-1 flex flex-col overflow-hidden shadow-xl min-h-[600px]">
             <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageCircle size={20} className="text-brand-blue" />
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white font-mono">Arena Comms</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-brand-blue/10 rounded-full border border-brand-blue/20">
                   <div className="w-1 h-1 bg-brand-blue rounded-full animate-pulse" />
                   <span className="text-[8px] font-black uppercase text-brand-blue tracking-widest italic leading-none pt-0.5">Stream-Sync</span>
                </div>
             </div>
             
             <div className="flex-1 p-6 overflow-y-auto space-y-6 scrollbar-hide">
                {[
                  { user: 'SamyG', msg: 'DHONI IS ON STRIKE!', type: 'msg', color: 'text-brand-blue' },
                  { user: 'System', msg: 'Watch Party Synced to Over 18.2', type: 'system' },
                  { user: 'StatsAI', msg: 'MS Dhoni strike rate in death overs: 242.4', type: 'ai' },
                  { user: 'Pranav', msg: 'LETS GOOOOOO 🚀', type: 'msg' },
                  { user: 'Vicky', msg: 'Revealed a Dare!', type: 'dare' },
                ].map((chat, i) => (
                  <div key={i} className={cn(
                    "relative pl-4 border-l-2",
                    chat.type === 'ai' ? "border-brand-blue" : "border-white/10",
                    chat.type === 'dare' ? "border-brand-red" : "",
                    chat.type === 'system' ? "border-transparent !pl-0 text-center" : ""
                  )}>
                    {chat.type === 'system' ? (
                       <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20">{chat.msg}</p>
                    ) : (
                      <>
                        <p className={cn("text-[9px] font-black uppercase tracking-widest mb-1 opacity-40", chat.color || "text-white")}>
                           {chat.user}
                           {chat.type === 'ai' && <span className="ml-2 text-[8px] px-1 bg-brand-blue/20 rounded">BOT</span>}
                        </p>
                        <p className={cn(
                          "text-[13px] font-bold tracking-tight text-white/80",
                          chat.type === 'ai' ? "italic text-brand-blue/90" : "",
                          chat.type === 'dare' ? "text-brand-red uppercase font-black" : ""
                        )}>{chat.msg}</p>
                      </>
                    )}
                  </div>
                ))}
             </div>

             <div className="p-6 border-t border-white/5 space-y-4">
                <div className="flex gap-2">
                   {['🔥', '😲', '🏏', '🐐'].map(emoji => (
                     <button key={emoji} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex flex-center hover:bg-white/10 transition-colors text-lg">
                        {emoji}
                     </button>
                   ))}
                </div>
                <div className="relative">
                   <input 
                     type="text" 
                     placeholder="Broadcast to Squad..." 
                     className="w-full bg-bg-base border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest focus:ring-4 focus:ring-brand-blue/10 focus:border-brand-blue/50 transition-all outline-none"
                   />
                   <div className="absolute right-4 top-1/2 -translate-y-1/2">
                      <Zap size={18} className="text-white/20 hover:text-brand-blue cursor-pointer transition-colors" />
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-bg-card border border-white/5 rounded-[2.5rem] p-8">
             <FanPulse />
          </div>
        </div>
      </div>
    </div>
  );
}
