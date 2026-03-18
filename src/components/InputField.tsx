"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, LucideIcon } from "lucide-react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  icon?: LucideIcon;
  rightIcon?: React.ReactNode;
  inputClassName?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  error,
  helperText,
  disabled,
  icon: Icon,
  rightIcon,
  className = "",
  inputClassName = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`w-full flex flex-col gap-2 ${className}`}>
      {/* Label */}
      {label && (
        <label 
          className="text-[13px] font-black uppercase tracking-[0.1em] text-[var(--text-primary)]/70 ml-1 transition-colors duration-300"
          style={{ 
            color: error ? "var(--accent-red)" : isFocused ? "var(--accent-blue)" : "inherit" 
          }}
        >
          {label}
        </label>
      )}

      {/* Input Container */}
      <motion.div
        animate={{
          scale: isFocused ? 1.01 : 1,
          boxShadow: error 
            ? "0 0 20px rgba(239, 68, 68, 0.1)" 
            : isFocused 
              ? "0 0 25px rgba(59, 130, 246, 0.15)" 
              : "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
        }}
        className={`
          relative flex items-center gap-3
          h-14 px-4 rounded-xl
          transition-all duration-300 ease-out
          ${disabled ? "opacity-40 cursor-not-allowed" : "hover:bg-white/80"}
          ${error 
            ? "bg-red-50/30 border border-red-500/20 ring-4 ring-red-500/5" 
            : isFocused 
              ? "bg-white border border-blue-500/30 ring-4 ring-blue-500/10" 
              : "bg-[#f8fafc] border border-slate-200/60"
          }
          backdrop-blur-sm
        `}
      >
        {/* Left Icon */}
        {Icon && (
          <Icon 
            size={20} 
            className={`transition-colors duration-300 ${
              error ? "text-red-500" : isFocused ? "text-blue-500" : "text-slate-400"
            }`} 
          />
        )}

        {/* Input Field */}
        <input
          {...props}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            w-full h-full bg-transparent outline-none
            text-sm font-bold text-slate-800 
            placeholder:text-slate-400 placeholder:font-medium
            disabled:cursor-not-allowed
            ${inputClassName}
          `}
        />

        {/* Right Action/Icon */}
        {rightIcon && (
          <div className="flex items-center justify-center shrink-0">
            {rightIcon}
          </div>
        )}
      </motion.div>

      {/* Helper / Error Message */}
      <AnimatePresence mode="wait">
        {error ? (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[11px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1.5 ml-1 mt-0.5"
          >
            <AlertCircle size={12} />
            {error}
          </motion.p>
        ) : helperText ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] font-bold text-slate-400 uppercase tracking-wider ml-1 mt-0.5"
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default InputField;
