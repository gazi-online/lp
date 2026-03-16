"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

type Mode = 'surya' | 'chandra' | 'system';

interface ThemeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('system');

  const applyTheme = useCallback((targetMode: Mode) => {
    const root = window.document.documentElement;
    root.classList.remove('surya', 'chandra', 'dark');

    let effectiveMode = targetMode;
    if (targetMode === 'system') {
      effectiveMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'chandra' : 'surya';
    }

    root.classList.add(effectiveMode);
    // Add 'dark' class for Tailwind darkMode: 'class' support
    if (effectiveMode === 'chandra') {
      root.classList.add('dark');
    }

    localStorage.setItem('nexus-theme', targetMode);
    window.dispatchEvent(new CustomEvent('nexus-theme-change', { detail: { mode: effectiveMode } }));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('nexus-theme') as Mode;
    if (saved) {
      setMode(saved);
      applyTheme(saved);
    } else {
      applyTheme('system');
    }

    // 1. Listen for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = () => {
      if (mode === 'system') applyTheme('system');
    };
    mediaQuery.addEventListener('change', handleSystemChange);

    // 2. Cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'nexus-theme') {
        const newMode = e.newValue as Mode;
        setMode(newMode);
        applyTheme(newMode);
      }
    };
    window.addEventListener('storage', handleStorageChange);

    // 3. Keyboard shortcut (Ctrl/Cmd + Shift + L)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setMode(prev => {
          const next = prev === 'surya' ? 'chandra' : 'surya';
          applyTheme(next);
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemChange);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mode, applyTheme]);

  const toggleTheme = useCallback(() => {
    setMode(prev => {
      const next = prev === 'surya' ? 'chandra' : 'surya';
      applyTheme(next);
      return next;
    });
  }, [applyTheme]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
