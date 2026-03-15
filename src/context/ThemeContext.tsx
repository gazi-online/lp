"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Mode = 'surya' | 'chandra' | 'system';

interface ThemeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>('system');

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem('nexus-theme') as Mode;
    if (saved) {
      setMode(saved);
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = window.document.documentElement;
    root.classList.remove('surya', 'chandra');

    let effectiveMode = mode;
    if (mode === 'system') {
      effectiveMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'chandra' : 'surya';
    }

    root.classList.add(effectiveMode);
    localStorage.setItem('nexus-theme', mode);
    
    // Trigger a custom event for mode change if needed by other non-react components
    window.dispatchEvent(new CustomEvent('nexus-theme-change', { detail: { mode: effectiveMode } }));
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
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
