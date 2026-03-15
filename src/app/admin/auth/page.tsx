"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Fingerprint, Lock, ShieldCheck, Zap, Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NexusAuth() {
  const [stage, setStage] = useState<'ID' | 'MFA'>('ID');
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleIdentityConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStage('MFA');
    }, 1500);
  };

  const handleMFAConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      localStorage.setItem('nexus-token', 'authorized');
      router.push('/admin');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#00011A] flex items-center justify-center p-6 overflow-hidden">
      {/* Background Neural Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0033FF22_0%,_transparent_70%)]" />
        <div className="w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          {stage === 'ID' && (
            <motion.div
              key="stage-id"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              className="glass-panel p-10 rounded-[3rem] border-white/5 bg-white/2 space-y-8 text-center"
            >
              <div className="flex justify-center">
                 <div className="w-20 h-20 rounded-3xl bg-secondary/10 border border-secondary/20 flex items-center justify-center relative">
                    <ShieldAlert size={32} className="text-secondary" />
                    <div className="absolute inset-0 rounded-3xl animate-ping border border-secondary/40 opacity-20" />
                 </div>
              </div>
              
              <div className="space-y-2">
                 <h2 className="text-2xl font-black italic uppercase tracking-widest text-white">Identity Check</h2>
                 <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">গাজী অনলাইন কমান্ড সিস্টেম</p>
              </div>

              <div className="space-y-4">
                 <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-secondary transition-colors">
                       <Terminal size={18} />
                    </div>
                    <input 
                       disabled={isProcessing}
                       type="text" 
                       placeholder="OPERATOR ID // কোড দিন"
                       className="w-full bg-[#00011A]/50 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-xs text-white placeholder:text-white/20 focus:border-secondary/40 focus:ring-1 focus:ring-secondary/20 outline-none transition-all uppercase tracking-widest font-black"
                    />
                 </div>
                 <button 
                   onClick={handleIdentityConfirm}
                   disabled={isProcessing}
                   className="w-full bg-secondary text-[#00011A] py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 relative overflow-hidden"
                 >
                   {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-[#00011A]/20 border-t-[#00011A] rounded-full animate-spin" />
                   ) : (
                      <>Verify ID <Zap size={16} /></>
                   )}
                 </button>
              </div>
            </motion.div>
          )}

          {stage === 'MFA' && (
            <motion.div
              key="stage-mfa"
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 1.1, x: -50 }}
              className="glass-panel p-10 rounded-[3rem] border-blue-500/20 bg-blue-500/5 space-y-8 text-center"
            >
              <div className="flex justify-center">
                 <div className="w-20 h-20 rounded-3xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center relative">
                    <Lock size={32} className="text-blue-400" />
                 </div>
              </div>
              
              <div className="space-y-2">
                 <h2 className="text-2xl font-black italic uppercase tracking-widest text-blue-400">Tactical Code</h2>
                 <p className="text-[10px] text-white/30 font-black uppercase tracking-[0.3em]">সিকিউরিটি অথেন্টিকেশন</p>
              </div>

              <div className="grid grid-cols-6 gap-2">
                 {[1,2,3,4,5,6].map(i => (
                    <input 
                       key={i}
                       type="text"
                       maxLength={1}
                       className="w-full aspect-square bg-[#00011A]/50 border border-blue-500/20 rounded-xl text-center text-blue-400 font-black focus:border-blue-400 outline-none transition-all"
                    />
                 ))}
              </div>

              <button 
                 onClick={handleMFAConfirm}
                 disabled={isProcessing}
                 className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-blue-500 transition-all flex items-center justify-center gap-3"
              >
                 {isProcessing ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                 ) : (
                    <>Establish Connection <ShieldCheck size={16} /></>
                 )}
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Security Footer */}
      <div className="fixed bottom-10 left-10 flex items-center gap-4">
         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
         <span className="text-[9px] font-black uppercase text-white/20 tracking-[0.4em]">Firewall: Optimized</span>
      </div>
      <div className="fixed bottom-10 right-10">
         <span className="text-[9px] font-black uppercase text-white/20 tracking-[0.4em]">Nexus Command v2.4</span>
      </div>
    </div>
  );
}
