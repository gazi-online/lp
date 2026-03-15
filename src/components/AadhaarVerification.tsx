"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Send, RefreshCw, Smartphone, KeyRound } from "lucide-react";

export function AadhaarVerification() {
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [isResending, setIsResending] = useState(false);

  const startCountdown = useCallback(() => {
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isOtpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, countdown]);

  const handleSendOtp = () => {
    if (aadhaar.length === 12) {
      setIsOtpSent(true);
      setCountdown(30);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setCountdown(30);
    setIsResending(false);
  };

  return (
    <div className="space-y-8 max-w-md mx-auto py-4 transition-colors">
      <div className="space-y-6">
        {/* Aadhaar Input Group */}
        <div className="space-y-2 group">
          <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2 mb-1 transition-colors">
            <ShieldCheck size={14} className="text-[var(--accent-blue)] transition-colors" />
            আধার নম্বর (Aadhaar Number)
          </label>
          <div className="relative">
            <input
              type="text"
              maxLength={12}
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ""))}
              disabled={isOtpSent}
              placeholder="XXXX XXXX XXXX"
              className="w-full bg-[var(--bg-primary)]/40 border border-[var(--card-border)] rounded-2xl px-5 py-4 text-lg font-black tracking-[0.2em] placeholder:text-[var(--text-tertiary)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-blue)]/10 focus:border-[var(--accent-blue)] transition-all duration-300 disabled:opacity-50 text-[var(--text-primary)]"
            />
            {!isOtpSent && (
               <motion.div 
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity"
                style={{ boxShadow: '0 0 20px var(--accent-blue-10)' }}
               />
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!isOtpSent ? (
            <motion.button
              key="send-otp"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={handleSendOtp}
              disabled={aadhaar.length !== 12}
              className="w-full group relative overflow-hidden bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-black py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center justify-center gap-3">
                <Smartphone size={20} />
                <span>ওটিপি পাঠান (Get OTP)</span>
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="otp-input"
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              className="space-y-6 pt-4 border-t border-[var(--border-subtle)] transition-colors"
            >
              <div className="space-y-2 group">
                <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] flex items-center gap-2 mb-1 transition-colors">
                  <KeyRound size={14} className="text-[var(--accent-blue)] transition-colors" />
                  ওটিপি লিখুন (Enter OTP)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    placeholder="• • • • • •"
                    className="w-full bg-[var(--bg-primary)]/40 border border-[var(--card-border)] rounded-2xl px-5 py-4 text-center text-2xl font-black tracking-[0.5em] focus:outline-none focus:ring-4 focus:ring-[var(--accent-blue)]/10 focus:border-[var(--accent-blue)] transition-all duration-300 text-[var(--text-primary)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[var(--accent-blue)]/20 rounded-b-2xl overflow-hidden transition-colors">
                    <motion.div 
                      initial={{ width: "100%" }}
                      animate={{ width: countdown === 0 ? "0%" : `${(countdown / 30) * 100}%` }}
                      className="h-full bg-[var(--accent-blue)] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between px-2">
                <p className="text-sm font-bold text-[var(--text-secondary)] flex items-center gap-2 transition-colors">
                  {countdown > 0 ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-blue)] animate-pulse transition-colors" />
                      {countdown} সেকেন্ড পর পুনরায় পাঠান
                    </>
                  ) : (
                    "ওটিপি পাননি?"
                  )}
                </p>
                <button
                  disabled={countdown > 0 || isResending}
                  onClick={handleResendOtp}
                  className="text-sm font-black text-[var(--accent-blue)] hover:text-[var(--accent-purple)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <RefreshCw size={14} className={isResending ? "animate-spin" : ""} />
                  পুনরায় পাঠান (Resend)
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 rounded-xl bg-[var(--accent-blue)]/5 border border-[var(--accent-blue)]/10 flex items-start gap-3 transition-colors">
        <ShieldCheck className="text-[var(--accent-blue)] flex-shrink-0 mt-0.5 transition-colors" size={18} />
        <p className="text-[11px] font-bold text-[var(--text-secondary)] leading-relaxed transition-colors">
          আপনার আধার ডেটা সুরক্ষিতভাবে UIDAI এনক্রিপশনের মাধ্যমে যাচাই করা হবে। আমরা কোনো আধার তথ্য সংরক্ষণ করি না।
        </p>
      </div>
    </div>
  );
}
