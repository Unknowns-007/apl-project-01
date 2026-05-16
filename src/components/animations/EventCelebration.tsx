import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

interface Props {
  type: 'SIX' | 'FOUR' | 'WICKET' | 'DARE' | 'SUCCESS' | null;
  message?: string;
  onComplete: () => void;
}

export function EventCelebration({ type, message, onComplete }: Props) {
  React.useEffect(() => {
    if (type) {
      if (type === 'DARE' || type === 'SUCCESS') {
        const duration = 4 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 300 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
          confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
      } else if (type === 'SIX' || type === 'FOUR') {
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: type === 'SIX' ? ['#06b6d4', '#a855f7', '#ec4899'] : ['#ef4444', '#f59e0b', '#10b981'],
          zIndex: 300
        });
      }

      const duration = type === 'DARE' ? 5000 : 2500;
      const timer = setTimeout(onComplete, duration);
      return () => clearTimeout(timer);
    }
  }, [type, onComplete]);

  const getColors = () => {
    switch (type) {
      case 'SIX': return ['#2E90FA', '#1570EF', '#175CD3'];
      case 'FOUR': return ['#F04438', '#D92D20', '#B42318'];
      case 'WICKET': return ['#667085', '#344054', '#1D2939'];
      case 'DARE': return ['#7F56D9', '#6941C6', '#53389E'];
      case 'SUCCESS': return ['#FDB022', '#F79009', '#B54708'];
      default: return ['#ffffff'];
    }
  };

  const getMainLabel = () => {
    if (type === 'SUCCESS') return 'PREDICTION WIN!';
    if (type === 'DARE') return 'SECRET REVEALED!';
    if (type === 'SIX') return 'MAXIMAL SIX!';
    if (type === 'FOUR') return 'CRACKING FOUR!';
    if (type === 'WICKET') return 'STUMPED!';
    return type;
  };

  return (
    <AnimatePresence>
      {type && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-md pointer-events-none overflow-hidden"
        >
          <motion.div
            initial={{ scale: 0.5, y: 100, opacity: 0, rotate: -10 }}
            animate={{ 
              scale: [0.5, 1.2, 1], 
              y: 0, 
              opacity: 1, 
              rotate: [0, -5, 5, -5, 0],
              x: [0, -10, 10, -10, 0]
            }}
            exit={{ scale: 2, y: -100, opacity: 0 }}
            transition={{ 
              scale: { duration: 0.5 },
              rotate: { duration: 0.2, repeat: 2 },
              x: { duration: 0.2, repeat: 2 }
            }}
            className="text-center px-6 relative"
          >
            <motion.h1 
              className="text-[12vw] font-black italic tracking-tighter uppercase leading-none drop-shadow-[0_0_40px_rgba(255,255,255,0.5)]"
              animate={{ 
                color: getColors(),
                scale: [1, 1.05, 1],
                y: [0, -20, 0]
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {getMainLabel()}
            </motion.h1>
            
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              className="h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent my-8"
            />

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-white font-black tracking-[0.8em] uppercase text-3xl drop-shadow-xl">
                {type === 'SIX' ? 'Max Power' : 
                 type === 'FOUR' ? 'Boundary' : 
                 type === 'DARE' ? 'The Dare King' : 
                 type === 'SUCCESS' ? 'Prediction Unlocked' :
                 'Gone!'}
              </p>
              {message && (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-brand-cyan/20 backdrop-blur-2xl py-6 px-12 rounded-3xl border-2 border-brand-cyan/50 shadow-[0_0_60px_rgba(6,182,212,0.4)]"
                >
                  <p className="text-white text-4xl font-black italic tracking-tight">
                    "{message}"
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Background flash */}
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0] }}
            transition={{ duration: 0.1, times: [0, 0.5, 1], repeat: 4 }}
          />

          {/* Particle fragments */}
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 rounded-full"
              style={{ backgroundColor: getColors()[0] }}
              initial={{ x: 0, y: 0 }}
              animate={{ 
                x: (Math.random() - 0.5) * 2000, 
                y: (Math.random() - 0.5) * 2000,
                opacity: 0,
                scale: 0,
                rotate: Math.random() * 1080
              }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
