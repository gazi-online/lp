"use client";

import React, { useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

const PARTICLE_COUNT = 30;

interface ParticleProps {
  size: number;
  opacity: number;
  color: string;
  startX: number;
  startY: number;
  startZ: number;
  endX: number;
  endY: number;
  endZ: number;
  delay: number;
}

const Particle = ({ props, index, mode }: { props: ParticleProps; index: number; mode: string }) => {
  const isDark = mode === 'chandra';
  
  return (
    <div
      className="particle"
      style={{
        position: 'absolute',
        borderRadius: '50%',
        width: `${props.size}px`,
        height: `${props.size}px`,
        opacity: props.opacity,
        // Glassmorphism effect
        background: isDark 
          ? `radial-gradient(circle at 30% 30%, ${props.color}, transparent)` 
          : props.color,
        backdropFilter: 'blur(1px)',
        WebkitBackdropFilter: 'blur(1px)',
        border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.4)'}`,
        boxShadow: isDark 
          ? `inset 2px 2px 4px rgba(255, 255, 255, 0.05), 0 0 10px #000000` // Pure black shadows for dark mode
          : `inset 2px 2px 4px rgba(255, 255, 255, 0.2), 0 4px 10px rgba(0, 0, 0, 0.05)`,
        animation: `particle-animation-${index} 60s infinite linear`,
        animationDelay: `${props.delay}s`,
      }}
    />
  );
};

export default function BubbleBackground() {
  const { mode } = useTheme();
  
  // Resolve system mode if necessary
  const effectiveMode = React.useMemo(() => {
    if (mode === 'system') {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'chandra' : 'surya';
      }
      return 'surya'; // Default for SSR
    }
    return mode;
  }, [mode]);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => ({
      size: Math.random() * 8 + 6, // 6-14px
      opacity: Math.random() * 0.4 + 0.1, // Slightly more subtle
      color: `hsl(${Math.random() * 360}, 70%, 65%)`,
      startX: Math.random() * 95, // vw
      startY: Math.random() * 95, // vh
      startZ: Math.random() * 100, // px
      endX: Math.random() * 95, // vw
      endY: Math.random() * 95, // vh
      endZ: Math.random() * 100, // px
      delay: i * -0.2,
    }));
  }, []);

  return (
    <div 
      className="particle-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'transparent', // Transparent background
        zIndex: -1,
        overflow: 'hidden',
      }}
    >
      {particles.map((p, i) => (
        <Particle key={i} props={p} index={i} mode={effectiveMode} />
      ))}
      <style>{`
        ${particles.map((p, i) => `
          @keyframes particle-animation-${i} {
            0% {
              transform: translate3d(${p.startX}vw, ${p.startY}vh, ${p.startZ}px);
            }
            100% {
              transform: translate3d(${p.endX}vw, ${p.endY}vh, ${p.endZ}px);
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  );
}
