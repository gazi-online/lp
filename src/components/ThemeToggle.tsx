"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export function ThemeToggle() {
  const { mode, setMode } = useTheme();

  const toggleTheme = () => {
    if (mode === 'surya') setMode('chandra');
    else if (mode === 'chandra') setMode('system');
    else setMode('surya');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 rounded-2xl bg-[var(--card-bg)] border border-[var(--card-border)] ring-1 ring-[var(--border-subtle)] flex items-center justify-center hover:bg-[var(--bg-secondary)] transition-all group overflow-hidden shadow-sm"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        {mode === 'surya' && (
          <motion.div
            key="surya"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            className="text-[var(--accent-saffron)]"
          >
            <Sun size={20} />
          </motion.div>
        )}
        {mode === 'chandra' && (
          <motion.div
            key="chandra"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            className="text-[var(--accent-blue)]"
          >
            <Moon size={20} />
          </motion.div>
        )}
        {mode === 'system' && (
          <motion.div
            key="system"
            initial={{ y: 20, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -20, opacity: 0, rotate: 45 }}
            className="text-[var(--accent-green)]"
          >
            <Monitor size={20} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative tooltip */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--card-bg)] text-[var(--text-primary)] text-[8px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[var(--card-border)] ring-1 ring-[var(--border-subtle)] shadow-xl whitespace-nowrap z-50">
        {mode === 'surya' ? 'Surya Mode' : mode === 'chandra' ? 'Chandra Mode' : 'System Mode'}
      </div>
    </button>
  );
}
