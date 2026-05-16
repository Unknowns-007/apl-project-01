import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { WatchPartySidebar } from './WatchPartySidebar';
import { motion, AnimatePresence } from 'motion/react';

export function Shell() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto relative scrollbar-hide">
          <AnimatePresence mode="wait">
            <motion.div
              key={window.location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <div className="hidden lg:block">
          <WatchPartySidebar />
        </div>
      </div>
    </div>
  );
}
