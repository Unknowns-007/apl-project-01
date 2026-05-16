import React from 'react';
import { Trophy, Users, LayoutDashboard, Image as ImageIcon, Award, Search, Bell, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: 'Live Arena', path: '/match' },
    { label: 'Watch Party', path: '/group' },
    { label: 'Standings', path: '/leaderboard' },
    { label: 'Flash Reels', path: '/highlights' },
  ];

  return (
    <nav className="h-20 border-b border-white/5 bg-bg-base/80 backdrop-blur-xl px-10 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-12">
        <Link to="/" className="flex items-center gap-2 group">
          <Zap className="text-brand-blue" fill="currentColor" size={24} />
          <span className="text-2xl font-black italic tracking-tighter uppercase text-white">PlayPulse</span>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-5 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all",
                location.pathname === item.path 
                  ? "text-brand-blue bg-brand-blue/10 border border-brand-blue/20" 
                  : "text-white/40 hover:text-white"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center bg-white/5 border border-white/5 rounded-2xl px-5 py-2 group focus-within:border-brand-blue/50 transition-all">
          <Search size={16} className="text-white/20 group-focus-within:text-brand-blue" />
          <input 
            type="text" 
            placeholder="Search Arena..." 
            className="bg-transparent border-none focus:ring-0 text-xs w-48 placeholder:text-white/20 font-bold uppercase tracking-widest"
          />
        </div>
        <button className="relative p-2 text-white/40 hover:text-white transition-colors">
          <Bell size={22} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-red rounded-full" />
        </button>
        <div className="w-10 h-10 rounded-2xl bg-bg-card border border-white/5 overflow-hidden p-0.5">
           <img src="https://i.pravatar.cc/150?u=vigu" className="w-full h-full rounded-[14px] object-cover" alt="" />
        </div>
      </div>
    </nav>
  );
}
