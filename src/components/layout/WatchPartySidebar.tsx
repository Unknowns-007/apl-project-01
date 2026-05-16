import React from 'react';
import { Mic, MicOff, MessageSquare, Plus, Settings } from 'lucide-react';
import { cn } from '../../lib/utils';
import { User } from '../../types';

export function WatchPartySidebar() {
  const users: User[] = [
    { id: '1', name: 'Alex', avatar: 'https://i.pravatar.cc/150?u=1', isSpeaking: true },
    { id: '2', name: 'Sarah', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Jordan', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Mike', avatar: 'https://i.pravatar.cc/150?u=4' },
  ];

  return (
    <aside className="w-72 bg-[#050508] border-l border-white/10 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <h2 className="font-bold text-white/90 flex items-center gap-2">
          <MessageSquare size={18} className="text-brand-cyan" />
          Watch Party
        </h2>
        <button className="p-1 hover:bg-white/5 rounded transition-colors text-white/40">
          <Settings size={16} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-widest text-white/30">Live Now</label>
          {users.map((user) => (
            <div key={user.id} className="group flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer relative">
              <div className={cn(
                "relative w-10 h-10 rounded-full border-2 transition-colors",
                user.isSpeaking ? "border-brand-cyan shadow-[0_0_10px_rgba(6,182,212,0.5)]" : "border-transparent"
              )}>
                <img src={user.avatar} className="rounded-full w-full h-full object-cover" alt={user.name} />
                {user.isSpeaking && (
                  <div className="absolute -bottom-1 -right-1 bg-brand-cyan text-black rounded-full p-0.5 animate-pulse">
                    <Mic size={10} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-white/80 truncate group-hover:text-white transition-colors">{user.name}</p>
                <p className="text-[10px] text-brand-cyan">{user.isSpeaking ? 'Speaking...' : 'Watching'}</p>
              </div>
              {user.isSpeaking ? (
                <Mic size={14} className="text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity" />
              ) : (
                <MicOff size={14} className="text-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
          ))}
          <button className="w-full mt-4 border border-dashed border-white/10 rounded-xl p-3 flex items-center justify-center gap-2 text-white/40 hover:text-brand-cyan hover:border-brand-cyan/50 hover:bg-brand-cyan/5 transition-all text-sm group">
            <Plus size={16} className="group-hover:rotate-90 transition-transform" />
            Invite Friends
          </button>
        </div>
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="flex items-center gap-3 p-2">
          <div className="w-8 h-8 rounded-full bg-brand-cyan/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-brand-cyan rounded-full animate-ping" />
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-brand-cyan uppercase tracking-tighter">Your Status</p>
            <p className="text-xs text-white/90">Watching CSK vs RCB</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
