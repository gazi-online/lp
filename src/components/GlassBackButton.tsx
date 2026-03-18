"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface GlassBackButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const GlassBackButton: React.FC<GlassBackButtonProps> = ({ 
  onClick, 
  children = "ফিরে যান", 
  className = "",
  disabled = false
}) => {
  return (
    <motion.button
      whileHover={!disabled ? { x: -4, scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.96 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative flex items-center gap-3
        px-8 py-4 rounded-2xl
        transition-all duration-300
        ${disabled 
          ? "opacity-20 cursor-not-allowed" 
          : "bg-white/40 hover:bg-white/60 border border-white/50 shadow-sm hover:shadow-md backdrop-blur-md"
        }
        ${className}
      `}
    >
      {/* Animated Arrow */}
      <motion.div
        initial={false}
        animate={{ x: 0 }}
        whileHover={{ x: -3 }}
        className="text-[var(--text-primary)]"
      >
        <ArrowLeft size={18} strokeWidth={2.5} />
      </motion.div>

      {/* Button Text */}
      <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-primary)] transition-colors">
        {children}
      </span>

      {/* Shine Effect */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:left-[100%] transition-all duration-1000" />
      </div>
    </motion.button>
  );
};

export default GlassBackButton;
