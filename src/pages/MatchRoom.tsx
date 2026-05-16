import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLiveMatchData } from '../hooks/useLiveMatchData';
import { MatchHeader } from '../components/match/MatchHeader';
import { MomentumMeter } from '../components/match/MomentumMeter';
import { EventTimeline } from '../components/match/EventTimeline';
import { FanPulse } from '../components/match/FanPulse';
import { EventCelebration } from '../components/animations/EventCelebration';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Flame, Swords, Trophy, Activity, Sparkles, Plus, Check } from 'lucide-react';
import { cn } from '../lib/utils';
import { UserChallenge } from '../types';

export function MatchRoom() {
  const { match, events } = useLiveMatchData();
  const [activeCelebration, setActiveCelebration] = useState<{ 
    type: 'SIX' | 'FOUR' | 'WICKET' | 'DARE' | 'SUCCESS' | null; 
    message?: string 
  }>({ type: null });
  const lastEventId = React.useRef<string | null>(null);
  const challengeCheckRef = React.useRef<{ [key: string]: boolean }>({});
  const [challenges, setChallenges] = useState<UserChallenge[]>([
    { 
      id: 'c1', 
      userId: 'u1', 
      userName: 'CricketKing', 
      targetValue: 'CSK score 180+', 
      dare: 'Will shave my beard live', 
      isRevealed: false, 
      status: 'PENDING',
      participants: ['u2', 'u3']
    },
    { 
      id: 'c2', 
      userId: 'u2', 
      userName: 'DhoniFan', 
      targetValue: 'Mahi hits a 6 this over', 
      dare: 'Gift 5 subs to the group', 
      isRevealed: false, 
      status: 'PENDING',
      participants: ['u4']
    }
  ]);
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [newChallenge, setNewChallenge] = useState({ target: '', dare: '' });

  // Monitor events for celebrations
  useEffect(() => {
    if (events.length > 0) {
      const lastEvent = events[events.length - 1];
      
      // Initialize if not set
      if (lastEventId.current === null) {
        lastEventId.current = lastEvent.id;
        return;
      }

      if (lastEvent.id !== lastEventId.current) {
        lastEventId.current = lastEvent.id;
        
        // Only trigger if the event is very recent (last 10 seconds)
        const isRecent = Date.now() - lastEvent.timestamp < 10000;
        
        if (isRecent && (['SIX', 'FOUR', 'WICKET', 'DARE'].includes(lastEvent.type))) {
          setActiveCelebration({ 
            type: lastEvent.type as any,
            message: lastEvent.type === 'DARE' ? lastEvent.description : undefined
          });
        }
      }
    }
  }, [events]);

  // Monitor score for challenge fulfillment
  useEffect(() => {
    if (match) {
      // Check for "180+" challenge completion (id: c1)
      if (match.homeScore >= 180 && !challengeCheckRef.current['c1']) {
        challengeCheckRef.current['c1'] = true;
        setChallenges(prev => prev.map(c => c.id === 'c1' ? { ...c, status: 'SUCCESS' } : c));
        
        setActiveCelebration({
          type: 'SUCCESS',
          message: 'CSK HAS PASSED 180!'
        });
      }

      // Check if a 6 happened recently and fulfill Dhoni challenge (id: c2)
      const lastEvent = events[events.length - 1];
      if (lastEvent?.type === 'SIX' && !challengeCheckRef.current['c2']) {
        challengeCheckRef.current['c2'] = true;
        setChallenges(prev => prev.map(c => c.id === 'c2' ? { ...c, status: 'SUCCESS' } : c));
        
        setTimeout(() => {
          setActiveCelebration({
            type: 'SUCCESS',
            message: "DHONI'S SIX PREDICTION CORRECT!"
          });
        }, 1500); // Small delay after the SIX animation finishes or mid-way
      }
    }
  }, [match, events]);

  const handleRevealDare = (challenge: UserChallenge) => {
    if (challenge.isRevealed) return;
    
    setActiveCelebration({
      type: 'DARE',
      message: challenge.dare
    });

    setChallenges(challenges.map(c => 
      c.id === challenge.id ? { ...c, isRevealed: true } : c
    ));
  };

  if (!match) return (
    <div className="flex items-center justify-center h-full">
      <div className="w-12 h-12 border-2 border-brand-cyan border-t-transparent rounded-full animate-spin" />
    </div>
  );

  const handleAddChallenge = () => {
    if (!newChallenge.target || !newChallenge.dare) return;
    const challenge: UserChallenge = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'me',
      userName: 'You',
      targetValue: newChallenge.target,
      dare: newChallenge.dare,
      isRevealed: false,
      status: 'PENDING',
      participants: []
    };
    setChallenges([challenge, ...challenges]);
    setNewChallenge({ target: '', dare: '' });
    setShowChallengeModal(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-[1800px] mx-auto space-y-10 pb-32">
      <EventCelebration 
        type={activeCelebration.type} 
        message={activeCelebration.message}
        onComplete={() => setActiveCelebration({ type: null })} 
      />

      {/* Main Broadcast Hub */}
      <section className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left/Center: Stream & Analysis */}
        <div className="xl:col-span-3 space-y-8">
          <MatchHeader match={match} />
          
          <div className="relative group">
            <div className="aspect-video bg-black rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover opacity-80" 
                alt="Stream"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-transparent to-transparent" />
              
              {/* Broadcast Overlays */}
              <div className="absolute top-8 left-8 flex items-center gap-4">
                 <div className="bg-brand-red px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(240,68,56,0.4)]">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase text-white tracking-widest">Live 4K</span>
                 </div>
                 <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-black uppercase text-white/80">
                    124.2k Viewers
                 </div>
              </div>

              <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                 <div className="space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-10 bg-brand-blue rounded-full shadow-[0_0_15px_#2E90FA]" />
                       <div>
                          <p className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Man of the Moment</p>
                          <h3 className="text-3xl font-black italic uppercase text-white tracking-tighter">MS Dhoni <span className="text-brand-blue">42*</span></h3>
                       </div>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <button className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex flex-center text-white hover:bg-brand-blue hover:text-black transition-all">
                       <Activity size={24} />
                    </button>
                    <button className="w-14 h-14 rounded-2xl bg-brand-blue flex flex-center text-black shadow-[0_0_20px_#2E90FA]">
                       <Sparkles size={24} fill="currentColor" />
                    </button>
                 </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="md:col-span-2">
                <FanPulse />
             </div>
             <div className="glass-panel p-8 space-y-6 bg-bg-card border border-white/5 rounded-[2rem]">
                <div className="flex items-center justify-between">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Global Heatmap</h3>
                   <div className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                </div>
                <div className="aspect-square bg-white/2 rounded-3xl relative overflow-hidden flex flex-center">
                   <Flame size={64} className="text-brand-red/10 animate-pulse" />
                   <div className="absolute inset-0 flex flex-center p-8">
                      <div className="w-full h-full border-2 border-brand-red/20 rounded-full animate-ping" />
                   </div>
                   <div className="absolute bottom-6 inset-x-6 text-center">
                      <p className="text-2xl font-black italic uppercase">Chennai Overlord</p>
                      <p className="text-[10px] font-bold text-white/40 uppercase">High interaction detected</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right: The HERO Prediction/Dare Feature */}
        <div className="xl:col-span-1 space-y-8">
           <div className="bg-bg-card border-2 border-brand-blue/30 rounded-[2.5rem] p-8 space-y-10 shadow-[0_0_60px_rgba(46,144,250,0.1)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <Swords size={120} />
              </div>
              
              <div className="relative z-10 h-full flex flex-col">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-brand-blue" />
                          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-white">Live Dares</h2>
                       </div>
                       <p className="text-[10px] font-black uppercase text-brand-blue tracking-[0.3em]">The Hero Play</p>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      onClick={() => setShowChallengeModal(true)}
                      className="w-14 h-14 rounded-2xl bg-brand-blue text-black shadow-lg flex flex-center border-4 border-black/20"
                    >
                       <Plus size={32} strokeWidth={3} />
                    </motion.button>
                 </div>

                 <div className="mt-12 space-y-4 flex-1">
                    {challenges.map((challenge) => (
                       <motion.div 
                         key={challenge.id}
                         layout
                         className={cn(
                           "p-6 rounded-[2rem] border transition-all cursor-pointer group/card",
                           challenge.status === 'SUCCESS' 
                             ? "bg-brand-blue/10 border-brand-blue shadow-[0_0_30px_rgba(46,144,250,0.2)]" 
                             : "bg-white/5 border-white/5 hover:border-white/10"
                         )}
                       >
                          <div className="flex items-center gap-3 mb-4">
                             <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex flex-center text-xs font-black">
                                {challenge.userName.substring(0, 1)}
                             </div>
                             <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{challenge.userName}</span>
                          </div>

                          <h4 className="text-xl font-black italic uppercase text-white leading-tight mb-6">
                             {challenge.targetValue}
                          </h4>

                          <div className="flex items-center justify-between pt-6 border-t border-white/5">
                             <div>
                                <p className="text-[8px] font-black uppercase text-white/20 tracking-widest mb-1">Potential Karma</p>
                                <p className="text-[11px] font-black italic text-brand-blue">
                                   {challenge.isRevealed ? challenge.dare : "Hidden Secret..."}
                                </p>
                             </div>
                             <button 
                               onClick={() => handleRevealDare(challenge)}
                               className={cn(
                                 "px-6 py-2.5 rounded-xl font-black uppercase text-[9px] tracking-widest transition-all",
                                 challenge.isRevealed ? "bg-white/5 text-white/20" : "bg-white text-black hover:scale-105 active:scale-95"
                               )}
                             >
                                {challenge.isRevealed ? "Locked" : "Reveal"}
                             </button>
                          </div>
                       </motion.div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-bg-card border border-white/5 rounded-[2.5rem] p-8 space-y-8">
              <div className="flex items-center justify-between">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 italic">Live Events</h3>
                 <span className="text-brand-blue font-black italic text-xs cursor-pointer">Full Log</span>
              </div>
              <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
                 <EventTimeline events={events} />
              </div>
           </div>
        </div>
      </section>

      {/* Challenge Creation Modal */}
      <AnimatePresence>
        {showChallengeModal && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChallengeModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-3xl"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative w-full max-w-xl bg-bg-card border border-white/10 p-12 rounded-[3.5rem] shadow-[0_0_100px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent" />
              <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-10 flex items-center gap-4">
                <Plus className="text-brand-blue" size={40} strokeWidth={3} />
                Forge Challenge
              </h2>
              
              <div className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">Prediction Target</label>
                  <input 
                    type="text" 
                    placeholder="e.g. MS Dhoni hits a 6 in next 2 balls"
                    className="w-full bg-white/5 border border-white/5 rounded-3xl p-6 text-lg font-black italic uppercase placeholder:text-white/10 focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all outline-none"
                    value={newChallenge.target}
                    onChange={e => setNewChallenge({...newChallenge, target: e.target.value})}
                  />
                </div>
                
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] ml-2">The Secret Dare</label>
                  <textarea 
                    placeholder="e.g. Shave my mustache live on camera..."
                    className="w-full bg-white/5 border border-white/5 rounded-3xl p-6 text-lg font-bold placeholder:text-white/10 h-40 focus:border-brand-blue/50 focus:ring-4 focus:ring-brand-blue/10 transition-all outline-none resize-none"
                    value={newChallenge.dare}
                    onChange={e => setNewChallenge({...newChallenge, dare: e.target.value})}
                  />
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleAddChallenge}
                    className="w-full py-8 bg-brand-blue text-black font-black uppercase text-xl tracking-widest rounded-3xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(46,144,250,0.3)]"
                  >
                    <Trophy size={28} />
                    Deploy to Arena
                  </button>
                  <p className="text-center mt-6 text-[10px] font-black uppercase text-white/20 tracking-widest">Rewards +500 Pulse Points upon success</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
