"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <div className="fixed top-6 right-6 z-[100] md:top-8 md:right-8">
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl flex items-center justify-center transition-colors group overflow-hidden"
        aria-label={`Switch to ${mode === 'surya' ? 'dark' : 'light'} mode`}
      >
        <AnimatePresence mode="wait">
          {mode === 'chandra' ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: 'backOut' }}
              className="text-blue-400"
            >
              <Moon size={24} strokeWidth={2.5} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, ease: 'backOut' }}
              className="text-orange-400"
            >
              <Sun size={24} strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
        
        {/* Subtle Glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[var(--accent-blue)]/5 blur-xl" />
      </motion.button>
      
      {/* Shortcut Hint - Hidden on mobile */}
      <div className="hidden lg:block absolute top-full mt-2 right-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100">
        <div className="bg-black/80 backdrop-blur-md text-[10px] text-white/60 px-2 py-1 rounded-md border border-white/10 whitespace-nowrap font-black tracking-widest uppercase">
          <span className="text-white/40">Shortcut:</span> ⌘+⇧+L
        </div>
      </div>
    </div>
  );
}
